import { useExpenses } from "../contexts/ExpensesContext";
import ExpenseItem from "./ExpenseItem";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWallet } from "@fortawesome/free-solid-svg-icons";

import styles from "./HomepageSection.module.css";

function HomepageExpenses() {
  const { expenses } = useExpenses();

  const recentExpenses = expenses
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 3);

  return (
    <div className={styles.homepageSection}>
      <Link to="/transactions" className={styles.sectionTitle}>
        <h3>
          Last transactions
          <FontAwesomeIcon icon={faWallet} style={{ marginLeft: "10px" }} />
        </h3>
      </Link>
      <div className={styles.expensesList}>
        {recentExpenses.length > 0 ? (
          recentExpenses.map((expense) => (
            <ExpenseItem key={expense.id} expense={expense} />
          ))
        ) : (
          <h4 className={styles.emptySectionMessage}>No transaction</h4>
        )}
      </div>
    </div>
  );
}

export default HomepageExpenses;
