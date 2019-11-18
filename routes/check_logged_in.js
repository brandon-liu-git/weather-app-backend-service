const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const constants = require("../utils/constants");

router.get("/check_logged_in", function(req, res, next) {
  let header = req.query || "";
  if (req.query.type === "Bearer") {
    let payload = jwt.verify(req.query.token, constants.signature);
    User.findOne({ _id: payload.userId }).exec(function(error, user) {
      if (error) {
        return next(error);
      } else {
        if (user === null) {
          res.json({
            code: 400,
            status: "failed",
            message: "Logged Out"
          });
        } else {
          res.json({
            code: 200,
            status: "success",
            currentAuthority: "admin",
            message: "Logged In"
          });
        }
      }
      return;
    });
  }
});
module.exports = router;
