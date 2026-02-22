import { useEffect, useState } from "react";
import API from "../api/axiosInstance";
import { exportPDF } from "../utils/exportPDF";
import { exportCSV } from "../utils/exportCSV";

export default function Expenses() {
  const [expenses, setExpenses] = useState([]);
  const [form, setForm] = useState({ title: "", amount: "", paidBy: "" });

  useEffect(() => {
    API.get("/expenses")
      .then((res) => setExpenses(res.data))
      .catch(() => setExpenses([]));
  }, []);

  const addExpense = async (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      amount: Number(form.amount),
      participants: [form.paidBy],
    };

    try {
      const res = await API.post("/expenses", payload);
      setExpenses((prev) => [res.data, ...prev]);
    } catch {
      const fallback = { ...payload, _id: crypto.randomUUID() };
      setExpenses((prev) => [fallback, ...prev]);
    }

    setForm({ title: "", amount: "", paidBy: "" });
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Expenses</h2>
        <div className="space-x-2">
          <button
            onClick={() => exportPDF(expenses)}
            className="bg-[#6b8e23] text-white px-4 py-2 rounded"
          >
            Export PDF
          </button>
          <button
            onClick={() => exportCSV(expenses)}
            className="bg-[#556b2f] text-white px-4 py-2 rounded"
          >
            Export CSV
          </button>
        </div>
      </div>

      <form onSubmit={addExpense} className="bg-white p-4 rounded-xl shadow grid md:grid-cols-4 gap-3">
        <input
          required
          className="border rounded px-3 py-2"
          placeholder="Expense title"
          value={form.title}
          onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
        />
        <input
          required
          type="number"
          min="1"
          className="border rounded px-3 py-2"
          placeholder="Amount"
          value={form.amount}
          onChange={(e) => setForm((prev) => ({ ...prev, amount: e.target.value }))}
        />
        <input
          required
          className="border rounded px-3 py-2"
          placeholder="Paid by"
          value={form.paidBy}
          onChange={(e) => setForm((prev) => ({ ...prev, paidBy: e.target.value }))}
        />
        <button className="bg-[#3b5323] text-white rounded px-4 py-2">Add</button>
      </form>

      {expenses.map((e) => (
        <div key={e._id} className="bg-white p-4 rounded shadow">
          <p className="font-semibold">{e.title}</p>
          <p className="text-sm text-gray-500">
            ₹{e.amount} • Paid by {e.paidBy}
          </p>
        </div>
      ))}
    </div>
  );
}
