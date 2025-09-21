const express = require('express')
const { Display_student } = require('../../controller/Display_controllers/Display_student')
const router = express.Router()
const authmiddleware=require("../../controller/auth/middleware")


router.route('/display_student').get(authmiddleware,Display_student)


module.exports = router