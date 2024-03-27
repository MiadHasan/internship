import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import userRouters from "./routers/user.js";

const app = express();
dotenv.config();

app.use(express.json());
app.use(cors());
app.use("/users", userRouters);

app.get("/", (req, res) => {
  res.send("hello world!");
});

const port = process.env.PORT;

mongoose
  .connect(process.env.MONGO_CONNECTION_URL)
  .then(() =>
    app.listen(port, () => console.log("Server is listening in port: ", port)),
  )
  .catch((err) => console.log(err));
