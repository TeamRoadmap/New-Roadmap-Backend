const authServices = require("../services/auth");
let funcs = {};

funcs.login = (req, res) => {
  const user = req.user;

  if (!user) {
    return res.status(400).json({ success: false, message: "User not found" });
  }

  return res.status(200).json({
    success: true,
    data: user,
  });
};

funcs.signup = async (req, res) => {
  try {
    const user = await authServices.createUser(req.body);

    return res.status(200).json({
      success: true,
      message: "User created successfully.",
      data: user.user,
    });
  } catch (e) {
    console.log(e)
    return res
      .status(400)
      .json({ success: false, message: "User creation unsuccessful" });
  }
};

module.exports = funcs;
