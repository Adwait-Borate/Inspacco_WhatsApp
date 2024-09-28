// import { MongoClient } from 'mongodb';


// const uri = "mongodb+srv://borateadwait:G3apLcXL9IbYYu2p@cluster0.cpkow.mongodb.net/";
// const client = new MongoClient(uri);

// async function connectToDatabase() {
//   await client.connect();
//   return client.db("whatsapp_feedback");
// }

// export async function saveFeedback(phoneNumber, responses) {
//   const db = await connectToDatabase();
//   const collection = db.collection('feedback');
//   await collection.insertOne({ phoneNumber, responses, timestamp: new Date() });
// }

// export async function getAllFeedback() {
//   const db = await connectToDatabase();
//   const collection = db.collection('feedback');
//   return collection.find({}).toArray();
// }

// //module.exports = { saveFeedback, getAllFeedback };


import { MongoClient } from 'mongodb';

const uri = "mongodb+srv://borateadwait:G3apLcXL9IbYYu2p@cluster0.cpkow.mongodb.net/";
const client = new MongoClient(uri);

async function connectToDatabase() {
  try {
    await client.connect();
    console.log('MongoDB connected successfully');
    return client.db("whatsapp_feedback");
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error; // Rethrow the error to handle it in the calling function
  }
}

export async function saveFeedback(phoneNumber, responses) {
  const db = await connectToDatabase();
  const collection = db.collection('feedback');
  await collection.insertOne({ phoneNumber, responses, timestamp: new Date() });
}

export async function getAllFeedback() {
  const db = await connectToDatabase();
  const collection = db.collection('feedback');
  return collection.find({}).toArray();
}
