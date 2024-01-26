import Card from "../models/cardModel.js";

export const getCards = async (req, res) => {
  try {
    const cards = await Card.find().sort({ createdAt: -1 });
    res.status(200).json(cards);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const createCard = async (req, res) => {
  const { videoURL, transcript, timestamp, summary } = req.body;
  const newCard = new Card({ videoURL, transcript, timestamp, summary });
  try {
    await newCard.save();
    res.status(201).json(newCard);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

export const deleteCard = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No card with id: ${id}`);
  await Card.findByIdAndRemove(id);
  res.json({ message: "Card deleted successfully." });
};
