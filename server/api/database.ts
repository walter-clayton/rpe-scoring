import mongoose, { Mongoose } from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const uri: string = process.env.MONGODB_URI || "";
const dbName: string = process.env.MONGODB_DBNAME || "";

const setupDB = (connectionString: string) => {
  mongoose
    .connect(connectionString, { dbName: dbName })
    .then(async (db: Mongoose) => {
      console.log(`Connected to database ${db.connection.name}`);
    })
    .catch((err) => console.error("Database connection error:", err));
};

setupDB(uri);
