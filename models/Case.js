const mongoose = require("mongoose");

const caseSchema = new mongoose.Schema(
  {
    comp_ref_no: {
      type: String,
      required: true,
      unique: true,
    },

    candidate_name: String,
    father_name: String,
    candidate_dob: Date,

    street_address: String,
    city: String,
    pincode: String,
    state: String,

    vendor: String,
    tat: String,

    check_status: {
      type: String,
      default: "PENDING",
    },

    attachment: String,
    remark: String,

    callback_url: String,

    assigned_to: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Case", caseSchema);