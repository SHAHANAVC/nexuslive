// import express from "express";
// import dotenv from "dotenv";
// // import morgan from "morgan";
// import cors from "cors";
// import connectDB from "./config/db.js";
// import registrationRoutes from "./routes/registrationRoutes.js";
// import authRoutes from "./routes/authRoutes.js";
// import staffRoutes from "./routes/staffRoutes.js";
// import paymentRoutes from "./routes/paymentRoutes.js";

// dotenv.config();
// connectDB();

// const app = express();

// // Middleware
// app.use(express.json());
// app.use(cors({ origin: "*" }));
// // app.use(morgan("dev"));

// // Routes placeholder
// app.get("/", (req, res) => {
//   res.send("API is running...");
// });

// app.use("/api/auth", authRoutes);
// app.use("/api/registrations", registrationRoutes);
// app.use("/api/staff", staffRoutes);
// app.use("/api/payment", paymentRoutes);
// // Server
// const PORT = process.env.PORT || 5000;
// // app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// app.listen(PORT, "0.0.0.0", () =>
//   console.log(`Server running on http://0.0.0.0:${PORT}`)
// );
// import express from "express";
// import dotenv from "dotenv";
// import cors from "cors";
// import cookieParser from "cookie-parser"; // ✅ ADD THIS
// import connectDB from "./config/db.js";
// import registrationRoutes from "./routes/registrationRoutes.js";
// import authRoutes from "./routes/authRoutes.js";
// import staffRoutes from "./routes/staffRoutes.js";
// import paymentRoutes from "./routes/paymentRoutes.js";

// dotenv.config();
// connectDB();

// const app = express();

// // ✅ FIXED CORS Configuration
// const allowedOrigins = [
//   'http://localhost:5173',
//   'http://192.168.1.84:5173',
//   // Add other domains as needed
// ];

// app.use(cors({
//   origin: function (origin, callback) {
//     // Allow requests with no origin (like mobile apps or curl requests)
//     if (!origin) return callback(null, true);
    
//     if (allowedOrigins.indexOf(origin) !== -1) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
//   credentials: true, // ✅ CRUCIAL: This allows cookies
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//   allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
// }));

// // Middleware
// app.use(express.json());
// app.use(cookieParser()); // ✅ ADD THIS

// // Routes
// app.get("/", (req, res) => {
//   res.send("API is running...");
// });

// app.use("/api/auth", authRoutes);
// app.use("/api/registrations", registrationRoutes);
// app.use("/api/staff", staffRoutes);
// app.use("/api/payment", paymentRoutes);

// // Server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, "0.0.0.0", () =>
//   console.log(`Server running on http://0.0.0.0:${PORT}`)
// );

// server.js
// import express from "express";
// import dotenv from "dotenv";
// import cors from "cors";
// import cookieParser from "cookie-parser";
// import connectDB from "./config/db.js";
// import registrationRoutes from "./routes/registrationRoutes.js";
// import authRoutes from "./routes/authRoutes.js";
// import staffRoutes from "./routes/staffRoutes.js";
// import paymentRoutes from "./routes/paymentRoutes.js";

// dotenv.config();
// connectDB();

// const app = express();

// // ✅ FIXED CORS Configuration
// app.use(cors({
//   origin: [
//     'http://localhost:5173',
//     'http://192.168.1.84:5173',
//     'http://localhost:3000'
//   ],
//   credentials: true, // ✅ CRUCIAL: This allows cookies
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//   allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
// }));

// // ✅ Handle pre-flight request

// // Middleware
// app.use(express.json());
// app.use(cookieParser());

// // Routes
// app.get("/", (req, res) => {
//   res.send("API is running...");
// });

// app.use("/api/auth", authRoutes);
// app.use("/api/registrations", registrationRoutes);
// app.use("/api/staff", staffRoutes);
// app.use("/api/payment", paymentRoutes);

// // ✅ ADDED: Debug endpoints
// app.get("/set-test-cookie", (req, res) => {
//   res.cookie("testCookie", "working", {
//     httpOnly: true,
//     secure: false,
//     sameSite: "none",
//     maxAge: 3600000
//   });
//   res.json({ message: "Test cookie set" });
// });

// app.get("/check-test-cookie", (req, res) => {
//   res.json({ 
//     cookies: req.cookies,
//     message: "Check server console for received cookies"
//   });
// });

// // Server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, "0.0.0.0", () =>
//   console.log(`🚀 Server running on http://0.0.0.0:${PORT}`)
// );
// server.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import registrationRoutes from "./routes/registrationRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import staffRoutes from "./routes/staffRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";

dotenv.config();
connectDB();

const app = express();

// ✅ SIMPLE CORS CONFIG
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

// Middleware
app.use(express.json());
app.use(cookieParser());

// Routes
app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/auth", authRoutes);
app.use("/api/registrations", registrationRoutes);
app.use("/api/staff", staffRoutes);
app.use("/api/payment", paymentRoutes);

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () =>
  console.log(`🚀 Server running on http://0.0.0.0:${PORT}`)
);