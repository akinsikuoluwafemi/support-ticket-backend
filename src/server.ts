import express from 'express';
import mongoose from 'mongoose';
import helmet from 'helmet';
import morgan from 'morgan';
import ticketRoutes from './routes/Ticket';
import { config } from './config/config';

import dotenv from 'dotenv';
dotenv.config();

// Creating the express app
export const app = express();
app.use(express.json());
app.use(helmet());
app.use(morgan('common'));

const start = async () => {
  try {
    // Creating the mongoDB connection
    const mongoConnection = await mongoose.connect(config.mongo.url, {
      retryWrites: true,
      w: 'majority',
    });
    if (mongoConnection) {
      console.log('Successfully connected to MongoDB');
    }

    // Starting the server
    await new Promise<void>((resolve, reject) => {
      app.listen(4000, resolve).on('error', reject);
    });
    console.log(`Server started at http://localhost:4000`);
  } catch (error: unknown) {
    console.log('Failed to connect to MongoDB');
    console.log(error);
    process.exit(1);
  }
};

process.on('beforeExit', async () => {
  await mongoose.disconnect();
  console.log('mongoose disconnected');
});

if (require.main === module) {
  start();
}

// for cors
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, PATCH, OPTIONS'
  );
  next();
});

// health check
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the supports tickets API' });
});

/** Routes */
app.use('/tickets', ticketRoutes);

export { start };
