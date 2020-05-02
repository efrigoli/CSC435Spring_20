const express = require("express");
const router = express.Router();
const User = require('../models/user');

// Routing, which means at that route, the data is stored
router.get('/', (req, res) => {
  // Find all records in User collection
  User.find({ })
    // return the data
    .then((data) => {
      console.log('Data: ', data);
      res.json(data);
    })
    .catch((error) => {
      console.log('Error: ', error);
    });
});

// Whenever the server receives request on this route
router.post('/save', (req, res) => {
  // Show the body
  console.log('Body: ', req.body);
  const data = req.body;
  const newUser = new User(data);
  newUser.save((error) => {
    if (error) {
      res.status(500).json({
        msg: 'Sorry, there were internal server errors.'
      });
      return;
    }
    // Sending confirmation back to user
    return res.json({
      msg: 'New user has been successfully added to db!!'
    });
  });
});

router.get('/name', (req, res) => {
  const data = {
    username: 'jeremiah',
    age: 5
  };
  // Sending data back as JSON, we can update the actual data later
  res.json(data);
});

module.exports = router;
