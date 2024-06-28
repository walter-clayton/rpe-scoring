"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const rpe_routes_1 = __importDefault(require("../routes/rpe.routes"));
const path = require("path"); // Import path module
require("./database");

const app = (0, express_1.default)();
dotenv.config();

const corsOptions = {
    origin: [
        "http://localhost:5173",
        "https://www.afitpilot.com/",
        "https://rpe-scoring.vercel.app",
        "https://rpe-scoring-front-github.vercel.app",
    ],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

const PORT = parseInt(process.env.PORT) || 4000;
app.set("port", PORT);

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express_1.default.json({ limit: "50mb" }));
app.use(express_1.default.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));

// API routes
app.use("/api", rpe_routes_1.default);

// Serve static files from the React app
app.use(express_1.default.static(path.join(__dirname, '../client/build')));

// The "catchall" handler: for any request that doesn't match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});
