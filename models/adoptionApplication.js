const mongoose = require("mongoose");

const adoptionApplicationSchema = new mongoose.Schema({
  formId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true, // Form ID to identify which form was used for the application
  },
  applicantId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true, // User ID of the applicant
  },
  applicantName: {
    type: String,
    required: true,
  },
  applicantEmail: {
    type: String,
    required: true,
  },
  applicantPhone: {
    type: String,
    required: true,
  },
  applicantAddress: {
    districtOrCity: {
      type: String, // Text field for district or city
      required: true,
    },
    homeAddress: {
      type: String, // Text field for the home address
      required: true,
    },
  },
  answers: [
    {
      fieldId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true, // Field ID from the form
      },
      fieldName: {
        type: String,
        required: true, // Field label/name (e.g., "Full Name", "Email Address")
      },
      answer: {
        type: mongoose.Schema.Types.Mixed, // Mixed type to handle different types of answers (text, array, file paths)
        required: true, // Answer for the field
      },
    },
  ],
  submittedAt: {
    type: Date,
    default: Date.now, // Timestamp for when the application was submitted
  },
  adminHandling: {
    // New field for admin handling
    adminId: {
      type: mongoose.Schema.Types.ObjectId, // Admin handling the application
      ref: "User", // Assuming you have a User model for admin users
      required: false,
    },
    status: {
      type: String, // e.g., 'Under Review', 'Approved', 'Rejected'
      default: "Under Review",
    },
    notes: {
      type: String, // Admin's notes or comments about the application
      default: "",
    },
    handledAt: {
      type: Date, // Timestamp for when the admin handled the application
      default: null,
    },
  },
});

// Creating the AdoptionApplication model
const AdoptionApplication = mongoose.model(
  "AdoptionApplication",
  adoptionApplicationSchema
);

module.exports = AdoptionApplication;
