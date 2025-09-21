import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import footfallRoutes from './routes/footfall.js';
import pkg from 'pg';
import fetch from 'node-fetch';
import OpenAI from 'openai';

dotenv.config();
const app = express();
const { Pool } = pkg;
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

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
  
  // Set a wider date range to include the sample data (September 2025)
  let from = new Date('2025-09-01');
  let to = new Date('2025-09-30');

  if (lower.includes('hour') || lower.includes('today')) {
    granularity = 'hourly';
  } else if (lower.includes('month')) {
    granularity = 'monthly';
  } else {
    granularity = 'daily';
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

    let reply;
    
    try {
      // Try OpenAI API first
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: marketContext + dataContext + "You are a helpful market management assistant. Provide clear, concise responses about footfall data and market insights."
          },
          {
            role: "user",
            content: message
          }
        ],
        max_tokens: 1000,
        temperature: 0.7,
      });

      reply = completion.choices[0].message.content;
    } catch (openaiError) {
      console.log('OpenAI API failed, using intelligent fallback response:', openaiError.message);
      
      // Intelligent fallback response based on the message content
      const lowerMessage = message.toLowerCase();
      
      if (lowerMessage.includes('footfall') || lowerMessage.includes('visitor') || lowerMessage.includes('traffic')) {
        if (footfallData && footfallData.length > 0) {
          const totalVisitors = footfallData.reduce((sum, row) => sum + parseInt(row.visitors), 0);
          const avgVisitors = Math.round(totalVisitors / footfallData.length);
          const maxVisitors = Math.max(...footfallData.map(row => parseInt(row.visitors)));
          const minVisitors = Math.min(...footfallData.map(row => parseInt(row.visitors)));
          
          reply = `📊 **Footfall Analysis Report**\n\n` +
                  `• Total visitors: ${totalVisitors}\n` +
                  `• Average per period: ${avgVisitors} visitors\n` +
                  `• Peak visitors: ${maxVisitors}\n` +
                  `• Minimum visitors: ${minVisitors}\n` +
                  `• Data points: ${footfallData.length} time periods\n\n` +
                  `The data shows visitor patterns over time. You can see the detailed chart above for visual analysis.`;
        } else {
          reply = "I don't have any footfall data available at the moment. Please try asking about footfall data for a specific market or time period.";
        }
      } else if (lowerMessage.includes('market') || lowerMessage.includes('shopping')) {
        reply = "🏪 **Market Information**\n\n" +
                "I can help you with:\n" +
                "• Footfall analysis and visitor patterns\n" +
                "• Market performance insights\n" +
                "• Shopping trends and analytics\n" +
                "• Market comparison data\n\n" +
                "Ask me about footfall data for specific markets like Main Market, Dilli Haat, or Sarojini Nagar Market.";
      } else if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
        reply = "👋 Hello! I'm your Market Management Assistant.\n\n" +
                "I can help you analyze footfall data, market trends, and visitor patterns. " +
                "Try asking me about:\n" +
                "• 'Show me footfall data for Main Market'\n" +
                "• 'What are the visitor patterns today?'\n" +
                "• 'Compare footfall across different markets'";
      } else {
        reply = "🤖 I'm a Market Management Assistant specialized in footfall analysis and market insights.\n\n" +
                "I can help you with:\n" +
                "• Analyzing visitor patterns and footfall data\n" +
                "• Market performance comparisons\n" +
                "• Shopping trend insights\n" +
                "• Time-based analytics (hourly, daily, monthly)\n\n" +
                "What would you like to know about your markets?";
      }
    }
    res.json({ reply, footfallData });
    
  } catch (error) {
    console.error('Chat endpoint error:', error);
    
    // Provide a fallback response instead of crashing
    const fallbackReply = "🤖 I'm experiencing some technical difficulties with the AI service, but I can still help you with basic market information. Please try asking about footfall data or market insights.";
    
    res.json({ 
      reply: fallbackReply,
      footfallData: null
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Global error handler:', err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Global error handlers to prevent server crashes
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  // Don't exit the process, just log the error
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  // Don't exit the process, just log the error
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});