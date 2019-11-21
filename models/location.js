let mongoose = require("mongoose");
let bcrypt = require("bcrypt");

let LocationSchema = new mongoose.Schema({
  location: {
    type: String,
    unique: true,
    required: true,
    trim: true
  }
});

//authenticate input against database
// LocationSchema.statics.authenticate = function(token, callback) {
//   Location.find().exec(() => {

//   });
// };

let Location = mongoose.model("Location", LocationSchema);
module.exports = Location;
