const axios = require("axios");
require("dotenv").config();

const getWeatherData = async (req, res) => {
  const { date, time, nx, ny } = req.query;
  const apikey = process.env.WEATHER_API_KEY;
  const weatherAPIUrl = process.env.WEATHER_CALLBACK_URL;

  const requestUrl = `${weatherAPIUrl}?serviceKey=${apikey}&numOfRows=7&pageNo=1&dataType=JSON&base_date=${date}&base_time=${time}&nx=${nx}&ny=${ny}`;

  try {
    const response = await axios.get(requestUrl);
    return res.json({
      success: true,
      message: "Get weather infomation ☀️",
      data: response.data.response.body.items.item,
    });
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch weather data🌩️",
    });
  }
};

module.exports = getWeatherData;
