const express = require('express');
const router = express.Router();
const { Category } = require('../models');

router.get('/', async (req, res) => {
  const category = await Category.findAll();
  res.json(category);
});

module.exports = router;
