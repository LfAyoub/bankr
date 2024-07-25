import { Col, Row, Container } from "react-bootstrap";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";

import { useExpenses } from "../contexts/ExpensesContext";
import { useSpaces } from "../contexts/SpacesContext";
import { useLogs } from "../contexts/LogsContext";
import { useTransfer } from "../contexts/TransferContext";

import styles from "./ManageExpenseForm.module.css";

function ManageExpenseForm({ id }) {
  const { expenses, setExpenses } = useExpenses();
  const { spaces, setSpaces } = useSpaces();
  const { setLogs } = useLogs();
  const { formattedDate } = useTransfer();
  const expense = expenses.find((expense) => Number(expense.id) === Number(id));
  const { description, amount, date, space } = expense;
  const [selectedSpace, setSelectedSpace] = useState(space || "");
  const [actionCompleted, setActionCompleted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (actionCompleted) {
      navigate("/transactions");
    }
  }, [actionCompleted, navigate]);

  function handleApply(e) {
    e.preventDefault();
    const newExpenses = expenses.map((expense) => {
      if (space === selectedSpace) {
        return {
          ...expense,
        };
      }
      if (Number(expense.id) === Number(id)) {
        return {
          ...expense,
          space: selectedSpace,
        };
      }
      return expense;
    });
    setExpenses(newExpenses);
    const newSpaces = spaces.map((space) => {
      if (expense.space === space) {
        return {
          ...space,
        };
      } else if (space.name === selectedSpace) {
        return {
          ...space,
          amount: space.amount - expense.amount,
        };
      }

      return space;
    });
    const newLog = {
      date: formattedDate,
      description: `Edited transaction : ${expense.description}`,
      type: "Transaction management",
    };
    setLogs((prevLogs) => [...prevLogs, newLog]);
    setSpaces(newSpaces);
    setActionCompleted(true);
  }

  return (
    <Container>
      <Col lg={6} md={8} className="mx-auto">
        <form className={styles.manageExpenseForm}>
          <div className={styles.formField}>
            <label>Expense description</label>
            <input type="text" value={description} readOnly />
          </div>
          <div className={styles.formField}>
            <label>Amount</label>
            <input type="text" value={amount + "€"} readOnly />
          </div>

          <div className={styles.formField}>
            <label>Date</label>
            <input type="text" value={date} readOnly />
          </div>
          <div className={styles.formField}>
            <label>Space</label>
            <select
              onChange={(e) => setSelectedSpace(e.target.value)}
              value={expense.space === "" ? selectedSpace : expense.space}
              disabled={expense.space !== ""}
            >
              <option value="">Empty</option>
              {spaces.map((space) => (
                <option key={space.name} value={space.name}>
                  {space.name}
                </option>
              ))}
            </select>
          </div>
          <button className={styles.applyButton} onClick={handleApply}>
            Apply
          </button>
        </form>
      </Col>
    </Container>
  );
}

export default ManageExpenseForm;
