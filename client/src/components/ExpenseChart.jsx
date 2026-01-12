import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#6b8e23", "#8fa874", "#4f691a", "#aabd95"];

export default function ExpenseChart({ expenses }) {
  const data = expenses.map((e) => ({
    name: e.title,
    value: e.amount,
  }));

  return (
    <div className="bg-white p-6 rounded-xl shadow h-80">
      <h3 className="text-lg font-semibold mb-4">Expense Distribution</h3>

      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            outerRadius={90}
            label
          >
            {data.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
