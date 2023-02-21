const mongoose = require("mongoose");

const ticketSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref:'User'
    },
    product: {
      type: "string",
      required: [true, "Please Select a Product"],
      enum:["iPhone","Macbook Pro","iMac","iPad"]
    },
    description: {
      type: "string",
      required: [true, "please enter the description"],
    },
    status: {
      type: String,
      required: true,
      enum:['new','old','closed'],
      default:'new'
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Ticket", ticketSchema);
