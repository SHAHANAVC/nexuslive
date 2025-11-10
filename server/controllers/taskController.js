import Task from "../models/Task.js";
import Staff from "../models/staff.js";

// ✅ Create Task (by Super Admin)
export const createTask = async (req, res) => {
  try {
    const { title, description, assignedTo, deadline,assignedBy } = req.body;
    console.log(req.body);
    

    if (!title || !assignedTo) {
      return res.status(400).json({ message: "Title and assignedTo are required" });
    }

    const staff = await Staff.findById(assignedTo);
    if (!staff) return res.status(404).json({ message: "Staff not found" });

    const newTask = new Task({
      title,
      description,
      assignedTo,
      assignedBy, // if logged-in super admin is available
      dueDate:deadline,
      
    });

    await newTask.save();

    res.status(201).json({
      message: "Task created successfully",
      task: newTask,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Get all tasks (Admin view)
export const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find().populate('assignedBy')
      .populate("assignedTo", "name email")
      .sort({ createdAt: -1 });
    res.status(200).json(tasks);
  } catch (err) {
    console.log(err);
    
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Get tasks for a specific staff
export const getTasksByStaff = async (req, res) => {
  try {
    console.log(req.params);
    
    const { staffId } = req.params;
    const tasks = await Task.find({ assignedTo: staffId }).populate('assignedBy').sort({ createdAt: -1 });
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Update task status or details
export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const task = await Task.findByIdAndUpdate(id, updates, { new: true });
    if (!task) return res.status(404).json({ message: "Task not found" });

    res.status(200).json({ message: "Task updated successfully", task });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
// ✅ Delete a task
export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findByIdAndDelete(id);
    if (!task) return res.status(404).json({ message: "Task not found" });

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
export const updateTaskProgress = async (req, res) => {
    console.log(req);
 try {
    const { id } = req.params; // task ID
    const { status, message } = req.body;
    const staffId = req.user?._id; // if using authentication

    // Validate
    if (!message && !status) {
      return res.status(400).json({
        message: "Status or progress message is required",
      });
    }
    const task = await Task.findById(id);
    if (!task) return res.status(404).json({ message: "Task not found" });
    // Ensure staff is updating their own task
    if (staffId && task.assignedTo.toString() !== staffId.toString()) {
      return res.status(403).json({ message: "Not authorized to update this task" });
    }
    // Add daily message
    if (message) {
      task.progressUpdates.push({ message });
    }
  // Update status if provided
    if (status) {
      task.status = status;
    }

    await task.save();

    res.status(200).json({
      message: "Task progress updated successfully",
      task,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};