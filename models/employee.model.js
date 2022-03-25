var mongoose = require("mongoose");

var employeesModel = new mongoose.model("Employees", {
  _id: mongoose.Schema.Types.ObjectId,
  emp_name: String,
  emp_phone: Number,
  emp_age: Number,
  emp_title: String,
  email: String,
  password: String,
  department: { type: mongoose.Schema.Types.ObjectId, ref: "departments" },
});

module.exports = employeesModel;
