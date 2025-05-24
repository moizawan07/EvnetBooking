const adminModel = require("../models/admin");

const adminLogin = async (req, res) => {
  let { email, password } = req.body;

  try {
    let user = await adminModel.findOne({ email });
    if (!user) return res.status(400).json({ message: "invalid email" });

    let passCorreect = password === user.password;
    if (!passCorreect) return res.status(400).json({ message: "invalid password" });

    res.status(200).json({ message: "login successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = adminLogin;
