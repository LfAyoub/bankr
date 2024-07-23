import { useAuth } from "../contexts/FakeAuthContext";
import { Modal, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

import styles from "./LogoutModal.module.css";

function LogoutModal({ show, handleClose, handleLogoutConfirm }) {
  const { showLogoutModal } = useAuth();

  return (
    showLogoutModal && (
      <Modal
        show={show}
        onHide={handleClose}
        centered
        className={styles.logoutModal}
      >
        <Modal.Header closeButton className={styles.modalHeader}>
          <Modal.Title>
            Confirm Logout{" "}
            <FontAwesomeIcon
              icon={faRightFromBracket}
              style={{ marginLeft: "10px" }}
            />
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className={styles.modalBody}>
          Are you sure you want to logout ?
        </Modal.Body>
        <Modal.Footer className={styles.modalFooter}>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleLogoutConfirm}>
            Logout
          </Button>
        </Modal.Footer>
      </Modal>
    )
  );
}

export default LogoutModal;
