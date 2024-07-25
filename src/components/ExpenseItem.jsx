import { useExpenses } from "../contexts/ExpensesContext";

import styles from "./ExpenseItem.module.css";

function ExpenseItem({ expense }) {
  const { setSelectedExpense } = useExpenses();

  function formatDate(date) {
    const [year, month, day] = date.split("-");
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    return { day, month: months[parseInt(month, 10) - 1] };
  }

  return (
    <div
      className={styles.expenseItem}
      onClick={() => setSelectedExpense(expense)}
    >
      <div className={styles.expenseItemDate}>
        <div className={styles.day}>{formatDate(expense.date).day}</div>
        <div className={styles.month}>{formatDate(expense.date).month}</div>
      </div>
      <div className={styles.expenseItemDescription}>
        <p className={styles.description}>
          {expense.description}
          {expense.note ? (
            <span className={styles.expenseNote}> - {expense.note}</span>
          ) : null}
        </p>
        <p className={styles.space}>{expense.space}</p>
      </div>
      <div
        className={`${styles.expenseItemAmount} ${
          expense.type === "expense" ? styles["expense"] : styles["income"]
        }`}
      >
        {expense.type === "expense" ? "-" : "+"}
        {expense.amount.toFixed(2)}€
      </div>
    </div>
  );
}

export default ExpenseItem;
