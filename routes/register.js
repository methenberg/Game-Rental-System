const express = require("express");
const router = express.Router();
const data = require("../data");
const xss = require("xss");
const userdata = data.users;

router.get("/", async (req, res) => {
  res.render("pages/register");
});

router.post("/", async (req, res) => {
  let newUser = JSON.parse(JSON.stringify(req.body));

  if (!req.body) {
    res.status(400).json({ error: "You must provide body" });
    return;
  }
  if (!newUser.email) {
    res.status(400).json({ error: "You must provide email" });
    return;
  }
  if (newUser.password.length < 8) {
    res.status(400).json({ error: "You password must has at last 8 digits" });
    return;
  }
  if (!newUser.firstname) {
    res.status(400).json({ error: "You must provide first name" });
    return;
  }
  if (!newUser.lastname) {
    res.status(400).json({ error: "You must provide last name" });
    return;
  }
  if (!newUser.address) {
    res.status(400).json({ error: "You must provide address" });
    return;
  }
  if (!newUser.city) {
    res.status(400).json({ error: "You must provide city" });
    return;
  }
  if (!newUser.country) {
    res.status(400).json({ error: "You must provide country" });
    return;
  }
  if (!newUser.state) {
    res.status(400).json({ error: "You must provide state" });
    return;
  }
  if (!newUser.zip) {
    res.status(400).json({ error: "You must provide zip" });
    return;
  }

  try {
    // Always converts the email to lowercase
    newUser.email = newUser.email.toLowerCase();
    if (await userdata.checkuserByEmail(newUser.email)) {
      await userdata.addUser(
        xss(newUser.email),
        xss(newUser.password),
        xss(newUser.firstname),
        xss(newUser.lastname),
        xss(newUser.profilePicture),
        xss(newUser.address),
        xss(newUser.city),
        xss(newUser.state),
        xss(newUser.country),
        xss(newUser.zip)
      );
      req.session.user = await userdata.getUserByEmail(newUser.email);
      res.cookie("name", "auth_cookie");
      res.redirect("/private");
    } else {
      res.json({ message: "user already exist." });
    }
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

module.exports = router;
