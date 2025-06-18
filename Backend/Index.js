const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./connection');
const authRoutes = require('./routes/authroutes');
const blogRoutes = require('./routes/Blogroutes');
const cors = require('cors');
const path = require('path');

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Static folder to serve uploaded images
app.use('/blog-images', express.static(path.join(__dirname, 'uploads/blog-images')));


// Routes
app.use('/api/user', authRoutes);           
app.use('/api/blog', blogRoutes);  
// Default route
app.get('/', (req, res) => {
  res.send('Welcome to the Blog API');
});

// Server listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
