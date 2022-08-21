const { Router } = require("express");
const subsectionController = require("../controllers/subsection");
const { isAuthorized } = require("../middlewares/auth");

const router = Router();

router.post("/", isAuthorized, subsectionController.createSubsection);

router.get("/:id", isAuthorized, subsectionController.fetchSubsection);

router.patch("/:id", isAuthorized, subsectionController.updateSubection);

router.delete("/:id", isAuthorized, subsectionController.deleteSubsection);

module.exports = router;
