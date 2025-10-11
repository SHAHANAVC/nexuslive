// import Registration from "../models/Registration.js";

// /**
//  * Create new registration
//  */
// export const createRegistration = async (req, res) => {
//   try {
//     const { institution, category } = req.body;
// console.log(req.body);
//     // Decide prefix
//     let prefix = "";
//     if (institution === "nexus") {
//       prefix = "NEX";
//     } else if (institution === "trycode") {
//       prefix = category === "internship" ? "TRY" : "TRYCO";
//     }

//     // Find last record with this prefix
//     const lastReg = await Registration.findOne({ formId: new RegExp(`^${prefix}`) })
//       .sort({ createdAt: -1 });

//     let nextNumber = 1;
//     if (lastReg) {
//       const lastNum = parseInt(lastReg.formId.replace(prefix, ""), 10);
//       nextNumber = lastNum + 1;
//     }

//     const formId = prefix + String(nextNumber).padStart(4, "0");

//     const registration = new Registration({
//       ...req.body,
//       formId,
//     });

//     await registration.save();
//     res.status(201).json({ success: true, data: registration });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ success: false, message: "Server Error" });
//   }
// };

// /**
//  * Get all project registrations
//  */
// export const getProjects = async (req, res) => {
//   try {
//     const projects = await Registration.find({ category: "project" }).sort({ createdAt: -1 });
//     res.json({ success: true, data: projects });
//   } catch (err) {
//     res.status(500).json({ success: false, message: "Server Error" });
//   }
// };

// /**
//  * Get all internship registrations
//  */
// export const getInternships = async (req, res) => {
//   try {
//     const internships = await Registration.find({ category: "internship" }).sort({ createdAt: -1 });
//     res.json({ success: true, data: internships });
//   } catch (err) {
//     res.status(500).json({ success: false, message: "Server Error" });
//   }
// };

// /**
//  * Get single registration by ID
//  */
// export const getRegistrationById = async (req, res) => {
//   try {
//     const reg = await Registration.findById(req.params.id);
//     if (!reg) {
//       return res.status(404).json({ success: false, message: "Not Found" });
//     }
//     res.json({ success: true, data: reg });
//   } catch (err) {
//     res.status(500).json({ success: false, message: "Server Error" });
//   }
// };



import Registration from "../models/Registration.js";

/**
 * Create new registration
 */
// export const createRegistration = async (req, res) => {
//   console.log(req.body);
  
//   try {
//     const { institution, category } = req.body;

//     // Determine prefix
//     let prefix = "";
//     if (institution === "nexus") prefix = "NEX";
//     else if (institution === "trycode") prefix = category === "internship" ? "TRY" : "TRYCO";

//     // Find last record with this prefix
//     const lastReg = await Registration.findOne({ formId: new RegExp(`^${prefix}`) }).sort({ createdAt: -1 });

//     let nextNumber = 1;
//     if (lastReg) {
//       const lastNum = parseInt(lastReg.formId.replace(prefix, ""), 10);
//       nextNumber = lastNum + 1;
//     }

//     const formId = prefix + String(nextNumber).padStart(4, "0");

//     // Create registration
//     const registration = new Registration({ ...req.body, formId });
//     await registration.save();

//     res.status(201).json({ success: true, data: registration });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ success: false, message: "Server Error" });
//   }
// };
// export const createRegistration = async (req, res) => {
//   try {
//     const { institution, category } = req.body;

//     // Map frontend fields to backend schema
//     const mappedData = {
//       ...req.body,
//       college: req.body.collegeName,   // frontend → backend
//       pincode: req.body.pin,           // frontend → backend
//       // modeOfCourse: req.body.modeofCourse
//     };

//     // Determine prefix
//     let prefix = "";
//     if (institution === "nexus") prefix = "NEX";
//     else if (institution === "trycode") prefix = category === "internship" ? "TRY" : "TRYCO";

//     const lastReg = await Registration.findOne({ formId: new RegExp(`^${prefix}`) }).sort({ createdAt: -1 });

