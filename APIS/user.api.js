var mongoose = require("mongoose");
var userModel = require("../models/user.model");

function usersAPI(app) {
  app.post("/signup", async (req, resp) => {
    try {
      const { userName, email, password } = req.body;
      let user = new userModel({
        _id: mongoose.Types.ObjectId(),
        userName: userName,
        email: email,
        password: password,
      });
      await user.save();
      resp.json({ message: "suceess", result: user });
    } catch (err) {
      resp.json({ message: "Failed in sign up" });
    }
  });
  app.post("/signin", async (req, resp) => {
    try {
      const { userName, password } = req.body;
      let user = await userModel.findOne({
        userName: userName,
        password: password,
      });
      if (user) {
        req.session.user = user;
        resp.json({ message: "success" });
      }
    } catch (err) {
      resp.json({ message: "err" });
    }
  });

  app.get("/users", async (req, resp) => {
    try {
      let users = await userModel.find();
      resp.json({ message: "success ", result: users });
    } catch (err) {
      resp.json({ message: "Failed in getting users" });
    }
  });
  app.post("/getuser", async (req, resp) => {
    try {
      const { u_id } = req.body;
      let user = await userModel.findOne({ _id: u_id });
      resp.json({ message: "success", result: user });
    } catch (err) {
      resp.json({ message: "failed" });
    }
  });
  app.get("/signout", async (req, resp) => {
    await req.session.destroy();
    resp.json({ message: "bye" });
  });
}
module.exports = usersAPI;
