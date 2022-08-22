const userServices = require("../services/user");
let funcs = {};

funcs.fetchEnrollments = async (req, res) => {
  const user = req.user;

  if (!user) {
    return res.status(400).json({ success: false, message: "User not found" });
  }

  try {
    const enrollments = await userServices.fetchEnrollments({
      user_id: user.id,
    });

    return res.status(200).json({
      success: true,
      message: "Fetching enrollment successfully.",
      data: enrollments,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ success: false, message: "Fetching enrollment unsuccessful" });
  }
};

funcs.fetchBookmarks = async (req, res) => {
  const user = req.user;

  try {
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }

    const enrollments = await userServices.fetchBookmarks({
      user_id: user.id,
    });

    return res.status(200).json({
      success: true,
      message: "Fetched bookmarks successfully.",
      data: enrollments,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ success: false, message: "Fetching bookmark unsuccessful" });
  }
};

module.exports = funcs;
