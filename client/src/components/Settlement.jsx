import { calculateSettlement } from "../utils/calculateSettlement";

export default function Settlement({ expenses }) {
  const balance = calculateSettlement(expenses);

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h3 className="text-lg font-semibold mb-4">Settlement Summary</h3>

      <ul className="space-y-2">
        {Object.entries(balance).map(([user, amount]) => (
          <li
            key={user}
            className="flex justify-between border-b pb-2"
          >
            <span>{user}</span>
            <span
              className={
                amount >= 0 ? "text-green-600" : "text-red-500"
              }
            >
              {amount >= 0
                ? `Gets ₹${amount.toFixed(2)}`
                : `Owes ₹${Math.abs(amount).toFixed(2)}`}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
