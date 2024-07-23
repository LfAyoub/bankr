import { useExpenses } from "../contexts/ExpensesContext";
import { Link } from "react-router-dom";

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
      <div className={styles.expenseItem__date}>
        <div className={styles.day}>{formatDate(expense.date).day}</div>
        <div className={styles.month}>{formatDate(expense.date).month}</div>
      </div>
      <div className={styles.expenseItem__description}>
        <p>{expense.description}</p>
      </div>
      <div
        className={`${styles.expenseItem__amount} ${
          expense.type === "expense" ? styles["__expense"] : styles["__income"]
        }`}
      >
        {expense.type === "expense" ? "-" : "+"}
        {expense.amount.toFixed(2)}€
      </div>
    </div>
  );
}

export default ExpenseItem;
