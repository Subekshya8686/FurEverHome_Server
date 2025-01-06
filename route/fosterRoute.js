const express = require("express");
const router = express.Router();
const fosterApplicationController = require("../controller/fosterController");

// Route to submit a new foster application
router.post("/apply", fosterApplicationController.submitFosterApplication);

// Route to get all foster applications (for admin or review purposes)
router.get("/getAll", fosterApplicationController.getAllFosterApplications);

// Route to get a specific foster application by its ID
router.get("/get/:id", fosterApplicationController.getFosterApplicationById);

// Route to delete a foster application
router.delete(
  "/delete/:id",
  fosterApplicationController.deleteFosterApplication
);

module.exports = router;
