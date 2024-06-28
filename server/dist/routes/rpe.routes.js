"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const RpeModels_1 = __importDefault(require("../models/RpeModels"));
const router = (0, express_1.Router)();
function getEmojiAndColor(score) {
    const emojis = ["😆", "😋", "😊", "🙂", "😉", "🤨", "😪", "😥", "😭", "🤮"];
    const colors = [
        "#5ce1e6",
        "#37b6fe",
        "#37b6fe",
        "#7dd957",
        "#7dd957",
        "#7dd957",
        "#ffde59",
        "#ffde59",
        "#fe904c",
        "#fe1616",
    ];
    const index = Math.round(score) - 1;
    return { emoji: emojis[index], color: colors[index] };
}
router.post("/rpe", async (req, res) => {
    try {
        const { emoji, numeroClique, colors } = req.body;
        const rpeData = new RpeModels_1.default({ emoji, numeroClique, colors });
        await rpeData.save();
        console.log("RPE data saved successfully");
        res.status(201).json({ message: "RPE data saved successfully" }); // Ensure status code is 201
    }
    catch (err) {
        console.error("Error saving RPE data:", err);
        if (err instanceof Error) {
            res.status(500).json({ error: err.message });
        }
        else {
            res.status(500).json({ error: "An unknown error occurred" });
        }
    }
});
router.get("/rpe", async (req, res) => {
    try {
        const rpeData = await RpeModels_1.default.aggregate([
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$dateClique" } },
                    averageScore: { $avg: "$numeroClique" },
                },
            },
        ]);
        const rpeDataWithEmojiAndColor = rpeData.map((data) => {
            const { emoji, color } = getEmojiAndColor(data.averageScore);
            return { ...data, emoji, color };
        });
        res.status(200).json({ rpeData: rpeDataWithEmojiAndColor });
    }
    catch (err) {
        console.error("Error fetching RPE data:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.default = router;
