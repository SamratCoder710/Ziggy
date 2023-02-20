const express = require('express')
const app = express()
const port = 5000
const connect = require('./db')
const cors = require('cors');
require('dotenv').config();
connect;

app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.use(cors({
  origin: 'http://localhost:3000'
}));
app.use(express.json())
app.use('/api/v2',require('./routes/GenuineUser'));
app.use('/api/v3',require('./routes/CreateUser'));
app.use('/api/v4',require('./routes/DisplayData'));
app.use('/api/v5',require('./routes/OrderRoutes'));

app.use('/api',require('./routes/AuthMiddleware'),require('./routes/GetUsers'));


app.listen(port, () => {
  console.log(`app listening on port ${port}`);
})