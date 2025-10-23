import mongoose from "mongoose";
const { Schema, model } = mongoose;

/** Group members for project */
const groupMemberSchema = new Schema({
  name: { type: String },
  email: { type: String },
  phone: { type: String },
  regNumber: { type: String } ,
    paymentInfo: {
    totalPaid: { type: Number, default: 0 },
    balance: { type: Number, default: 0 }, // will calculate from Registration fees
    lastPaymentDate: { type: Date }
  }
});

const registrationSchema = new Schema({
  formId: {
    type: String,
    // unique: true, // ✅ Each form gets unique ID like TRY0001, NEX0002
    // required: true
  },
  institution: {
    type: String,
    enum: ["trycode", "nexus"], // ✅ Always stored
    required: true
  },
  category: {
    type: String,
    enum: ["internship", "project"],
    required: true
  },
  modeOfCourse: {
  type: String,
  // enum: ["online", "offline", "fastrack", "detailed"], // ✅ both internship & project modes
  // required: true
},
 paymentStatus: {
    type: String,
    enum: ["pending", "completed"],
    default: "pending"
  },

  // -------- PROJECT FIELDS --------
  groupNo: {
    type: String,
    required: function () {
      return this.category === "project";
    }
  },
  projectName: {
    type: String,
    required: function () {
      return this.category === "project";
    }
  },
  college: {
    type: String,
    required: true // common for both internship & project
  },
  department: {
    type: String,
    required: function () {
      return this.category === "project";
    }
  },
  dateOfJoining: {
    type: Date,
    required: true
  },
  fees: {
    type: Number,
    required: true
  },
    // Add this ↓↓↓
  paymentInfo: {
    totalPaid: { type: Number, default: 0 },
    balance: { type: Number, default: function () { return this.fees; } },
    lastPaymentDate: { type: Date },
  },
  description: { type: String },
  additionalModules: { type: String },
  technology: {
    type: String,
    required: function () {
      return this.category === "project";
    },
    trim: true
  },
    // Project Status (only for projects)
  projectStatus: {
    type: String,
    // enum: ["not started", "in progress", "completed"], 
    required: function () {
      return this.category === "project";
    },
    default: "not started"
  },
  groupMembers: [groupMemberSchema],

  // -------- INTERNSHIP FIELDS --------
  name: {
    type: String,
    required: function () {
      return this.category === "internship";
    }
  },
  dob: {
    type: Date,
    required: function () {
      return this.category === "internship";
    }
  },
  age: {
    type: Number,
    required: function () {
      return this.category === "internship";
    }
  },
  phone: {
    type: String,
    required: function () {
      return this.category === "internship";
    }
  },
  email: {
    type: String,
    required: function () {
      return this.category === "internship";
    }
  },
  address: {
    type: String,
    required: function () {
      return this.category === "internship";
    }
  },
  city: {
    type: String,
    required: function () {
      return this.category === "internship";
    }
  },
  pincode: {
    type: String,
    required: function () {
      return this.category === "internship";
    }
  },
  district: {
    type: String,
    required: function () {
      return this.category === "internship";
    }
  },
  state: {
    type: String,
    required: function () {
      return this.category === "internship";
    }
  },
  qualification: {
    type: String,
    required: function () {
      return this.category === "internship";
    }
  },
  course: {
    type: String,
    required: function () {
      return this.category === "internship";
    }
  },
  preferredDuration: {
    type: String,
    required: function () {
      return this.category === "internship";
    }
  },
  
  history: [
    {
      updatedBy: { type: String }, // e.g., super admin email
      updatedAt: { type: Date, default: Date.now },
      changes: { type: Object },  // store the updated fields
    }
  ],



  createdAt: { type: Date, default: Date.now }
});

const Registration = model("Registration", registrationSchema);
export default Registration;
