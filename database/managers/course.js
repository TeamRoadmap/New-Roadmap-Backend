const { courses, user_enrolled_courses, users } = require('../models');

let funcs = {};

funcs.createCourse = ({ model }, transaction = null) => {
    return courses.create(model, { transaction });
};

funcs.getCourse = ({ query }) => {
    return courses.findOne({
        where: query
    });
}

funcs.getSingleCourse = ({ query, attributes }) => {
    return courses.findOne({
        where: query,
        attributes
    })
}

funcs.getCourses = ({ query, attributes }) => {
    return courses.findAll({
        where: query,
        attributes
    });
}

funcs.updateCourse = ({ model, query }) => {
    return courses.update(model, {
        where: query,
        returning: true,
    });
}

funcs.deleteCourse =  ({ query }) => {
    return courses.destroy({
        where: query
    });
};

funcs.createEnrollment = ({ model }, transaction) => {
    return  user_enrolled_courses.create(model, { transaction });
};

// TODO associations
// funcs.getEnrollments = ({ query }) => {
//     return user_enrolled_courses.findAll({
//         where: query,
//         include: [
//             {
//                 model: users,
//                 attributes: ['name', 'picture']
//             }
//         ]
//     })
// }

module.exports = funcs;