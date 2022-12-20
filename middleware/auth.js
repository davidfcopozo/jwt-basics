const jwt = require("jsonwebtoken");
const { UnauthenticatedError } = require("../errors");

const authenticationMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnauthenticatedError("No token provided");
  }

  //Here we store just the token without the 'Bearer'
  const token = authHeader.split(" ")[1];

  try {
    //we decode the token and get the payload amd options information by using the .verify(token, secret key) method
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    //destructure id and username from the decoded information
    const { id, username } = decoded;

    //create a req.user property and add the id and username to it
    req.user = { id, username };

    next();
  } catch (error) {
    throw new UnauthenticatedError("Not authorized to access this route");
  }
};

module.exports = authenticationMiddleware;
