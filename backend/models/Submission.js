const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const submissionsSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    requestType: {
      type: String,
      required: true,
      enum: ["Credit Card", "Loan", "New Account", "New Checkbook"],
    },
    details: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Submission", submissionsSchema);
