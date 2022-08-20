const admin = require("../firebase/config");
const authManager = require("../database/managers/auth");

exports.isAuthorized = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.replace("Bearer ", "");

    const decodedToken = await admin.auth().verifyIdToken(token);

    if (decodedToken) {
      const user = await authManager.findUser({
        query: { email: decodedToken.email },
      });

      console.log(user);
      req.user = user;
      return next();
    }

    return res.status(401).json({ success: false, message: "Unauthorized" });
  } catch (err) {
    console.log(err);
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }
};
