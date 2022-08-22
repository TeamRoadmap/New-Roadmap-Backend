const courseTypeServices = require("../services/coursetype");
let funcs = {};

funcs.getCourseTypes = async (req, res) => {
  try {
    const courseTypes = await courseTypeServices.getCourseTypes();
    return res.status(200).json({
      success: true,
      message: "Course types fetched successfully.",
      data: courseTypes,
    });
  } catch (error) {
    console.log(error)
    return res
      .status(400)
      .json({ success: false, message: "Fetching course unsuccessful" });
  }
};

module.exports = funcs;
