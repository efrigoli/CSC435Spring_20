const mongoose = require("mongoose");

// Schema
const Schema = mongoose.Schema;
const UserSchema = new Schema({
  username: String,
  password: String,
  email: String
});

// Model
const User = mongoose.model('user', UserSchema);

module.exports = User;
