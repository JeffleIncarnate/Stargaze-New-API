import express, { Router, Request, Response } from "express";

import {
  CartItem,
  Description,
  ACTUAL_ITEMS,
  ACTUAL_SIZES,
  ITEMS,
} from "../core/data/data";
import { stripe } from "../core/stripe/stripe";

const createPaymentIntent: Router = express.Router();

createPaymentIntent.post(
  "/create-payment-intent",
  async (req: Request, res: Response) => {
    // Verify the data they entered was actually correct
    let items = req.body;

    for (let i = 0; i < items.length; i++) {
      if (!ACTUAL_ITEMS.includes(items[i].id)) {
        return res.sendStatus(400);
      }

      if (!ACTUAL_SIZES.includes(items[i].size)) {
        return res.sendStatus(400);
      }

      if (items[i].quantity <= 0) {
        return res.sendStatus(400);
      }
    }

    let total = 0;

    // calculate total
    for (let i = 0; i < items.length; i++) {
      total +=
        ITEMS[items[i].id as keyof typeof ITEMS].cost * items[i].quantity;
    }

    // GST
    total += total * 0.15;

    // Convert to cents
    total *= 100;

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
      return res.status(400).send({
        error: {
          message: err.message,
        },
      });
    }
  }
);

export { createPaymentIntent };
