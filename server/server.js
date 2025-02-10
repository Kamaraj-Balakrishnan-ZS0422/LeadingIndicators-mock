require('dotenv').config();
const express = require('express');
const sequelize = require('./src/config/database');
const session = require('express-session');
const cookieparser = require('cookie-parser');
const passport = require('passport');
const helmet = require('helmet');
const path = require('path');
const cors = require('cors');
require('./src/config/passport'); // Passport configuration

// Import routes
const userRoutes = require('./src/routes/userRoutes');
const authRoutes = require('./src/routes/authRoutes');
const incidentRoutes = require('./src/routes/incidentRoutes');

const app = express();
const PORT = process.env.PORT || 3001;

// Security Middleware
app.use(helmet()); // Always load Helmet early to set security headers

// CORS Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type,Authorization',
  credentials: true, 
}));

// Body Parsing Middleware
app.use(express.json()); // Parses incoming JSON payloads
app.use(express.urlencoded({ extended: false })); // Parses URL-encoded payloads

// Cookie Parsing Middleware
app.use(cookieparser()); // Parses cookies from the request headers

// Session Middleware
const isProduction = process.env.NODE_ENV === 'production';

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000, // 15 minutes
    httpOnly: true, // Prevents JavaScript access to cookies
    sameSite: 'none', // Prevents CSRF by limiting cross-origin requests
    secure: false, // Only true in production (use HTTPS in production)
    path: '/',
  },
}));

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, '/src/assets/uploads/')));

// Routes
app.use('/api/v1', userRoutes);
app.use('/api/v1', authRoutes);
app.use('/api/v1', incidentRoutes);

// Start server and connect to the database
sequelize.authenticate()
  .then(() => {
    console.log('Connected to the database.');
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => console.log('Database connection error:', err));
