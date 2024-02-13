import express from 'express';
import { PORT } from './config.js';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();

app.use(express.json());

app.use(cors());

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log('App connected to database');
    app.listen(PORT, () => {
      console.log(`App is running on port ${PORT}`);  
    });
  })
  .catch((error) => {
    console.log(error);
  });