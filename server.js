/* Elise Frigoli
 * CSC 435 - Advanced Web App Development
 * Created: 05/02/20
 * Last Modified: 05/03/20- Added comments
 */

// Importing dependencies
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 8080; // We need Heroku to run the app on their own port

const routes = require('./routes/api');
// Connecting to Mongo Atlas DB
// const MONGODB_URI = 'mongodb+srv://appuser:apppassword@cluster0-jy8sh.mongodb.net/test?retryWrites=true&w=majority';

// First param is link of connection, second param is options to pass
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/applicationdb',{
// mongoose.connect(MONGODB_URI || 'mongodb://localhost/applicationdb',{

  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Listener listening for different states of connection
mongoose.connection.on('connected', () => {
  console.log('Mongoose is connected!!!');
});

// Parsing to make all JSON requests available on the request.body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// This is an HTTP request logger that will log all requests to see what route we are hitting
app.use(morgan('tiny'));

app.use('/api', routes);

// If we are on Heroku, use the build folder
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

app.listen(PORT, console.log(`Server is starting at ${PORT}`));
