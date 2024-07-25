import { useLocation, useNavigate } from "react-router";
import { Button } from "react-bootstrap";

import styles from "./BackButton.module.css";

function BackButton() {
  const navigate = useNavigate();
  const location = useLocation();

  function handleBack(e) {
    e.preventDefault();
    if (
      location.pathname === "/spaces" ||
      location.pathname === "/transactions" ||
      location.pathname === "/transfer" ||
      location.pathname === "/graph" ||
      location.pathname === "/logs"
    ) {
      navigate("/app");
    } else {
      navigate(-1);
    }
  }

  return (
    <Button
      variant="secondary"
      onClick={handleBack}
      className={styles.backButton}
    >
      &larr; Back
    </Button>
  );
}

export default BackButton;
