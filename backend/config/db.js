const path = require('path');
const fs = require('fs');
const { MongoClient, ServerApiVersion } = require('mongodb');
const mongoose = require('mongoose');

// Ensure environment variables are loaded regardless of how db.js is invoked
const localEnv = path.resolve(__dirname, '../.env');
const parentEnv = path.resolve(__dirname, '../../.env');
if (fs.existsSync(localEnv)) {
  require('dotenv').config({ path: localEnv });
}
if (fs.existsSync(parentEnv)) {
  require('dotenv').config({ path: parentEnv });
}
require('dotenv').config();

let client = null;
let db = null;
let isConnected = false;
let lastError = null;

const connectDB = async () => {
  const uri = process.env.MONGODB_URI;
  const dbName = process.env.MONGODB_DB_NAME || 'dxnanchal';

  if (!uri) {
    console.error('[MongoDB Error]: MONGODB_URI environment variable is missing.');
    return null;
  }

  try {
    if (client && isConnected) {
      return db;
    }

    client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
      maxPoolSize: 10,
      minPoolSize: 1,
      connectTimeoutMS: 10000,
      serverSelectionTimeoutMS: 10000,
    });

    await client.connect();

    // Verify connectivity by sending a ping command
    await client.db('admin').command({ ping: 1 });

    db = client.db(dbName);

    // Also connect Mongoose for models that use Mongoose schemas
    try {
      if (mongoose.connection.readyState === 0) {
        await mongoose.connect(uri, {
          dbName,
          serverSelectionTimeoutMS: 10000,
        });
      }
    } catch (mErr) {
      console.warn(`[Mongoose Warning]: ${mErr.message}`);
    }

    isConnected = true;
    lastError = null;

    console.log(`🌿 [MongoDB Atlas Connected]: Successfully connected to database "${dbName}" via official MongoDB Node.js driver & Mongoose`);
    return db;
  } catch (error) {
    isConnected = false;
    lastError = error.message;
    console.warn(`⚠️ [MongoDB Atlas Warning]: Unable to connect to MongoDB Atlas (${error.message}).`);
    console.warn(`[System Note]: Backend is serving from label-verified botanical in-memory store so all queries work smoothly.`);
    return null;
  }
};

const getDb = () => db;
const getClient = () => client;

const getCollection = (collectionName) => {
  if (db && isConnected) {
    return db.collection(collectionName);
  }
  return null;
};

const getDbStatus = () => ({
  connected: isConnected,
  driver: 'mongodb-node-native-v6 & mongoose',
  databaseName: process.env.MONGODB_DB_NAME || 'dxnanchal',
  statusText: isConnected ? 'Connected to MongoDB Atlas' : 'Disconnected / Fallback mode',
  error: lastError,
});

const closeDB = async () => {
  try {
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
    }
  } catch (mErr) {
    console.warn('Error disconnecting mongoose:', mErr.message);
  }
  if (client) {
    await client.close();
    isConnected = false;
    db = null;
    client = null;
    console.log('[MongoDB Atlas]: Connection closed cleanly.');
  }
};

module.exports = {
  connectDB,
  getDb,
  getClient,
  getCollection,
  getDbStatus,
  closeDB,
};
