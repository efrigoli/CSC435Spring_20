/* Elise Frigoli
 * CSC 435 - Advanced Web App Development
 * Created: 04/25/20
 * Last Modified: 04/26/20 - Added create route
 */

// Importing dependencies
const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 4000;
const mongoose = require("mongoose");
let user = require("./model");
let bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// Setting up Express router
const router = express.Router();


// Setting up Mongoose connection to local db
mongoose.connect(process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/applicationdb", {
  useNewUrlParser: true
});
const connection = mongoose.connection;
// Logging to console to make sure the connection is working
connection.once("open", function() {
  console.log("Connection with MongoDB was successful");
});

app.use("/", router);
app.listen(PORT, function() {
  console.log("Server is running on Port: " + PORT);
});

// Setting up route for getting the data
router.route('/getData').get((req, res) => {
    user.find((error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})

// Setting up route for creating new data
router.route('/create').post((req, res, next) => {
    user.create(req.body, (error, data) => {
        if (error) {
            return next(error)
        } else {
            console.log(data)
            res.json(data)
        }
    })
});
