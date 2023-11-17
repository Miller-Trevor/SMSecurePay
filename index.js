require("dotenv").config();
const express = require("express");
const app = express();
const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
const cors = require("cors");
const PORT = 3000;

app.use(express.json());
app.use(cors());

app.post("/pay", async (req, res) => {
    try {
      // Getting data from client
      let { amount, number } = req.body;
      // Simple validation
      if (!amount || !number)
        return res.status(400).json({ message: "All fields are required" });
      amount = parseInt(amount);
      // Initiate payment
      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(amount * 100),
        currency: "USD",
        payment_method_types: ["card"],
        metadata: { number },
      });
      // Extracting the client secret 
      const clientSecret = paymentIntent.client_secret;
      // Sending the client secret as response
      res.json({ message: "Payment initiated", clientSecret });
    } catch (err) {
      // Catch any error and send error 500 to client
      console.error(err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });

  app.use("/stripe", express.raw({type: "*/*"}));

  app.post("/stripe", async (req, res) => {
    const sig = req.headers["stripe-signature"];
    let event;

    try {
        event = await stripe.webhooks.constructEvent(
            req.body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET
        );
    } catch (err) {
        console.log(err);
        return res.status(400).json({message:err.message});

    }

    if (event.type === "payment_intent.created") {
        console.log(`${event.data.object.metadata.number} initated payment!`);
      }
      // Event when a payment is succeeded
      if (event.type === "payment_intent.succeeded") {
        console.log(`${event.data.object.metadata.number} succeeded payment!`);
        // fulfilment
      }
      res.json({ ok: true });
  });

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

