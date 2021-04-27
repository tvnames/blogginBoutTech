const router = require("express").Router();
const homeRoutes = require("./homeRoutes");
const projectRoutes = require("./projectRoutes");
const userRoutes = require("./userRoutes");

router.use("/travellers", homeRoutes);
router.use("/projects", projectRoutes);
router.use("/User", userRoutes);

module.exports = router;
