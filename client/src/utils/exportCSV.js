export function exportCSV(expenses) {
  const rows = [
    ["Title", "Amount", "Paid By", "Status"],
    ...expenses.map((e) => [
      e.title,
      e.amount,
      e.paidBy,
      e.settled ? "Settled" : "Pending",
    ]),
  ];

  const csv = rows.map((r) => r.join(",")).join("\n");

  const blob = new Blob([csv], { type: "text/csv" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "expenses.csv";
  link.click();
}
