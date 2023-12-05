// app.js

const express = require('express');
const morgan = require('morgan');
const path = require('path');
const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose')
// Import EJS
const ejs = require('ejs');

// Import routes
const userRoutes = require('./routes/userroutes');
const adminRoutes = require('./routes/adminroutes');

// Create an Express application
const app = express();

// Middleware: Morgan for logging
app.use(morgan('dev'));

// Middleware: Parse incoming JSON requests
app.use(express.json());

// Middleware: Parse incoming URL-encoded data
app.use(express.urlencoded({ extended: false }));

// Middleware: Parse cookies
app.use(cookieParser());

// Middleware: Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Set the views directory
app.set('views', path.join(__dirname, 'views'));

// Use the routes
app.use('/', userRoutes);
app.use('/admin', adminRoutes);

// Define a route that renders an EJS view


// Handle 404 errors
app.use((req, res, next) => {
  next(createError(404));
});

// Error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});
mongoose.connect('mongodb+srv://sharhanmohammed03:Rapid7711@cluster.8vewkk6.mongodb.net/hisgrace?retryWrites=true&w=majority').then(()=>console.log("connection successfull")).catch((err)=>console.log(err))

// Set the port for the server to listen on
const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
