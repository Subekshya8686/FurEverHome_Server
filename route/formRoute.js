const express = require('express');
const router = express.Router();
const formController = require('../controller/formController');

// Create a dynamic form (adoption, foster, or custom)
router.post('/form', formController.createForm);

// Get all dynamic forms (optional filter by type, e.g., 'adoption')
router.get('/forms', formController.getForms);

// Get a specific form by ID
router.get('/form/:id', formController.getFormById);

// Update a specific form by ID
router.put('/form/:id', formController.updateForm);

// Delete a specific form by ID
router.delete('/form/:id', formController.deleteForm);

module.exports = router;
