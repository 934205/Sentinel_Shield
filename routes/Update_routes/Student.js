const express = require('express')
const { update_student } = require('../../controller/Update_controllers/Update_student')
const router = express.Router()
router.route('/update_student').put(update_student)

module.exports = router


