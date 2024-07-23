import styles from "./Footer.module.css";

function Footer() {
  return (
    <footer>
      <p className={styles.footerText}>
        ©{" "}
        <a href="https://lafdail.dev" target="_blank">
          Ayoub Lafdail
        </a>{" "}
        - 2024
      </p>
    </footer>
  );
}

export default Footer;
