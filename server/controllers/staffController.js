import Staff from "../models/staff.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { getChangedFields } from "../utils/getChangedFields.js";
import Student from "../models/Student.js";

export const registerStaff = async (req, res) => {
  console.log(req.body);

  try {
    const {
      name,
      email,
      password,
      address,
      phone,
      qualification,
      dateOfJoining,
      department,
      designation,
      emergencyContact,
      status,
    } = req.body;

    if (!name || !email || !password || !phone) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    // Check for existing email/phone
    const existing = await Staff.findOne({ $or: [{ email }, { phone }] });
    if (existing)
      return res.status(400).json({ message: "Email or phone already exists" });

    // Generate employeeId like 0001, 0002
    const lastStaff = await Staff.findOne({}).sort({ createdAt: -1 });
    let employeeId = "0001";

    if (lastStaff && lastStaff.employeeId) {
      // Make sure to parse correctly
      const lastId = parseInt(lastStaff.employeeId, 10);

      // If lastId is NaN, reset to 0
      const newId = isNaN(lastId) ? 1 : lastId + 1;
      employeeId = newId.toString().padStart(4, "0"); // e.g., 0002
    }

    // const hashedPassword = await hashPassword(password);
    //     // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newStaff = new Staff({
      employeeId,
      name,
      email,
      password: hashedPassword,
      address,
      phone,
      qualification,
      dateOfJoining,
      department,
      designation,
      emergencyContact,
      status: status || "active",
    });

    await newStaff.save();
    console.log("neweeeeeeeeeee", newStaff);

    res
      .status(201)
      .json({ message: "Staff registered successfully", staff: newStaff });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
