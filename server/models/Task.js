import mongoose from "mongoose";

const progressSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      default: Date.now,
    },
    message: {
      type: String,
      required: true,
    },
  },
  { _id: false }
);

const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Staff",
      required: true,
    },
    assignedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Staff",
    },
    dueDate: { type: Date },

    status: {
      type: String,
    //   enum: ["pending", "in-progress", "completed"],
      default: "pending",
    },
    remarks: { type: String },

    // 🆕 New: daily staff progress updates
    progressUpdates: [progressSchema],
  },
  { timestamps: true }
);

export default mongoose.model("Task", taskSchema);
