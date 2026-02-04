require('dotenv').config();
console.log('THIS SERVER FILE IS RUNNING');

const express = require('express');
const session = require('express-session');

const sneakersRoutes = require('./routes/sneakers');
const authRoutes = require('./routes/auth');

const app = express();

app.use(express.json());

app.use(session({
  name: 'connect.sid',
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: true,          
    sameSite: 'none'       
  }
}));

app.use(express.static('public'));

app.use('/api/auth', authRoutes);
app.use('/api/sneakers', sneakersRoutes);

app.listen(process.env.PORT || 3000);