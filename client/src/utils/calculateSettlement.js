export function calculateSettlement(expenses) {
  const balance = {};

  expenses.forEach((e) => {
    const share = e.splitAmount;

    e.participants.forEach((p) => {
      if (!balance[p]) balance[p] = 0;

      if (p === e.paidBy) {
        balance[p] += e.amount - share;
      } else {
        balance[p] -= share;
      }
    });
  });

  return balance;
}
