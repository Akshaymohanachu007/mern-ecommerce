import dns from "node:dns";
import {notFound,errorHandler,} from "./middleware/errorHandler.js";

dns.setServers(["1.1.1.1", "8.8.8.8", "1.0.0.1"]);

import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import userProfileRoutes from "./routes/userProfileRoutes.js";
import analyticsRoutes from "./routes/analyticsRoutes.js";


dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/profile", userProfileRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use(notFound);
app.use(errorHandler);



// Test Route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});