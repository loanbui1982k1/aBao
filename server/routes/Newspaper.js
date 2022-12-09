const express = require('express');
const router = express.Router();
const { Newspaper } = require('../models');

router.get('/:nameCategory', async (req, res) => {
  let nameCategory = req.params.nameCategory;
  const newspaper = await Newspaper.findAll({
    where: {
      nameCategory: nameCategory,
    },
  });
  res.json(newspaper);
});

module.exports = router;
