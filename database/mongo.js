const { MongoClient } = require('mongodb');

let db;

async function connectDB() {
  if (db) return db;

  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI not set');
  }

  const client = new MongoClient(process.env.MONGO_URI);
  await client.connect();

  console.log('MongoDB connected');
  db = client.db('sneaker_shop');
  return db;
}

module.exports = connectDB;