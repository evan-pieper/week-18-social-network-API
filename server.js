const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 3000; // If deployed, use the deployed port. Otherwise use port 3000.

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost/socialNetworkDB'; // If deployed, use the deployed database. Otherwise use the local database

mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB at ' + connectionString);
});

// Use API Routes
app.use(require('./routes'));

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
