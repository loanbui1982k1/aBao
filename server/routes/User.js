const express = require('express');
const router = express.Router();
const { User } = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

router.post('/', async (req, res) => {
  const { username, password, role_id, name } = req.body;
  const user = await User.findOne({ where: { username: username } });
  if (user) res.json({ error: 'Tên đăng nhập đã tồn tại' });
  else {
    bcrypt.hash(password, 10).then(async (hash) => {
      User.create({
        username: username,
        password: hash,
        role_id: role_id,
        name: name,
        current_course_id: 1,
        total_exp: 0,
        profile_photo_path: defaultProfilePath,
      });
      // Course_User.create({
      //   course_id: 1,
      //   username: username,
      //   current_chapter: 0,
      //   question_all_count: 100,
      //   question_learnt_count: 0,
      //   is_done: false,
      //   total_exp: 0,
      // });
      // const listChapter = await Chapter.findAll({ where: { course_id: 1 } });
      // for (let i = 0; i < listChapter.length; i++) {
      //   await Chapter_User.create({
      //     chapter_id: listChapter[i].chapter_id,
      //     username: username,
      //     is_done: false,
      //   });
      // }
    });
    res.json('SUCCESS');
  }
});

router.post('/changePass', async (req, res) => {
  const { username, password, newPassword } = req.body;
  const user = await User.findByPk(username);
  if (user) {
    bcrypt.compare(password, user.password).then((match) => {
      if (!match) res.json({ error: 'Mật khẩu không chính xác' });
      else {
        bcrypt.hash(newPassword, 10).then((hash) => {
          User.update(
            {
              password: hash,
            },
            {
              where: { username: username },
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




module.exports = router;
