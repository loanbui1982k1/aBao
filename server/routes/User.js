const express = require('express');
const router = express.Router();
const { User } = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const defaultProfilePath =
  'https://firebasestorage.googleapis.com/v0/b/funmath-80422.appspot.com/o/defaultProfileImage.png?alt=media&token=790800d6-aac7-4359-a541-e73b3348e3cb';


router.post('/', async (req, res) => {
  const { email, username, password } = req.body;
  const user = await User.findOne({ where: { email: email } });
  if (user) res.json({ error: 'Email đã tồn tại' });
  else {
    bcrypt.hash(password, 10).then(async (hash) => {
      User.create({
        email: email,
        username: username,
        password: hash,
        profile_photo_path: defaultProfilePath,
      });
    });
    res.json('SUCCESS');
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({
    where: { email: email },
  });
  if (user) {
    bcrypt.compare(password, user.password).then((match) => {
      if (!match) res.json({ error: 'Mật khẩu không chính xác' });
      else {
        res.json({
          username: user.username,
          email: user.email,
          idUser: user.idUser,
          profile_photo_path: user.profile_photo_path,
        });
      }
    });
  } else {
    res.json({ error: 'Tài khoản chưa tồn tại' });
  }
});

router.get('/', async (req, res) => {

  res.json('SUCCESS');
}
);

router.post('/changePass', async (req, res) => {
  const { idUser, passCurrent, passNew } = req.body;
  const user = await User.findByPk(idUser);
  if (user) {
    bcrypt.compare(passCurrent, user.password).then((match) => {
      if (!match) res.json({ error: 'Mật khẩu không chính xác' });
      else {
        bcrypt.hash(passNew, 10).then((hash) => {
          User.update(
            {
              password: hash,
            },
            {
              where: { idUser: idUser },
            }
          );
        });
        res.json('SUCCESS');
      }
    });
  } else {
    res.json({ error: 'Tài khoản chưa tồn tại' });
  }
});

router.post('/update', async (req, res) => {
  const { username, password, profilePhotoPath, idUser } = req.body;
  const updateQuery = {};
  if (password) {
    await bcrypt.hash(password, 10).then((hash) => {
      updateQuery['password'] = hash;
    });
  }
  if (username) {
    updateQuery['username'] = username;
  }
  if (profilePhotoPath) {
    updateQuery['profile_photo_path'] = profilePhotoPath;
  }
  User.update(updateQuery, { where: { idUser: idUser } });
  res.json('SUCCESS');
});


module.exports = router;
