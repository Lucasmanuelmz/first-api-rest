const jwt = require("jsonwebtoken");
const jwtSecret =
  "yteerefesiahafsuddthwowwy3832p2y4t4jrhffweq1p]32426aqxt#5rr04u44=pfjfbf;gn";

function checkToken(req, res, next) {
  const tokenAuth = req.headers["authorization"];

  if (tokenAuth !== "undefined") {
    const bearer = tokenAuth.split(" ");
    const token = bearer[1];
    jwt.verify(token, jwtSecret, (error, decoded) => {
      if (!error) {
        req.token = token;
        req.loggedUser = { email: decoded.email, password: decoded.password };
        next();
      } else {
        res.status(401);
      }
    });
  } else {
    res.sendStatus(403);
  }
}

module.exports = checkToken;
