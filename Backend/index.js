const connectToMongo = require('./db');// db is a file which is in the same folder
const express = require('express');// express is a framework for nodejs

connectToMongo(); // connect to MongoDB
const app = express();
const port = 3000;


// Available Routes
app.use(express.json());// to use json in the express
app.use('/api/auth', require('./routes/auth'));// to use auth.js file in the routes folder
app.use('/api/notes', require('./routes/notes'));


app.listen(port, () => console.log(`Example app listening on port ${port}!`));// to listen the port
