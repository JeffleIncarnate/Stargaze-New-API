"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
var express_1 = __importDefault(require("express"));
var config = express_1.default.Router();
exports.config = config;
config.get("/", function (req, res) {
    return res.send({
        publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
    });
});
