const express = require('express')
const { upload_timing } = require('../../controller/Upload_controllers/timing_controller')
const router = express.Router()
const authmiddleware=require("../../controller/auth/middleware")


router.route('/timing').post(authmiddleware,upload_timing)


module.exports = router