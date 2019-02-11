const jwt = require('jsonwebtoken');


module.exports = {
  validateToken: (req, res, next) => {
    const authorizationHeaader = req.headers.authorization;
    let result;
    if (authorizationHeaader) {
      const token = req.headers.authorization.split(' ')[1]; // Bearer <token>
      const options = {
        expiresIn: '2d',
        issuer: 'https://scotch.io'
      };
      try {
        result = jwt.verify(token, process.env.JWT_SECRET, options);
        req.decoded = result;
        next();
      } catch (err) {
        console.log
        result = { 
          error: `Authentication error. Token expired.`,
          status: 401 
        };
        res.status(401).send(result);
      }
    } else {
      result = { 
        error: `Authentication error. Token required.`,
        status: 401 
      };
      res.status(401).send(result);
    }
  }
};