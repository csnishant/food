import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/connectDB";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRoute from "./routes/user.route";
import orderRouter from "./routes/order.route";
import restaurantRoute from "./routes/restaurant.route";
import menuRoute from "./routes/menu.route";
import path from "path";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const DIRNAME = path.resolve();

// Middleware Configuration
app.use(bodyParser.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(express.json());
app.use(cookieParser());

const corsOptions = {
  origin: "https://online-food-app-ji19.onrender.com", // Frontend origin
  credentials: true,
};

// const corsOptions = {
//   origin: "http://localhost:5173", // Frontend origin
//   credentials: true,
// };

app.use(cors(corsOptions));

// API Routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/restaurant", restaurantRoute);
app.use("/api/v1/menu", menuRoute);
app.use("/api/v1/order", orderRouter);

app.use(express.static(path.join(DIRNAME, "/client/dist")));
app.use("*", (_, res) => {
  res.sendFile(path.resolve(DIRNAME, "client", "dist", "index.html"));
});
// Start Server
app.listen(PORT, () => {
  connectDB();
  console.log("Mongo URI:", process.env.MONGO_URI);

  // Ensure DB connection function works correctly
  console.log(`Server running at http://localhost:${PORT}`);
});
