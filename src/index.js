require('./models/User');
require('./models/Track');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes.js');
const trackRoutes = require('./routes/trackRoutes.js');
const requireAuth = require('./middleware/requireAuth');
const app = express();

app.use(bodyParser.json()); // parse req data into json format
app.use(authRoutes);
app.use(trackRoutes);

const mongoUri =
  'mongodb+srv://admin:Klousman3@cluster0.uamnw.mongodb.net/track-server?retryWrites=true&w=majority';

mongoose.connect(mongoUri);
mongoose.connection.on('connected', () => {
  console.log('Connected to Mongo instance');
});
mongoose.connection.on('error', (err) => {
  console.log('Error connecting to Mongo ', err);
});

app.get('/', requireAuth, (req, res) => {
  res.send(`Your email : ${req.user.email}`);
});

app.listen(3000, () => {
  console.log('Listening on port 3000');
});
