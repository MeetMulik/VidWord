import express from "express";
import { getCards, createCard, deleteCard } from "../controllers/cardController.js";

const router = express.Router();

router.get("/", getCards);
router.post("/create", createCard);
router.delete("/:id", deleteCard);

export default router;