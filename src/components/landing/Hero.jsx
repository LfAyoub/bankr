import { Button } from "react-bootstrap";
import styles from "./Hero.module.css";
import { useNavigate } from "react-router";

function Hero() {
  const navigate = useNavigate();

  return (
    <>
      <div className={styles.heroBackground}></div>
      <div className={styles.heroSection}>
        <h1>BankR</h1>
        <p>Track & Manage</p>
        <Button variant="light" onClick={() => navigate("/app")}>
          Go to the app
        </Button>
      </div>
    </>
  );
}

export default Hero;
