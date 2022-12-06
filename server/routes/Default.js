const axios = require('axios');
const { JSDOM } = require('jsdom');
const { Readability } = require('@mozilla/readability');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  res.json('hello');
});

module.exports = router;
