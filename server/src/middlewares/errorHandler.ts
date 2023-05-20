import { Request, Response } from 'express';
import HttpErrorModel from '../models/HttpErrorModel';

// Error handler middleware function
function errorHandler(err: Error, _: Request, res: Response) {
  console.error(err); // Log the error for debugging purposes

  // Check if the error is an instance of a known error class
  if (err instanceof HttpErrorModel) {
    // Handle the known error
    return res.status(err.code).json({ error: err.message });
  }

  // Handle other types of errors
  return res.status(500).json({ error: 'Internal Server Error' });
}

module.exports = errorHandler;
