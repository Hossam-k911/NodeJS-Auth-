var mongoose = require("mongoose");
var employeesModel = require("../models/employee.model");
var departmentsModel = require("../models/department.model");

function createEmpAPIS(app) {
  app.post("/signupemp", async (req, resp) => {
    try {
      const { emp_name, emp_phone, emp_age, emp_title, email, password, d_id } =
        req.body;

      let emp = new employeesModel({
        _id: mongoose.Types.ObjectId(),
        emp_name: emp_name,
        emp_phone: emp_phone,
        emp_age: emp_age,
        emp_title: emp_title,
        email: email,
        password: password,
      });
      await emp.save();
      let selectedDepartment = await departmentsModel.findOne({ _id: d_id });
      selectedDepartment.employees.push(emp._id);
      await selectedDepartment.save();
      resp.json({ status: 200, result: selectedDepartment, output: emp });
    } catch (err) {
      resp.json({ status: 400, message: "error in sign up" });
    }
  });

  app.post("/login", async (req, resp) => {
    const { email, passwrod } = req.body;
    let foundUser = employeesModel.findOne({
      email: email,
      passwrod: passwrod,
    });
    if (foundUser) {
      req.session.user = foundUser;
      resp.json({ status: "success login", token: req.sessionID });
    }
  });
  app.get("/logout", async (req, resp) => {
    await req.session.destroy();
    resp.json({ message: "bye", token: req.sessionID });
  });
}

module.exports = createEmpAPIS;
