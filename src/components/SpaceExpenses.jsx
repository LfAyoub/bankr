import { useParams } from "react-router-dom";
import { useExpenses } from "../contexts/ExpensesContext";
import { useSpaces } from "../contexts/SpacesContext";
import { Container, Col, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import styles from "./SpaceExpenses.module.css";
import { useLogs } from "../contexts/LogsContext";
import { useTransfer } from "../contexts/TransferContext";

function SpaceExpenses({ setAmount }) {
  const space = useParams();
  const { expenses, setExpenses, sortExpenses } = useExpenses();
  const { spaces, setSpaces } = useSpaces();
  const { setLogs } = useLogs();
  const { formattedDate } = useTransfer();
  const spaceExpenses = sortExpenses(space);

  function formatDate(date) {
    const dateObj = new Date(date);
    return dateObj.toLocaleDateString();
  }

  function handleDeleteExpense(expense) {
    // Delete the expense from the space
    const editedExpense = {
      ...expense,
      space: "",
    };
    const newExpenses = expenses.map((exp) => {
      if (exp.id === expense.id) {
        return editedExpense;
      }
      return exp;
    });
    setExpenses(newExpenses);
    // Update the space amount
    const spaceIndex = spaces.findIndex((s) => s.name === space.spaceName);
    const newSpaces = [...spaces];
    newSpaces[spaceIndex] = {
      ...spaces[spaceIndex],
      amount: spaces[spaceIndex].amount + expense.amount,
    };
    const newLog = {
      date: formattedDate,
      description: `Deleted expense : ${expense.description} from space ${space.spaceName}`,
      type: "Space management",
    };
    setLogs((prevLogs) => [...prevLogs, newLog]);
    setSpaces(newSpaces);
    setAmount(spaces[spaceIndex].amount + expense.amount);
  }

  return (
    <Container>
      <div className={styles.spaceExpenses}>
        <h1>Expenses list</h1>
        {spaceExpenses.length > 0 ? (
          <Col sm={10} md={7} className="mx-auto">
            <table className="table table-dark table-striped table-bordered">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Description</th>
                  <th>Amount</th>
                  <th style={{ width: "12%" }}>Delete</th>
                </tr>
              </thead>
              <tbody>
                {spaceExpenses.map((expense) => (
                  <tr key={expense.id}>
                    <td>{formatDate(expense.date)}</td>
                    <td>{expense.description}</td>
                    <td>{expense.amount.toFixed(2)}€</td>
                    <td className="text-center">
                      <Button
                        variant="danger"
                        onClick={() => handleDeleteExpense(expense)}
                      >
                        <FontAwesomeIcon icon={faTrashCan} />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Col>
        ) : (
          <p>No expenses yet</p>
        )}
      </div>
    </Container>
  );
}

export default SpaceExpenses;
