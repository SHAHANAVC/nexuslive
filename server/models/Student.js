import mongoose from "mongoose";
const { Schema, model } = mongoose;

/** Group members for projects */
const groupMemberSchema = new Schema({
  name: { type: String },
  email: { type: String },
  phone: { type: String },
  regNumber: { type: String },
  paymentInfo: {
    totalPaid: { type: Number, default: 0 },
    balance: { type: Number, default: 0 },
    lastPaymentDate: { type: Date }
  }
});

const studentSchema = new Schema({
  // 🔹 Common unique ID for both internship and project
  formId: {
    type: String,
    required: true,
    unique: true,
  },

  institution: {
    type: String,
    enum: ["trycode", "nexus"],
    required: true,
  },

  category: {
    type: String,
    enum: ["internship", "project"],
    required: true,
  },

  // 🔹 Common academic details
  college: { type: String, required: true },
  department: { type: String },
  modeOfCourse: { type: String },
  dateOfJoining: { type: Date, required: true },
  fees: { type: Number, required: true },

  // 🔹 Payment details
  paymentStatus: {
    type: String,
    enum: ["pending", "completed"],
    default: "pending",
  },
  paymentInfo: {
    totalPaid: { type: Number, default: 0 },
    balance: { type: Number, default: function () { return this.fees; } },
    lastPaymentDate: { type: Date },
  },

  // 🔹 Internship specific fields
  name: String,
  dob: Date,
  age: Number,
  phone: String,
  email: String,
  address: String,
  city: String,
  pin: String,
  district: String,
  state: String,
  qualification: String,
  course: String,
  preferredDuration: String,

  // 🔹 Project specific fields
  projectName: String,
  technology: String,
  projectStatus: {
    type: String,
    default: "not started",
  },
  pcategory:String,
  description: String,
  additionalModules: String,
  groupMembers: [groupMemberSchema],

  // 🔹 Audit trail / history
  history: [
    {
      updatedBy: { type: String },
      updatedAt: { type: Date, default: Date.now },
      changes: { type: Object },
    },
  ],

  createdAt: { type: Date, default: Date.now },
});

const Student = model("Student", studentSchema);
export default Student;
