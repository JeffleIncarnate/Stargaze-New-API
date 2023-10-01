import express, { Router, Request, Response } from "express";

const config: Router = express.Router();

config.get("/", (req: Request, res: Response) => {
  return res.send({
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
  });
});

export { config };
