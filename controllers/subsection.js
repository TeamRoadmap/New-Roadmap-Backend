const subsectionServices = require("../services/subsection");
let funcs = {};

funcs.createSubsection = async (req, res) => {
  const { title, description, content, order, section_id } = req.body;

  try {
    const user = req.user;

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }

    const course = await subsectionServices.createSubsection({
      title,
      description,
      content,
      order,
      section_id,
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

funcs.fetchSubsection = async (req, res) => {
  const { id } = req.params;

  try {
    const subsection = await subsectionServices.fetchSubection({ id });
    return res.status(200).json({
      success: true,
      message: "Section fetched successfully.",
      data: subsection,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ success: false, message: "Fetching section unsuccessful" });
  }
};

funcs.updateSubection = async (req, res) => {
  const { id = "" } = req.params;
  const { title, description, content, order } = req.body;

  try {
    const user = req.user;

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }

    const course = await subsectionServices.updateSubection({
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

funcs.deleteSubsection = async (req, res) => {
  const { id = "" } = req.params;
  try {
    const user = req.user;

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }

    const course = await subsectionServices.deleteSubsection({
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
