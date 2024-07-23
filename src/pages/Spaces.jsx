import { useEffect } from "react";
import { motion } from "framer-motion";
import { Container, Row, Col } from "react-bootstrap";

import Sidebar from "../components/Sidebar";
import MobileNav from "../components/MobileNav";
import BackButton from "../components/BackButton";
import SpacesList from "../components/SpacesList";
import { SpacesProvider } from "../contexts/SpacesContext";

import styles from "./Spaces.module.css";

function Spaces() {
  useEffect(() => {
    document.title = "BankR - Spaces";
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
      <div className={styles.pageTitle}>
        <h1>Spaces</h1>
      </div>
      <motion.div
        key="spaces"
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className={styles.spaceMain}
      >
        <div className={styles.spaces}>
          <SpacesProvider>
            <SpacesList />
          </SpacesProvider>
        </div>
      </motion.div>
    </>
  );
}

export default Spaces;
