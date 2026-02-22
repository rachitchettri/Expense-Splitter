import mongoose from "mongoose";

const contributionSchema = new mongoose.Schema(
  {
    memberName: { type: String, required: true, trim: true },
    amount: { type: Number, required: true, min: 0 },
  },
  { _id: true, timestamps: true }
);

const groupSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    category: {
      type: String,
      default: "Other",
      enum: ["Trip", "Birthday", "Office Party", "Wedding", "Other"],
    },
    goalAmount: { type: Number, default: 0, min: 0 },
    members: { type: [String], default: [] },
    contributions: { type: [contributionSchema], default: [] },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

groupSchema.virtual("totalRaised").get(function totalRaised() {
  return this.contributions.reduce((sum, item) => sum + item.amount, 0);
});

groupSchema.set("toJSON", { virtuals: true });

groupSchema.set("toObject", { virtuals: true });

export default mongoose.model("Group", groupSchema);
