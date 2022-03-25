var mongoose = require("mongoose");

var userModel = new mongoose.model("Users", {
  _id: mongoose.Schema.Types.ObjectId,
  userName: String,
  email: String,
  password: String,
});
module.exports = userModel;
