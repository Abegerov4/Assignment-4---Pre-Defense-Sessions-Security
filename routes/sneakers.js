const express = require('express');
const { ObjectId } = require('mongodb');
const connectDB = require('../database/mongo');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const db = await connectDB();
    const { brand, sortBy } = req.query;
    const filter = brand ? { brand } : {};

    const sneakers = await db.collection('sneakers')
      .find(filter)
      .sort(sortBy ? { [sortBy]: 1 } : {})
      .toArray();

    res.json(sneakers);
  } catch {
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/', async (req, res) => {
  const { name, brand, price } = req.body;
  if (!name || !brand || !price) {
    return res.status(400).json({ message: 'Missing fields' });
  }

  const db = await connectDB();
  await db.collection('sneakers').insertOne({ name, brand, price });
  res.status(201).json({ message: 'Created' });
});

router.put('/:id', async (req, res) => {
  try {
    const db = await connectDB();
    await db.collection('sneakers').updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: req.body }
    );
    res.json({ message: 'Updated' });
  } catch {
    res.status(400).json({ message: 'Invalid ID' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const db = await connectDB();
    await db.collection('sneakers').deleteOne({ _id: new ObjectId(req.params.id) });
    res.json({ message: 'Deleted' });
  } catch {
    res.status(400).json({ message: 'Invalid ID' });
  }
});

module.exports = router;