const { status } = require("express/lib/response");
var mongoose = require("mongoose");
var departmentModel = require("../models/department.model");
function createDepAPIS(app) {
  app.post("/newdep", async (req, resp) => {
    try {
      const { d_name, employees_number } = req.body;
      let dep = new departmentModel({
        _id: mongoose.Types.ObjectId(),
        d_name: d_name,
        employees_number: employees_number,
      });
      await dep.save();
      resp.json({ status: 200, result: dep });
    } catch (err) {
      resp.json({ status: 400, message: "error is  adding new departement " });
    }
  });
  app.get("/departments", async (req, resp) => {
    try {
      let dep = await departmentModel.find({});
      resp.json({ status: 200, result: dep });
    } catch (err) {
      resp.json({ status: 400, message: "error in fetching departments " });
    }
  });
  app.get(`/getdepbyid/:d_id`, async (req, resp) => {
    try {
      const { d_id } = req.params;
      let dep = await departmentModel
        .findOne({ _id: d_id })
        .select(" employees_number");
      resp.json({ status: 200, result: dep });
    } catch (err) {
      resp.json({
        status: 400,
        message: "error in fetching department by ID ",
      });
    }
  });
  //
  app.put(`/updatedep/:d_id`, async (req, resp) => {
    try {
      const { d_id } = req.params;
      const { d_name, employees_number } = req.body;
      let dep = await departmentModel.findOneAndUpdate(
        { _id: d_id },
        { d_name: d_name, employees_number: employees_number },
        { returnOriginal: false }
      );
      //   let newdep = await dep.save();

      resp.json({ status: 200, result: dep });
    } catch (err) {
      resp.json({
        status: 400,
        message: "error in editing department by ID ",
      });
    }
  });
}

module.exports = createDepAPIS;
