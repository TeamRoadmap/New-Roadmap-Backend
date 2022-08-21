const sectionManager = require("../database/managers/section");
const sequelize = require("../database/models/index").sequelize;

let funcs = {};

funcs.createSection = async ({
  title,
  description,
  content,
  order,
  course_id,
}) => {
  const transaction = await sequelize.transaction();

  try {
    const section = await sectionManager.createSection(
      {
        model: {
          title,
          description,
          content,
          order,
          course_id,
        },
      },
      transaction
    );

    if (transaction) {
      await transaction.commit();
    }

    return { section };
  } catch (error) {
    if (transaction) {
      await transaction.rollback();
    }
    throw error;
  }
};

funcs.fetchSection = async ({ id }) => {
  try {
    if (id) {
      const section = await sectionManager.getSection({
        query: { public_id: id },
        attributes: [
          "id",
          "public_id",
          "title",
          "description",
          "content",
          "order",
        ],
      });
      return { section };
    }

    return {};
  } catch (error) {
    throw error;
  }
};

funcs.fetchSectionTitles = async ({ course_id }) => {
  try {
    if (course_id) {
      const sections = await sectionManager.getSections({
        query: { course_id },
        attributes: ["id", "public_id", "title", "order"],
      });
      return { sections };
    }

    return {};
  } catch (error) {
    throw error;
  }
};

funcs.updateSection = async ({ id, title, description, content, order }) => {
  const transaction = await sequelize.transaction();
  try {
    const course = await sectionManager.updateSection(
      {
        model: { title, description, content, order },
        query: { public_id: id },
      },
      transaction
    );

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
};

funcs.deleteSection = async ({ id }) => {
  const transaction = await sequelize.transaction();
  try {
    const course = await sectionManager.deleteSection(
      {
        query: { public_id: id },
      },
      transaction
    );
    return { course };
  } catch (error) {
    if (transaction) {
      await transaction.rollback();
    }
    throw error;
  }
};

funcs.getCourse = async ({ course_id }) => {
  try {
    const course = await sectionManager.getCourse({
      query: { public_id: course_id },
    });
    return course;
  } catch (error) {
    throw error;
  }
};

module.exports = funcs;
