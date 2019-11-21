const express = require("express");
const router = express.Router();
const User = require("../models/user");

//POST route for updating data
exports.signup = function(req, res, next) {
  // confirm that user typed same password twice
  if (req.body.password !== req.body.passwordConf) {
    let err = new Error("Passwords do not match.");
    err.status = 400;
    res.send("passwords dont match");
    return next(err);
  }

  if (
    req.body.email &&
    req.body.username &&
    req.body.password &&
    req.body.passwordConf
  ) {
    let userData = {
      email: req.body.email,
      username: req.body.username,
      password: req.body.password
    };

    User.create(userData, function(error, user) {
      if (error) {
        return next(error);
      } else {
        res.json({
          status: 200,
          success: true,
          message: "Success"
        });
        return;
      }
    });
  } else {
    let err = new Error("All fields required.");
    err.status = 400;
    return next(err);
  }
}
