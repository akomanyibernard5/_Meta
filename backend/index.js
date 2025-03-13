const express = require('express');
const app = express();
const cors = require('cors'); 
const bodyParser = require('body-parser');
const paymentRoutes = require('./Routes/Payment_route');
const userRoutes = require("./Routes/User_route")


app.use(cors()); 

// Middleware
app.use(bodyParser.json());

// Payment routes
app.use('/api/payment', paymentRoutes);
app.use('/api/user', userRoutes);

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
