import Drink from "../../DB/Models/Drink.model.js";
import { getCurrentWeather } from "./weather.service.js";

const getSeason = (month) => {
  if ([11, 0, 1].includes(month)) return "winter";
  if ([2, 3, 4].includes(month)) return "spring";
  if ([5, 6, 7].includes(month)) return "summer";
  if ([8, 9, 10].includes(month)) return "autumn";
};

const calculateAdjustedPrices = (drinks, weather, season) => {
  return drinks.map(drink => {
    let price = drink.base_price;

    if (weather === "hot" || weather === "clear") {
      if (drink.category === "cold") {
        price *= 1.2;
      } else {
        price *= 0.9;
      }
    } else if (weather === "cold" || weather === "rain") {
      if (drink.category === "hot") {
        price *= 1.2;
      } else {
        price *= 0.9;
      }
    }

    if (season === "summer" && drink.category === "cold") {
      price *= 1.1;
    } else if (season === "winter" && drink.category === "hot") {
      price *= 1.1;
    }

    return {
      ...drink.toJSON(),
      adjusted_price: Math.round(price)
    };
  });
};

export const adjustDrinkPrices = async (req, res) => {
  const city = req.query.city || "Cairo"; 

  const drinks = await Drink.findAll();
  const weather = await getCurrentWeather(city);

  if (!weather) {
    return res.status(500).json({ error: "Failed to fetch weather data" });
  }

  const season = getSeason(new Date().getMonth()); 

  const weatherDescription = weather.weather.toLowerCase();
  const adjustedDrinks = calculateAdjustedPrices(drinks, weatherDescription, season);

  res.json({
    weather: weather.weather,
    season,
    city,
    adjustedDrinks
  });
};



