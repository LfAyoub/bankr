import { useEffect } from "react";
import { Container, Col } from "react-bootstrap";
import { motion } from "framer-motion";

import Sidebar from "../components/Sidebar";
import MobileNav from "../components/MobileNav";
import BackButton from "../components/BackButton";
import LogsList from "../components/LogsList";

import { LogsProvider } from "../contexts/LogsContext";

import styles from "./Logs.module.css";

function Logs() {
  useEffect(() => {
    document.title = "Bankr - Logs";
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
    <Container>
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
        <LogsProvider>
          <LogsList />
        </LogsProvider>
      </motion.div>
    </Container>
  );
}

export default Logs;
