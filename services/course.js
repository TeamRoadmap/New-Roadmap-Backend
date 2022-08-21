const courseManager = require('../database/managers/course');
const authManager = require('../database/managers/auth');
const sequelize = require('../database/models/index').sequelize;
const { Op } = require("sequelize");

let funcs = {};

funcs.createCourse = async ({
    title,
    description,
    types,
    icon,
    image,
    creator_id,
}) => {
    if (!(await authManager.findUser({ query: { id: creator_id } }))) {
        throw {
            message: `User does not exists`,
            status: 400,
        };
    }

    const transaction = await sequelize.transaction();

    try {
        const course = await courseManager.createCourse(
            {
                model: {
                    title,
                    description,
                    types,
                    icon,
                    image,
                    creator_id,
                },
            },
            transaction
        );

        if (transaction) {
            await transaction.commit();
        }

        return { course };
    } catch (error) {
        if (transaction) {
            await transaction.rollback();
        }
        throw error;
    }
};

funcs.fetchCourses = async ({ creatorId, course_id, type }) => {
    try {
        if (course_id) {
            const course = await courseManager.getSingleCourse({
                query: { public_id: course_id },
                attributes: [
                    "id",
                    "public_id",
                    "title",
                    "description",
                    "icon",
                    "image",
                ],
            });
            return { course };
        }

        if (creatorId) {
            const courses = await courseManager.getCourses({
                query: { creator_id: creatorId },
                attributes: ["public_id", "title", "description", "icon", "image"],
            });
            return { courses };
        }

        if (type) {
            const courses = await courseManager.getCourses({
                query: { types: { [Op.contains]: [type] } },
                attributes: ["public_id", "title", "description", "icon", "image"],
            });
            return { courses };
        }

        const courses = await courseManager.getCourses({
            query: {},
            attributes: ["public_id", "title", "description", "icon", "image"],
        });

        return { courses };
    } catch (error) {
        throw error;
    }
};

funcs.updateCourse = async ({ 
    id, 
    title, 
    description, 
    icon, 
    image,
    creator_id
 }) => {
     const transaction = await sequelize.transaction();
    try {

        const course = await courseManager.updateCourse({
            model: { title, description, icon, image },
            query: { public_id: id, creator_id }
        }, transaction);

        if (transaction) {
            await transaction.commit();
        }
        return { course: course[1][0] }; // send updated course
    } catch (error) {
        if (transaction) {
            await transaction.rollback();
        }
        throw error;  
    }

}

funcs.deleteCourse = async ({
    id,
    creator_id
}) => {
    const transaction = await sequelize.transaction();
    try {
        const course = await courseManager.deleteCourse({
            query: { public_id: id, creator_id}
        }, transaction);
        return { course };
    } catch (error) {
        if (transaction) {
            await transaction.rollback();
        }
        throw error;
    }
}

funcs.getCourse = async ({ course_id }) => {
    try {
        const course = await courseManager.getCourse({
            query: { public_id: course_id }
        });
        return course ;
    } catch (error) {
        throw error;
    }
}

funcs.enrollInCourse = async ({
    course_id,
    user_id 
}) => {
    const transaction = await sequelize.transaction();
    try {
       const enrollment = await courseManager.createEnrollment({
        model: {
            course_id,
            user_id
        }
       }, transaction);
   
       if (transaction) {
        await transaction.commit();
    }

       return { enrollment };
    } catch (error) {
        if (transaction) {
            await transaction.rollback();
        }
          throw error;
    }
}

funcs.fetchEnrollments = async ({
    course_id
}) => {
    try {
        const enrollments = await courseManager.getEnrollments({
            query: { course_id }
        });
        return { enrollments };
    } catch (error) {
        throw error;
    }
}

funcs.voteCourse = async ({
    course_id,
    user_id, 
    vote 
}) => {
    const transaction = await sequelize.transaction();
    try {
        const voteC = await courseManager.createVote({ 
            model: { 
                course_id, 
                user_id, 
                vote 
            }
        }, transaction);

        if (transaction) {
            await transaction.commit();
        }
    
        return { voteC };
    } catch (error) {
        if (transaction) {
            await transaction.rollback();
        }
        throw error;
    }

}

funcs.fetchVotes = async ({
    course_id
}) => {
    try {
       const totalVotes = await courseManager.countVotes({
        query: { course_id }
       });
       const upvotes = await courseManager.countVotes({
        query: { course_id, vote : true }
       });

        return { upvotes, downvotes: (totalVotes - upvotes) };
    } catch (error) {
        throw error;
    }
}

funcs.updateVote = async ({
    course_id,
    user_id, 
    vote 
}) => {
    const transaction = await sequelize.transaction();
    try {
        const voteObj = await courseManager.updateVote({
            model: { course_id, user_id, vote },
            query: { user_id, course_id }
        }, transaction);

        if (transaction) {
            await transaction.commit();
        }
        return { vote: voteObj[1][0] }; // send updated vote
    } catch (error) {
        if (transaction) {
            await transaction.rollback();
        }
        throw error;  
    }
}

module.exports = funcs;