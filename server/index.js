const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());

const db = require('./models');

// Routers

const defaultRouter = require('./routes/Default');
const userRouter = require('./routes/User');
const detailRouter = require('./routes/Detail');
app.use('/', defaultRouter);
app.use('/users', userRouter);
app.use('/detail', detailRouter);

const categoryRouter = require('./routes/Category');
app.use('/category', categoryRouter);

const newspaperRouter = require('./routes/Newspaper');
app.use('/newspaper', newspaperRouter);

db.sequelize.sync().then(() => {
  app.listen(3001, () => {
    console.log('Server running on port 3001');
  });
});
