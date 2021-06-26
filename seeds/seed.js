const sequelize = require("../config/connection");
const { Account, Entry, Comment } = require("../models");

const accountData = require("./accountData.json");
const entryData = require("./entryData.json");
const commentData = require("./commentData.json");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });
  await Account.bulkCreate(accountData, {
    individualHooks: true,
    returning: true,
  });

  await Entry.bulkCreate(entryData, {
    individualHooks: true,
    returning: true,
  });

  await Comment.bulkCreate(commentData, {
    individualHooks: true,
    returning: true,
  });
  process.exit(0);
};

seedDatabase();
