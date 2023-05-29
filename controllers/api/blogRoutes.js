const router = require("express").Router();
const { Blog } = require("../../models");

// delter post id
router.delete("/:id", async (req, res) => {
  try {
    // find the blog by it's id
    let findId = await Blog.findByPk(req.params.id);
    if (!findId) {
      res
        .status(404)
        .json({ message: "There is no product in the id you sent" });
    }

    // delete the blog at the given id
    let blogs = await Blog.destroy({ where: { id: req.params.id } });
    // send json
    res.status(200).json(blogs);
  } catch (error) {
    res.status(400).json(error);
  }
});

// post /
router.post("/", async (req, res) => {
  try {
    // if the request is empty send error and return
    if (!req.body) {
      res.status(404).json({ message: "The json you have sent is empty" });
      return;
    }

    // create the new blog based on the request and return json
    const newBlog = await Blog.create(req.body);
    res.status(200).json(newBlog);
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;
