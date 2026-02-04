const express = require('express');
const bcrypt = require('bcrypt');
const connectDB = require('../database/mongo');

const router = express.Router();  

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  const db = await connectDB();
  const user = await db.collection('users').findOne({ username });

  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  req.session.userId = user._id;
  res.json({ message: 'Logged in' });
});

module.exports = router;