import { useEffect } from "react";
import { motion } from "framer-motion";
import { Col } from "react-bootstrap";

import SpaceForm from "../components/SpaceForm";
import Sidebar from "../components/Sidebar";
import MobileNav from "../components/MobileNav";
import BackButton from "../components/BackButton";
import { LogsProvider } from "../contexts/LogsContext";
import { TransferProvider } from "../contexts/TransferContext";
import { SpacesProvider } from "../contexts/SpacesContext";

import styles from "./NewSpace.module.css";

function NewSpace() {
  useEffect(() => {
    document.title = "BankR - Create a space";
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
        key="newSpace"
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <SpacesProvider>
          <div className={styles.newSpace}>
            <h1>Create a new space</h1>
            <TransferProvider>
              <LogsProvider>
                <SpaceForm />
              </LogsProvider>
            </TransferProvider>
          </div>
        </SpacesProvider>
      </motion.div>
    </>
  );
}

export default NewSpace;
