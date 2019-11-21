const express = require("express");
const router = express.Router();
let User = require("../models/user");
const jwt = require("jsonwebtoken");
const constants = require("../utils/constants");

let createToken = user =>
  jwt.sign({ userId: user._id }, constants.signature, { expiresIn: "7d" });

exports.login = function(req, res, next) {
  User.findOne({ username: req.body.username }).exec(function(error, user) {    
    if (error) {
      return next(error);
    } else {
      if (user === null) {
        let err = new Error("Not authorized! Go back!");
        err.status = 400;
        return next(err);
      } else {
        const { password, username } = user;
        let token = createToken(user);
        if (password === req.body.password && username === "brandon.liu") {
          res.json({
            status: 200,
            success: true,
            currentAuthority: "admin",
            userName: username,
            token,
            message: "Success"
          });
        } else if (password === req.body.password) {
          res.json({
            status: 200,
            success: true,
            currentAuthority: "user",
            userName: username,
            token,
            message: "Success"
          });
        } else {
          res.json({
            status: 400,
            success: false,
            currentAuthority: "failed",
            message: "Failed"
          });
        }
        return;
      }
    }
  });
}