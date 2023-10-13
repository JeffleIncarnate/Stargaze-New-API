"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Import Routes
const config_1 = require("./routes/config");
const createPaymentIntent_1 = require("./routes/createPaymentIntent");
// import { webhook } from "./routes/webhook";
// Use Routes
app.use("/config", config_1.config); // sends the publishable key to the client
app.post("/create-payment-intent", createPaymentIntent_1.createPaymentIntent); // Create Payment intent for client
// app.post("/webhook", webhook);
// Test endpoint to confirm API is working
app.get("/", (req, res) => {
    return res.sendStatus(200);
});
app.listen(3000, () => {
    console.log("API Listening on port 3000");
});
