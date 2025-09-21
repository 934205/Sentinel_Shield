const express = require('express')
const { Fetch_attendance } = require('../../controller/Attendance_controllers/Fetch_attendance')
const router = express.Router()
const authmiddleware=require("../../controller/auth/middleware")

router.route('/fetch_attendance').get(authmiddleware,Fetch_attendance)


module.exports = router