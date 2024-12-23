const User = require("../models/user");

// Get all users
const getData = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to fetch users", details: err.message });
  }
};

// Add a new user
const postData = async (req, res) => {
  try {
    const { name, email, password, role, address, phone } = req.body;

    // Validation
    if (!name || !email || !password || !role || !address || !phone) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const user = new User(req.body);
    const saved = await user.save();
    res.status(201).json(saved);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to create user", details: err.message });
  }
};

// Get user by ID
const findById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to fetch user", details: err.message });
  }
};

// Delete user by ID
const deleteByID = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to delete user", details: err.message });
  }
};

// Update user by ID
const update = async (req, res) => {
  try {
    const { name, email, password, role, address, phone } = req.body;

    // Validation
    if (!name || !email || !password || !role || !address || !phone) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true, // Ensures Mongoose validates updated fields
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(user);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to update user", details: err.message });
  }
};

module.exports = {
  getData,
  postData,
  findById,
  deleteByID,
  update,
};
