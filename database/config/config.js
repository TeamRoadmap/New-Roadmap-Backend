const {DB, DB_PASSWORD, DB_HOST, DB_PORT, DB_USER } = process.env;

const config = {
  database: DB,
  username: DB_USER,
  password: DB_PASSWORD,
  host: DB_HOST,
  port: DB_PORT,
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
};

module.exports = config;
