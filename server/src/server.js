import express from 'express';
import 'dotenv/config';
import mongoose from 'mongoose';
import cors from 'cors';
import routes from './routes/index.js';
import cookieParser from 'cookie-parser';

const app = express();

app.use(
  cors({
    origin: process.env.URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api', routes);

const port = process.env.PORT || 3002;
// const url = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.qm0ui7p.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const url = 'mongodb://localhost:27017';

app.listen(port, async () => {
  await mongoose
    .connect(url)
    .then(() => {
      console.log('Connect DB successfully');
    })
    .catch((err) => {
      console.log(err);
    });
  console.log('listening on port http://localhost:' + port);
});
