import { useEffect } from "react";
import { motion } from "framer-motion";
import { Col } from "react-bootstrap";

import Sidebar from "../components/Sidebar";
import MobileNav from "../components/MobileNav";
import BackButton from "../components/BackButton";
import ExpensesGraph from "../components/ExpensesGraph";
import { ExpensesProvider } from "../contexts/ExpensesContext";
import { BalanceProvider } from "../contexts/BalanceContext";
import styles from "./Graph.module.css";

function Graph() {
  useEffect(() => {
    document.title = "BankR - Graph";
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
        key="graph"
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className={styles.graph}
      >
        <h1>Graph</h1>
        <ExpensesProvider>
          <BalanceProvider>
            <ExpensesGraph />
          </BalanceProvider>
        </ExpensesProvider>
      </motion.div>
    </>
  );
}

export default Graph;
