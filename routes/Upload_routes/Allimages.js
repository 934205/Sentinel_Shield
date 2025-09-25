const express = require("express");
const router = express.Router();
const { Upload_Images_Zip } = require("../../controller/Upload_controllers/uploadAllImages");

router.post("/upload_zip_images", Upload_Images_Zip);

module.exports = router;
