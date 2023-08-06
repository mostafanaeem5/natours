const express = require('express');
const morgan = require('morgan');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const app = express();
//1) Middlewares
app.use(morgan('dev'));
app.use(express.json());

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

//2) handlers

//3) routes
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

//4) ServerStart
app.listen(3000, () => {
  console.log('running on port 3000');
});
