"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const uri = process.env.MONGODB_URI || "";
const dbName = process.env.MONGODB_DBNAME || "";
const setupDB = (connectionString) => {
    mongoose_1.default
        .connect(connectionString, { dbName: dbName })
        .then(async (db) => {
        console.log(`Connected to database ${db.connection.name}`);
    })
        .catch((err) => console.error("Database connection error:", err));
};
setupDB(uri);
