const sequelize = require("../config/connection");
const { User, Blog, Comments } = require("../models");

const userData = require("./userData.json");
const blogData = require("./blogData.json");
const commentsData = require("./commentsData.json");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });
  let blogArray = [];

  for (const blog of blogData) {
    await Blog.create({
      ...blog,
      //   user_id: users[Math.floor(Math.random() * users.length)].id,
      author_id: users[Math.floor(Math.random() * users.length)].id,
    });
    blogArray.push(blog);
  }

  for (const comments of commentsData) {
    await Comments.create({
      ...comments,
      author_id: users[Math.floor(Math.random() * users.length)].id,
      blog_id: blogArray[Math.floor(Math.random() * blogArray.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();
