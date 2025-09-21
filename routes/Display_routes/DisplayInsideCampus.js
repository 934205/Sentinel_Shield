const express = require('express')
const { Display_student_inside_campus } = require('../../controller/Display_controllers/StudentsInsideCampus')
const router = express.Router()


router.route('/display_students_inside_campus').get(Display_student_inside_campus)


module.exports = router