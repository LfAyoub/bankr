import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { Container, Col, Form, Button } from "react-bootstrap";
import BackButton from "./BackButton";

import { useSpaces } from "../contexts/SpacesContext";

import styles from "./ManageSpaceForm.module.css";
import { useLogs } from "../contexts/LogsContext";
import { useTransfer } from "../contexts/TransferContext";

function ManageSpaceForm({ amount, setAmount, spaceName }) {
  const navigate = useNavigate();
  const { spaces, setSpaces } = useSpaces();
  const { setLogs } = useLogs();
  const { formattedDate } = useTransfer();
  const currentSpace = spaces.find((space) => space.name === spaceName);

  const [name, setName] = useState(currentSpace ? currentSpace.name : "");

  if (currentSpace) setAmount(currentSpace.amount.toFixed(2));
  const [actionCompleted, setActionCompleted] = useState(false);

  useEffect(() => {
    if (actionCompleted) {
      navigate("/spaces");
    }
  }, [actionCompleted, navigate]);

  function editSpace(e) {
    e.preventDefault();
    const newSpaces = spaces.map((space) => {
      if (space.name === currentSpace.name) {
        return { name, amount: parseInt(amount) };
      }
      return space;
    });
    const newLog = {
      date: formattedDate,
      description: `Edited space ${currentSpace.name}`,
      type: "Space management",
    };
    setLogs((prevLogs) => [...prevLogs, newLog]);
    setSpaces(newSpaces);
    setActionCompleted(true);
    alert("Space edited");
  }

  function deleteSpace(e) {
    e.preventDefault();
    setSpaces(spaces.filter((space) => space.name !== currentSpace.name));
    const newLog = {
      date: formattedDate,
      description: `Deleted space ${currentSpace.name}`,
      type: "Space management",
    };
    setLogs((prevLogs) => [...prevLogs, newLog]);
    setActionCompleted(true);
    alert("Space deleted");
  }

  return (
    <Container>
      <Col xl={4} lg={6} md={8} sm={10} className="mx-auto">
        <Form className={styles.manageSpaceForm}>
          <Form.Group>
            <Form.Label>Space name</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Amount</Form.Label>
            <Form.Control
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" onClick={editSpace}>
            Edit
          </Button>
          <p className={styles.deleteMessage} onClick={deleteSpace}>
            Delete space
          </p>
        </Form>
      </Col>
    </Container>
  );
}

export default ManageSpaceForm;
