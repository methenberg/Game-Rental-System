const registerRoute = require("./register");
const loginRoute = require("./login");
const privateRoute = require("./private");
const logoutRoute = require("./logout");
const userDeleteRoute = require("./userDeleteRoute");
const userUpdateRoute = require("./userUpdateRoute");
const gameRoutes = require("./gameRoutes");
const commentRoutes = require("./commentRoutes");

const constructorMethod = (app) => {
  app.get("/", function (req, res) {
    res.render("pages/index");
  });
  app.use("/register", registerRoute);
  app.use("/login", loginRoute);
  app.use("/logout", logoutRoute);
  app.use("/private", privateRoute);
  app.use("/userDelete", userDeleteRoute);
  app.use("/userUpdate", userUpdateRoute);
  app.use("/games", gameRoutes);
  app.use("/comment", commentRoutes);
  app.get("/getSession", async (req, res) => {
    if (req.session.user) {
      res.json({ result: true, name: req.session.user.email });
      return;
    }
    res.json({ result: false });
    return;
  });
};

module.exports = constructorMethod;
