const express = require('express')
const { Display_Profile } = require('../../controller/Display_controllers/Display_profile')
const router = express.Router()
const authmiddleware=require("../../controller/auth/middleware")


router.route('/display_profile').get(authmiddleware,Display_Profile)


module.exports = router