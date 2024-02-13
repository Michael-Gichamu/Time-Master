import express from 'express';
import { PORT, mongoDBURL } from './config.js';
import mongoose from 'mongoose';
import cors from 'cors';
import project from './routes/projectsRoute.js';

const app = express();

app.use(express.json());

app.use(cors());

app.get('/', (request, response) => {
  return response.status(234).send('Welcome To Time Tracker Project API');
});

app.use('/projects', project);

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