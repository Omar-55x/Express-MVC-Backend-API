const path = require('path');
const express = require('express');
const app = express();
const { reqLogger } = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const mongoose = require('mongoose');

const PORT = 3500;

mongoose.connect('mongodb://127.0.0.1:27017/myCompany');

// Adding Middleware
app.use(reqLogger);
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.use(express.json());

// Serving static files
app.use('/', express.static(path.join(__dirname, 'public')))

// Managing Routes
app.use('/', require('./routes/root'));
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