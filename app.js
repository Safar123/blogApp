const express = require('express');
const userRouter = require('./routes/userRoutes');
const blogRouter = require('./routes/blogRoutes');
const errorHandler = require('./middleware/errorHandler');
const reviewRoutes = require('./routes/reviewRoutes');
const app = express();

app.use(express.json());
app.use('/api/v1/user', userRouter);
app.use('/api/v1/blog', blogRouter);
app.use('/api/v1/review', reviewRoutes);

app.use(errorHandler);
module.exports= app;