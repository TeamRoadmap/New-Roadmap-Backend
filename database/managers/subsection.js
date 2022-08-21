const { sub_sections } = require("../models");

let funcs = {};

funcs.createSubsection = ({ model }, transaction = null) => {
  return sub_sections.create(model, { transaction });
};

funcs.getSubsection = ({ query, attributes }) => {
  return sub_sections.findOne({
    where: query,
    attributes,
  });
};

funcs.getSubsections = ({ query, attributes }) => {
  return sub_sections.findAll({
    where: query,
    attributes,
  });
};

funcs.updateSubsection = ({ model, query }) => {
  return sub_sections.update(model, {
    where: query,
    returning: true,
  });
};

funcs.deleteSubsection = ({ query }) => {
  return sub_sections.destroy({
    where: query,
  });
};

module.exports = funcs;
