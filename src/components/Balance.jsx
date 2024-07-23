import { useBalance } from "../contexts/BalanceContext";

import styles from "./Balance.module.css";

function Balance() {
  const { balance } = useBalance();

  return (
    <div className={styles.balance}>Current balance: {balance.toFixed(2)}€</div>
  );
}

export default Balance;
