const express = require('express');
const router = express.Router();
const db = require('../models');
const { Favourite } = require('../models');

router.get('/', async (req, res) => {
  const { query } = req;
  const favourite = await Favourite.findOne({
    where: { idUser: query.idUser, idNewspaper: query.idNewspaper },
  });
  if (favourite) {
    return res.json({ favourite: true });
  } else return res.json({ favourite: false });
});

router.get('/newspaper', async (req, res) => {
  const { query } = req;
  const result = await db.sequelize.query(
    `select n.* from Favourites f inner join Newspapers n on f.idNewspaper = n.idNewspaper 
      where f.idUser = ${query.idUser} and n.nameCategory = "${query.nameCategory}"`,
    { type: db.sequelize.QueryTypes.SELECT }
  );
  res.json(result);
});

router.get('/:idUser', async (req, res) => {
  const { idUser } = req.params;
  const result = await db.sequelize.query(
    `select n.* from Favourites f inner join Newspapers n on f.idNewspaper = n.idNewspaper 
      where f.idUser = ${idUser}`,
    { type: db.sequelize.QueryTypes.SELECT }
  );
  res.json(result);
});

router.get('/category/:idUser', async (req, res) => {
  const { idUser } = req.params;
  try {
    const result = await db.sequelize.query(
      `select n.nameCategory from Favourites f inner join Newspapers n on f.idNewspaper = n.idNewspaper 
      where f.idUser = ${idUser} 
      group by nameCategory`,
      { type: db.sequelize.QueryTypes.SELECT }
    );
    res.json(result);
  } catch (error) {
    console.log(error);
  }
});

router.post('/', async (req, res) => {
  const { idUser, idNewspaper } = req.body;
  Favourite.create({
    idUser: idUser,
    idNewspaper: idNewspaper,
  });
  res.json('SUCCESS');
});

router.delete('/', async (req, res) => {
  const { query } = req;
  console.log(query);
  Favourite.destroy({
    where: {
      idUser: query.idUser,
      idNewspaper: query.idNewspaper,
    },
  });
  res.json('SUCCESS');
});

module.exports = router;
