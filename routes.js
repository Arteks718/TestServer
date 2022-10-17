User = require("./models/UserModels");

module.exports = function (app) {
  app.get("/", (req, res) => {
    User.find((err, users) => {
      if (err) res.send(err);

      res.json(users);
    });
  });

  app.post("/", (req, res) => {
    res.send(users);
  });
};
