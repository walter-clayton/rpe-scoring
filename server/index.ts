import express, { Express } from "express";
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
import rpeRoutes from "./routes/rpe.routes";
require("./database");
import { VercelRequest, VercelResponse } from "@vercel/node";

export default function handler(req: VercelRequest, res: VercelResponse) {
  // Your server logic here res.status(200).json({ message: ‘Hello from Vercel Serverless Function!’ });

  const app: Express = express();
  dotenv.config();

  const corsOptions = {
    origin: [
      "http://localhost:5173",
      "https://www.afitpilot.com/",
      "https://rpe-scoring.vercel.app/",
    ],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    optionsSuccessStatus: 200,
  };

  app.use(cors(corsOptions));

  const PORT: number = parseInt(process.env.PORT!) || 4000;
  app.set("port", PORT);

  app.use(bodyParser.json({ limit: "50mb" }));
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(express.json({ limit: "50mb" }));
  app.use(
    express.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 })
  );

  app.use("/rpe", rpeRoutes);

  app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
  });
}
