const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const path = require('path');

let memoryServer;

const connectDB = async () => {
  const env = process.env.NODE_ENV || 'development';
  const uri = process.env.MONGO_URI;
  const options = { useNewUrlParser: true, useUnifiedTopology: true };

  if (uri) {
    try {
      await mongoose.connect(uri, options);
      console.log('MongoDB connected');
      return;
    } catch (err) {
      console.error('MongoDB connection error:', err.message);
      // In development/test, fall back to in-memory instead of exiting on non-auth errors.
      const authFailure = /bad auth|authentication failed|not authorized/i.test(err.message);
      if (authFailure && !['development', 'test'].includes(env)) {
        console.error('MongoDB auth failed; please verify your MONGO_URI credentials.');
        process.exit(1);
      }
      if (authFailure) {
        console.error('MongoDB auth failed; continuing to attempt in-memory fallback for development/test.');
      } else if (!['development', 'test'].includes(env)) {
        process.exit(1);
      } else {
        console.warn('MongoDB connection failed; attempting in-memory fallback for development/test');
      }
    }
  }

  if (['development', 'test'].includes(env)) {
    try {
      if (!memoryServer) {
        // Force a modern MongoDB binary compatible with recent Debian
        memoryServer = await MongoMemoryServer.create({
          binary: {
            version: '7.0.3',
            arch: 'x86_64',
            downloadDir: path.resolve(__dirname, '..', '.mongodb-binaries')
          }
        });
      }
      const memoryUri = memoryServer.getUri();
      await mongoose.connect(memoryUri, options);
      console.log(`MongoDB in-memory connected (${env})`);
      return;
    } catch (err) {
      console.error('In-memory MongoDB startup error:', err.message);
      console.error('In-memory fallback failed. Ensure a real MongoDB is available or install Docker/mongod locally.');
      process.exit(1);
    }
  }

  console.error('MongoDB connection error: no valid MongoDB URI and in-memory fallback is disabled');
  process.exit(1);
};

module.exports = connectDB;
