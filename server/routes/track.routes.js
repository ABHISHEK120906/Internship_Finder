const express = require('express');
const router = express.Router();
const { trackVisitorAction } = require('../controllers/tracker.controller');

router.post('/', trackVisitorAction);

module.exports = router;
