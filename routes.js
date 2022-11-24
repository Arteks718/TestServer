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
  app.get('/user/find-one-letter/:letter', userController.getNameByFirstLetter);
  app.get("/user/user-by-age/:from/:to", userController.getUsersByAge);
  app.get('/user/heighest/', userController.getOneHeighest);
  app.get("/heights", userController.getHeightsUser);
  app.get("/highest-gender", userController.getHeghestGender);
  app.post("/user", userController.addUser);

  app.delete("/user/:userId", userController.removeUser);
  app.delete("/user/remove-empty-document", userController.removeEmptyDocument);
  app.delete("/remove-empty-name-or-age", userController.removeNameOrAge);

  app.put("/user/:userId", userController.updateUser);
  app.put("/add-height", userController.addFildHeight);
};