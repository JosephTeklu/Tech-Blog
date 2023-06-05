const router = require("express").Router();
const { User } = require("../../models");
// api/user

// create new user %
router.post("/", async (req, res) => {
  try {
    // create new user with body
    const userData = await User.create(req.body);
    // save the user's session id
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// user logs in
router.post("/login", async (req, res) => {
  try {
    // find the user whose email matches the one from the request
    const userData = await User.findOne({ where: { email: req.body.email } });
    // if the email does not exist send error message and return
    if (!userData) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }

    // if the given email checks out, not check the password for validation
    const validPassword = await userData.checkPassword(req.body.password);
    // if the password is falsy send error message and return
    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }

    // log in the user, save their session id, and send message
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      res.json({ user: userData, message: "You are now logged in!" });
    });
  } catch (error) {
    res.status(400).json(error);
  }
});

// destroy the session to logout user %
router.post("/logout", (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

// checks if the user is logged in
router.get("/logincheck", (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    return true;
  }
  return false;
});

module.exports = router;
