const express = require('express');
const router = express.Router();

router.all('/', async (req, res) => {
  res.json('hello');
});

module.exports = router;
