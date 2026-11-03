const path = require('path');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const fs = require('fs');

const localEnv = path.resolve(__dirname, '.env');
const rootEnv = path.resolve(__dirname, '../.env');
if (fs.existsSync(localEnv)) {
  require('dotenv').config({ path: localEnv });
}
if (fs.existsSync(rootEnv)) {
  require('dotenv').config({ path: rootEnv });
}
require('dotenv').config();

const { connectDB, getDbStatus, closeDB } = require('./config/db');
const productRoutes = require('./routes/productRoutes');
const ingredientRoutes = require('./routes/ingredientRoutes');
const inquiryRoutes = require('./routes/inquiryRoutes');

const app = express();

// Initialize MongoDB Atlas connection using official MongoDB Node driver
connectDB();

// Middleware
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || '*',
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'));
}

// API Routes
app.use('/api/products', productRoutes);
app.use('/api/ingredients', ingredientRoutes);
app.use('/api/inquiries', inquiryRoutes);

// Health check route with MongoDB Atlas connection status
app.get('/api/health', (req, res) => {
  const dbStatus = getDbStatus();
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'DXNANCHAL Product Guide Backend',
    database: dbStatus,
  });
});

// Root API documentation endpoint
app.get('/api', (req, res) => {
  res.json({
    message: 'Welcome to DXNANCHAL Product Guide API (MongoDB Atlas Connected)',
    databaseDriver: 'MongoDB Official Node.js Driver (v6)',
    crudEndpoints: {
      readAll: 'GET /api/products (filters: category, search, sort)',
      readOne: 'GET /api/products/:id (by ObjectId or slug)',
      create: 'POST /api/products',
      update: 'PUT /api/products/:id',
      delete: 'DELETE /api/products/:id',
    },
    auxiliaryEndpoints: {
      health: 'GET /api/health',
      ingredients: 'GET /api/ingredients',
      inquiries: 'POST /api/inquiries, GET /api/inquiries',
    },
  });
});

// Serve frontend static build in production if available
if (process.env.NODE_ENV === 'production') {
  const distPath = path.resolve(__dirname, '../frontend/dist');
  app.use(express.static(distPath));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(distPath, 'index.html'));
  });
}

// 404 Handler for API
app.use('/api/*', (req, res) => {
  res.status(404).json({ success: false, message: 'API route not found' });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Unhandled Server Error:', err);
  res.status(500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
});

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`🌿 DXNANCHAL Backend Server running on port ${PORT} [${process.env.NODE_ENV || 'development'}]`);
  console.log(`🔗 API Base: http://localhost:${PORT}/api`);
});

// Clean shutdown handler
process.on('SIGINT', async () => {
  console.log('\n[Process]: Shutting down server gracefully...');
  await closeDB();
  server.close(() => {
    console.log('[Process]: Server closed.');
    process.exit(0);
  });
});

module.exports = app;
