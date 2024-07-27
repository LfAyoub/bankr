import styles from "./ErrorMessage.module.css";

function ErrorMessage({ message }) {
  return <p className={styles.errorMessage}>{message}</p>;
}

export default ErrorMessage;
