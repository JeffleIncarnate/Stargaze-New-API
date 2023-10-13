import "dotenv/config";

import express, { Application, Request, Response } from "express";
import cors from "cors";

const app: Application = express();
app.use(cors());
app.use(express.json());

// Import Routes
import { config } from "./routes/config";
import { createPaymentIntent } from "./routes/createPaymentIntent";
// import { webhook } from "./routes/webhook";

// Use Routes
app.use("/config", config); // sends the publishable key to the client
app.post("/create-payment-intent", createPaymentIntent); // Create Payment intent for client
// app.post("/webhook", webhook);

// Test endpoint to confirm API is working
app.get("/", (req: Request, res: Response) => {
  return res.sendStatus(200);
});

app.listen(3000, () => {
  console.log("API Listening on port 3000");
});
