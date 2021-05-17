const jwt = require("jsonwebtoken")
module.exports = async (req, res, next) => {
  //next();
  
  try{
    const token = req.cookies.token
    if (!token) {
      return res.status(401).json({
        message: "token required",
      })
    }
    
    jwt.verify(token, process.env.JWT_SECRET || "sshh", (err, decoded) => {
      if (err.name == 'TokenExpiredError') {
        return res.status(401).json({
          message: "token invalid",
        })
      } 

      // make the token's payload available to other middleware functions
      req.token = decoded

      next()
    })
  }catch(err){
    next(err)
  }
  /*
    IMPLEMENT

    1- On valid token in the Authorization header, call next.

    2- On missing token in the Authorization header,
      the response body should include a string exactly as follows: "token required".

    3- On invalid or expired token in the Authorization header,
      the response body should include a string exactly as follows: "token invalid".
  */
};
