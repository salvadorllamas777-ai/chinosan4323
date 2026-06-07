const express = require('express');
const app = express();

app.use(express.json());
app.use('/health', require('./routes/health'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/admin', require('./routes/admin'));

// 404 handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Error handler (last middleware)
const errorHandler = require('./middleware/errorHandler');
app.use(errorHandler);

module.exports = app;
