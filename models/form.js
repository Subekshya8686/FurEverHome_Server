const mongoose = require('mongoose');

// Define the schema for each question/field in the form
const fieldSchema = new mongoose.Schema({
  type: {
    type: String, // e.g., text, radio, checkbox, etc.
    required: true,
  },
  label: {
    type: String,
    required: true, // e.g., "Full Name", "Are you a pet owner?"
  },
  options: [String], // For fields like radio buttons or checkboxes
  required: {
    type: Boolean,
    default: false, // If the question is mandatory
  },
});

// Define the schema for the form itself
const formSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true, // Title of the form (e.g., Adoption Form, Foster Application)
  },
  description: {
    type: String,
    required: true, // Description of the form
  },
  fields: [fieldSchema], // Dynamic fields in the form
  type: {
    type: String, // e.g., 'adoption', 'foster', or custom type
    required: true,
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
});

const Form = mongoose.model('Form', formSchema);

module.exports = Form;
