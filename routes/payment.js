var express = require("express");
const Payment = require("../models/payment");
const Rent = require("../models/reservation");
const stripe = require("stripe")(
  "sk_test_51PHTQnRwimOOkI4C3d553vwUyAwpeTlbZGlUvRoNc6IyeVZzH1m7LcSjerWUu2veor86iS8RbuD17U5bkQ06laEr00mtKyqP3x"
);
var router = express.Router();

// Define a route for processing payments
router.post("/process-payment", async (req, res) => {
  let { amount,id_rent } = req.body;
  console.log('id renting',id_rent)
  if (!amount) {
    return res.status(400).json({ error: "Missing required fields." });
  }

  try {
    console.log("test 1");
    console.log(amount);
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "usd",
      payment_method: "pm_card_visa", // Use a test card number
      confirm: true,
      automatic_payment_methods: {
        enabled: true,
        allow_redirects: "never",
      },
    });

    console.log("Payment Intent:", paymentIntent);
    console.log("test 2");
    console.log("statut" + paymentIntent.status);

    if (paymentIntent.status !== "succeeded") {
      return res.status(500).json({ error: "Payment failed." });
    }

    // POST route to add a new Payment
    const newPayment = new Payment(req.body);
    try {
      const savedPayment = await newPayment.save();
      try {
        const updatedrent = await Rent.findByIdAndUpdate(
          id_rent,
          { paid: true },
          { new: true } // To return the updated document
        );
    
        if (!updatedrent) {
          throw new Error('rent not found');
        }
      } catch (error) {
        throw new Error(`Error updating payment: ${error.message}`);
      }
      res.status(201).json(savedPayment);
    } catch (error) {
      res.status(400).json({ message: error.message, error });
    }
  } catch (error) {
    if (error.code === "StripeInvalidParameterError") {
      res.status(400).json({ error: "Invalid payment details." });
    } else {
      res
        .status(500)
        .json({ error: "An error occurred while processing the payment." });
    }
  }
});

// GET route to retrieve all payments
router.get("/payments", async (req, res, next) => {
  try {
    console.log("GET route to retrieve all payments");
    const payments = await Payment.find();
    console.log("test", payments);
    res.json(payments);
  } catch (error) {
    res.json({ message: error.message, error });
  }
});

module.exports = router;
