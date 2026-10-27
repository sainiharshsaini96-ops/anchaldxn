const { MongoClient, ServerApiVersion } = require('mongodb');

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
    isConnected = true;
    lastError = null;

    console.log(`🌿 [MongoDB Atlas Connected]: Successfully connected to database "${dbName}" via official MongoDB Node.js driver`);
    return db;
  } catch (error) {
    isConnected = false;
    lastError = error.message;
    console.warn(`⚠️ [MongoDB Atlas Warning]: Unable to connect to MongoDB Atlas (${error.message}).`);
    console.warn(`[System Note]: Backend is serving from label-verified botanical in-memory store so all frontend queries work smoothly.`);
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
  driver: 'mongodb-node-native-v6',
  databaseName: process.env.MONGODB_DB_NAME || 'dxnanchal',
  statusText: isConnected ? 'Connected to MongoDB Atlas' : 'Disconnected / Fallback mode',
  error: lastError,
});

const closeDB = async () => {
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
