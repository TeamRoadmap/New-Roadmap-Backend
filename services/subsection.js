const subsectionManager = require("../database/managers/subsection");
const sequelize = require("../database/models/index").sequelize;

let funcs = {};

funcs.createSubsection = async ({
  title,
  description,
  content,
  order,
  section_id,
}) => {
  const transaction = await sequelize.transaction();

  try {
    const subsection = await subsectionManager.createSubsection(
      {
        model: {
          title,
          description,
          content,
          order,
          section_id,
        },
      },
      transaction
    );

    if (transaction) {
      await transaction.commit();
    }

    return { subsection };
  } catch (error) {
    if (transaction) {
      await transaction.rollback();
    }
    throw error;
  }
};

funcs.fetchSubection = async ({ id }) => {
  try {
    if (id) {
      const subsection = await subsectionManager.getSubsection({
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
      return { subsection };
    }

    return {};
  } catch (error) {
    throw error;
  }
};

funcs.fetchSubectionTitles = async ({ course_id }) => {
  try {
    if (course_id) {
      const sections = await subsectionManager.getSubsections({
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

funcs.updateSubection = async ({ id, title, description, content, order }) => {
  const transaction = await sequelize.transaction();
  try {
    const subsection = await subsectionManager.updateSubsection(
      {
        model: { title, description, content, order },
        query: { public_id: id },
      },
      transaction
    );

    if (transaction) {
      await transaction.commit();
    }
    return { subsection: subsection[1][0] }; // send updated course
  } catch (error) {
    if (transaction) {
      await transaction.rollback();
    }
    throw error;
  }
};

funcs.deleteSubsection = async ({ id }) => {
  const transaction = await sequelize.transaction();
  try {
    const subsection = await subsectionManager.deleteSubsection(
      {
        query: { public_id: id },
      },
      transaction
    );
    return { subsection };
  } catch (error) {
    if (transaction) {
      await transaction.rollback();
    }
    throw error;
  }
};

module.exports = funcs;
