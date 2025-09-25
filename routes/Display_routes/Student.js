const express = require('express')
const { Display_all_dept_student } = require('../../controller/Display_controllers/Display_student')
const { Display_dept_student } = require('../../controller/Display_controllers/Display_student')
const { Display_class_student } = require('../../controller/Display_controllers/Display_student')
const router = express.Router()
const authmiddleware=require("../../controller/auth/middleware")


router.route('/display_dll_dept_student').get(authmiddleware,Display_all_dept_student)
router.route('/display_dept_student').get(authmiddleware,Display_dept_student)
router.route('/display_class_student').get(authmiddleware,Display_dept_student)



module.exports = router