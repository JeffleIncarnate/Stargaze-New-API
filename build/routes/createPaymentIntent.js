"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPaymentIntent = void 0;
const express_1 = __importDefault(require("express"));
const data_1 = require("../core/data/data");
const stripe_1 = require("../core/stripe/stripe");
const createPaymentIntent = express_1.default.Router();
exports.createPaymentIntent = createPaymentIntent;
createPaymentIntent.post("/create-payment-intent", async (req, res) => {
    // Verify the data they entered was actually correct
    let items = req.body;
    for (let i = 0; i < items.length; i++) {
        if (!data_1.ACTUAL_ITEMS.includes(items[i].id)) {
            return res.sendStatus(400);
        }
        if (!data_1.ACTUAL_SIZES.includes(items[i].size)) {
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
            data_1.ITEMS[items[i].id].cost * items[i].quantity;
    }
    // GST
    total += total * 0.15;
    // Convert to cents
    total *= 100;
    try {
        JSON.stringify(items);
        const paymentIntent = await stripe_1.stripe.paymentIntents.create({
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
    }
    catch (err) {
        return res.status(400).send({
            error: {
                message: err.message,
            },
        });
    }
});
