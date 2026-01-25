const { MongoClient } = require('mongodb');

const URL = process.env.MONGO_URI;  
const client = new MongoClient(URL);

let db;

async function connectDB() {
  if (!db) {
    await client.connect();
    console.log('MongoDB connected');
    db = client.db(); 
  }
  return db;
}

module.exports = connectDB;
