const User = require("./models/UserModels"),
  userController = require("./controllers/UserController.js");

module.exports = function (app) {
  /**
   * @swagger
   * /user:
   *   get:
   *     tags: [user]
   *     description: get all users
   *     responses:
   *       200:
   *         description: "success"
   *         schema:
   *               type: array
   *               items:
   *                 properties:
   *                   name:
   *                     type: string
   *                     example: artyom
   *                   age:
   *                     type: integer
   *                     example: 18
   */
  app.get("/user", userController.getListOfUsers);
  app.get("/user/:name", userController.getUsersByName);
  app.post("/user", userController.addUser);
  app.delete("/user/:userId", userController.removeUser);
  app.put("/user/:userId", userController.updateUser);
  app.get("/user/user-by-age/:from/:to", userController.getUsersByAge);
};
