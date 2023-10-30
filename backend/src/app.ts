import express, { Express, Request, Response, Application } from "express";
import dotenv from "dotenv";
import indexRouter from "./routes/index";
import mongoose from "mongoose";

dotenv.config();

const PORT = process.env.PORT || 3000;

const MONGODB_URI =
  process.env.NODE_ENV === "test"
    ? process.env.TEST_MONGODB_URI
    : process.env.MONGODB_URI;
if (!MONGODB_URI) {
  throw new Error("Invalid MONGODB_URI");
}
const app: Application = express();
app.use(express.json());

mongoose.set("strictQuery", false);

console.log("connecting to MongoDB");

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.error("error connecting to MongoDB:", error.message);
  });

app.use(indexRouter);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
