"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.webhook = void 0;
const express_1 = __importDefault(require("express"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const webhook = express_1.default.Router();
exports.webhook = webhook;
webhook.post("/webhook", express_1.default.json({ type: "application/json" }), async (req, res) => {
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
            const transporter = nodemailer_1.default.createTransport({
                service: "hotmail",
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASSWORD,
                },
            });
            const options = {
                from: process.env.EMAIL_USER,
                to: email,
                subject: "STRGZE | Purchases",
                text: `thank you for your purchase, here is your receipt: ${receipt}`,
            };
            try {
                await transporter.sendMail(options);
            }
            catch (err) {
                return res.sendStatus(500);
            }
            break;
        default:
            console.log(`Unhandled event type ${event.type}`);
    }
    // Return a response to acknowledge receipt of the event
    return res.json({ received: true });
});
