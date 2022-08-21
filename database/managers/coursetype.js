const { course_types } = require("../models");
let funcs = {};

funcs.getCourseTypes = () => {
  return course_types.findAll();
};

module.exports = funcs;
