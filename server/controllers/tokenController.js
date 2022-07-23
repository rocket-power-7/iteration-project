const jwt = require('jsonwebtoken');
const jwtDecode = require('jwt-decode');

const tokenController = {};

tokenController.createToken = (req, res, next) => {
  // Destructure "remember me" from the request's body.
  const { rememberMe } = req.body;

  // Create a jwt signed token upon successful login
  const token = jwt.sign(
    { userData: res.locals.userData }, // User info (user_id, email, hashed password, name_first, name_last, created at)
    process.env.ACCESS_TOKEN_SECRET, // Secret for all of our tokens
    { expiresIn: rememberMe ? '30d' : '1d' } // Token expiration depends on rememberMe
  );

  // Create a cookie to be stored on the client with the token
  res.cookie('token', token);

  // Continue to next middleware function
  return next();
}

tokenController.verifyToken = (req, res, next) => {
  // Destructure the jwt token from the client's cookies
  const { token } = req.cookies;
  
  // Return unauthorized status code if they don't have a jwt token
  if (!token) return res.sendStatus(403);
  
  // Verify the token they have
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
    // Abort early when the token is invalid : otherwise continue to next middleware
    return err ? res.status(403).send('Invalid Token') : next();
  });
};

tokenController.decodeToken = (req, res, next) => {
  // Destructure the jwt token from the client's cookies
  const { token } = req.cookies;

  // Use jwt-decode to decode our token
  const { userData } = jwtDecode(token);

  // Save user data to be used by preceeding middleware functions
  res.locals.userData = userData;

  // Continue to next middleware function
  return next();
}

module.exports = tokenController;
