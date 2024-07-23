import { useState } from "react";
import { useNavigate } from "react-router";
import { Container, Col, Button, Form } from "react-bootstrap";
import { useExpenses } from "../contexts/ExpensesContext";
import { useTransfer } from "../contexts/TransferContext";
import { useLogs } from "../contexts/LogsContext";
import styles from "./CreateTransactionForm.module.css";

function CreateTransactionForm() {
  const [transactionType, setTransactionType] = useState("expense");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState(0);

  const { setExpenses } = useExpenses();
  const { formattedDate } = useTransfer();
  const { setLogs } = useLogs();

  const navigate = useNavigate();

  function handleCreateExpense(e) {
    e.preventDefault();
    const newExpense = {
      id: Date.now(),
      type: transactionType,
      amount: parseFloat(amount),
      date: formattedDate,
      description,
      space: "",
    };
    setExpenses((prevExpenses) => [...prevExpenses, newExpense]);
    const newLog = {
      date: formattedDate,
      description: `New ${transactionType} : ${description} - ${amount}€`,
      type: transactionType,
    };
    setLogs((prevLogs) => [...prevLogs, newLog]);
    navigate(-1);
  }

  return (
    <Container>
      <Col lg={4} className="mx-auto">
        <Form class={styles.newExpenseForm}>
          <Form.Group>
            <Form.Label>Transaction type</Form.Label>
            <Form.Control
              as="select"
              value={transactionType}
              onChange={(e) => setTransactionType(e.target.value)}
            >
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Amazon, Netflix, etc."
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Amount</Form.Label>
            <Form.Control
              type="number"
              min={0}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </Form.Group>
          <Button
            variant="primary"
            type="submit"
            onClick={handleCreateExpense}
            className={styles.submitButton}
          >
            Create
          </Button>
        </Form>
      </Col>
    </Container>
  );
}

export default CreateTransactionForm;
