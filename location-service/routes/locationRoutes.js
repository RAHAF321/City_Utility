const express = require('express');
const { getLocation } = require('../controllers/locationController');

const router = express.Router();

router.get('/', getLocation);

module.exports = router;