const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const validator = require("validator"); // Import the validator library

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      validate: {
        validator: (email) => validator.isEmail(email),
        message: "Please provide a valid email",
      },
    },
    address: {
      type: String,
      required: true,
    },
    phone_number: {
      type: String,
      required: true,
      match: [
        /^(01|03|70|71|76|78|79|81)\d{6}$/,
        "Please enter a valid Lebanese phone number",
      ],
    },

    is_eligible_for_loan: {
      type: Boolean,
      default: true,
    },
    is_first_login: {
      type: Boolean,
      default: true,
    },
    role: {
      type: String,
      required: true,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
