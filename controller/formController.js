const Form = require('../models/form');

// Create a new dynamic form
const createForm = async (req, res) => {
  try {
    const { title, description, fields, type } = req.body;
    const newForm = new Form({
      title,
      description,
      fields,
      type,
    });
    const savedForm = await newForm.save();
    res.status(201).json(savedForm);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create form', details: error.message });
  }
};

// Get all forms (can be filtered by type, e.g., adoption or foster)
const getForms = async (req, res) => {
  try {
    const forms = await Form.find();
    res.status(200).json(forms);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch forms' });
  }
};

// Get a form by ID
const getFormById = async (req, res) => {
  try {
    const form = await Form.findById(req.params.id);
    if (!form) {
      return res.status(404).json({ error: 'Form not found' });
    }
    res.status(200).json(form);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch form' });
  }
};

// Update a form
const updateForm = async (req, res) => {
  try {
    const updatedForm = await Form.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedForm) return res.status(404).json({ error: 'Form not found' });
    res.status(200).json(updatedForm);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update form' });
  }
};

// Delete a form
const deleteForm = async (req, res) => {
  try {
    const deletedForm = await Form.findByIdAndDelete(req.params.id);
    if (!deletedForm) return res.status(404).json({ error: 'Form not found' });
    res.status(200).json({ message: 'Form deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete form' });
  }
};

module.exports = {
  createForm,
  getForms,
  getFormById,
  updateForm,
  deleteForm,
};
