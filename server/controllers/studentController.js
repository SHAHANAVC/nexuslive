import Student from "../models/Student.js";
import { getChangedFields } from "../utils/getChangedFields.js";

// // 🟢 Create new student (internship or project)
// export const createStudent = async (req, res) => {
//   try {
//     const { institution, category } = req.body;
// console.log(req.body);

//     // Generate prefix (TRY/NEX)
//     const prefix = institution === "nexus" ? "NEX" : "TRY";

//     // Find last entry with same prefix
//     const last = await Student.findOne({ formId: new RegExp(`^${prefix}`) }).sort({ createdAt: -1 });
//     const nextNumber = last ? parseInt(last.formId.slice(prefix.length), 10) + 1 : 1;
//     const formId = `${prefix}${String(nextNumber).padStart(4, "0")}`;

//     const newStudent = new Student({ ...req.body, formId });
//     await newStudent.save();

//     res.status(201).json({
//       success: true,
//       message: "Student registered successfully",
//       data: { formId },
//     });
//   } catch (err) {
//     console.error("❌ Error creating student:", err);
//     res.status(500).json({ success: false, message: "Server Error" });
//   }
// };
// 🟢 Create new student (internship or project)
// export const createStudent = async (req, res) => {
//   try {
//     const { institution, category } = req.body;
//     console.log(req.body);

//     // Generate prefix (TRY/NEX)
//     const prefix = institution === "nexus" ? "NEX" : "TRY";

//     // Get academic year (June to May)
//     const getAcademicYear = () => {
//       const now = new Date();
//       const year = now.getFullYear();
//       const month = now.getMonth() + 1; // January is 1, December is 12

//       // Academic year: June 2024 to May 2025 = "24"
//       // Academic year: June 2025 to May 2026 = "25"
//       if (month >= 6) {
//         // June to December - use current year
//         return year.toString().slice(-2);
//       } else {
//         // January to May - use previous year
//         return (year - 1).toString().slice(-2);
//       }
//     };

//     const academicYear = getAcademicYear();

//     // Find last entry with same prefix and academic year
//     const last = await Student.findOne({
//       formId: new RegExp(`^${prefix}${academicYear}`)
//     }).sort({ createdAt: -1 });

//     let nextNumber = 1;

//     if (last) {
//       // Extract the number part from formId (e.g., "TRY24001" -> 1)
//       const lastNumber = parseInt(last.formId.slice(5), 10); // Skip prefix(3) + year(2)
//       nextNumber = lastNumber + 1;
//     }

//     // Format: TRY24001, NEX24001 (3-digit serial)
//     const formId = `${prefix}${academicYear}${String(nextNumber).padStart(3, "0")}`;

//     const newStudent = new Student({ ...req.body, formId });
//     await newStudent.save();

