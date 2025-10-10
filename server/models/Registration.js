import mongoose from "mongoose";
const { Schema, model } = mongoose;

/** Group members for project */
const groupMemberSchema = new Schema({
  name: { type: String },
  email: { type: String },
  phone: { type: String },
  vnumber: { type: String } // ✅ Added register VNumber
});

const registrationSchema = new Schema({
  formId: {
    type: String,
    unique: true, // ✅ Each form gets unique ID like TRY0001, NEX0002
    required: true
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
  description: { type: String },
  additionalModules: { type: String },
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
  modeOfCourse: {
    type: String,
    enum: ["online", "offline"],
    required: function () {
      return this.category === "internship";
    }
  },

  createdAt: { type: Date, default: Date.now }
});

const Registration = model("Registration", registrationSchema);
export default Registration;
