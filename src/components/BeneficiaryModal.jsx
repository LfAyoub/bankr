import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTransfer } from "../contexts/TransferContext";
import { useLogs } from "../contexts/LogsContext";
import ErrorMessage from "./ErrorMessage";

import styles from "./BeneficiaryModal.module.css";

function BeneficiaryModal({ show, handleClose }) {
  const [newFirstName, setNewFirstName] = useState("");
  const [newLastName, setNewLastName] = useState("");
  const [step, setStep] = useState(1);
  const [showError, setShowError] = useState(false);
  const { beneficiaries, setBeneficiaries, formattedDate } = useTransfer();
  const { setLogs } = useLogs();
  const modalForm = (
    <form>
      <div className={styles.formGroup}>
        <label htmlFor="firstName">First name</label>
        <input
          type="text"
          id="firstName"
          value={newFirstName}
          onChange={(e) => setNewFirstName(e.target.value)}
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="lastName">Last name</label>
        <input
          type="text"
          id="lastName"
          value={newLastName}
          onChange={(e) => setNewLastName(e.target.value)}
        />
      </div>
      {showError && (
        <ErrorMessage message="Please fill in both fields before adding a beneficiary." />
      )}
    </form>
  );

  function handleAdd(e) {
    e.preventDefault();
    if (newFirstName.trim().length > 0 && newLastName.trim().length > 0) {
      const newBeneficiary = {
        firstName: newFirstName,
        lastName: newLastName,
      };
      setBeneficiaries([...beneficiaries, newBeneficiary]);
      const newLog = {
        date: formattedDate,
        description: `Added ${newFirstName} ${newLastName} as a beneficiary`,
        type: "Beneficiary management",
      };
      setLogs((prevLogs) => [...prevLogs, newLog]);
      setStep(2);
    } else {
      setShowError(true);
    }
  }

  function handleReset() {
    setNewFirstName("");
    setNewLastName("");
    setStep(1);
    handleClose();
  }

  return (
    <Modal centered show={show} className={styles.beneficiaryModal}>
      <Modal.Header className={styles.modalHeader}>
        <Modal.Title>
          Add a new beneficiary
          <FontAwesomeIcon icon={faUserPlus} style={{ marginLeft: "10px" }} />
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className={styles.modalBody}>
        {step === 1 && modalForm}
        {step === 2 && (
          <p className={styles.successMessage}>
            <span className={styles.beneficiaryName}>
              {newFirstName} {newLastName}
            </span>{" "}
            has been added as a beneficiary
          </p>
        )}
      </Modal.Body>
      <Modal.Footer className={styles.modalFooter}>
        {step === 1 && (
          <>
            <Button variant="success" onClick={handleAdd}>
              Add
            </Button>
            <Button variant="secondary" onClick={handleReset}>
              Cancel
            </Button>
          </>
        )}
        {step === 2 && (
          <Button variant="primary" onClick={handleReset}>
            Cancel
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
}

export default BeneficiaryModal;
