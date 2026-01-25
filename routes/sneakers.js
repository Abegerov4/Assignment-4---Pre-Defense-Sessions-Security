const express = require('express');
const { ObjectId } = require('mongodb');
const connectDB = require('../database/mongo');

const router = express.Router();

// GET 
router.get('/', async (req, res) => {
  try {
    const db = await connectDB();
    const { brand, sortBy } = req.query;

    const filter = {};
    if (brand) filter.brand = brand;

    const sneakers = await db
      .collection('sneakers')
      .find(filter)
      .sort(sortBy ? { [sortBy]: 1 } : {})
      .toArray();

    res.status(200).json(sneakers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// POST
router.post('/', async (req, res) => {
  const { name, brand, price } = req.body;
  if (!name || !brand || !price) return res.status(400).json({ message: 'Missing fields' });

  const db = await connectDB();
  const result = await db.collection('sneakers').insertOne({ name, brand, price });
  res.status(201).json(result);
});

// PUT
router.put('/:id', async (req, res) => {
  try {
    const db = await connectDB();
    await db.collection('sneakers').updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: req.body }
    );
    res.status(200).json({ message: 'Updated' });
  } catch {
    res.status(400).json({ message: 'Invalid ID' });
  }
});

// DELETE
router.delete('/:id', async (req, res) => {
  try {
    const db = await connectDB();
    await db.collection('sneakers').deleteOne({ _id: new ObjectId(req.params.id) });
    res.status(200).json({ message: 'Deleted' });
  } catch {
    res.status(400).json({ message: 'Invalid ID' });
  }
});

module.exports = router;
