import 'dotenv/config';
import express from 'express';
import blogPostRoutes from './routes/blog-posts';
import cors from 'cors';
import env from './env';
import morgan from 'morgan';
import errorHandler from './middleware/errorHandler';
import createHttpError from 'http-errors';

const app = express();

app.use(morgan('dev'));

// parse JSON bodies into JS objects
app.use(express.json());

app.use(
  cors({
    origin: env.FRONTEND_URL,
  })
);

app.use('/uploads/featured-images', express.static('uploads/featured-images'));

app.use('/posts', blogPostRoutes);

app.use((req, res, next) => next(createHttpError(404, 'Resource Not found')));

app.use(errorHandler);

export default app;
