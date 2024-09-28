// import dotenv from 'dotenv';

// dotenv.config();

// module.exports = {
//   WHATSAPP_API_URL: `https://graph.facebook.com/v17.0/${process.env.PHONE_NUMBER_ID}/messages`,
//   WHATSAPP_TOKEN: process.env.WHATSAPP_TOKEN,
//   FEEDBACK_QUESTIONS: [
//     "How would you rate our service?",
//     "How satisfied are you with our service quality?",
//     "How likely are you to recommend us to others?",
//     "How would you rate our customer support?",
//     "How easy was it to use our service/product?"
//   ]
// };


import dotenv from 'dotenv';

dotenv.config();

export const WHATSAPP_API_URL = `https://graph.facebook.com/v17.0/${process.env.PHONE_NUMBER_ID}/messages`;
export const WHATSAPP_TOKEN = process.env.WHATSAPP_TOKEN;
export const FEEDBACK_QUESTIONS = [
    "How would you rate our service?",
    "How satisfied are you with our service quality?",
    "How likely are you to recommend us to others?",
    "How would you rate our customer support?",
    "How easy was it to use our service/product?"
];
