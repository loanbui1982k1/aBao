const axios = require('axios');
const { JSDOM } = require('jsdom');
const { Readability } = require('@mozilla/readability');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  const { url } = req.query;
  try {
    await axios.get(url).then((r2) => {
      let dom = new JSDOM(r2.data, {
        url: url,
      });
      let article = new Readability(dom.window.document).parse();
      res.json({ success: true, data: article.textContent });
    });
  } catch (error) {
    res.json({ success: false });
  }
});

module.exports = router;
