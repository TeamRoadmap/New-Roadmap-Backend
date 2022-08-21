const router = require("express").Router();
const auth = require("./auth");
const course = require("./course");
const coursetype = require("./coursetype");
const section = require("./section");
const subsection = require("./subsection");

router.use("/auth", auth);
router.use("/course", course);
router.use("/coursetype", coursetype);
router.use("/section", section);
router.use("/subsection", subsection);

module.exports = router;
