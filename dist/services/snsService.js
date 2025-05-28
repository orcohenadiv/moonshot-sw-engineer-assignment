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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.publishUserCreated = void 0;
const aws_sdk_1 = require("aws-sdk");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const sns = new aws_sdk_1.SNS();
const publishUserCreated = (message) => __awaiter(void 0, void 0, void 0, function* () {
    const params = {
        Message: message,
        TopicArn: process.env.SNS_TOPIC_ARN,
    };
    try {
        const result = yield sns.publish(params).promise();
        console.log('SNS publish result:', result);
        return result;
    }
    catch (err) {
        console.error('SNS publish error:', err);
        throw err;
    }
});
exports.publishUserCreated = publishUserCreated;
