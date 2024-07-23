import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { useTransfer } from "../contexts/TransferContext";
import { useLogs } from "../contexts/LogsContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserMinus } from "@fortawesome/free-solid-svg-icons";
import styles from "./DeleteModal.module.css";

function DeleteModal({ show, handleClose, beneficiary }) {
  const { formattedDate, setBeneficiaries } = useTransfer();
  const { setLogs } = useLogs();
  const fullName = `${beneficiary.firstName} ${beneficiary.lastName}`;
  const [modalContent, setModalContent] = useState({
    title: "Delete beneficiary",
    body: (
      <p>
        Are you sure you want to delete{" "}
        <span className={styles.beneficiaryName}>{fullName}</span> from your
        beneficiaries ?
      </p>
    ),
    footer: (
      <>
        <Button variant="danger" onClick={handleDelete}>
          Delete
        </Button>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
      </>
    ),
  });

  function handleDelete(e) {
    e.stopPropagation();
    setModalContent({
      title: "Beneficiary deleted",
      body: (
        <p>
          <span className={styles.beneficiaryName}>{fullName}</span> has been
          successfully deleted from your beneficiaries.
        </p>
      ),
      footer: (
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      ),
    });
    setBeneficiaries((prevBeneficiaries) =>
      prevBeneficiaries.filter(
        (prevBeneficiary) =>
          prevBeneficiary.firstName !== beneficiary.firstName ||
          prevBeneficiary.lastName !== beneficiary.lastName
      )
    );
    const newLog = {
      date: formattedDate,
      description: `Deleted ${fullName} from beneficiaries`,
      type: "Beneficiary management",
    };
    setLogs((prevLogs) => [...prevLogs, newLog]);
  }

  return (
    <Modal centered show={show} className={styles.deleteModal}>
      <Modal.Header className={styles.modalHeader}>
        <Modal.Title>
          {modalContent.title}
          <FontAwesomeIcon icon={faUserMinus} style={{ marginLeft: "10px" }} />
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className={styles.modalBody}>{modalContent.body}</Modal.Body>
      <Modal.Footer className={styles.modalFooter}>
        {modalContent.footer}
      </Modal.Footer>
    </Modal>
  );
}

export default DeleteModal;
