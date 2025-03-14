// Payment_route.js
const express = require('express');
const router = express.Router();

// Import the controller function correctly
const { createCheckoutSession, handleNonMonetaryDonation, stripeWebhook } = require('../Controllers/Payment_contoller');

// Set up the route correctly
router.post('/create-checkout-session', createCheckoutSession);
router.post("/non-monetary-donations", handleNonMonetaryDonation);
router.post("/webhook", stripeWebhook);

module.exports = router;
