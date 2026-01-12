import jsPDF from "jspdf";
import "jspdf-autotable";

export function exportPDF(expenses) {
  const doc = new jsPDF();

  doc.text("Expense Report", 14, 15);

  doc.autoTable({
    startY: 20,
    head: [["Title", "Amount", "Paid By", "Status"]],
    body: expenses.map((e) => [
      e.title,
      e.amount,
      e.paidBy,
      e.settled ? "Settled" : "Pending",
    ]),
  });

  doc.save("expenses.pdf");
}