//     res.status(201).json({
//       success: true,
//       message: "Student registered successfully",
//       data: { formId },
//     });
//   } catch (err) {
//     console.error("❌ Error creating student:", err);
//     res.status(500).json({ success: false, message: "Server Error" });
//   }
// };
// 🟢 Create new student (internship or project)
export const createStudent = async (req, res) => {
  try {
    const { institution, category } = req.body;
    console.log(req.body);

    // Generate prefix (TRY/NEX)
    const prefix = institution === "nexus" ? "NEX" : "TRY";

    // Get academic year (June to May) - NEXT year from June
    const getAcademicYear = () => {
      const now = new Date();
      const year = now.getFullYear();
      const month = now.getMonth() + 1; // January is 1, December is 12

      // Academic year: June 2024 to May 2025 = "25" (NEXT year)
      // Academic year: June 2025 to May 2026 = "26" (NEXT year)
      if (month >= 6) {
        // June to December - use NEXT year
        return (year + 1).toString().slice(-2);
      } else {
        // January to May - use CURRENT year
        return year.toString().slice(-2);
      }
    };

    const academicYear = getAcademicYear();

    // Find last entry with same prefix and academic year
    const last = await Student.findOne({
      formId: new RegExp(`^${prefix}${academicYear}`),
    }).sort({ createdAt: -1 });

    let nextNumber = 1;

    if (last) {
      // Extract the number part from formId (e.g., "TRY26001" -> 1)
      const lastNumber = parseInt(last.formId.slice(5), 10); // Skip prefix(3) + year(2)
      nextNumber = lastNumber + 1;
    }

    // Format: TRY26001, NEX26001 (3-digit serial)
    const formId = `${prefix}${academicYear}${String(nextNumber).padStart(
      3,
      "0"
    )}`;

    const newStudent = new Student({ ...req.body, formId });
    await newStudent.save();

    res.status(201).json({
      success: true,
      message: "Student registered successfully",
      data: { formId },
    });
  } catch (err) {
    console.error("❌ Error creating student:", err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
// 🟡 Get all students
export const getStudents = async (req, res) => {
  try {
    const { category, institution } = req.query;
    const filter = {};
    if (category) filter.category = category;
    if (institution) filter.institution = institution;

    const students = await Student.find(filter).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: students.length,
      data: students,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// 🟠 Get student by ID
export const getStudentById = async (req, res) => {
  try {
    const { id } = req.params;
    const student = await Student.findById(id);
    if (!student)
      return res
        .status(404)
        .json({ success: false, message: "Student not found" });

    res.status(200).json({ success: true, data: student });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// 🔵 Update student (with history)
export const updateStudent = async (req, res) => {
  try {
    console.log(req.body);

    const { id } = req.params;
    console.log(id);

    const updatedData = req.body;

    const existing = await Student.findById(id);
    if (!existing)
      return res
        .status(404)
        .json({ success: false, message: "Student not found" });

    const oldData = existing.toObject();
    const changes = getChangedFields(oldData, updatedData);

    if (Object.keys(changes).length === 0) {
      return res
        .status(200)
        .json({
          success: true,
          message: "No changes detected",
          data: existing,
        });
    }

    // Handle payment status update logic
    if (updatedData.paymentInfo) {
      const totalPaid =
        updatedData.paymentInfo.totalPaid ?? existing.paymentInfo.totalPaid;
      const fees = existing.fees;
      updatedData.paymentStatus = totalPaid >= fees ? "completed" : "pending";
      updatedData.paymentInfo.balance = fees - totalPaid;
    }

    const updated = await Student.findByIdAndUpdate(
      id,
      {
        $set: updatedData,
        $push: {
          history: {
            updatedBy: req.user?.email || "superadmin",
            updatedAt: new Date(),
            changes,
          },
        },
      },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: "Student updated successfully",
      data: updated,
    });
  } catch (err) {
    console.error("❌ Error updating student:", err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// 🔴 Delete student
export const deleteStudent = async (req, res) => {
  console.log(".............", req.params);

  try {
    const { id } = req.params;
    console.log(id);

    const deleted = await Student.findByIdAndDelete(id);
    if (!deleted)
      return res
        .status(404)
        .json({ success: false, message: "Student not found" });

    res
      .status(200)
      .json({ success: true, message: "Student deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// for payment

// export const getstudentNamesById = async (req, res) => {
//   console.log(req.query);

//   try {
//     const { id } = req.query;

//     if (!id) {
//       return res.status(400).json({
//         success: false,
//         message: "Please provide an ID",
//       });
//     }

//     // Search for either formId or groupNo
//     const registrations = await Student.find(
//       {
//         $or: [{ formId: id }, { groupNo: id }],
//       },
//       {
//         name: 1,
//         groupMembers: 1,
//         groupNo: 1,
//         formId: 1,
//         category: 1,
//         paymentInfo: 1,
//         college: 1,
//         fees: 1,
//         category: 1,
//         _id: 0,
//       }
//     );

//     if (!registrations || registrations.length === 0) {
//       return res.status(404).json({
//         success: false,
//         message: "No registration found for the given ID",
//       });
//     }

//     // Format response
//     const formatted = registrations.map((reg) => ({
//       formId: reg.formId,
//       groupNo: reg.groupNo,
//       type: reg.category,
//       studentName: reg.name,
//       fees: reg.fees,
//       balance: reg.paymentInfo.balance,
//       college: reg.college,
//       category: reg.category,
//       groupMembers: reg.groupMembers || [],
//     }));

//     res.status(200).json({
//       success: true,
//       data: formatted,
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({
//       success: false,
//       message: "Server Error",
//     });
//   }
// };

export const getstudentNamesById = async (req, res) => {
  console.log("🔍 Query Params:", req.query);

  try {
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Please provide an ID (formId)",
      });
    }

    // ✅ Search by formId (case-insensitive)
    const students = await Student.find(
      { formId: { $regex: new RegExp(`^${id}$`, "i") } },
      {
        name: 1,
        groupMembers: 1,
        formId: 1,
        category: 1,
        paymentInfo: 1,
        college: 1,
        fees: 1,
        institution: 1,
        projectName: 1,
        _id: 0,
        phone: 1,
      }
    );

    console.log("📦 Students found:", students.length);

    if (!students || students.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No student found for the given formId",
      });
    }

    const formatted = students.map((stu) => ({
      formId: stu.formId,
      institution: stu.institution,
      category: stu.category,
      phone: stu.phone || null,
      studentName:
        stu.category === "internship"
          ? stu.name
          : stu.groupMembers?.[0]?.name || "N/A",
      projectName: stu.projectName || null,
      college: stu.college,
      fees: stu.fees,
      balance: stu.paymentInfo?.balance ?? 0,
      groupMembers: stu.groupMembers || [],
    }));

    res.status(200).json({
      success: true,
      data: formatted,
    });
  } catch (err) {
    console.error("❌ Error fetching student by ID:", err);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
export const updateProjectStatus = async (req, res) => {
  console.log(req.body, "rrrrrrrrrrrrrrrrrrrrrr");

  try {
    const { id } = req.params; // Student ID (MongoDB _id or formId)
    console.log(id);
    
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({
        success: false,
        message: "Please provide a new project status",
      });
    }

    // ✅ Validate allowed status values (optional but recommended)
    const allowedStatuses = ["not started", "ongoing", "completed", "dropped"];
    if (!allowedStatuses.includes(status.toLowerCase())) {
      return res.status(400).json({
        success: false,
        message: `Invalid project status. Allowed: ${allowedStatuses.join(
          ", "
        )}`,
      });
    }

    // ✅ Find and update project status
    const updated = await Student.findOneAndUpdate(
      { _id: id }, // you can change to { formId: id } if you’re updating by formId
      {
        $set: { projectStatus:status },
        
      },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Project status updated successfully",
      data: {
        formId: updated.formId,
        projectStatus: updated.status,
      },
    });
  } catch (err) {
    console.error("❌ Error updating project status:", err);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
