const app = require("./app");
const models = require("./database/models");

const { PORT } = process.env;

models.sequelize
  .sync({
    alter: false,
    drop: false,
  })
  .then(() => {
    app.listen(PORT, function () {
      console.log("Express server listening on port " + PORT);
    });
  })
  .catch((err) => console.log(err));
