// import Payment from "../models/Payment.js";
import Payment from "../models/payment.js";
import Registration from "../models/Registration.js";
import Student from "../models/Student.js";


// export const recordPayment = async (req, res) => {
//   console.log("bbbbbbbbbbbbbbbbbbbbbbbbbbbbb",req.body);
  
//   try {
//     const { category, institution, formId, groupNo, memberEmail, memberName, paidAmount, paymentMethod } = req.body;

//     // Find correct registration
//     const registration = await Registration.findOne(
//       category === "internship" ? { formId } : { groupNo }
//     );
// console.log(registration);

//     if (!registration) {
//       return res.status(404).json({ message: "Registration not found" });
//     }

//     // Save payment in Payment model
//     const payment = await Payment.create({
//       category,
//       institution,
//       formId,
//       groupNo,
//       memberEmail,
//       memberName,
//       paidAmount,
//       paymentMethod,
//     });

//     // 1️⃣ Update overall registration payment summary
//     const totalPaid = (registration.paymentInfo?.totalPaid || 0) + paidAmount;
//     const balance = Math.max(registration.fees - totalPaid, 0);

//     registration.paymentInfo = {
//       totalPaid,
//       balance,
//       lastPaymentDate: new Date(),
//     };

//     // 2️⃣ If project, update the specific group member
//     if (category === "project") {
//       const member = registration.groupMembers.find(m => m.email === memberEmail);
//       if (!member) {
//         return res.status(404).json({ message: "Group member not found" });
//       }

//       // Optional: evenly split the fees per member
//       const memberFeeShare = registration.fees / registration.groupMembers.length;
// console.log(memberFeeShare,'----');

//       const memberTotalPaid = (member.paymentInfo?.totalPaid || 0) + paidAmount;
//       console.log(memberTotalPaid,'---');
      
//       const memberBalance = Math.max(memberFeeShare - memberTotalPaid, 0);
// console.log(memberTotalPaid);
// console.log(memberBalance,'mbbbbbbb');


//       member.paymentInfo = {
//         totalPaid: memberTotalPaid,
//         balance: memberBalance,
//         lastPaymentDate: new Date(),
//       };
//     }

//     await registration.save();

//     res.status(201).json({
//       message: "Payment recorded successfully",
//       payment,
//       registrationPaymentInfo: registration.paymentInfo,
//       groupMembers: registration.groupMembers, // includes member balances
//     });

//   } catch (error) {
//     console.log(error);
    
//     res.status(500).json({ message: error.message });
//   }
// };



export const recordPayment = async (req, res) => {
  console.log(req.body);
  
  try {
    const { id, groupMember, paidAmount, paymentMethod } = req.body;

    if (!id || !paidAmount || !paymentMethod) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Find registration by formId or groupNo
    const registration = await Student.findOne({
      $or: [{ formId: id }, { groupNo: id }]
    });
console.log(registration,'------------------------');

    if (!registration) {
      return res.status(404).json({ message: "Registration not found" });
    }

    let memberEmail = null;
    let memberName = null;

    // If project payment and groupMember ID is provided
    if (registration.category === "project" && groupMember) {
      const member = registration.groupMembers.find(m => m._id.toString() === groupMember);
      if (!member) return res.status(404).json({ message: "Group member not found" });

      memberEmail = member.email;
      memberName = member.name;

      // Update the member payment info
      const memberFeeShare = registration.fees / registration.groupMembers.length;
      const memberTotalPaid = (member.paymentInfo?.totalPaid || 0) + paidAmount;
      const memberBalance = Math.max(memberFeeShare - memberTotalPaid, 0);

      member.paymentInfo = {
        totalPaid: memberTotalPaid,
        balance: memberBalance,
        lastPaymentDate: new Date()
      };
    }
   // 🧩 CASE 2: Internship -> Use registration's own details
    else if (registration.category === "internship") {
      memberEmail = registration.email;
      memberName = registration.name;
    }
    // Create Payment record using info from registration/member
    const payment = await Payment.create({
      category: registration.category,
      institution: registration.institution,
      formId: registration.formId,
      groupNo: registration.groupNo,
      memberEmail,
      memberName,
      paidAmount,
      paymentMethod
    });

    // Update overall registration payment info
    const totalPaid = (registration.paymentInfo?.totalPaid || 0) + paidAmount;
    const balance = Math.max(registration.fees - totalPaid, 0);

    registration.paymentInfo = {
      totalPaid,
      balance,
      lastPaymentDate: new Date()
    };
// if (totalPaid === 0) registration.paymentStatus = "pending";
//     else 
if (totalPaid < registration.fees) registration.paymentStatus = "pending";
    else registration.paymentStatus = "completed";
    await registration.save();
    res.status(201).json({
      message: "Payment recorded successfully",
      payment,
      registrationPaymentInfo: registration.paymentInfo,
      groupMembers: registration.groupMembers
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

export const getAllPayments = async (req, res) => {
  console.log('📥 Received payment fetch request');
  console.log('Query Params:', req.query);
  
  try {
    const { startDate, endDate } = req.query;
    const filter = {};

    if (startDate || endDate) {
      filter.paymentDate = {};
      
      if (startDate) {
        const start = new Date(startDate);
        start.setHours(0, 0, 0, 0);
        filter.paymentDate.$gte = start;
      }

      if (endDate) {
        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999);
        filter.paymentDate.$lte = end;
      }
    }

    console.log("Filter:", filter);

    const payments = await Payment.find(filter).sort({ paymentDate: -1 });
    console.log("Payments found:", payments.length);

    if (!payments.length) {
      return res.status(404).json({
        success: false,
        message: "No payment history found for the selected date range."
      });
    }

    res.status(200).json({
      success: true,
      count: payments.length,
      data: payments
    });

  } catch (error) {
    console.error("Error fetching payments:", error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
