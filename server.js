require('dotenv').config();
const path = require('path');
const express = require('express');
const app = express();
const { reqLogger } = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const cors = require('cors');
const credentials = require('./middleware/credentials');
const corsOptions = require('./config/corsOptions');
const verifyJWT = require('./middleware/verifyJWT');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const connectDB = require('./config/dbConnection');

const PORT = 3500;

connectDB();

// Adding Middleware
app.use(reqLogger);
app.use(express.urlencoded({ extended: true }));
app.use(credentials);
app.use(cors(corsOptions));
app.use('/', express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(cookieParser());

// Managing Routes
app.use('/', require('./routes/root'));
app.use('/register', require('./routes/register'));
app.use('/auth', require('./routes/auth'));
app.use('/refresh', require('./routes/refresh'));
app.use('/logout', require('./routes/logout'));

app.use(verifyJWT);
app.use('/api/employees', require('./routes/api/employees'));
app.use('/api/users', require('./routes/api/users'));

app.get('/*splat', (req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
})

app.use(errorHandler);

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}...`));
})