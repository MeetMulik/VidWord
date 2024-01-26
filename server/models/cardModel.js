import mongoose from "mongoose";

const cardSchema = mongoose.Schema(
  {
    videoURL: {
      type: String,
      required: true,
    },
    transcript: {
      type: String,
      required: true,
    },
    timestamp: {
      type: String,
      required: true,
    },
    summary: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Card = mongoose.model("Card", cardSchema);

export default Card;
