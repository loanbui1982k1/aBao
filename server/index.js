const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());

const db = require('./models');

// Routers

const userRouter = require('./routes/User');
const detailRouter = require('./routes/Detail');
app.use('/users', userRouter);
app.use('/detail', detailRouter);

db.sequelize.sync().then(() => {
  app.listen(3001, () => {
    console.log('Server running on port 3001');
  });
});
