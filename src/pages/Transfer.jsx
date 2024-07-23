import { useEffect } from "react";
import { motion } from "framer-motion";
import { Container, Row, Col } from "react-bootstrap";

import Sidebar from "../components/Sidebar";
import MobileNav from "../components/MobileNav";
import TransferList from "../components/TransferList";
import BackButton from "../components/BackButton";
import { TransferProvider } from "../contexts/TransferContext";
import { BalanceProvider } from "../contexts/BalanceContext";
import { ExpensesProvider } from "../contexts/ExpensesContext";
import { LogsProvider } from "../contexts/LogsContext";
import styles from "./Transfer.module.css";

function Transfer() {
  useEffect(() => {
    document.title = "BankR - Transfer";
  }, []);

  const pageVariants = {
    initial: {
      opacity: 0,
      x: 0,
    },
    animate: {
      opacity: 1,
      x: 0,
      transition: {
        opacity: { duration: 1.3 },
      },
    },
    exit: {
      opacity: 0,
      x: 0,
      transition: {
        opacity: { duration: 0.1 },
      },
    },
  };

  return (
    <>
      <Col className="d-none d-md-block">
        <Sidebar />
      </Col>
      <Col className="d-md-none">
        <MobileNav />
        <BackButton />
      </Col>
      <motion.div
        key="transfer"
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className={styles.transferMain}
      >
        <h1>Transfer</h1>
        <ExpensesProvider>
          <BalanceProvider>
            <TransferProvider>
              <LogsProvider>
                <TransferList />
              </LogsProvider>
            </TransferProvider>
          </BalanceProvider>
        </ExpensesProvider>
      </motion.div>
    </>
  );
}

export default Transfer;
