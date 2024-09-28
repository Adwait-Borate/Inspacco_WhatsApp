// import express from 'express';
// import bodyParser from 'body-parser';
// import { processFeedback } from './feedbackManager.js';
// import { startFeedbackProcess } from './scheduledFeedback.js';

// const app = express();
// app.use(bodyParser.json());

// app.post('/webhook', async (req, res) => {
//   const data = req.body;

//   if (data.object === "whatsapp_business_account") {
//     for (const entry of data.entry) {
//       for (const change of entry.changes) {
//         if (change.field === "messages") {
//           const phoneNumber = change.value.messages[0].from;
//           let messageBody;

//           if (change.value.messages[0].type === "button") {
//             messageBody = change.value.messages[0].button.payload;
//           } else {
//             messageBody = change.value.messages[0].text.body;
//           }

//           await processFeedback(phoneNumber, messageBody);
//         }
//       }
//     }
//   }

//   res.status(200).send('OK');
// });

// app.get('/start-feedback/:phoneNumber', async (req, res) => {
//   const { phoneNumber } = req.params;
//   await startFeedbackProcess(phoneNumber);
//   res.send('Feedback process initiated');
// });

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

import express from 'express';
import bodyParser from 'body-parser';
import { processFeedback } from './feedbackManager.js';
import { startFeedbackProcess } from './scheduledFeedback.js';
import { MongoClient } from 'mongodb'; // Import MongoClient
import dotenv from 'dotenv';

dotenv.config(); 

const app = express();
app.use(bodyParser.json());


// temporary idhar hai...otherwise create env file to store mongodb uri
const uri = "mongodb+srv://borateadwait:G3apLcXL9IbYYu2p@cluster0.cpkow.mongodb.net/";
const client = new MongoClient(uri);

async function connectToDatabase() {
  try {
    await client.connect();
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); 
  }
}

app.get('/', (req, res) => {
    res.send('Hello Adwait here');
  });

app.post('/webhook', async (req, res) => {
  const data = req.body;

  if (data.object === "whatsapp_business_account") {
    for (const entry of data.entry) {
      for (const change of entry.changes) {
        if (change.field === "messages") {
          const phoneNumber = change.value.messages[0].from; //sender ph.number
          let messageBody;

          if (change.value.messages[0].type === "button") {
            messageBody = change.value.messages[0].button.payload;
          } else {
            messageBody = change.value.messages[0].text.body;
          }

          await processFeedback(phoneNumber, messageBody);
        }
      }
    }
  }

  res.status(200).send('OK');
});

app.get('/start-feedback/:phoneNumber', async (req, res) => {
  const { phoneNumber } = req.params;
  await startFeedbackProcess(phoneNumber);
  res.send('Feedback process initiated');
});

const PORT = process.env.PORT || 3000;

connectToDatabase(); // Connect to MongoDB when the server starts

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
