const courseTypeManager = require("../database/managers/coursetype");
const sequelize = require("../database/models/index").sequelize;
let funcs = {};

funcs.getCourseTypes = async () => {
  try {
    const courseTypes = await courseTypeManager.getCourseTypes();

    return { courseTypes };
  } catch (error) {
    throw error;
  }
};

module.exports = funcs;
