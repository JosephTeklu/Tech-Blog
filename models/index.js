const User = require("./user");
const Comments = require("./comments");
const Blog = require("./blog");

User.hasMany(Blog, {
  foreignKey: "author_id",
  onDelete: "SET NULL",
});

User.hasMany(Comments, {
  foreignKey: "author_id",
  onDelete: "SET NULL",
});

Blog.belongsTo(User, {
  foreignKey: "author_id",
});

Blog.hasMany(Comments, {
  foreignKey: "blog_id",
  onDelete: "SET NULL",
});

Comments.belongsTo(User, {
  foreignKey: "author_id",
});

Comments.belongsTo(Blog, {
  foreignKey: "blog_id",
});

module.exports = { User, Comments, Blog };
