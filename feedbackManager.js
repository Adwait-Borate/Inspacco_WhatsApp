import { sendWhatsAppMessage, createStarButtons } from './whatsappApi.js';
import {FEEDBACK_QUESTIONS } from './config.js';
import { saveFeedback } from './database.js';


const userStates = new Map();

export async function processFeedback(phoneNumber, message) {
  if (!userStates.has(phoneNumber)) {
    userStates.set(phoneNumber, { currentQuestion: 0, responses: [] });
  }

  const userState = userStates.get(phoneNumber);

  // Save the user's response
  if (userState.currentQuestion > 0) {
    userState.responses.push(message);
  }

   // Send the next question or thank the user if feedback is complete
  if (userState.currentQuestion < FEEDBACK_QUESTIONS.length) {
    const question = FEEDBACK_QUESTIONS[userState.currentQuestion];// Get current question
    const buttons = createStarButtons(); //call star create button
    await sendWhatsAppMessage(phoneNumber, question, buttons); // Send question with buttons
    userState.currentQuestion++;   // Move to the next question
  } else {
    const thankYouMessage = "Thank you for your feedback! We appreciate your time.";
    await sendWhatsAppMessage(phoneNumber, thankYouMessage);
    
    await saveFeedback(phoneNumber, userState.responses);
    
    userStates.delete(phoneNumber);
  }
}

//module.exports = { processFeedback };