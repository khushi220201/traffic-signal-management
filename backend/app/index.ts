import dotenv from "dotenv";
dotenv.config();

import cors from "cors";
import express from "express";
import "./config/db";
import routes from "./routes";

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Welcome to the traffic signal management system");
});

app.use("/api", routes);

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
});
