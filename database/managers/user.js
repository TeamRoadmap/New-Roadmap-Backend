const {
  courses,
  user_enrolled_courses,
  user_bookmarked_courses,
  users,
} = require("../models");

user_bookmarked_courses.belongsTo(courses, {
  foreignKey: "course_id",
  targetKey: "id",
});
user_bookmarked_courses.belongsTo(users, {
  foreignKey: "user_id",
  targetKey: "id",
});

let funcs = {};

funcs.getUser = ({ query }) => {
  return users.findOne({
    where: query,
  });
};

funcs.getSingleUser = ({ query, attributes }) => {
  return users.findOne({
    where: query,
    attributes,
  });
};

funcs.updateUser = ({ model, query }) => {
  return users.update(model, {
    where: query,
    returning: true,
  });
};

module.exports = funcs;
