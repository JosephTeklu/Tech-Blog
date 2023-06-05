const router = require("express").Router();
const blogRoutes = require("./blogRoutes");
const userRoutes = require("./userRoutes");
const commentRoutes = require("./commentRoutes");

router.use("/user", userRoutes);
router.use("/blog", blogRoutes);
router.use("/commnet", commentRoutes);

module.exports = router;
