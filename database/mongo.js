const { MongoClient } = require('mongodb');

let db;

async function connectDB() {
  if (db) return db; 

  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI не задана в переменных окружения!');
  }

  const client = new MongoClient(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  await client.connect();
  console.log('MongoDB Atlas connected');
  db = client.db('sneaker_shop'); 
  return db;
}

module.exports = connectDB;
