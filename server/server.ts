import express, { Application, Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginLandingPageLocalDefault, ApolloServerPluginLandingPageProductionDefault } from 'apollo-server-core';
import typeDefs from './schemas/index';
import resolvers from './resolvers/index';
import userRoutes from './routes/userRoutes';
import transactionsRoutes from './routes/transactionsRoute';
import requestsRoutes from './routes/requestsRoute';

// Import database configuration
import './config/dbconfig';
import path from 'path';

// Load environment variables from .env file
dotenv.config();

const app: Application = express();
const PORT: number = process.env.PORT ? parseInt(process.env.PORT) : 5000;

// Enable CORS with default settings
app.use(cors());

// Support parsing of application/json type post data
app.use(express.json());

// Simple health check route
app.get('/', (req: Request, res: Response) => {
    res.send('Server is running!');
});

// Set up Apollo Server for GraphQL
const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
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

// Routing for API endpoints
app.use('/api/users', userRoutes);
app.use('/api/requests', requestsRoutes);
app.use('/api/transactions', transactionsRoutes);

// Start the server with Apollo middleware properly initialized
startServer();

// heroku deployment
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

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(`Error at ${req.method} ${req.url}: ${err.message}`);
    res.status(500).json({
        error: "Internal Server Error",
        message: err.message
    });
});
