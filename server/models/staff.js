import mongoose from "mongoose";
import bcrypt from "bcrypt";

const { Schema, model } = mongoose;

const staffSchema = new Schema({
  employeeId: {
    type: String,
    // unique: true,
    // required: true,
  },
  name: {
    type: String,
    // required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    // required: true,
  },
  phone: {
    type: String,
    // required: true,
    unique: true,
  },
  qualification: {
    type: String,
    // required: true,
  },
  dateOfJoining: {
    type: Date,
    // required: true,
  },
  role: {
    type: String,
    enum: ["superAdmin", "admin", "staff"],
    default: "staff",
  },
  department: {
    type: String,
  },
  designation: {
    type: String,
  },
//   skills: {
//     type: [String],
//   },
  emergencyContact: {
    name: String,
    phone: String,
    relation: String,
  },
  status: {
    type: String,
    enum: ["active", "probation", "resigned"],
    default: "active",
  },
  profilePic: {
    type: String, // URL or file path
  },
  documents: {
    type: [String], // URLs or file paths
  },
 editHistory: [
    {
      editedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Staff' },
      changes: Object,  // { fieldName: { from: oldValue, to: newValue } }
      action: { type: String, default: 'update' },
      timestamp: { type: Date, default: Date.now }
    }
  ],

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// // Pre-save hook to hash password
// staffSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) return next();
//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
//   next();
// });

// // Method to compare password
// staffSchema.methods.comparePassword = async function (candidatePassword) {
  //   return await bcrypt.compare(candidatePassword, this.password);
  // };
  const Staff = model("Staff", staffSchema);
  
  
  export default Staff;
