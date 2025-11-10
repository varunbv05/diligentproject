// app.js

import 'dotenv/config';
import './clients/db'; // Database connection (MongoDB)
import express from 'express';
import Boom from 'boom';
import cors from 'cors';
import limiter from './rate-limiter'; // Rate limiter middleware
import routes from './routes'; // Import your API routes

const app = express();

// Enable CORS for all origins
app.use(cors());

// Apply rate limiter to prevent brute force attacks
app.use(limiter);

// Parse incoming requests as JSON and handle URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Mount your main API routes
app.use(routes);

// Handle unknown API routes (404 handler)
app.use((req, res, next) => {
  return next(Boom.notFound('This route does not exist.'));
});

// Centralized error handling middleware (Boom or plain errors)
app.use((err, req, res, next) => {
  console.log(err);
  if (err) {
    if (err.output) {
      return res.status(err.output.statusCode || 500).json(err.output.payload);
    }
    return res.status(500).json({ message: err.message || 'Internal Server Error' });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server is up on port ${PORT}!`));
