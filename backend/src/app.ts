import 'dotenv/config';
import express from 'express';
import blogPostRoutes from './routes/blog-posts';

const app = express();

// parse JSON bodies into JS objects
app.use(express.json());

app.use('/posts', blogPostRoutes);

export default app;
