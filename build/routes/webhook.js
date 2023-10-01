"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.webhook = void 0;
var express_1 = __importDefault(require("express"));
var nodemailer_1 = __importDefault(require("nodemailer"));
var webhook = express_1.default.Router();
exports.webhook = webhook;
webhook.post("/webhook", express_1.default.json({ type: "application/json" }), function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var event, _a, chargeSucceeded, email, receipt, transporter, options, err_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                event = req.body;
                _a = event.type;
                switch (_a) {
                    case "charge.succeeded": return [3 /*break*/, 1];
                }
                return [3 /*break*/, 6];
            case 1:
                chargeSucceeded = event.data.object;
                email = chargeSucceeded.billing_details.email;
                receipt = chargeSucceeded.receipt_url;
                if (email === null) {
                    return [3 /*break*/, 7];
                }
                transporter = nodemailer_1.default.createTransport({
                    service: "hotmail",
                    auth: {
                        user: process.env.EMAIL_USER,
                        pass: process.env.EMAIL_PASSWORD,
                    },
                });
                options = {
                    from: process.env.EMAIL_USER,
                    to: email,
                    subject: "STRGZE | Purchases",
                    text: "thank you for your purchase, here is your receipt: ".concat(receipt),
                };
                _b.label = 2;
            case 2:
                _b.trys.push([2, 4, , 5]);
                return [4 /*yield*/, transporter.sendMail(options)];
            case 3:
                _b.sent();
                return [3 /*break*/, 5];
            case 4:
                err_1 = _b.sent();
                return [2 /*return*/, res.sendStatus(500)];
            case 5: return [3 /*break*/, 7];
            case 6:
                console.log("Unhandled event type ".concat(event.type));
                _b.label = 7;
            case 7: 
            // Return a response to acknowledge receipt of the event
            return [2 /*return*/, res.json({ received: true })];
        }
    });
}); });
