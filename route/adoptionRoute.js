const express = require('express');
const router = express.Router();
const adoptionController = require('../controller/adoptionController');

// POST request to submit an adoption application
router.post('/adoption', adoptionController.submitAdoptionApplication);

// GET request to get all adoption applications
router.get('/adoption', adoptionController.getAllAdoptionApplications);

// GET request to get a specific adoption application by ID
router.get('/adoption/:id', adoptionController.getAdoptionApplicationById);

module.exports = router;
