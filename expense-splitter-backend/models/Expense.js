const expenseSchema = new mongoose.Schema({
  title: String,
  amount: Number,
  paidBy: String,
  participants: [String],
  splitAmount: Number,

  groupId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Group",
  },

  settled: { type: Boolean, default: false },

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});
