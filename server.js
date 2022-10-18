'use strict';

//requires are similar to imports
const express = require('express');
const cors = require('cors');
const weatherData = require('./modules/weather');
const movieData = require('./modules/movies');
require('dotenv').config();

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

app.get('/weather', weatherData);

app.get('/movies', movieData);

app.use((error, request, response, next) => {
  console.log(error);
  response.status(500).send(error);
});

//Must be the last line in the code when building out a server.
app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));