//     let nextNumber = 1;
//     if (lastReg) {
//       const lastNum = parseInt(lastReg.formId.replace(prefix, ""), 10);
//       nextNumber = lastNum + 1;
//     }

//     const formId = prefix + String(nextNumber).padStart(4, "0");

//     const registration = new Registration({ ...mappedData, formId });
//     await registration.save();

//     res.status(201).json({ success: true, data: registration });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ success: false, message: "Server Error" });
//   }
// };
// export const createRegistration = async (req, res) => {
//   console.log(req.body);
  
//   try {
//     const { institution, category, name, email } = req.body;

//     // Check if name or email already exists
//     const existingReg = await Registration.findOne({
//       $or: [{ name: name }, { email: email }]
//     });

//     if (existingReg) {
//       console.log(existingReg,'000000000000000000000000');
      
//       return res.status(400).json({
//         // success: false,
//         message: "A registration with the same name or email already exists"
//       });
//     }

//     // Map frontend fields to backend schema
//     const mappedData = {
//       ...req.body,
//       college: req.body.collegeName,   // frontend → backend
//       pincode: req.body.pin            // frontend → backend
//       // modeOfCourse mapping if needed
//     };

//     // Determine prefix
//     let prefix = "";
//     if (institution === "nexus") prefix = "NEX";
//     else if (institution === "trycode") prefix = category === "internship" ? "TRY" : "TRYCO";

//     const lastReg = await Registration.findOne({ formId: new RegExp(`^${prefix}`) }).sort({ createdAt: -1 });

//     let nextNumber = 1;
//     if (lastReg) {
//       const lastNum = parseInt(lastReg.formId.replace(prefix, ""), 10);
//       nextNumber = lastNum + 1;
//     }

//     const formId = prefix + String(nextNumber).padStart(4, "0");

//     // Save new registration
//     const registration = new Registration({ ...mappedData, formId });
//     await registration.save();

//     res.status(201).json({ success: true, message:"Rgisterd successfully" });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ success: false, message: "Server Error" });
//   }
// };
// export const createRegistration = async (req, res) => {
//   console.log(req.body);

//   try {
//     const { institution, category, name, email } = req.body;

//     // 🧩 Prevent duplicate name or email
//     const existingReg = await Registration.findOne({
//       $or: [{ name: name }, { email: email }]
//     });

//     if (existingReg) {
//       return res.status(400).json({
//         message: "A registration with the same name or email already exists"
//       });
//     }

//     // 🧭 Map frontend → backend
//     const mappedData = {
//       ...req.body,
//       college: req.body.collegeName,
//       pincode: req.body.pin
//     };

//     // 🏫 Determine prefix
//     let prefix = "";
//     if (institution === "nexus") prefix = "NEX";
//     else if (institution === "trycode")
//       prefix = category === "internship" ? "TRY" : "TRYCO";

//     // 🕓 Determine academic year (changes every June)
//     const now = new Date();
//     let academicYear = now.getFullYear() % 100; // e.g. 2025 → 25
//     if (now.getMonth() >= 5) academicYear += 1; // June = month 5 (0-indexed), roll over academic year

//     // 🧮 Find last record with same prefix and academic year
//     let lastGroupNo;
//     if (category === "project") {
//       lastGroupNo = await Registration.findOne({
//         groupNo: new RegExp(`^${prefix}${academicYear}`)
//       }).sort({ createdAt: -1 });
//     }

//     // 🧩 Generate next number
//     let nextNumber = 1;
//     if (lastGroupNo) {
//       const lastNum = parseInt(lastGroupNo.groupNo.slice(-3), 10);
//       nextNumber = lastNum + 1;
//     }

//     const groupNo =
//       category === "project"
//         ? `${prefix}${academicYear}${String(nextNumber).padStart(3, "0")}`
//         : undefined;

//     // 🧾 Generate formId (for both internship & project)
//     const lastReg = await Registration.findOne({
//       formId: new RegExp(`^${prefix}`)
//     }).sort({ createdAt: -1 });

