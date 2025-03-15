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

    const donationAmountFloat = parseFloat(donationAmount);
    if (isNaN(donationAmountFloat) || donationAmountFloat <= 0) {
      return res.status(400).json({ error: "Invalid donation amount" });
    }

    const amountInCents = donationAmountFloat * 100;


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
      success_url: "https://metamorphosistennessee.org/",
      cancel_url: "https://metamorphosistennessee.org/",
      customer_email: donorEmail,
    });

    res.status(200).json({ sessionId: session.id });

  } catch (error) {
    console.error("Error creating checkout session:", error);
    res.status(500).json({ error: "Failed to create checkout session" });
  }
};

exports.stripeWebhook = async (req, res) => {
  const sig = req.headers["stripe-signature"];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (error) {
    console.error("Webhook signature verification failed.", error);
    return res.status(400).send(`Webhook error: ${error.message}`);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    const donorName = session.customer_details?.name || "Donor";
    const donorEmail = session.customer_details?.email;
    const donationAmount = session.amount_total / 100;

    if (donorEmail) {
      const donorMessage = `Dear ${donorName},\n\nThank you for your generous donation of $${donationAmount}. Your support is greatly appreciated!\n\nBest Regards,\nMetamorphosis Supportive Housing`;
      await sendEmail(process.env.SENDER_EMAIL, donorEmail, "Thank You for Your Donation!", donorMessage);
    }

    const orgMessage = `New Donation Received:\n\nDonor Name: ${donorName}\nAmount: $${donationAmount}\nDonor Email: ${donorEmail}`;
    await sendEmail(process.env.SENDER_EMAIL, process.env.RECEIVER_EMAIL, "New Donation Received", orgMessage);
  }
  // Handle failed payments
  else if (event.type === "payment_intent.payment_failed" || event.type === "checkout.session.expired") {
    const session = event.data.object;
    
    const donorName = session.customer_details?.name || "Donor";
    const donorEmail = session.customer_details?.email;

    if (donorEmail) {
      const retryMessage = `Dear ${donorName},\n\nIt seems that your donation attempt was unsuccessful. Please try again to complete your donation. If you need assistance, don't hesitate to reach out.\n\nBest Regards,\nMetamorphosis Supportive Housing`;
      await sendEmail(process.env.SENDER_EMAIL, donorEmail, "Payment Failed - Please Try Again", retryMessage);
    }
  }

  res.status(200).send("Webhook received");
};




exports.handleNonMonetaryDonation = async (req, res) => {
  try {
    const { type, details, donor } = req.body;
    nonMonetaryDonations.push({ type, details, donor });

    const donorMessage = `Dear ${donor.name},\n\nThank you for your generous donation of ${type}. We will contact you with the shipping details. Your support is greatly appreciated!\n\nBest Regards,\nMetamorphosis Supportive Housing`;
    await sendEmail("Lynnita@metamorphosishousing.org", donor.email, "Thank You for Your Donation!", donorMessage);

    const orgMessage = `New Non-Monetary Donation Received:\n\nType: ${type}\nDetails: ${details}\nDonor Name: ${donor.name}\nDonor Email: ${donor.email}\nDonor Phone: ${donor.phone}\nDonor Address: ${donor.address}`;
    await sendEmail(process.env.SENDER_EMAIL, "Lynnita@metamorphosishousing.org", "New Non-Monetary Donation Received", orgMessage);

    res.status(200).json({ message: "Donation recorded. Thank you!" });
  } catch (error) {
    console.error("Error processing donation:", error);
    res.status(500).json({ error: "Failed to process donation" });
  }
};
