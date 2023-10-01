import express, { Router, Request, Response } from "express";
import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";

const webhook: Router = express.Router();

webhook.post(
  "/webhook",
  express.json({ type: "application/json" }),
  async (req: Request, res: Response) => {
    const event = req.body;

    // Handle the event
    switch (event.type) {
      case "charge.succeeded":
        const chargeSucceeded = event.data.object;
        const email = chargeSucceeded.billing_details.email;
        const receipt = chargeSucceeded.receipt_url;

        if (email === null) {
          break;
        }

        const transporter = nodemailer.createTransport({
          service: "hotmail",
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD,
          },
        });

        const options: Mail.Options = {
          from: process.env.EMAIL_USER,
          to: email,
          subject: "STRGZE | Purchases",
          text: `thank you for your purchase, here is your receipt: ${receipt}`,
        };

        try {
          await transporter.sendMail(options);
        } catch (err) {
          return res.sendStatus(500);
        }

        break;

      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    // Return a response to acknowledge receipt of the event
    return res.json({ received: true });
  }
);

export { webhook };
