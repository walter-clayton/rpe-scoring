import mongoose, { Document, Schema } from "mongoose";

interface IRPE extends Document {
  emoji: string;
  numeroClique: number;
  colors: string;
  dateClique: Date;
}

const rpeSchema = new Schema(
  {
    emoji: { type: String, required: true },
    numeroClique: { type: Number, required: true },
    colors: { type: String, required: true },
    dateClique: { type: Date, default: Date.now },
  },
  { collection: "rpe" }
);

export default mongoose.model<IRPE>("RPE", rpeSchema);
