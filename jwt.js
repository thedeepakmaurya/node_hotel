const jwt = require("jsonwebtoken");

const jwtAuthMiddleware = (req, res, next) => {

  // first check the request headers has authorization or not 
  const authorization = req.headers.authorization
  if(!authorization) return res.status(401).json({error: 'Token not found'});

  const token = req.headers.authorization.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    console.log(err);
    res.status(403).json({ error: "Invalid token" });
  }
};

// FUNCTION TO GENERTATE JWT TOKEN
const generateToken = (userData) => {
  // generate a new JWT token using user data
   return jwt.sign(userData, process.env.JWT_SECRET, {expiresIn: 30});

}


module.exports = {jwtAuthMiddleware, generateToken};
