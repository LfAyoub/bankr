import { useParams } from "react-router";
import { motion } from "framer-motion";
import { Col } from "react-bootstrap";

import ManageSpaceForm from "../components/ManageSpaceForm";
import BackButton from "../components/BackButton";
import Sidebar from "../components/Sidebar";
import MobileNav from "../components/MobileNav";
import SpaceExpenses from "../components/SpaceExpenses";
import { SpacesProvider } from "../contexts/SpacesContext";
import { ExpensesProvider } from "../contexts/ExpensesContext";
import { LogsProvider } from "../contexts/LogsContext";
import { TransferProvider } from "../contexts/TransferContext";

import styles from "./SpacePage.module.css";
import { useEffect, useState } from "react";

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

function SpacePage() {
  const { spaceName } = useParams();
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    document.title = `Bankr - ${spaceName}`;
  }, [spaceName]);

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
        key="newSpace"
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <div className={styles.spacePage}>
          <h1>Manage space - {spaceName}</h1>
          <SpacesProvider>
            <LogsProvider>
              <TransferProvider>
                <ManageSpaceForm
                  amount={amount}
                  setAmount={setAmount}
                  spaceName={spaceName}
                />
                <ExpensesProvider>
                  <SpaceExpenses setAmount={setAmount} />
                </ExpensesProvider>
              </TransferProvider>
            </LogsProvider>
          </SpacesProvider>
        </div>
      </motion.div>
    </>
  );
}

export default SpacePage;
