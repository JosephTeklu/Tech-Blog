const router = require("express").Router();
const { Blog, User, Comments } = require("../../models");

// post a new comment
// get comments with blog id
// get comment by comment id
// delete comment by comment id

router.post("/", async (req, res) => {
  try {
    const newComment = await Comment.create({
      ...req.body,
      author_id: req.session.user_id,
      blog_id: req.session.blog_id,
    });
    res.status(200).json(newComment);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
