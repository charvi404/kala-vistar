import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const app = express();

app.use(cors({ origin: "http://localhost:5173" }));
app.use(bodyParser.json());

// app.post("/chat", async (req, res) => {
//   const { message } = req.body;

//   try {
//     const response = await fetch(
//       "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" +
//         process.env.GEMINI_API_KEY,
//       {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           contents: [
//             {
//               role: "user",
//               parts: [{ text: message }],
//             },
//           ],
//         }),
//       }
//     );

//     const data = await response.json();
//     const reply =
//       data.candidates?.[0]?.content?.parts?.[0]?.text ||
//       "Sorry, I couldn’t generate a response.";

//     res.json({ reply });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ reply: "Error contacting Gemini API." });
//   }
// });
const promptTemplate = `
You are Kala Vistar Assistant, an AI expert in artisan businesses.
Your role is to ONLY answer about:
- Best neighborhoods/locations for artisan shops
- Product pricing strategies
- Market trends
- Popular artisan products
- Marketing ideas for handmade crafts

⚠️ If the user asks something unrelated (like technology, politics, health, etc.),
respond with: "I can only help with artisan business topics like neighborhoods, pricing, or trends."
`;

app.post("/chat", async (req, res) => {
  const { message } = req.body;

  try {
    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" +
        process.env.GEMINI_API_KEY,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{ text: promptTemplate + "\n\nUser: " + message }],
            },
          ],
        }),
      }
    );

    const data = await response.json();
    const reply =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Sorry, I couldn’t generate a response.";

    res.json({ reply });
  } catch (error) {
    console.error(error);
    res.status(500).json({ reply: "Error contacting Gemini API." });
  }
});


app.listen(5001, () =>
  console.log("✅ Backend running on http://localhost:5001")
);
