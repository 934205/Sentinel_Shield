const express = require('express')
const { Fetch_attendance_advisor } = require('../../controller/Attendance_controllers/Fetch_attendance')
const { Fetch_attendance_hod } = require('../../controller/Attendance_controllers/Fetch_attendance')
const { Fetch_attendance_dean } = require('../../controller/Attendance_controllers/Fetch_attendance')
const router = express.Router()
const authmiddleware=require("../../controller/auth/middleware")

router.route('/fetch_attendance_advisor').get(authmiddleware,Fetch_attendance_advisor)
router.route('/fetch_attendance_hod').get(authmiddleware,Fetch_attendance_hod)
router.route('/fetch_attendance_dean').get(authmiddleware,Fetch_attendance_dean)

module.exports = router