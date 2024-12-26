const AdoptionApplication = require("../models/adoptionApplication");

// Submit an adoption application
const submitAdoptionApplication = async (req, res) => {
  try {
    const {
      formId,
      applicantId,
      applicantName,
      applicantEmail,
      applicantPhone,
      applicantAddress,
      answers,
      adminHandling,
    } = req.body;

    // Validate required fields
    if (
      !formId ||
      !applicantId ||
      !applicantName ||
      !applicantEmail ||
      !applicantPhone ||
      !applicantAddress ||
      !answers
    ) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Set up adminHandling if not provided, defaults to empty fields
    const adminHandlingData = adminHandling || {
      adminId: null, // Admin ID will be assigned later
      status: "Under Review", // Default status
      notes: "", // Default notes
      handledAt: null, // Default handledAt as null
    };

    // Create the new adoption application
    const newAdoptionApplication = new AdoptionApplication({
      formId,
      applicantId,
      applicantName,
      applicantEmail,
      applicantPhone,
      applicantAddress, // Ensure applicantAddress is included in the request body
      answers, // Ensure answers is an array of questions/answers
      adminHandling: adminHandlingData, // Include adminHandling field
    });

    // Save the application to the database
    await newAdoptionApplication.save();

    // Return a success response
    res
      .status(201)
      .json({
        message: "Adoption application submitted successfully",
        data: newAdoptionApplication,
      });
  } catch (error) {
    console.error("Error submitting adoption application:", error);
    res
      .status(500)
      .json({
        error: "Failed to submit adoption application",
        details: error.message,
      });
  }
};

// Get all adoption applications
const getAllAdoptionApplications = async (req, res) => {
  try {
    const applications = await AdoptionApplication.find();
    res.status(200).json(applications);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to fetch adoption applications",
      details: error.message,
    });
  }
};

// Get a specific adoption application by ID
const getAdoptionApplicationById = async (req, res) => {
  try {
    const application = await AdoptionApplication.findById(req.params.id);
    if (!application)
      return res.status(404).json({ error: "Adoption application not found" });
    res.status(200).json(application);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to fetch adoption application",
      details: error.message,
    });
  }
};

const deleteAdoptionApplication = async (req, res) => {
  const { id } = req.params; // ID of the adoption application to delete

  try {
    const adoptionApplication = await AdoptionApplication.findByIdAndDelete(id);

    if (!adoptionApplication) {
      return res.status(404).json({ error: "Adoption application not found" });
    }

    res
      .status(200)
      .json({ message: "Adoption application deleted successfully" });
  } catch (error) {
    console.error("Error deleting adoption application:", error);
    res
      .status(500)
      .json({
        error: "Failed to delete adoption application",
        details: error.message,
      });
  }
};

module.exports = {
  submitAdoptionApplication,
  getAllAdoptionApplications,
  getAdoptionApplicationById,
  deleteAdoptionApplication,
};
