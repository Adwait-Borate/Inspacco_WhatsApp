import { sendWhatsAppMessage } from './whatsappApi.js';
//import { processFeedback } from './feedbackManager.js';
//import config from './config.js';
import cron from 'node-cron';


export async function sendScheduledFeedbackRequests() {
  // This function would typically query your database for clients due for feedback
  const clientsForFeedback = await getClientsForFeedback();

  for (const client of clientsForFeedback) {
    await startFeedbackProcess(client.phoneNumber);
  }
}

export async function startFeedbackProcess(phoneNumber) {
  const initialMessage = "We value your opinion! Would you like to provide feedback on our service?";
  const buttons = [
    { type: "reply", reply: { id: "start_feedback", title: "Start Feedback" } },
    { type: "reply", reply: { id: "not_now", title: "Not Now" } }
  ];

  await sendWhatsAppMessage(phoneNumber, initialMessage, buttons);
}

// Schedule to run every Monday at 9 AM
cron.schedule('0 9 * * 1', async () => {    //not required as of now--chatgpt code--inspacco team will decide
  console.log('Running scheduled feedback requests');
  await sendScheduledFeedbackRequests();
});

//module.exports = { startFeedbackProcess };