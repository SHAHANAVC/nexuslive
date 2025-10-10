import express from "express";
import dotenv from "dotenv";
// import morgan from "morgan";
import cors from "cors";
import connectDB from "./config/db.js";
import registrationRoutes from "./routes/registrationRoutes.js";
// import authRoutes from "./routes/authRoutes.js";
import staffRoutes from "./routes/staffRoutes.js";
dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cors({origin:'*'}));
// app.use(morgan("dev"));

// Routes placeholder
app.get("/", (req, res) => {
  res.send("API is running...");
});

// app.use("/api/auth", authRoutes);
app.use("/api/registrations", registrationRoutes);
app.use("/api/staff", staffRoutes);
// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
