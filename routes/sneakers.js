const express = require('express');
const { ObjectId } = require('mongodb');
const connectDB = require('../database/mongo');
const requireAuth = require('../middleware/auth');

const router = express.Router();

// READ (public)
router.get('/', async (req, res) => {
  const db = await connectDB();
  const { brand, sortBy } = req.query;

  const filter = {};
  if (brand) filter.brand = brand;

  const sneakers = await db
    .collection('sneakers')
    .find(filter)
    .sort(sortBy ? { [sortBy]: 1 } : {})
    .toArray();

  res.json(sneakers);
});

// CREATE (protected)
router.post('/', requireAuth, async (req, res) => {
  const { name, brand, price, size, color, category } = req.body;

  if (!name || !brand || !price || !size || !color || !category) {
    return res.status(400).json({ message: 'Missing fields' });
  }

  const db = await connectDB();
  await db.collection('sneakers').insertOne({
    name,
    brand,
    price,
    size,
    color,
    category
  });

  res.status(201).json({ message: 'Created' });
});

// UPDATE (protected)
router.put('/:id', requireAuth, async (req, res) => {
  const db = await connectDB();
  await db.collection('sneakers').updateOne(
    { _id: new ObjectId(req.params.id) },
    { $set: req.body }
  );
  res.json({ message: 'Updated' });
});

// DELETE (protected)
router.delete('/:id', requireAuth, async (req, res) => {
  const db = await connectDB();
  await db.collection('sneakers').deleteOne({
    _id: new ObjectId(req.params.id)
  });
  res.json({ message: 'Deleted' });
});

module.exports = router;