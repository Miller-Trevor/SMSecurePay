import express from "express";

const app = express();
const port = 3000;
const PUBLISHABLE_KEY = "pk_test_51N0q1vEnSZgQUDu6HZgM9mXP2t0K02f8cv6fD0Y7UV8G61iw1JPWmtyNF5foXm7scc2QVp88j464dS5AVKsubhmy00PeOQhLwX";
import Stripe from 'stripe';
const stripe = Stripe('sk_test_51N0q1vEnSZgQUDu6NLHP8hngXxf7TYtUqM0VvC1sbIqdF4cxtnriYxfqHrjBApmiBE11ZUK9WhyS8c5FO8arPt1000QHvVnXer', {apiVersion:"2023-10-16"})

app.listen(port, () => {
  console.log(`App listening at http://172.20.10.5:${port}`);
});

app.post("/create-payment-intent", async(req, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 1099,
      currency: "usd",
      payment_method_types: ["card"],  
    });

    const clientSecret = paymentIntent.client_secret;

    res.json({
      clientSecret: clientSecret,
    })
  } catch (e) {
    console.log(e.message);
    res.json({error: e.message});
  }
})

