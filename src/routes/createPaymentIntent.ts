import express, { Router, Request, Response } from "express";

import { ACTUAL_ITEMS, ACTUAL_SIZES, ITEMS } from "../core/data/data";
import { stripe } from "../core/stripe/stripe";

const createPaymentIntent: Router = express.Router();

createPaymentIntent.post(
  "/create-payment-intent",
  async (req: Request, res: Response) => {
    // Verify the data they entered was actually correct
    let items = req.body;

    for (let i = 0; i < items.length; i++) {
      if (!ACTUAL_ITEMS.includes(items[i].id)) {
        console.log("i died HERE");
        return res.sendStatus(401);
      }

      if (!ACTUAL_SIZES.includes(items[i].size)) {
        console.log("i died HERE x2");
        return res.sendStatus(402);
      }

      if (items[i].quantity <= 0) {
        console.log("i died HERE x3");
        return res.sendStatus(403);
      }
    }

    let total = 0;

    // calculate total
    for (let i = 0; i < items.length; i++) {
      total +=
        ITEMS[items[i].id as keyof typeof ITEMS].cost * items[i].quantity;
    }

    // Shipping cost
    total += 5;

    // Convert to cents
    total *= 100;

    total = Math.round(total * 10) / 10;

    console.log(total);

    try {
      JSON.stringify(items);

      const paymentIntent = await stripe.paymentIntents.create({
        description: JSON.stringify(req.body),
        currency: "nzd",
        amount: total,
        automatic_payment_methods: {
          enabled: true,
        },
      });

      return res.send({
        clientSecret: paymentIntent.client_secret,
      });
    } catch (err: any) {
      console.log("I died here?");
      return res.status(400).send({
        error: {
          message: err.message,
        },
      });
    }
  }
);

export { createPaymentIntent };
