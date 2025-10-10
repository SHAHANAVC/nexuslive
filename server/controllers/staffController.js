
import Staff from "../models/staff.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Register Staff
// export const registerStaff = async (req, res) => {
//   console.log('haii');
//   console.log(req.body);
//   try {
//     const {
//       employeeId,
//       name,
//       email,
//       password,
//       address,
//       phone,
//       qualification,
//       dateOfJoining,
//       role,
//       department,
//       designation,
//       emergencyContact,
//       profilePic,
//       documents,
//     } = req.body;

//     // Basic validation
//     if (!employeeId || !name || !email || !password || !address || !phone || !qualification || !dateOfJoining) {
//       return res.status(400).json({ message: "All required fields must be provided" });
//     }
//     // Check if email or phone already exists
//     const existingStaff = await Staff.findOne({ $or: [{ email }, { phone }] });
//     if (existingStaff) {
//       return res.status(400).json({ message: "Email or phone already registered" });
//     }

//     // Hash password
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     const newStaff = new Staff({
//       employeeId,
//       name,
//       email,
//       password: hashedPassword,
//       address,
//       phone,
//       qualification,
//       dateOfJoining,
//       role: role || "staff",
//       department,
//       designation,
//       emergencyContact,
//       profilePic,
//       documents,
//     });

//     await newStaff.save();

//     res.status(201).json({ message: "Staff registered successfully", staff: newStaff });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server error" });
//   }
// };
export const registerStaff = async (req, res) => {
  console.log(req.body);
   
  try {
    const { name, email, password, address, phone, qualification, dateOfJoining, department, designation, emergencyContact, status } = req.body;

    if (!name || !email || !password || !phone) {
      return res.status(400).json({ message: 'Required fields missing' });
    }

    // Check for existing email/phone
    const existing = await Staff.findOne({ $or: [{ email }, { phone }] });
    if (existing) return res.status(400).json({ message: 'Email or phone already exists' });

 // Generate employeeId like 0001, 0002
const lastStaff = await Staff.findOne({}).sort({ createdAt: -1 });
let employeeId = '0001';

if (lastStaff && lastStaff.employeeId) {
  // Make sure to parse correctly
  const lastId = parseInt(lastStaff.employeeId, 10);
  
  // If lastId is NaN, reset to 0
  const newId = isNaN(lastId) ? 1 : lastId + 1;
  employeeId = newId.toString().padStart(4, '0'); // e.g., 0002
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
      status: status || 'active'
    });

    await newStaff.save();
    res.status(201).json({ message: 'Staff registered successfully', staff: newStaff });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
// Login Staff
export const loginStaff = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);
    

    // Validation
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }
    // const staff = await Staff.findOne({ email });
    const staff = await Staff.findOne({ email: { $regex: new RegExp(`^${email}$`, 'i') } });

    console.log(staff);
    if (!staff) return res.status(400).json({ message: "Invalid email " });

    // Compare password
    const isMatch = await bcrypt.compare(password, staff.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });

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
    const staffList = await Staff.find({ role: { $ne: "superAdmin" } }).sort({ createdAt: -1 });
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
console.log(staffId,role);

    // Validate role
    if (!role || !['staff', 'admin'].includes(role)) {
      return res.status(400).json({ message: "Invalid role. Allowed: 'staff' or 'admin'" });
    }

    // Prevent changing superAdmin role
    const staff = await Staff.findById(staffId);
    if (!staff) return res.status(404).json({ message: "Staff not found" });
    if (staff.role === "superAdmin") {
      return res.status(403).json({ message: "Cannot change role of superAdmin" });
    }

    staff.role = role;
    await staff.save();

    res.status(200).json({ message: "Role updated successfully", staff });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};