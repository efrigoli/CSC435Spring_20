/* Elise Frigoli
 * CSC 435 - Advanced Web App Development
 * Created: 05/02/20
 * Last Modified: 05/03/20- Added comments
 */

// Importing dependencies
const mongoose = require("mongoose");

// Creating schema for user objects in db
const Schema = mongoose.Schema;
const UserSchema = new Schema({
  username: String,
  password: String,
  email: String
});

// Model
const User = mongoose.model('user', UserSchema);

module.exports = User;
