import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

const mongoUrl: string = process.env.mongo_url || '';

// Connect to MongoDB using Mongoose
mongoose.connect(mongoUrl)
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((error) => {
  console.error('MongoDB connection error:', error);
});

const connection = mongoose.connection;
export default connection;