const express = require("express");
const router = express.Router();
const petController = require("../controller/petController");
const upload = require("../config/multerConfig");

// Create a new pet
router.post("/create", upload.single("photo"), petController.createPet);

// Get all pets
router.get("/get", petController.getPets);

// Get a specific pet by ID
router.get("/get/:id", petController.getPetById);

// Update a pet by ID
router.put("/update/:id", upload.single("photo"), petController.updatePet);

// Delete a pet by ID
router.delete("/delete/:id", petController.deletePet);

module.exports = router;
