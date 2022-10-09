'use strict';

//requires are similar to imports
const express = require('express');
const cors = require('cors');
require('dotenv').config();

//create instance of an Express server
const app = express();

//middleware: tells express app to use cors
app.use(cors());

//set out PORT variable to tell our express app where to serve our server
//PORT is not bananas. Must be named exactly this bc Heroku looks for a variable named PORT.
const PORT = process.env.PORT || 3002;

//define an endpoint. define the 'home route' endpoint.
app.get('/', (request, response) => {
  response.send('testing, testing');
});

//this line of code needs to be the very last line of this file.
//tell app to listen to which port we're serving on.
//using this console log because we want to know which port we're serving on. If using alternative port, something is wrong with my .env file or otherwise.
app.listen(PORT, console.log(`listening on PORT ${PORT}`));


//Anytime you console log in the server, it will console log in the terminal, not in the browser.
