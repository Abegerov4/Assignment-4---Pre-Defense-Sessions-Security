const express = require('express');
const sneakersRoutes = require('./routes/sneakers');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(express.static('public'));

app.use('/api/sneakers', sneakersRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
