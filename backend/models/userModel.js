const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: "string",
      required: [true, "required name"],
    },
    email: {
      type: "string",
      required: [true, "required email"],
      unique: true,
    },
    password: {
      type: "string",
      required: [true, "required password"],
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
