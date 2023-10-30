import 'dotenv/config';
import express from 'express';
import blogPostRoutes from './routes/blog-posts';
import cors from 'cors';
import env from './env';
import morgan from 'morgan';

const app = express();

app.use(morgan('dev'));

// parse JSON bodies into JS objects
app.use(express.json());

app.use(
  cors({
    origin: env.FRONTEND_URL,
  })
);

app.use('/posts', blogPostRoutes);

export default app;
