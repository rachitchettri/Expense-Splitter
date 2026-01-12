import Expense from "../models/Expense.js";
import { sendEmail } from "../utils/sendEmail.js";
import { sendWhatsApp } from "../utils/sendWhatsApp.js";

export const addExpense = async (req, res) => {
  const expense = await Expense.create(req.body);

  // EMAIL
  await sendEmail({
    to: req.user.email,
    subject: "New Expense Added",
    html: `
      <h3>Expense Added</h3>
      <p><b>${expense.title}</b></p>
      <p>Amount: ₹${expense.amount}</p>
    `,
  });

  // WHATSAPP
  await sendWhatsApp({
    to: req.user.phone,
    message: `💸 New expense added: ${expense.title} - ₹${expense.amount}`,
  });

  res.status(201).json(expense);
};
