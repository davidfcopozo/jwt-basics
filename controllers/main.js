//Check username, password in post(login) request
//If exist create new JWT
//Send back to the front-end

//Setup authentication so only the request with JWT can access the dashboard

require("dotenv").config();
const jwt = require("jsonwebtoken");
const { BadRequest } = require("../errors");

const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    throw new BadRequest("Please provide a username and password");
  }

  //Dummy user id
  const id = new Date().getTime();
  //sign({payload (information)}, secret/private key, options)
  //The secret key used here is a dummy one
  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  //console.log(username, password);
  res.status(200).json({ msg: "user created", token });
};

const dashboard = async (req, res) => {
  const luckyNumber = Math.floor(Math.random() * 100);

  res.status(200).json({
    msg: `Hello ${req.user.username}`,
    secret: `Here is your authorized data, your lucky number is ${luckyNumber}`,
  });
};

module.exports = {
  login,
  dashboard,
};
