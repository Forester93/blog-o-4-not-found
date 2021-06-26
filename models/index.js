const Entry = require("./Entry");
const Account = require("./Account");

// // Account has ...

Account.hasMany(Entry, { onDelete: "cascade" });
Entry.belongsTo(Account, { foreignKey: "account_id" });

module.exports = {
  Entry,
  Account,
};
