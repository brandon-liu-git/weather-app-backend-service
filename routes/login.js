const express = require("express");
const router = express.Router();
var User = require("../models/user");
const jwt = require("jsonwebtoken");
const constants = require("../utils/constants");

let createToken = user =>
  jwt.sign({ userId: user._id }, constants.signature, { expiresIn: "7d" });

router.get("/login", function(req, res, next) {
  User.findOne({ username: req.query.username }).exec(function(error, user) {
    if (error) {
      return next(error);
    } else {
      if (user === null) {
        var err = new Error("Not authorized! Go back!");
        err.status = 400;
        return next(err);
      } else {
        const { password, username } = user;
        let token = createToken(user);
        if (password === req.query.password && username === "brandon.liu") {
          res.json({
            status: "ok",
            currentAuthority: "admin",
            userName: username,
            token,
            message: "Success"
          });
        } else if (password === req.query.password) {
          res.json({
            status: "ok",
            currentAuthority: "user",
            userName: username,
            token,
            message: "Success"
          });
        } else {
          res.json({
            status: "error",
            currentAuthority: "failed",
            message: "Failed"
          });
        }
        return;
      }
    }
  });
});

module.exports = router;
