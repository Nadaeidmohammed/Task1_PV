import { getCurrentWeather } from "./weather.service.js";

export const weatherBasedSuggestion = async (req, res) => {
  const weatherData = await getCurrentWeather("Cairo");

  if (!weatherData) {
    return res.status(500).json({ error: "Failed to fetch weather data" });
  }

  const { temp } = weatherData;

  let suggestion = "";

  if (temp >= 30) {
    suggestion = " It's hot! Promote cold drinks like juices and iced coffee.";
  } else if (temp <= 15) {
    suggestion = " It's cold! Promote hot drinks like tea and hot chocolate.";
  } else {
    suggestion = " Moderate weather! Promote snacks and normal beverages.";
  }

  res.json({
    weather: weatherData,
    suggestion,
  });
};
