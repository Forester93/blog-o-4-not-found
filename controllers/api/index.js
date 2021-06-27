const router = require("express").Router();
const accountRoutes = require("./accountRoutes");
const entryRoutes = require("./entryRoutes");
const commentRoutes = require("./commentRoutes");

router.use("/accounts", accountRoutes);

router.use("/entries", entryRoutes);

router.use("/comments", commentRoutes);

module.exports = router;
