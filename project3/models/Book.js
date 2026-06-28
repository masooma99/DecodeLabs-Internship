const mongoose = require("mongoose")

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    author: {
      type: String,
    },
    details: {
      type: String,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model("Book", bookSchema)
