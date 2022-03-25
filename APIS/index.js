module.exports = function (app) {
  require("./emp.api")(app);
  require("./dep.api")(app);
  require("./user.api")(app);
};
