const router = require("express").Router();
const auth = require("./auth");
const course = require("./course");
const coursetype = require("./coursetype");

router.use("/auth", auth);
router.use("/course", course);
router.use("/coursetype", coursetype);

module.exports = router;