// Login Staff
export const loginStaff = async (req, res) => {
  console.log('lll');
  
  try {
    const { email, password } = req.body;
    console.log(req.body);

    // Validation
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }
    // const staff = await Staff.findOne({ email });
    const staff = await Staff.findOne({
      email: { $regex: new RegExp(`^${email}$`, "i") },
    });

    console.log(staff);
    if (!staff) return res.status(400).json({ message: "Invalid email " });

    // Compare password
    const isMatch = await bcrypt.compare(password, staff.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid email or password" });

    // Update lastLogin
    // staff.lastLogin = new Date();
    // await staff.save();

    // Generate JWT token
    const token = jwt.sign(
      { id: staff._id, role: staff.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      message: "Login successful",
      token,
      staff,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all staff except superadmin
export const getAllStaff = async (req, res) => {
  try {
    // Fetch staff where role is not superadmin
    const staffList = await Staff.find({ role: { $ne: "superAdmin" } }).sort({
      createdAt: -1,
    });
    res.status(200).json({ staff: staffList });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateStaffRole = async (req, res) => {
  try {
    const { staffId } = req.params; // ID of the staff to update
    const { role } = req.body; // New role
    console.log(staffId, role);

    // Validate role
    if (!role || !["staff", "admin"].includes(role)) {
      return res
        .status(400)
        .json({ message: "Invalid role. Allowed: 'staff' or 'admin'" });
    }

    // Prevent changing superAdmin role
    const staff = await Staff.findById(staffId);
    if (!staff) return res.status(404).json({ message: "Staff not found" });
    if (staff.role === "superAdmin") {
      return res
        .status(403)
        .json({ message: "Cannot change role of superAdmin" });
    }

    staff.role = role;
    await staff.save();

    res.status(200).json({ message: "Role updated successfully", staff });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
// ✅ Get Staff by ID (used for viewing or editing)
export const getStaffById = async (req, res) => {
  try {
    const { id } = req.params;

    const staff = await Staff.findById(id).select("-password"); // don’t send password

    if (!staff) {
      return res.status(404).json({ message: "Staff not found" });
    }

    // Prevent normal staff from viewing superAdmin details
    if (staff.role === "superAdmin" && req.user.role !== "superAdmin") {
      return res
        .status(403)
        .json({ message: "Access denied to SuperAdmin details" });
    }

    res.status(200).json({ success: true, staff });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ✏️ Update Staff (Admin or SuperAdmin)
// export const updateStaff = async (req, res) => {
//   console.log('uuuuupdate staff');

//   try {
//     const { id } = req.params;
//     const updatedData = req.body;

//     // Remove fields that shouldn't be updated
//     delete updatedData.password;
//     delete updatedData.employeeId;

//     const staff = await Staff.findById(id);
//     if (!staff) {
//       return res.status(404).json({ message: "Staff not found" });
//     }

//     // Prevent editing superAdmin by normal admins
//     if (staff.role === "superAdmin" && req.user.role !== "superAdmin") {
//       return res.status(403).json({ message: "You are not authorized to edit SuperAdmin details" });
//     }

//     const oldData = staff.toObject();

//     // Update fields dynamically
//     Object.assign(staff, updatedData);
//     await staff.save();

//     // 📘 Log this edit (see section 3 below)
//     await createEditLog({
//       entityType: "staff",
//       entityId: staff._id,
//       editedBy: req.user?.id, // who made the change
//       changes: getChangedFields(oldData, updatedData),
//     });

//     res.status(200).json({ message: "Staff updated successfully", staff });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error" });
//   }
// };
// export const updateStaff = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const updatedData = req.body;

//     delete updatedData.password;
//     delete updatedData.employeeId;

//     const staff = await Staff.findById(id);
//     if (!staff) return res.status(404).json({ message: "Staff not found" });

//     if (staff.role === "superAdmin" && req.user.role !== "superAdmin") {
//       return res.status(403).json({ message: "You are not authorized to edit SuperAdmin details" });
//     }

//     const oldData = staff.toObject();

//     // Find changed fields
//     const changes = {};
//     for (const key in updatedData) {
//       if (oldData[key] !== updatedData[key]) {
//         changes[key] = { from: oldData[key], to: updatedData[key] };
//       }
//     }

//     Object.assign(staff, updatedData);

//     // Push log entry directly into staff doc
//     staff.editHistory.push({
//       editedBy: req.user?.id,
//       changes,
//       action: 'update',
//     });

//     await staff.save();

//     res.status(200).json({ message: "Staff updated successfully", staff });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error" });
//   }
// };
// ---------------------------------------------------------------------------------

export const updateStaff = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = { ...req.body };

    // never allow updating these directly
    delete updatedData.password;
    delete updatedData.employeeId;

    const staff = await Staff.findById(id);
    if (!staff) return res.status(404).json({ message: "Staff not found" });

    if (staff.role === "superAdmin" && req.user.role !== "superAdmin") {
      return res
        .status(403)
        .json({ message: "You are not authorized to edit SuperAdmin details" });
    }

    const oldData = staff.toObject();

    // Compute changes only for keys present in updatedData
    const changes = getChangedFields(oldData, updatedData);

    // Apply changes to staff document
    Object.assign(staff, updatedData);

    // If there are changes, push to editHistory
    if (Object.keys(changes).length > 0) {
      staff.editHistory = staff.editHistory || [];
      staff.editHistory.push({
        editedBy: req.user?.id,
        changes,
        action: "update",
      });
    }

    await staff.save();

    // Optionally populate editedBy in response
    res.status(200).json({ message: "Staff updated successfully", staff });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// 🗑️ Delete Staff
export const deleteStaff = async (req, res) => {
  console.log(req.params);

  try {
    const { id } = req.params;
    const staff = await Staff.findById(id);
    console.log(staff);

    if (!staff) return res.status(404).json({ message: "Staff not found" });

    await Staff.findByIdAndDelete(id);

    res.status(200).json({ message: "Staff deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
export const changeStaffPassword = async (req, res) => {
  try {
    const { id } = req.params; // staff id
    const { currentPassword, newPassword, confirmPassword } = req.body;

    // Validate input
    if (!currentPassword || !newPassword || !confirmPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (newPassword !== confirmPassword) {
      return res
        .status(400)
        .json({ message: "New password and confirm password do not match" });
    }

    const staff = await Staff.findById(id);
    if (!staff) return res.status(404).json({ message: "Staff not found" });

    // Optional: Prevent normal staff from changing other staff's password
    if (
      req.user.role !== "superAdmin" &&
      req.user.id !== staff._id.toString()
    ) {
      return res
        .status(403)
        .json({ message: "You are not authorized to change this password" });
    }

    // Verify current password
    const isMatch = await bcrypt.compare(currentPassword, staff.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Current password is incorrect" });
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    staff.password = hashedPassword;
    await staff.save();

    res.status(200).json({ message: "Password changed successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};



