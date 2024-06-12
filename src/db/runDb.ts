import { settings } from '../settings';
import mongoose from 'mongoose';

const mongoUri = settings.MONGO_URI;

export async function runDb() {
  try {
    await mongoose.connect(mongoUri, { dbName: 'exams' });
    console.log('Connected successfully to mongoDB server');
  } catch (error) {
    console.log("Can't connect to mongo server", error);
    await mongoose.disconnect();
  }
}
