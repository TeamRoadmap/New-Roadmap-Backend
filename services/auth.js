const authManager = require("../database/managers/auth");
const sequelize = require('../database/models/index').sequelize;

let funcs = {};

funcs.createUser = async ({ name, email, picture, role }) => {
  if (await authManager.findUser({ query: { email } })) {
    throw {
      message: `User with email ${email} already exists.`,
      status: 409,
    };
  }

  const transaction = await sequelize.transaction();

  try {
    const user = await authManager.createUser(
      {
        model: {
          name,
          email,
          picture,
          role,
        },
      },
      transaction
    );
    if (transaction) {
      await transaction.commit();
    }

    return { user };
  } catch (e) {
    if (transaction) {
      await transaction.rollback();
    }
    throw e;
  }
};

funcs.getUserByEmail = async (email) => {
  const user = await authManager.findUser({ query: { email } });
  if (!user) {
    throw {
      message: `User with ${email} does not exist`,
      status: 401,
    };
  }

  return { user };
};

module.exports = funcs;
