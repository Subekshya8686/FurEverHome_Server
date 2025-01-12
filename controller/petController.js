const Pet = require("../models/pet");

// Get all pets
const getPets = async (req, res) => {
  try {
    const pets = await Pet.find({});
    // res.status(200).json(pets);
    res.status(200).json({
      success: true,
      count: pets.length,
      data: pets,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch pets" });
  }
};

// Get a single pet by ID
const getPetById = async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id);
    if (!pet) return res.status(404).json({ error: "Pet not found" });
    res.status(200).json(pet);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to fetch pet", details: error.message });
  }
};

// Create a new pet
// const createPet = async (req, res) => {
//   try {
//     let petData = req.body;

//     // If a photo is uploaded, store the photo's path
//     if (req.file) {
//       petData.photo = `/uploads/${req.file.originalname}`;
//     }

//     const pet = new Pet(petData);
//     const savedPet = await pet.save();
//     res.status(201).json(savedPet);
//   } catch (error) {
//     res
//       .status(500)
//       .json({ error: "Failed to create pet", details: error.message });
//   }
// };

const createPet = async (req, res) => {
  try {
    // Destructure required fields from req.body
    const {
      name,
      description,
      type,
      breed,
      age,
      weight,
      vaccinated,
      specialNeeds,
      healthDetails,
      height,
      eyeColor,
      furType,
      color,
      dateOfBirth,
      photo,
    } = req.body;

    // Basic validation for required fields
    if (!name || !type || !breed || !age || !weight || !dateOfBirth) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Prepare the pet data object
    const petData = {
      name,
      description,
      type,
      breed,
      age,
      weight,
      vaccinated,
      specialNeeds,
      healthDetails,
      height,
      eyeColor,
      furType,
      color,
      dateOfBirth,
      photo,
    };

    // Create and save the new pet
    const pet = new Pet(petData);
    const savedPet = await pet.save();

    // Respond with the saved pet data
    res.status(201).json({
      message: "Pet created successfully",
      data: savedPet,
    });
  } catch (error) {
    // Handle errors
    res.status(500).json({
      error: "Failed to create pet",
      details: error.message,
    });
  }
};

// Update a pet by ID
const updatePet = async (req, res) => {
  try {
    let petData = req.body;

    // If a new photo is uploaded, update the photo path
    if (req.file) {
      petData.photo = `/uploads/${req.file.filename}`;
    }

    const updatedPet = await Pet.findByIdAndUpdate(req.params.id, petData, {
      new: true,
      runValidators: true,
    });

    if (!updatedPet) return res.status(404).json({ error: "Pet not found" });
    res.status(200).json(updatedPet);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to update pet", details: error.message });
  }
};

// Delete a pet
const deletePet = async (req, res) => {
  try {
    const deletedPet = await Pet.findByIdAndDelete(req.params.id);
    if (!deletedPet) return res.status(404).json({ error: "Pet not found" });
    res.status(200).json({ message: "Pet deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to delete pet", details: error.message });
  }
};

module.exports = {
  getPets,
  getPetById,
  createPet,
  updatePet,
  deletePet,
};
