const { Router } = require("express");
const userController = require("../controllers/user");
const { isAuthorized } = require("../middlewares/auth");

const router = Router();

router.get("/enrollments", isAuthorized, userController.fetchEnrollments);
router.get("/bookmarks", isAuthorized, userController.fetchBookmarks);

module.exports = router;
