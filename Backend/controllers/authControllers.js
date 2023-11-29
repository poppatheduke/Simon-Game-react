const User = require("../model/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const handleLogin = async (req, res) => {
  const { user, pwd } = req.body;
  if (!user || !pwd)
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  const foundUser = await User.findOne({ username: user }).exec();
  if (!foundUser) return res.sendStatus(401); //unauthorized
  //evaluate password
  const match = await bcrypt.compare(pwd, foundUser.password);
  if (match) {
    //create JWT
    const accessToken = jwt.sign(
      {
        "UserInfo": {
          "username": foundUser.username,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" }
    );
    const refreshToken = jwt.sign(
      { username: foundUser.username },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    );
    //Saving refreshToken with current user
    foundUser.refreshToken= refreshToken;
    const result = await foundUser.save();
    console.log(result);

    await res.cookie("jwt", refreshToken, {
      htpOnly: true,
      sameSite: "None",
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.json({ accessToken });
  } else {
    res.sendStatus(401);
  }
};

module.exports = { handleLogin };
