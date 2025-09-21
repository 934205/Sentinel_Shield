const express = require('express')
const { upload_dept_year } = require('../../controller/Upload_controllers/dept_year_controller')
const router = express.Router()
router.route('/dept_year').post(upload_dept_year)

module.exports = router