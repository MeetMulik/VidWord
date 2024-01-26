import express from "express";
import cors from "cors";
import cardRoutes from "./routes/cardRoutes.js";
import connectDB from "./db/mongodb.js";

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/api/card", cardRoutes);

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Hello World!",
  });
});
connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
