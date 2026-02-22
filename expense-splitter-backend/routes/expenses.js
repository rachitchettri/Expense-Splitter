import express from "express";
import Expense from "../models/Expense.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.get("/", protect, async (req, res) => {
  try {
    const expenses = await Expense.find({ createdBy: req.user._id }).sort({ createdAt: -1 });
    return res.json(expenses);
  } catch (err) {
    return res.status(500).json({ message: "Failed to fetch expenses" });
  }
});

router.post("/", protect, async (req, res) => {
  try {
    const { title, amount, paidBy, participants = [], groupId = null } = req.body;

    if (!title || !amount || !paidBy) {
      return res.status(400).json({ message: "Title, amount and paidBy are required" });
    }

    const normalizedParticipants = participants.length ? participants : [paidBy];
    const splitAmount = Number(amount) / normalizedParticipants.length;

    const expense = await Expense.create({
      title,
      amount: Number(amount),
      paidBy,
      participants: normalizedParticipants,
      splitAmount,
      groupId,
      createdBy: req.user._id,
    });

    return res.status(201).json(expense);
  } catch (err) {
    return res.status(500).json({ message: "Failed to create expense" });
  }
});

router.patch("/:id/settle", protect, async (req, res) => {
  try {
    const expense = await Expense.findOne({ _id: req.params.id, createdBy: req.user._id });
    if (!expense) return res.status(404).json({ message: "Expense not found" });

    expense.settled = true;
    await expense.save();

    return res.json(expense);
  } catch (err) {
    return res.status(500).json({ message: "Failed to settle expense" });
  }
});

export default router;