//     let nextFormNum = 1;
//     if (lastReg) {
//       const lastNum = parseInt(lastReg.formId.replace(prefix, ""), 10);
//       nextFormNum = lastNum + 1;
//     }

//     const formId = prefix + String(nextFormNum).padStart(4, "0");

//     // 💾 Save new registration
//     const registration = new Registration({
//       ...mappedData,
//       formId,
//       groupNo // only for projects
//     });

//     await registration.save();

//     res.status(201).json({
//       success: true,
//       message: "Registered successfully",
//       data: { formId, groupNo }
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ success: false, message: "Server Error" });
//   }
// };


// /**
//  * Get all project registrations
//  */
// export const getProjects = async (req, res) => {
//   try {
//     const projects = await Registration.find({ category: "project" }).sort({ createdAt: -1 });
//     res.json({ success: true, data: projects });
//   } catch (err) {
//     res.status(500).json({ success: false, message: "Server Error" });
//   }
// };

// /**
//  * Get all internship registrations
//  */
// export const getInternships = async (req, res) => {
//   try {
//     const internships = await Registration.find({ category: "internship" }).sort({ createdAt: -1 });
//     res.json({ success: true, data: internships });
//   } catch (err) {
//     res.status(500).json({ success: false, message: "Server Error" });
//   }
// };

// /**
//  * Get single registration by ID
//  */
// export const getRegistrationById = async (req, res) => {
//   try {
//     const reg = await Registration.findById(req.params.id);
//     if (!reg) return res.status(404).json({ success: false, message: "Registration Not Found" });

//     res.json({ success: true, data: reg });
//   } catch (err) {
//     res.status(500).json({ success: false, message: "Server Error" });
//   }
// };


export const createRegistration = async (req, res) => {
  console.log(req.body);

  try {
    const { institution, category, name, email } = req.body;

    // 🧩 Prevent duplicate name or email (only for internship)
    if (category === "internship" && (name || email)) {
      const existingReg = await Registration.findOne({
        $or: [{ name }, { email }]
      });

      if (existingReg) {
        return res.status(400).json({
          message: "A registration with the same name or email already exists"
        });
      }
    }

    // 🧭 Map frontend → backend
    const mappedData = {
      ...req.body,
      college: req.body.collegeName,
      pincode: req.body.pin
    };

    // 🏫 Determine institution prefix
    let prefix = "";
    if (institution === "nexus") prefix = "NEX";
    else if (institution === "trycode")
      prefix = category === "internship" ? "TRY" : "TRYCO";

    // 🕓 Determine academic year (changes every June)
    const now = new Date();
    let academicYear = now.getFullYear() % 100; // e.g. 2025 → 25
    if (now.getMonth() >= 5) academicYear += 1; // after May (June onward) → next academic year

    // 🧮 Generate Project Group Number
    let groupNo;
    if (category === "project") {
      const lastProject = await Registration.findOne({
        groupNo: new RegExp(`^${prefix}${academicYear}`)
      }).sort({ createdAt: -1 });

      let nextNumber = 1;
      if (lastProject) {
        const lastNum = parseInt(lastProject.groupNo.slice(-3), 10);
        nextNumber = lastNum + 1;
      }

      groupNo = `${prefix}${academicYear}${String(nextNumber).padStart(3, "0")}`;
    }

    // 🧾 Generate sequential Form ID (for both internship & project)
    const lastReg = await Registration.findOne({
      formId: new RegExp(`^${prefix}`)
    }).sort({ createdAt: -1 });

    let nextFormNum = 1;
    if (lastReg) {
      const lastNum = parseInt(lastReg.formId.replace(prefix, ""), 10);
      nextFormNum = lastNum + 1;
    }

    const formId = prefix + String(nextFormNum).padStart(4, "0");

    // 💾 Save new registration
    const registration = new Registration({
      ...mappedData,
      formId,
      groupNo
    });

    await registration.save();

    res.status(201).json({
      success: true,
      message: "Registered successfully",
      data: { formId, groupNo }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
