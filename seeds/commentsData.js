const { Comments } = require("../models");

const seedData = [
  {
    body: "first comment",
    author_id: 1,
    blog_id: 1,
  },
  {
    body: "second comment",
    author_id: 2,
    blog_id: 2,
  },
  {
    body: "third comment",
    author_id: 3,
    blog_id: 3,
  },
  {
    body: "forth comment",
    author_id: 4,
    blog_id: 4,
  },
];

const seedComments = async () =>
  await Comments.bulkCreate(seedData, {
    individualHooks: true,
    returning: true,
  });
module.exports = seedComments;
