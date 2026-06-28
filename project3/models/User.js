const mongoose = require("mongoose")

const userSchema = new mongoose.Schema(
  {
    first: {
      type: String,
    },
    last: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    picture: {
      type: String,
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model("User", userSchema)
