const express = require("express");
const router = express.Router();
const {
  getData,
  postData,
  findById,
  deleteByID,
  update,
} = require("../controller/userController");
const userValidation = require("../validation/userValidation");
// const authenticateToken = require("../security/auth");

router.get("/", getData);
router.post("/", userValidation, postData);
router.get("/:id", findById);
router.delete("/:id", deleteByID);
router.put("/:id", update);

module.exports = router;
