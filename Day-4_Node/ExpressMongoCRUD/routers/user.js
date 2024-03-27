import express from "express";
import {
  createUser,
  deleteUser,
  getUserById,
  getUsers,
  updateUser,
} from "../controllers/user.js";

const router = express.Router();

router.post("/", createUser);
router.patch("/:id", updateUser);
router.get("/:id", getUserById);
router.delete("/:id", deleteUser);
router.get("/", getUsers);

export default router;
