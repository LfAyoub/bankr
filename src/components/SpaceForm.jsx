import { useState } from "react";
import { Container, Col, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import ErrorMessage from "./ErrorMessage";
import { useSpaces } from "../contexts/SpacesContext";
import { useLogs } from "../contexts/LogsContext";
import { useTransfer } from "../contexts/TransferContext";
import styles from "./SpaceForm.module.css";

function SpaceForm() {
  const { spaces, setSpaces } = useSpaces();
  const { setLogs } = useLogs();
  const { formattedDate } = useTransfer();
  const [spaceName, setSpaceName] = useState("");
  const [amount, setAmount] = useState(1);
  const [showError, setShowError] = useState(false);

  const navigate = useNavigate();

  function handleCreate(e) {
    e.preventDefault();
    if (spaceName.trim().length === 0) {
      setShowError(true);
      return;
    } else {
      const newSpace = {
        name: spaceName,
        amount: amount,
      };
      setSpaces([...spaces, newSpace]);
      const newLog = {
        date: formattedDate,
        description: `New space created : ${spaceName}`,
        type: "Space management",
      };
      setLogs((prevLogs) => [...prevLogs, newLog]);
      setSpaceName("");
      setAmount(0);
      navigate(-1);
    }
  }

  return (
    <Container>
      <Col lg={4} className="mx-auto">
        <Form className={styles.spaceForm}>
          <Form.Group>
            <Form.Label>Space name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Birthday party, Vacation, etc."
              onChange={(e) => setSpaceName(e.target.value)}
              value={spaceName}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Amount</Form.Label>
            <Form.Control
              type="number"
              min={1}
              onChange={(e) => setAmount(Number(e.target.value))}
              value={amount}
            />
          </Form.Group>
          <Button onClick={handleCreate}>Create</Button>
          {showError && <ErrorMessage message="Invalid space name" />}
        </Form>
      </Col>
    </Container>
  );
}

export default SpaceForm;
