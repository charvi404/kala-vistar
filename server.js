import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import footfallRoutes from './routes/footfall.js';
import pkg from 'pg';
import fetch from 'node-fetch';

dotenv.config();
const app = express();
const { Pool } = pkg;
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

// Middleware to handle database connection
app.use(async (req, res, next) => {
  try {
    const client = await pool.connect();
    req.db = client;
    res.on('finish', () => {
      client.release();
    });
    next();
  } catch (err) {
    console.error('Error connecting to database:', err);
    res.status(500).json({ error: 'Database connection error' });
  }
});

app.use(cors({ origin: ["http://localhost:5173", "http://localhost:5174"] }));
app.use(bodyParser.json());
app.use('/footfall', footfallRoutes);

// Helper function to parse intent
function parseIntent(query) {
  const lower = query.toLowerCase();
  let granularity = 'daily';
  let from = new Date();
  let to = new Date();

  if (lower.includes('hour') || lower.includes('today')) {
    granularity = 'hourly';
    from.setHours(0, 0, 0, 0);
  } else if (lower.includes('month')) {
    granularity = 'monthly';
    from.setMonth(from.getMonth() - 6);
  } else {
    granularity = 'daily';
    from.setDate(from.getDate() - 7);
  }

  let marketId = 1;
  if (lower.includes('dilli haat')) marketId = 2;
  if (lower.includes('sarojini')) marketId = 3;

  return { marketId, granularity, from: from.toISOString(), to: to.toISOString() };
}

// Chat endpoint with Gemini API
app.post("/chat", async (req, res) => {
  const { message } = req.body;
  
  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  try {
    let footfallData = null;
    
    if (message.toLowerCase().includes('footfall')) {
      const { marketId, granularity, from, to } = parseIntent(message);
      
      const timeFormat = 
        granularity === 'hourly' ? 'YYYY-MM-DD HH24:00' :
        granularity === 'daily' ? 'YYYY-MM-DD' :
        'YYYY-MM';
      
      const timeUnit = 
        granularity === 'hourly' ? 'hour' :
        granularity === 'daily' ? 'day' :
        'month';

      try {
        const result = await req.db.query(
          'SELECT to_char(date_trunc($1, timestamp), $2) AS time, SUM(visitors_count) AS visitors FROM footfall WHERE market_id = $3 AND timestamp BETWEEN $4 AND $5 GROUP BY 1 ORDER BY 1',
          [timeUnit, timeFormat, marketId, from, to]
        );
        
        footfallData = result.rows;
        console.log('Retrieved footfall data:', footfallData);
      } catch (dbError) {
        console.error('Database query error:', dbError);
        return res.status(500).json({ error: 'Error retrieving footfall data' });
      }
    }

    const marketContext = 
      "You are an AI assistant for a market management system. " +
      "You help analyze footfall data and provide insights about market trends. " +
      "Market IDs: 1=Main Market, 2=Dilli Haat, 3=Sarojini Nagar Market. ";
    
    const dataContext = footfallData ? 
      `The footfall data shows: ${JSON.stringify(footfallData, null, 2)}. ` +
      "Analyze this data and provide insights about visitor patterns. " : 
      "";

    const prompt = 
      marketContext +
      dataContext +
      "If the user asks about footfall, analyze the data and provide specific insights. " +
      "Otherwise, provide helpful information about markets and shopping.\n\n" +
      "User: " + message;

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=" +
      process.env.GEMINI_API_KEY,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ role: "user", parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1024,
          },
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.statusText}`);
    }

    const data = await response.json();
    
    if (!data.candidates?.[0]?.content?.parts?.[0]?.text) {
      throw new Error('Invalid response format from Gemini API');
    }

    const reply = data.candidates[0].content.parts[0].text;
    res.json({ reply, footfallData });
    
  } catch (error) {
    console.error('Chat endpoint error:', error);
    res.status(500).json({ 
      error: 'Server error',
      message: 'I apologize, but I encountered an issue. Please try again.'
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Global error handler:', err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});