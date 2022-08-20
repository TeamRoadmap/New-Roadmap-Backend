const router = require("express").Router();
const authController = require("../controllers/auth");
const { isAuthorized } = require("../middlewares/auth");
const { validate } = require("../middlewares/validator");

router.route("/login").get(isAuthorized, authController.login);

router.route("/signup").post(validate, authController.signup);

module.exports = router;
