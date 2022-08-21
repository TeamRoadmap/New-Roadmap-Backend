const { Router } = require("express");
const courseTypeController = require("../controllers/coursetype");
const { isAuthorized } = require("../middlewares/auth");

const router = Router();

router.get("/", isAuthorized, courseTypeController.getCourseTypes);

module.exports = router;
