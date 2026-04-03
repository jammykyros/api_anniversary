const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Base route
app.get('/', (req, res) => {
  res.json({ message: 'Anniversary API running' });
});

// Memories routes
app.use('/memories', require('./routes/memories'));

// Grievances routes
app.use('/grievances', require('./routes/grievances'));

// Start server
const PORT = process.env.PORT || 3333;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
