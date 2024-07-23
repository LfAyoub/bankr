import { useEffect } from "react";
import { motion } from "framer-motion";
import { Col } from "react-bootstrap";

import Sidebar from "../components/Sidebar";
import MobileNav from "../components/MobileNav";
import BackButton from "../components/BackButton";
import ExpensesList from "../components/ExpensesList";
import { SortTypeProvider, useSortType } from "../contexts/SortTypeContext";
import { ExpensesProvider } from "../contexts/ExpensesContext";
import { SpacesProvider } from "../contexts/SpacesContext";
import { BalanceProvider } from "../contexts/BalanceContext";

import styles from "./Expenses.module.css";

function Expenses() {
  useEffect(() => {
    document.title = "BankR - Last transactions";
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
        key="expenses"
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <div className={styles.expenses}>
          <h1>Last transactions</h1>
          <SortTypeProvider>
            <SpacesProvider>
              <ExpensesProvider>
                <BalanceProvider>
                  <ExpensesList />
                </BalanceProvider>
              </ExpensesProvider>
            </SpacesProvider>
          </SortTypeProvider>
        </div>
      </motion.div>
    </>
  );
}

export default Expenses;
