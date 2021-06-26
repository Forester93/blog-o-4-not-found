const Entry = require("./Entry");
const Account = require("./Account");
const Comment = require("./Comment");

// // Account has ...

Account.hasMany(Entry, { foreignKey: "account_id", onDelete: "cascade" });
Account.hasMany(Comment, { foreignKey: "account_id", onDelete: "cascade" });

Entry.hasMany(Comment, { foreignKey: "entry_id", onDelete: "cascade" });

Entry.belongsTo(Account, { foreignKey: "account_id" });
Comment.belongsTo(Account, { foreignKey: "account_id" });
Comment.belongsTo(Entry, { foreignKey: "entry_id" });

module.exports = {
  Entry,
  Account,
  Comment,
};
