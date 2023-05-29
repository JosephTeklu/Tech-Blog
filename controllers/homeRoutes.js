const router = require("express").Router();
const { Blog, User, Comments } = require("../models");
const withAuth = require("../utils/auth");

// localhost:3001

// gets all blogs %
router.get("/", async (req, res) => {
  try {
    // grab all blogs from database including the comments
    const blogData = await Blog.findAll({ include: Comments });

    // Serialize data so the template can read it
    const Blogs = blogData.map((blog) => blog.get({ plain: true }));

    // Pass serialized data and session flag into template
    // res.render("homepage", {
    //   projects,
    //   logged_in: req.session.logged_in,
    // });
    res.status(200).json(Blogs);
  } catch (err) {
    res.status(500).json(err);
  }
});

// gets blog by id including the comments %
router.get("/blog/:id", async (req, res) => {
  try {
    const blogData = await Blog.findByPk(req.params.id, {
      include: [Comments],
    });
    const blog = blogData.get({ plain: true });
    res.status(200).json(blog);

    // res.render("project", {
    //   ...project,
    //   logged_in: req.session.logged_in,
    // });
  } catch (err) {
    res.status(500).json(err);
  }
});

// shows logged in profile %
router.get("/profile", withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
      include: [{ model: Blog }],
    });

    const user = userData.get({ plain: true });

    // res.render("profile", {
    //   ...user,
    //   logged_in: true,
    // });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

// checks if the user is logged in if so redirects to profile %
router.get("/login", (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect("/profile");
    return;
  }

  // res.render("login");
  res.status(200).json(req.body);
});

module.exports = router;
