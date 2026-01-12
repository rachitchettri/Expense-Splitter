import { useEffect, useState } from "react";
import API from "../api/axiosInstance";
import { useAuth } from "../hooks/useAuth";
import ExpenseChart from "../components/ExpenseChart";
import Settlement from "../components/Settlement";

export default function Dashboard() {
  const { auth } = useAuth();
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!auth?.user) return;

    const load = async () => {
      const res = await API.get("/expenses");
      setExpenses(res.data);
      setLoading(false);
    };

    load();
  }, [auth]);

  if (!auth?.user) {
    return <p className="text-center">Loading user...</p>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Overview</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <ExpenseChart expenses={expenses} />
      </div>
      <div className="mt-8">
        <Settlement expenses={expenses} />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard label="Total Expenses" value={expenses.length} />
        <StatCard
          label="Total Amount"
          value={`₹ ${expenses.reduce((a, e) => a + e.amount, 0)}`}
        />
        <StatCard label="Active Groups" value="1" />
      </div>

      {/* Recent Expenses */}
      <h3 className="text-xl font-semibold mb-4">Recent Expenses</h3>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="space-y-3">
          {expenses.map((e) => (
            <div
              key={e._id}
              className="bg-white p-4 rounded-xl shadow flex justify-between"
            >
              <div>
                <p className="font-medium">{e.title}</p>
                <p className="text-sm text-gray-500">Paid by {e.paidBy}</p>
              </div>
              <div className="font-bold text-army-700">₹ {e.amount}</div>
            </div>
          ))}
          
        </div>
      )}
    </div>
  );
}

function StatCard({ label, value }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-2xl font-bold mt-2">{value}</p>
    </div>
  );
}
