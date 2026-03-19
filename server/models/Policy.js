const mongoose = require("mongoose");

const policySchema = new mongoose.Schema({
  policyNumber: {type: String, required: true, unique: true, index: true},
  customerName: {type: String, required: true, index: true},
  email: {type: String, required: true, unique: true},
  vehicleType: {type: String, required: true},
  vehicleYear: {type: Number, required: true},
  premiumAmount: {type: Number, required: true,},
  status: {
    type: String,
    enum: ["active", "pending", "expired"],
    index: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    index: true
  },
});

module.exports = mongoose.model("Policy", policySchema);
