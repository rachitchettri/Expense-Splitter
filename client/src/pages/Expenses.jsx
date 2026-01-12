import { useEffect, useState } from "react";
import API from "../api/axiosInstance";
import { exportPDF } from "../utils/exportPDF";
import { exportCSV } from "../utils/exportCSV";
import AddExpense from "./AddExpense";

export default function Expenses() {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    API.get("/expenses").then((res) => setExpenses(res.data));
  }, []);

  return (
    <div className="max-w-3xl mx-auto space-y-6">

      {/* HEADER + EXPORT */}
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

      {/* ADD EXPENSE */}
      <AddExpense onExpenseAdded={(e) => setExpenses((prev) => [...prev, e])} />

      {/* EXPENSE LIST */}
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
