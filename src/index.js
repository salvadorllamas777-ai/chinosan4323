const dotenv = require('dotenv');
const connectDB = require('./config/db');
const app = require('./app');

dotenv.config();

const startServer = async () => {
  // Basic required-env checks
  if ((process.env.NODE_ENV || 'development') === 'production' && !process.env.JWT_SECRET) {
    console.error('JWT_SECRET is required in production. Exiting.');
    process.exit(1);
  }

  await connectDB();
  const PORT = process.env.PORT || 3000;
  const http = require('http');
  const server = http.createServer(app);

  server.on('error', (err) => {
    if (err && err.code === 'EADDRINUSE') {
      console.error(`Port ${PORT} is already in use. Did you start the app already? Exiting.`);
      process.exit(1);
    }
    throw err;
  });

  server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

  const gracefulShutdown = async (signal) => {
    console.log(`Received ${signal}. Closing server...`);
    server.close(() => {
      console.log('HTTP server closed');
      // Close DB connection if needed
      process.exit(0);
    });
    // Force exit after timeout
    setTimeout(() => {
      console.error('Forcing shutdown');
      process.exit(1);
    }, 10000).unref();
  };

  process.on('SIGINT', () => gracefulShutdown('SIGINT'));
  process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
  process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection:', reason);
    gracefulShutdown('unhandledRejection');
  });
  process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
    gracefulShutdown('uncaughtException');
  });
};

startServer();
