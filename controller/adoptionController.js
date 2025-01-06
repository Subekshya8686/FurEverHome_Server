const AdoptionApplication = require("../models/adoptionApplication");

// Submit an adoption application
const submitAdoptionApplication = async (req, res) => {
  try {
    const {
      applicantId,
      applicantName,
      applicantEmail,
      applicantPhone,
      districtOrCity,
      homeAddress,
      householdMembers,
      hasPets,
      petDetails,
      residenceType,
      reasonForAdoption,
      experienceWithPets,
      agreementToTerms,
    } = req.body;

    // Validate required fields
    if (
      !applicantId ||
      !applicantName ||
      !applicantEmail ||
      !applicantPhone ||
      !districtOrCity ||
      !homeAddress ||
      !householdMembers ||
      hasPets === undefined ||
      !residenceType ||
      !reasonForAdoption ||
      !experienceWithPets ||
      agreementToTerms === undefined
    ) {
      return res.status(400).json({ error: "All required fields must be filled" });
    }

    // Create a new adoption application
    const newAdoptionApplication = new AdoptionApplication({
      applicantId,
      applicantName,
      applicantEmail,
      applicantPhone,
      districtOrCity,
      homeAddress,
      householdMembers,
      hasPets,
      petDetails,
      residenceType,
      reasonForAdoption,
      experienceWithPets,
      agreementToTerms,
    });

    // Save to the database
    await newAdoptionApplication.save();

    res.status(201).json({
      message: "Adoption application submitted successfully",
      data: newAdoptionApplication,
    });
  } catch (error) {
    console.error("Error submitting adoption application:", error);
    res.status(500).json({
      error: "Failed to submit adoption application",
      details: error.message,
    });
  }
};

// Get all adoption applications
const getAllAdoptionApplications = async (req, res) => {
  try {
    const applications = await AdoptionApplication.find({});
    res.status(200).json({
      success: true,
      count: applications.length,
      data: applications,
    });
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
    if (!application) {
      return res.status(404).json({ error: "Adoption application not found" });
    }
    res.status(200).json(application);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to fetch adoption application",
      details: error.message,
    });
  }
};

// Delete an adoption application
const deleteAdoptionApplication = async (req, res) => {
  try {
    const application = await AdoptionApplication.findByIdAndDelete(req.params.id);
    if (!application) {
      return res.status(404).json({ error: "Adoption application not found" });
    }
    res.status(200).json({ message: "Adoption application deleted successfully" });
  } catch (error) {
    console.error("Error deleting adoption application:", error);
    res.status(500).json({
      error: "Failed to delete adoption application",
      details: error.message,
    });
  }
};

// Admin review adoption application
const reviewAdoptionApplication = async (req, res) => {
  try {
    const { adminId, adminStatus, adminNotes } = req.body;
    const { id } = req.params; // Application ID

    // Validate required fields
    if (!adminId || !adminStatus) {
      return res.status(400).json({ error: "Admin ID and status are required" });
    }

    // Update the application with admin review details
    const updatedApplication = await AdoptionApplication.findByIdAndUpdate(
      id,
      { adminId, adminStatus, adminNotes, handledAt: new Date() },
      { new: true } // Return the updated document
    );

    if (!updatedApplication) {
      return res.status(404).json({ error: "Adoption application not found" });
    }

    res.status(200).json({
      message: "Application reviewed successfully",
      data: updatedApplication,
    });
  } catch (error) {
    console.error("Error reviewing adoption application:", error);
    res.status(500).json({
      error: "Failed to review adoption application",
      details: error.message,
    });
  }
};

module.exports = {
  submitAdoptionApplication,
  getAllAdoptionApplications,
  getAdoptionApplicationById,
  deleteAdoptionApplication,
  reviewAdoptionApplication,
};
