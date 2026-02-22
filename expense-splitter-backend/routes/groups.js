import express from "express";
import Group from "../models/Group.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.get("/", protect, async (req, res) => {
  try {
    const groups = await Group.find({ createdBy: req.user._id }).sort({ createdAt: -1 });
    return res.json(groups);
  } catch (err) {
    return res.status(500).json({ message: "Failed to fetch groups" });
  }
});

router.post("/", protect, async (req, res) => {
  try {
    const { name, category = "Other", goalAmount = 0, members = [] } = req.body;
    if (!name) return res.status(400).json({ message: "Group name is required" });

    const group = await Group.create({
      name,
      category,
      goalAmount: Number(goalAmount),
      members,
      createdBy: req.user._id,
    });

    return res.status(201).json(group);
  } catch (err) {
    return res.status(500).json({ message: "Failed to create group" });
  }
});

router.post("/:id/contributions", protect, async (req, res) => {
  try {
    const { memberName, amount } = req.body;
    if (!memberName || !amount) {
      return res.status(400).json({ message: "memberName and amount are required" });
    }

    const group = await Group.findOne({ _id: req.params.id, createdBy: req.user._id });
    if (!group) return res.status(404).json({ message: "Group not found" });

    group.contributions.push({ memberName, amount: Number(amount) });
    if (!group.members.includes(memberName)) {
      group.members.push(memberName);
    }

    await group.save();
    return res.status(201).json(group);
  } catch (err) {
    return res.status(500).json({ message: "Failed to add contribution" });
  }
});

export default router;
