const express = require("express");
const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  login,
  uploadImage,
} = require("../controller/userController");
const UserValidation = require("../validation/userValidation");
const upload = require("../config/multerConfig");

const router = express.Router();

// CRUD Routes
router.post("/", createUser); // Create a new user
router.post("/upload", upload.single("image"), uploadImage);
router.get("/", getUsers); // Get all users
router.get("/:id", getUserById); // Get a specific user
router.put("/:id", updateUser); // Update an existing user
router.delete("/:id", deleteUser); // Delete a user
router.post("/login", login); // Login a user

module.exports = router;
