// index.js (or server.js) in your Backend folders
const express = require('express');
const mongoose = require('mongoose');
const dotenv  = require('dotenv');
const cors    = require('cors');

dotenv.config();
const app = express();

// 1) Middleware to parse JSON bodies
app.use(express.json());

// 2) CORS (if your frontend is on a different port)
app.use(cors());

// 3) Connect to MongoDB
mongoose.connect(process.env.DB_CONNECTION)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB error:', err));

// 4) Import your expense router
const expenseRoutes = require('./routes/expense');  // adjust path if needed

// 5) Mount it under /api/expenses
app.use('/api/expenses', expenseRoutes);

// 6) Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}`);
});
