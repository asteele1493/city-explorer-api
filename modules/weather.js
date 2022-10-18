'use strict';

const axios = require('axios');

const weatherData = async (request, response, next) => {
  const { lat, lon } = request.query;
  try {
    const url = `https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&days=7&lat=${lat}&lon=${lon}`;
    const weatherResponse = await axios.get(url);
    console.log(weatherResponse.data);
    const forecastArray = weatherResponse.data.data.map(day => new Forecast(day));
    response.status(200).send(forecastArray);
  } catch (error) {
    next(error.message);
  }
};

class Forecast {
  constructor(day) {
    this.date = day.datetime;
    this.lowTemp = day.low_temp + ' °C';
    this.highTemp = day.high_temp + ' °C';
    this.description = day.weather.description;
  }
}


module.exports = weatherData;
