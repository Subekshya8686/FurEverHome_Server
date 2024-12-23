const express = require("express");
const router = express.Router();

const multer = require("multer");
const { uploadFile } = require("../controller/imageController");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });
router.post("/upload",upload.single("image"),uploadFile);


module.exports = router;