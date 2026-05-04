const mongoose = require("mongoose");

const caseSchema = new mongoose.Schema(
  {
    comp_ref_no: {
    type: String,
    required: [true, "Complaint reference number is required"],
    unique: true,
    trim: true,
    match: [
      /^REF-\d+$/,
      "Invalid format. Use REF-001"
    ]
  },

    check_status: {
      type: String,
      enum: ["PENDING", "IN_PROGRESS", "COMPLETED"],
      default: "PENDING"
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Case", caseSchema);