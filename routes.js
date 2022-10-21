const User = require("./models/UserModels"),
  userController = require("./controllers/UserController.js");

module.exports = function (app) {
  app.get("/user", userController.getListOfUsers);
  app.get("/user/:name", userController.getUsersByName);
  app.post("/user", userController.addUser);
};
