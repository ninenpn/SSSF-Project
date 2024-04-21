import express, { Application, Request, Response } from 'express';
import './config/dbconfig';
import userRoutes from './routes/userRoutes';
import transactionsRoutes from './routes/transactionsRoute';
import requestsRoutes from './routes/requestsRoute';

const Application = express();
const port: number = process.env.PORT ? parseInt(process.env.PORT) : 5000;

Application.use(express.json());
Application.use('/api/users', userRoutes);
Application.use('/api/transactions', transactionsRoutes);
Application.use('/api/requests', requestsRoutes);

Application.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});