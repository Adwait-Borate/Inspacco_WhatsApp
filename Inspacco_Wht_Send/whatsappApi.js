import axios from 'axios';
import { WHATSAPP_API_URL, WHATSAPP_TOKEN} from './config.js';

//facebook developer acct se lenge
export async function sendWhatsAppMessage(to, messageBody, buttons = null) {
  const headers = {
    'Authorization': `Bearer ${WHATSAPP_API_URL}`,
    'Content-Type': 'application/json'
  };


  //custom template(message)
  const data = {
    messaging_product: "whatsapp",
    recipient_type: "individual",
    to: to,
    type: buttons ? "interactive" : "text",
  };

  if (buttons) {
    data.interactive = {
      type: "button",
      body: { text: messageBody },
      action: { buttons: buttons }
    };
  } else {
    data.text = { body: messageBody };
  }

  try {
    const response = await axios.post(WHATSAPP_TOKEN, data, { headers });
    return response.data;
  } catch (error) {
    console.error('Error sending WhatsApp message:', error);
    throw error;
  }
}


//chatgpt - create star buttons
export function createStarButtons() {
  return Array.from({ length: 5 }, (_, i) => ({
    type: "reply",
    reply: { id: `${i + 1}_star`, title: "⭐".repeat(i + 1) }
  }));
}

//module.exports = { sendWhatsAppMessage, createStarButtons };