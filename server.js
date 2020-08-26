const express = require('express');
const connectDB = require('./config/db');

var cors = require('cors');
const app = express();

//connect database

connectDB();

const PORT = process.env.PORT || 5000;
//for using req.body instead of body parser
app.use(express.json({ extended: false }));

app.use(cors()); // public acces

//Define Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/bus', require('./routes/api/bus'));

app.get('/', (req, res) => res.send('API Running'));

app.listen(PORT, () => console.log(`Server started at port ${PORT}`));

app.use(function (err, req, res, next) {
  throw err;
});

// app.listen(80, function () {
//   console.log('CORS-enabled web server listening on port 80')
// })
