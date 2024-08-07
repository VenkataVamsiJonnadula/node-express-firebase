const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const config = require('./config');
const libraryRoutes = require('./routes/library-routes');

const app = express();

app.use(express.json());
app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps, curl, Postman)
    if (!origin) return callback(null, true);

    const allowedOrigins = ['http://localhost:4200', 'https://sri-vijayalakshmi-jewellers.firebaseapp.com'];
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  credentials: true,
  optionsSuccessStatus: 204,
}));

app.use(bodyParser.json());
app.use('/api', libraryRoutes.routes);

app.options('*', cors()); // Preflight OPTIONS request handler for all routes

app.listen(config.port, () => console.log('App is listening on url http://localhost:' + config.port));
