const { body } = require("express-validator");
const validators = {
  post: {
    "/signup": [
      body("name").exists().withMessage("name key is missing"),
      body("email")
        .exists()
        .withMessage("email key is missing")
        .isEmail()
        .withMessage("email is invalid"),
    ],
  },
};

module.exports = validators;
