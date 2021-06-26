const router = require("express").Router();
const accountRoutes = require("./accountRoutes");
const entryRoutes = require("./entryRoutes");

router.use("/accounts", accountRoutes);

router.use("/entries", entryRoutes);

module.exports = router;
