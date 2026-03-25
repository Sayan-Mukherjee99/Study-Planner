const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes Placeholder
app.get('/', (req, res) => {
  res.send('Study Planner API is running');
});

// Import Routes
const authRoutes = require('./routes/authRoutes');
const subjectRoutes = require('./routes/subjectRoutes');
const taskRoutes = require('./routes/taskRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/subjects', subjectRoutes);
app.use('/api/tasks', taskRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
