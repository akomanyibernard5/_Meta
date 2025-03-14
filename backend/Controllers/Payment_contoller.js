require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const sendGridMail = require("@sendgrid/mail");

sendGridMail.setApiKey(process.env.SEND_GRID_API_KEY);

const nonMonetaryDonations = [];


const sendEmail = async (from, to, subject, text) => {
  try {
    await sendGridMail.send({
      to,
      from, 
      subject,
      text,
    });
  } catch (error) {
    console.error("Error sending email:", error.response?.body || error.message);
  }
};

exports.createCheckoutSession = async (req, res) => {
  try {
    const { currency = "usd", donorEmail, donorName, donorPhone, donorAddress, donationAmount } = req.body;
    
    // Validate donationAmount
    const donationAmountFloat = parseFloat(donationAmount);
    if (isNaN(donationAmountFloat) || donationAmountFloat <= 0) {
      return res.status(400).json({ error: "Invalid donation amount" });
    }

    const amountInCents = donationAmountFloat * 100;

    // Log the amount to verify
    console.log(`Amount: $${donationAmountFloat}, Amount in cents: ${amountInCents}`);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: currency,
            product_data: { name: "Donation" },
            unit_amount: amountInCents,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.FRONTEND_URL}/success`,
      cancel_url: `${process.env.FRONTEND_URL}/failed`,
      customer_email: donorEmail,
    });

    res.status(200).json({ sessionId: session.id });
    console.log("session created")

    const donorMessage = `Dear ${donorName},\n\nThank you for your generous donation of $${donationAmount}. Your support is greatly appreciated!\n\nBest Regards,\n[Your Organization]`;
    await sendEmail(process.env.SENDER_EMAIL, process.env.RECEIVER_EMAIL, "Thank You for Your Donation!", donorMessage);

    const orgMessage = `New Donation Received:\n\nDonor Name: ${donorName}\nAmount: $${donationAmount}\nDonor Email: ${donorEmail}\nPhone: ${donorPhone}\nDonor Address: ${donorAddress}`;
    await sendEmail(process.env.SENDER_EMAIL, process.env.RECEIVER_EMAIL, "New Donation Received", orgMessage);
  } catch (error) {
    console.error("Error creating checkout session:", error);
    res.status(500).json({ error: "Failed to create checkout session" });
  }
};


exports.handleNonMonetaryDonation = async (req, res) => {
  try {
    const { type, details, donor } = req.body;
    nonMonetaryDonations.push({ type, details, donor });

    const donorMessage = `Dear ${donor.name},\n\nThank you for your generous donation of ${type}. Your support is greatly appreciated!\n\nBest Regards,\n[Your Organization]`;
    await sendEmail(donor.email, donor.email, "Thank You for Your Donation!", donorMessage);

    const orgMessage = `New Non-Monetary Donation Received:\n\nType: ${type}\nDetails: ${details}\nDonor Name: ${donor.name}\nDonor Email: ${donor.email}\nDonor Phone: ${donor.phone}\nDonor Address: ${donor.address}`;
    await sendEmail(process.env.SENDER_EMAIL, process.env.RECEIVER_EMAIL, "New Non-Monetary Donation Received", orgMessage);

    res.status(200).json({ message: "Donation recorded. Thank you!" });
  } catch (error) {
    console.error("Error processing donation:", error);
    res.status(500).json({ error: "Failed to process donation" });
  }
};
