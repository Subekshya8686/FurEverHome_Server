const express = require("express");
const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} = require("../controller/userController");

const router = express.Router();

// CRUD Routes
router.post("/", createUser);          // Create a new user
router.get("/", getUsers);             // Get all users
router.get("/:id", getUserById);       // Get a specific user
router.put("/:id", updateUser);        // Update an existing user
router.delete("/:id", deleteUser);     // Delete a user

module.exports = router;
