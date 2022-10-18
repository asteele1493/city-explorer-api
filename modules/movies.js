'use strict';

const axios = require('axios');

const movieData = async (request, response, next) => {
  const { searchQuery } = request.query.searchQuery;
  try {
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIES_API_KEY}&query=${searchQuery}&page=1`;
    const movieResponse = await axios.get(url);
    console.log(movieResponse.data);
    const moviesArr = movieResponse.data.results.map(movie => new Movie(movie));
    response.status(200).send(moviesArr);
  } catch (error) {
    next(error.message);
  }
};

class Movie {
  constructor(movie) {
    this.title = movie.title;
    this.overview = movie.overview;
    this.average_votes = movie.vote_average;
    this.total_votes = movie.vote_count;
    this.image_url = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
    this.popularity = movie.popularity;
    this.released_on = movie.release_date;
  }
}

module.exports = movieData;
