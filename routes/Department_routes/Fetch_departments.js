const express = require('express')
const { Fetch_departments } = require('../../controller/Departments/Fetch_departments')
const router = express.Router()
router.route('/fetch_departments').get(Fetch_departments)


module.exports = router