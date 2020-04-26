/* Elise Frigoli
 * CSC 435 - Advanced Web App Development
 * Created: 04/25/20
 * Last Modified: 04/26/20 - Added create route
 */

// Setting up a schema model of the data for a new user
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let user = new Schema({
  username: {
    type: String
  },
  password: {
    type: String
  },
  email: {
    type: String
  }
});

module.exports = mongoose.model("user", user);
