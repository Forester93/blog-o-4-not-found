const router = require("express").Router();
const accountRoutes = require("./accountRoutes");
const userRoutes = require("./userRoutes");

router.use("/accounts", accountRoutes);

router.use("/users", userRoutes);

module.exports = router;
