const sectionServices = require("../services/section");
let funcs = {};

funcs.createSection = async (req, res) => {
  const { title, description, content, order, course_id } = req.body;

  try {
    const user = req.user;

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }

    const course = await sectionServices.createSection({
      title,
      description,
      content,
      order,
      course_id,
    });

    return res.status(200).json({
      success: true,
      message: "Section created successfully.",
      data: course,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ success: false, message: "Section creation unsuccessful" });
  }
};

funcs.fetchSection = async (req, res) => {
  const { id } = req.params;

  try {
    const courses = await sectionServices.fetchSection({ id });
    return res.status(200).json({
      success: true,
      message: "Section fetched successfully.",
      data: courses,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ success: false, message: "Fetching section unsuccessful" });
  }
};

funcs.updateSection = async (req, res) => {
  const { id = "" } = req.params;
  const { title, description, content, order } = req.body;

  try {
    const user = req.user;

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }

    const course = await sectionServices.updateSection({
      id,
      title,
      description,
      content,
      order,
    });

    return res.status(200).json({
      success: true,
      message: "Section updated successfully.",
      data: course,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ success: false, message: "Updating section unsuccessful" });
  }
};

funcs.deleteSection = async (req, res) => {
  const { id = "" } = req.params;
  try {
    const user = req.user;

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }

    const course = await sectionServices.deleteSection({
      id,
    });
    return res.status(200).json({
      success: true,
      message: "Section deleted successfully.",
      data: course,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ success: false, message: "Delete section unsuccessful" });
  }
};

module.exports = funcs;
