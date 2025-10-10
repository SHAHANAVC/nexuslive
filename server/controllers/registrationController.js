import Registration from "../models/Registration.js";

/**
 * Create new registration
 */
export const createRegistration = async (req, res) => {
  try {
    const { institution, category } = req.body;
console.log(req.body);
    // Decide prefix
    let prefix = "";
    if (institution === "nexus") {
      prefix = "NEX";
    } else if (institution === "trycode") {
      prefix = category === "internship" ? "TRY" : "TRYCO";
    }

    // Find last record with this prefix
    const lastReg = await Registration.findOne({ formId: new RegExp(`^${prefix}`) })
      .sort({ createdAt: -1 });

    let nextNumber = 1;
    if (lastReg) {
      const lastNum = parseInt(lastReg.formId.replace(prefix, ""), 10);
      nextNumber = lastNum + 1;
    }

    const formId = prefix + String(nextNumber).padStart(4, "0");

    const registration = new Registration({
      ...req.body,
      formId,
    });

    await registration.save();
    res.status(201).json({ success: true, data: registration });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

/**
 * Get all project registrations
 */
export const getProjects = async (req, res) => {
  try {
    const projects = await Registration.find({ category: "project" }).sort({ createdAt: -1 });
    res.json({ success: true, data: projects });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

/**
 * Get all internship registrations
 */
export const getInternships = async (req, res) => {
  try {
    const internships = await Registration.find({ category: "internship" }).sort({ createdAt: -1 });
    res.json({ success: true, data: internships });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

/**
 * Get single registration by ID
 */
export const getRegistrationById = async (req, res) => {
  try {
    const reg = await Registration.findById(req.params.id);
    if (!reg) {
      return res.status(404).json({ success: false, message: "Not Found" });
    }
    res.json({ success: true, data: reg });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
