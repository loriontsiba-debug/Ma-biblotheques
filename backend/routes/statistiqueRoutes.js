const express = require('express')
const router =  express.Router();

const statistiqueController = require('../controllers/statistiqueController')
router.get('/', statistiqueController.statDashboard)

module.exports = router