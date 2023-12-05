// routes/admin.js

const express = require('express');
const router = express.Router();

// Admin route
router.get('/', (req, res) => {
  res.send('Admin Route');
});

module.exports = router;
