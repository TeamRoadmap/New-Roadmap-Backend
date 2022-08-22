const { Router } = require("express");
const sectionController = require("../controllers/section");
const { isAuthorized } = require("../middlewares/auth");

const router = Router();

router.post("/", isAuthorized, sectionController.createSection);

router.get("/:id", isAuthorized, sectionController.fetchSection);

router.patch("/:id", isAuthorized, sectionController.updateSection);

router.delete("/:id", isAuthorized, sectionController.deleteSection);

module.exports = router;
