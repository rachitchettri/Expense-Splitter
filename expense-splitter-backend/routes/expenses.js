router.post("/", protect, async (req, res) => {
  const { title, amount, paidBy, participants } = req.body;

  const splitAmount = amount / participants.length;

  const expense = await Expense.create({
    title,
    amount,
    paidBy,
    participants,
    splitAmount,
    createdBy: req.user.id,
  });

  res.status(201).json(expense);
});
