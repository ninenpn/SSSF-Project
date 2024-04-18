import express, { Application, Request, Response } from 'express';
import './config/dbconfig';
import userRoutes from './routes/userRoutes';

const Application = express();
const port: number = process.env.PORT ? parseInt(process.env.PORT) : 5000;

Application.use(express.json());
Application.use('/api/users', userRoutes);

Application.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});