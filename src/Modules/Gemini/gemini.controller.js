import { fetchRecommendations } from "./gemini.service.js";

export const getRecommendations = async (req, res) => {
  try {
    const result = await fetchRecommendations();
    res.json({
      success: true,
      message: "AI recommendations fetched successfully",
      data: result,
    });
  } catch (error) {
    console.error("Gemini Error:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to get recommendations",
    });
  }
};
