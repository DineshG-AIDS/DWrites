const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    username: {
      type: String,
    },
    email: {
      type: String,
    },
    passwordEnc: {
      type: String,

      min: 4,
    },
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model("UserData", UserSchema);

module.exports = UserModel;
