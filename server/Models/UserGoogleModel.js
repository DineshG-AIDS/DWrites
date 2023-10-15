const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserGoogle = new Schema(
  {
    username: {
      type: String,
    },
    email: {
      type: String,
    },
    profile: {
      type: String,
    },
  },
  {
    timestamp: true,
  }
);
const UserGoogleModal = mongoose.model("UserGoogle", UserGoogle);
module.exports = UserGoogleModal;
