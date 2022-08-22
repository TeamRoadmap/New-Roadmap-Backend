const userManager = require("../database/managers/user");
const sequelize = require("../database/models/index").sequelize;
const { Op } = require("sequelize");

let funcs = {};

funcs.fetchEnrollments = async ({ user_id }) => {
  try {
    const enrollments = await userManager.getEnrollments({
      query: { user_id },
    });
    return { enrollments };
  } catch (error) {
    throw error;
  }
};

funcs.fetchBookmarks = async ({ user_id }) => {
  try {
    const bookmarks = await userManager.getBookmarks({
      query: { user_id },
    });
    return { bookmarks };
  } catch (error) {
    throw error;
  }
};

module.exports = funcs;
