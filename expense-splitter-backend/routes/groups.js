router.post("/", protect, async (req, res) => {
  const { name, members } = req.body;

  const group = await Group.create({
    name,
    members,
    createdBy: req.user.id,
  });

  res.status(201).json(group);
});

router.get("/", protect, async (req, res) => {
  const groups = await Group.find({ createdBy: req.user.id });
  res.json(groups);
});
router.patch("/:id/settle", protect, async (req, res) => {
  const expense = await Expense.findById(req.params.id);
  expense.settled = true;
  await expense.save();
  res.json(expense);
});

