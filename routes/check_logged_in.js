const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const constants = require("../utils/constants");

exports.check_logged_in = function(req, res, next) {
  let header = req.body || "";
  if (req.body.type === "Bearer") {    
    let payload = jwt.verify(req.query.token, constants.signature);
    User.findOne({ _id: payload.userId }).exec(function(error, user) {
      if (error) {
        return next(error);
      } else {
        if (user === null) {
          res.json({
            status: 400,
            success: false,
            message: "Logged Out"
          });
        } else {
          res.json({
            status: 200,
            success: true,
            currentAuthority: "admin",
            message: "Logged In"
          });
        }
      }
      return;
    });
  }
}
