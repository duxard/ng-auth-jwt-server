const mongoose = require('mongoose');
//DB blueprint
const userSchema = new mongoose.Schema({
  email: String,
  password: String
});

const User = mongoose.model("User", userSchema, 'users');

module.exports = User;
