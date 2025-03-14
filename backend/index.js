const express = require('express');
const path = require('path'); 
const app = express();
const cors = require('cors'); 
const bodyParser = require('body-parser');
const paymentRoutes = require('./Routes/Payment_route');
const userRoutes = require("./Routes/User_route")


app.use(cors()); 

const corsOptions = {
  origin: 'https://metamorphosistennessee.org', 
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
};

app.use(bodyParser.json());


app.use('/api/payment', paymentRoutes);
app.use('/api/user', userRoutes);

app.use(express.static(path.join(__dirname, '..', 'frontend', 'build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
});

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
