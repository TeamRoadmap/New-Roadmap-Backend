const {
  courses,
  user_enrolled_courses,
  users,
  course_votes,
} = require("../models");

user_enrolled_courses.belongsTo(courses, {
  foreignKey: "course_id",
  targetKey: "id",
});
user_enrolled_courses.belongsTo(users, {
  foreignKey: "user_id",
  targetKey: "id",
});

let funcs = {};

funcs.createCourse = ({ model }, transaction = null) => {
  return courses.create(model, { transaction });
};

funcs.getCourse = ({ query }) => {
  return courses.findOne({
    where: query,
  });
};

funcs.getSingleCourse = ({ query, attributes }) => {
  return courses.findOne({
    where: query,
    attributes,
  });
};

funcs.getCourses = ({ query, attributes }) => {
  return courses.findAll({
    where: query,
    attributes,
  });
};

funcs.updateCourse = ({ model, query }) => {
  return courses.update(model, {
    where: query,
    returning: true,
  });
};

funcs.deleteCourse = ({ query }) => {
  return courses.destroy({
    where: query,
  });
};

funcs.createEnrollment = ({ model }, transaction) => {
  return user_enrolled_courses.create(model, { transaction });
};

funcs.getEnrollments = ({ query }) => {
  return user_enrolled_courses.findAll({
    where: query,
    attributes: [],
    include: [
      {
        model: users,
        attributes: ["name", "picture"],
      },
    ],
  });
};

funcs.createVote = ({ model }, transaction) => {
  return course_votes.create(model, { transaction });
};

funcs.countVotes = ({ query }) => {
  return course_votes.count({
    where: query,
  });
};

funcs.updateVote = ({ model, query }, transaction) => {
  return course_votes.update(model, {
    where: query,
    returning: true,
  });
};

module.exports = funcs;
