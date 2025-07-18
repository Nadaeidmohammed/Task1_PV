import axios from "axios";
import path from "path"
import dotenv from "dotenv"

dotenv.config({path:path.resolve("./src/config/.env")});

const WEATHER_API_KEY = process.env.WEATHER_API_KEY;

const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

export const getCurrentWeather = async (city = "Cairo") => {

    const response = await axios.get(BASE_URL, {
      params: {
        q: city,
        appid: WEATHER_API_KEY,
        units: "metric", // Celsius
      },
    });

    const temp = response.data.main.temp;
    const weather = response.data.weather[0].main; 

    return { temp, weather };
 
};
