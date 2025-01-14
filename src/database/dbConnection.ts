import dotenv from 'dotenv';
import mongoose from "mongoose";
dotenv.config();
export const databaseConnection = async() =>{
mongoose.connect(`${process.env.DB_URL}`);
const dbConnection = mongoose.connection;
dbConnection.on('error', console.error.bind(console, 'MongodbConnection connection error:'));
dbConnection.once('open', () => {
  console.log('Database Connection established successful!');
});
} 