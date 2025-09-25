const express = require("express");
const multer = require("multer");
const { Upload_Image } = require("../../controller/Upload_controllers/upload_image");

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.route("/upload_image").post(upload.single("image"), Upload_Image);

module.exports = router;
