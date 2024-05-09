import express, { Application, Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import { ApolloServer } from 'apollo-server-express';
import {
  ApolloServerPluginLandingPageLocalDefault,
  ApolloServerPluginLandingPageProductionDefault
} from 'apollo-server-core';
import typeDefs from './schemas/index';
import resolvers from './resolvers/index';
import userRoutes from './routes/userRoutes';
import transactionsRoutes from './routes/transactionsRoute';
import requestsRoutes from './routes/requestsRoute';
import './config/dbconfig';
import path from 'path';

dotenv.config();

const app: Application = express();
const PORT: number = parseInt(process.env.PORT, 10) || 5000;

app.use(cors({
    origin: '*', // Consider more restrictive settings in production
    credentials: true,
}));

app.use(helmet()); // Sets various HTTP headers for security

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.send('Server is running!');
});

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true, // Ensure to turn this off or manage wisely in production if needed
  plugins: [
    process.env.ENVIRONMENT === 'production'
      ? ApolloServerPluginLandingPageProductionDefault({
          graphRef: 'my-graph-id@my-graph-variant',
          footer: false,
        })
      : ApolloServerPluginLandingPageLocalDefault({footer: false}),
  ],
});

async function startServer() {
    await server.start();
    server.applyMiddleware({ app, path: '/graphql' });

    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
        console.log(`GraphQL path is http://localhost:${PORT}/graphql`);
    });
}

app.use('/api/users', userRoutes);
app.use('/api/requests', requestsRoutes);
app.use('/api/transactions', transactionsRoutes);

__dirname = path.resolve();
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    app.get('*', (req: Request, res: Response, next: NextFunction) => {
        if (!req.path.startsWith('/api') && !req.path.startsWith('/graphql')) {
            res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
        } else {
            next();
        }
    });
} 

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(`Error at ${req.method} ${req.url}:`, err);
    const errorResponse = {
        error: "Internal Server Error",
        message: err.message
    };
    if (process.env.ENVIRONMENT === 'development') {
        errorResponse['stack'] = err.stack;
    }
    res.status(500).json(errorResponse);
});

startServer();
