const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: { type: String, require: true },
  password: { type: String, require: true },
});

const UserModel = mongoose.model("user", UserSchema);

module.exports = UserModel;
