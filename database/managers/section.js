const { sections } = require("../models");

let funcs = {};

funcs.createSection = ({ model }, transaction = null) => {
  return sections.create(model, { transaction });
};

funcs.getSection = ({ query, attributes }) => {
  return sections.findOne({
    where: query,
    attributes,
  });
};

funcs.getSections = ({ query, attributes }) => {
  return sections.findAll({
    where: query,
    attributes,
  });
};

funcs.updateSection = ({ model, query }) => {
  return sections.update(model, {
    where: query,
    returning: true,
  });
};

funcs.deleteSection = ({ query }) => {
  return sections.destroy({
    where: query,
  });
};

module.exports = funcs;
