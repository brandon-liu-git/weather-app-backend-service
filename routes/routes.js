// 1. Include config and modules
var config = require("../utils/constants");
var moment = require("moment");
const jwt = require("jsonwebtoken");
var User = require("../models/user");
const signUpRouter = require("./signup");
const loginRouter = require("./login");
const subscrptionRouter = require("./subscription");
const checkLoggedInRouter = require("./check_logged_in");
const getLocationsRouter = require("./get_locations");
const logoutRouter = require("./logout");

// 2. Authentication Middleware
function ensureAuthenticated(req, res, next) {
  if (!req.query.token) {
    return res.status(401).send({ error: "TokenMissing" });
  }
  
  const token = req.query.token;
  let payload = null;
  try {
    payload = jwt.decode(token, config.signature);
  } catch (err) {
    return res.status(401).send({ error: "TokenInvalid" });
  }

  if (payload.exp <= moment().unix()) {
    return res.status(401).send({ error: "TokenExpired" });
  }
  // check if the user exists
  User.findById(payload.userId, function(err, user) {
    if (!user) {
      return res.status(401).send({ error: "PersonNotFound" });
    } else {
      req.user = payload.userId;
      next();
    }
  });
}

// 3. Routes
module.exports = function(app) {
  // 4. Authentication Routes
  app.post("/my_weather_app/signup", signUpRouter.signup);
  app.post("/my_weather_app/login", loginRouter.login);
  app.post("/my_weather_app/logout", logoutRouter.logout);
  app.post(
    "/my_weather_app/check_logged_in",
    checkLoggedInRouter.check_logged_in
  );

  // 5. Application Routes
  app.get(
    "/my_weather_app/subscription",
    ensureAuthenticated,
    subscrptionRouter.subscription
  );
  app.get(
    "/my_weather_app/get_locations",
    ensureAuthenticated,
    getLocationsRouter.get_locations
  );
};
