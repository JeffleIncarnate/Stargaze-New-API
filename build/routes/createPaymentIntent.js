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
            console.log("i died HERE");
            return res.sendStatus(401);
        }
        if (!data_1.ACTUAL_SIZES.includes(items[i].size)) {
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
            data_1.ITEMS[items[i].id].cost * items[i].quantity;
    }
    // Shipping cost
    total += 5;
    // Convert to cents
    total *= 100;
    total = Math.round(total * 10) / 10;
    console.log(total);
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
        console.log("I died here?");
        return res.status(400).send({
            error: {
                message: err.message,
            },
        });
    }
});
