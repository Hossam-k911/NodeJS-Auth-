var mongoose = require("mongoose");

let dpartmentModel = new mongoose.model("departments", {
  _id: mongoose.Schema.Types.ObjectId,
  d_name: String,
  employees_number: Number,
  employees: [{ type: mongoose.Schema.Types.ObjectId, ref: "Employees" }],
});

module.exports = dpartmentModel;
