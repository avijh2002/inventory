import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./lib/db.js";
import authRoutes from "./routes/auth.routes.js";
import agentRoutes from "./routes/agent.routes.js";
import firmRoutes from "./routes/firm.routes.js";
import transportRoutes from "./routes/transport.routes.js";
import qualityRoutes from "./routes/quality.routes.js";
import orderRoutes from "./routes/order.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

dotenv.config();

const PORT = process.env.PORT;
const __dirname = path.resolve();

const app = express();  

app.use(express.json());
app.use(cookieParser());


const corsOptions = {
  origin: "https://inventory-rcxm.vercel.app/", 
  credentials: true,               
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],  
};
app.use(cors(corsOptions));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "frontend", "dist", "index.html"));
  });
}


app.use("/api/auth", authRoutes);
app.use("/api/agent", agentRoutes);
app.use("/api/firm", firmRoutes);
app.use("/api/transport", transportRoutes);
app.use("/api/quality", qualityRoutes);
app.use("/api/order", orderRoutes);

app.listen(PORT, () => {
  console.log("Server listening on port:", PORT);
  connectDB();
});
