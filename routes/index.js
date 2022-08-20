const router = require("express").Router();
const auth = require("./auth");
const course = require("./course");

router.use("/auth", auth);
router.use('/course', course);

module.exports = router;
