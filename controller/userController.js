const User = require("../models/user");
const bcrypt = require("bcryptjs"); // Fixed spelling of 'bcrypt'
const jwt = require("jsonwebtoken");
const upload = require("../config/multerConfig");
// const user = require("../models/credential");
const SECRET_KEY = "secretkey123";

// Get all user
const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    // res.status(200).json(users);
    res.status(200).json({
      success: true,
      count: users.length,
      data: users,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

// Get a single user by ID
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch user" });
  }
};

// Create a new user
// const createUser = async (req, res) => {
//   try {
//     const { name, email, password, phone, address, dateOfBirth, role } =
//       req.body;
//     const image = req.file ? req.file.filename : null;
//     // Check if the email already exists
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ error: "Email already exists" });
//     }

//     // Hash the password
//     const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

//     // Create a new user with the hashed password
//     const user = new User({
//       name,
//       email,
//       password: hashedPassword, // Save the hashed password
//       phone,
//       image,
//       address,
//       dateOfBirth,
//       role,
//     });

//     // Save the user to the database
//     const savedUser = await user.save();

//     // Return the saved user (excluding the password for security)
//     const userResponse = savedUser.toObject();
//     delete userResponse.password; // Remove the password from the response

//     res.status(201).json(userResponse);
//   } catch (error) {
//     res
//       .status(500)
//       .json({ error: "Failed to create user", details: error.message });
//   }
// };

const createUser = async (req, res) => {
  try {
    const { name, email, password, phone, image, address, dateOfBirth, role } =
      req.body;

    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }

    // Hash password (ensure password is defined)
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user object
    const user = new User({
      name,
      email,
      password: hashedPassword,
      phone,
      address,
      dateOfBirth, // Store the validated date
      image, // Store the filename of the uploaded image
      role,
    });

    // Save to DB
    const savedUser = await user.save();
    const userResponse = savedUser.toObject();
    delete userResponse.password; // Remove password from response for security

    // Send success response
    res.status(201).json({
      success: true,
      message: "User Created Successfully",
    });
  } catch (error) {
    console.error(error); // Log the error for debugging
    console.log(res);
    res
      .status(500)
      .json({ error: "Failed to create user", details: error.message });
  }
};

// Update a user
const updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedUser) return res.status(404).json({ error: "User not found" });
    res.status(200).json(updatedUser);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to update user", details: error.message });
  }
};

// Delete a user
const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) return res.status(404).json({ error: "User not found" });
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete user" });
  }
};

// const login = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // Find the user by username
//     const user = await User.findOne({ email });
//     if (!user || !(await bcrypt.compare(password, user.password))) {
//       return res.status(400).json({ error: "Invalid credentials" });
//     }

//     // Generate a JWT token
//     const token = jwt.sign({ email, role: user.role }, SECRET_KEY, {
//       expiresIn: "1h",
//     });

//     res.json({ message: "Login successful", token });
//   } catch (error) {
//     res.status(500).json({ error: "Failed to login", details: error.message });
//   }
// };

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Invalid Credentials" });
    }

    // Compare the provided password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: "Invalid Password" });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role }, // Payload
      SECRET_KEY,
      { expiresIn: "1h" } // Token expiration
    );

    // Return success response with the token
    res.json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ error: "Failed to login", details: error.message });
  }
};

const uploadImage = async (req, res, next) => {
  // Using multer middleware to handle the file upload
  // upload(req, res, (err) => {
  //   if (err) {
  //     return res.status(400).json({ message: err.message }); // Handle errors like invalid file type or file size
  //   }

  //   if (!req.file) {
  //     return res.status(400).json({ message: "Please upload a file" });
  //   }

  //   // Return success response with the uploaded file's filename
  //   res.status(200).json({
  //     success: true,
  //     data: req.file.filename, // Send the file name as response
  //   });
  // });
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded." });
  }
  res.status(200).json({
    success: true,
    data: req.file.filename, // Send the file name as response
  });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  login,
  uploadImage,
};
