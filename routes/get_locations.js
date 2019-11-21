const express = require("express");
const router = express.Router();
let Location = require("../models/location");

//POST route for updating data
exports.get_locations = function(req, res, next) {
  // confirm that user typed same password twice
  Location.find({}).exec((err, result) => {
    if (err) {
        return next(err);
    } else {
        if (result === null) {
            let err = new Error("No result!");
            err.status = 400;
            return next(err);
        } else {
            res.json({
                status: 200,
                data: result,
                success: true,
                message: "Success"
            });
        }
        return; 
    }
  }); 
}
