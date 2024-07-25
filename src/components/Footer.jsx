import styles from "./Footer.module.css";

function Footer() {
  return (
    <footer>
      <p className={styles.footerText}>
        ©{" "}
        <a href="https://github.com/LfAyoub" target="_blank">
          Ayoub Lafdail
        </a>{" "}
        - 2024
      </p>
    </footer>
  );
}

export default Footer;
