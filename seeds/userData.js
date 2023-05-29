const { User } = require("../models");

const seedData = [
  {
    name: "Sal",
    email: "sal@hotmail.com",
    password: "password12345",
  },
  {
    name: "Lernantino",
    email: "lernantino@gmail.com",
    password: "password12345",
  },
  {
    name: "Amiko",
    email: "amiko2k20@aol.com",
    password: "password12345",
  },
  {
    name: "biz",
    email: "biz@biz.com",
    password: "password12345",
  },
];

const seedUser = async () =>
  await User.bulkCreate(seedData, {
    individualHooks: true,
    returning: true,
  });
module.exports = seedUser;
