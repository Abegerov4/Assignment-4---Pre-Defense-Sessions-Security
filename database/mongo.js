const { MongoClient } = require('mongodb');

const URL = process.env.MONGO_URI;
const DB_NAME = 'sneaker_shop';

if (!URL) {
  throw new Error('MONGO_URI environment variable not set');
}

const client = new MongoClient(URL);

let db;

async function connectDB() {
  if (!db) {
    await client.connect();
    console.log('MongoDB connected');
    db = client.db(DB_NAME);
  }
  return db;
}

module.exports = connectDB;
