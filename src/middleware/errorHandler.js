module.exports = (err, req, res, next) => {
  const status = err.status || 500;
  const safeMessage = status >= 500 ? 'Internal server error' : err.message;
  // Minimal logging; keep sensitive details out of logs
  console.error('Error:', { message: err.message, status, stack: err.stack ? err.stack.split('\n')[0] : undefined });
  res.status(status).json({ error: safeMessage });
};
