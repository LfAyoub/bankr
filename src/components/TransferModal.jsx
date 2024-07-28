import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { useTransfer } from "../contexts/TransferContext";
import { useBalance } from "../contexts/BalanceContext";
import { useExpenses } from "../contexts/ExpensesContext";
import { useLogs } from "../contexts/LogsContext";
import Balance from "./Balance";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoneyBillTransfer } from "@fortawesome/free-solid-svg-icons";
import styles from "./TransferModal.module.css";

function TransferModal({ show, handleClose }) {
  const { selectedBeneficiary, formattedDate, step, setStep } = useTransfer();
  const { setExpenses } = useExpenses();
  const { balance, setBalance } = useBalance();
  const { setLogs } = useLogs();
  const [amount, setAmount] = useState(0);
  const [instantTransferCheck, setInstantTransferCheck] = useState(false);

  function handleTransfer(e, amount, instantTransferCheck) {
    e.preventDefault();
    if (amount <= 0) {
      alert("Please enter a valid amount.");
      return;
    }
    if (amount > balance) {
      alert("Your balance must be positive after the transaction.");
      return;
    }

    const newExpense = {
      id: Date.now(),
      type: "expense",
      date: formattedDate,
      description: `Transfer to ${selectedBeneficiary.firstName} ${selectedBeneficiary.lastName}`,
      amount: parseFloat(amount),
    };

    if (instantTransferCheck) {
      if (amount + 2 > balance) {
        alert("Your balance must be positive after the transaction.");
        return;
      } else {
        const transferFee = {
          id: Date.now() + 1,
          type: "expense",
          date: formattedDate,
          description: "Instant transfer fee",
          amount: 2,
        };
        setExpenses((prevExpenses) => [...prevExpenses, transferFee]);
      }
    }

    setExpenses((prevExpenses) => [...prevExpenses, newExpense]);
    setBalance(balance - parseFloat(amount) - (instantTransferCheck ? 2 : 0));
    const newLog = {
      date: formattedDate,
      description: `Transfer to ${selectedBeneficiary.firstName} ${selectedBeneficiary.lastName}`,
      type: "expense",
    };
    setLogs((prevLogs) => [...prevLogs, newLog]);

    setStep(step + 1);
  }

  function handleNextStep() {
    if (amount <= 0) alert("Please enter a valid amount");
    else setStep(step + 1);
  }

  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
      className={styles.transferModal}
    >
      {step === 1 && (
        <>
          <Modal.Header closeButton className={styles.modalHeader}>
            <Modal.Title>
              Make a Transfer <FontAwesomeIcon icon={faMoneyBillTransfer} />
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className={styles.modalBody}>
            <form className={styles.transferForm}>
              <div className={styles.transferName}>
                <p>
                  Make a transfer to :{" "}
                  <span className={styles.transferBeneficiary}>
                    {selectedBeneficiary.firstName}{" "}
                    {selectedBeneficiary.lastName}
                  </span>
                </p>
              </div>
              <Balance />
              <label htmlFor="amount">Amount</label>
              <input
                type="number"
                onChange={(e) => setAmount(e.target.value)}
                value={amount === 0 ? "" : amount}
                min={1}
              />
              <div className={styles.instantTransfer}>
                <label htmlFor="instant">Instant transfer (+2.00€)</label>
                <input
                  type="checkbox"
                  value={instantTransferCheck}
                  onChange={(e) => setInstantTransferCheck(e.target.checked)}
                />
              </div>
              <div className={styles.buttonsContainer}>
                <Button variant="primary" onClick={handleNextStep}>
                  Send
                </Button>
                <Button variant="danger" onClick={handleClose}>
                  Cancel
                </Button>
              </div>
            </form>
          </Modal.Body>
        </>
      )}
      {step === 2 && (
        <>
          <Modal.Header closeButton className={styles.modalHeader}>
            <Modal.Title>Confirm Transfer</Modal.Title>
          </Modal.Header>
          <Modal.Body className={styles.modalBody}>
            <p>
              You are about to transfer {amount}€ to{" "}
              {selectedBeneficiary.firstName} {selectedBeneficiary.lastName}
              {instantTransferCheck
                ? " with an instant transfer fee of 2.00€"
                : ""}
              . Do you want to proceed?
            </p>
          </Modal.Body>
          <Modal.Footer className={styles.modalFooter}>
            <Button
              variant="primary"
              onClick={(e) => handleTransfer(e, amount, instantTransferCheck)}
            >
              Confirm
            </Button>
            <Button variant="danger" onClick={handleClose}>
              Cancel
            </Button>
          </Modal.Footer>
        </>
      )}
      {step === 3 && (
        <>
          <Modal.Header closeButton className={styles.modalHeader}>
            <Modal.Title>Transfer Successful</Modal.Title>
          </Modal.Header>
          <Modal.Body className={styles.modalBody}>
            <p>
              Your transfer of {amount}€ to {selectedBeneficiary.firstName}{" "}
              {selectedBeneficiary.lastName} has been processed.
              {instantTransferCheck
                ? " It will be processed instantly."
                : " It will be processed within 3 days."}
            </p>
          </Modal.Body>
          <Modal.Footer className={styles.modalFooter}>
            <Button variant="primary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </>
      )}
    </Modal>
  );
}

export default TransferModal;

{
  /* <Button
  variant="primary"
  onClick={(e) => handleTransfer(e, amount, instantTransferCheck)}
>
  Send
</Button>; */
}
