import mongoose from "mongoose";
const { Schema, model } = mongoose;

const paymentSchema = new Schema({
  category: {
    type: String,
    enum: ["internship", "project"],
    required: true,
  },
  institution: {
    type: String,
    enum: ["trycode", "nexus"],
    required: true,
  },
  formId: String,   // For internship
  groupNo: String,  // For  project
  memberEmail: String,
  memberName: String,
  paidAmount: { type: Number, required: true },
  paymentMethod: { type: String, enum: ["cash", "gpay", "bank"], required: true },
  paymentDate: { type: Date, default: Date.now },
});

const Payment = model("Payment", paymentSchema);
export default Payment;
