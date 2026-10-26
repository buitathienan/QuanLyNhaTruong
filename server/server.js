import express from "express";
import cors from "cors";
import route from "./routes/route.js";
import mongoose from "mongoose";
import { app, server } from "./socket/index.js";
import 'dotenv/config'

const URI = process.env.DATABASE_URL
const PORT = 3000;
// const app = express();

app.use(cors());
app.use(express.json());
app.use("/", route);
//Connect to database
try {
  await mongoose.connect(URI);
  console.log("Connect to database successfully!");
} catch (error) {
  console.log(error);
  process.exit(1);
}
//Listen sever
server.listen(PORT, () => {
  console.log(`Sever is opening at http://localhost:${PORT}`);
});
