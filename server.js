'use strict';

//requires are similar to imports
const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

// const weatherResponse = await axios.get(url);
// const { Next } = require('react-bootstrap/esm/PageItem');

//Installs express server
const app = express();

//Middleware
app.use(cors());

//Denotes port; pulls from .env file; gives backup
const PORT = process.env.PORT || 3002;


//Denote home route to ensure proper routing
app.get('/', (request, response) => {
  response.send('testing, testing');
});

//Denote weather route
app.get('/weather', async (request, response, next) => {
  try {
    const { lat, lon } = request.query;
    const url = `https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&days=7&lat=${lat}&lon=${lon}`;
    const weatherResponse = await axios.get(url);
    const forecastArray = weatherResponse.data.data.map(day => new Forecast(day));
    // const forecastArray = forecast.getForecast();
    console.log(weatherResponse.data);
    response.status(200).send(forecastArray);
  } catch (error) {
    next(error.message);
  }
});

class Forecast {
  constructor(day) {
    this.date = day.datetime;
    this.description = day.weather.description;
  }
}

app.get('/movies', async (request, response, next) => {
  try {
    const { searchQuery } = request.query.searchQuery;
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIES_API_KEY}&query=${searchQuery}`;
    const movieResponse = await axios.get(url);
    const moviesArr = movieResponse.data.results.map(movie => new Movie(movie));
    // const forecastArray = forecast.getForecast();
    console.log(movieResponse.data);
    response.status(200).send(moviesArr);
  } catch (error) {
    next(error.message);
  }
});

class Movie {
  constructor(movie) {
    this.title = movie.title;
    this.overview = movie.overview;
    this.average_votes = movie.vote_average;
    this.total_votes = movie.vote_count;
    this.image_url = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    this.popularity = movie.popularity;
    this.released_on = movie.release_date;
  }
}

app.use((error, request, response, next) => {
  console.log(error);
  response.status(500).send(error);
});

//Must be the last line in the code when building out a server.
app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));


