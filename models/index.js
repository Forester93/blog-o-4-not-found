const Entry = require("./Entry");
const Account = require("./Account");

// // Account has ...

Account.hasMany(Entry, { foreignKey: "account_id", onDelete: "cascade" });
Entry.belongsTo(Account, { foreignKey: "account_id" });

module.exports = {
  Entry,
  Account,
};
