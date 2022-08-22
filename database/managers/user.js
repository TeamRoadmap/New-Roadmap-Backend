const {
  courses,
  user_enrolled_courses,
  user_bookmarked_courses,
  users,
} = require("../models");

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

funcs.getEnrollments = ({ query }) => {
  return user_enrolled_courses.findAll({
    where: query,
    attributes: [],
    include: [
      {
        model: courses,
        attributes: ["id", "public_id", "title", "description"],
      },
    ],
  });
};

funcs.getBookmarks = ({ query }) => {
  return user_bookmarked_courses.findAll({
    where: query,
    attributes: [],
    include: [
      {
        model: courses,
        attributes: ["id", "public_id", "title", "description"],
      },
    ],
  });
};

module.exports = funcs;
