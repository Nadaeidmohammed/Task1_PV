import axios from "axios";
import { getRecentSales } from "./gemini.utils.js";

const GEMINI_API_KEY = "AIzaSyDGs96an1WQOjVupfLxxVhLzqacQbpMhAY";
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`;

const buildPrompt = (orders) => `
You are a smart AI assistant helping with product promotion decisions.

Here is the recent sales data:
${JSON.stringify(orders, null, 2)}

Based on this data:
- Identify the top 3 products that should be promoted to increase revenue.
- Focus on sales volume, price, and trends over time.

Return an array of 3 recommended products in the following JSON format:
[
  {
    "productId": "P001",
    "quantity": 30,
    "price": 5000,
    "createdAt": "2025-07-17T10:00:00.000Z",
    "reason": "Explain in 1 sentence why this product is recommended for promotion."
  },
  ...
]

 Reply only with a valid JSON array.
 Do not include any explanation, text, or markdown like \`\`\`json.
 Just return pure JSON only.
`;

export const fetchRecommendations = async () => {
  const sales = await getRecentSales();

  const prompt = buildPrompt(sales);

  const response = await axios.post(GEMINI_URL, {
    contents: [
      {
        parts: [{ text: prompt }],
      },
    ],
  });

  const geminiReply = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;


  let cleanReply = geminiReply.trim();
  if (cleanReply.startsWith("```")) {
    cleanReply = cleanReply.replace(/```json|```/g, "").trim();
  }

  try {
    const parsed = JSON.parse(cleanReply);
    return parsed;
  } catch (err) {
    console.error(" JSON parsing failed:", err.message);
    throw new Error("Invalid response format from Gemini");
  }
};
