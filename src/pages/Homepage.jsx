import { useEffect } from "react";
import { motion } from "framer-motion";
import { Container, Row, Col } from "react-bootstrap";

import Sidebar from "../components/Sidebar";
import MobileNav from "../components/MobileNav";
import HomepageExpenses from "../components/HomepageExpenses";
import HomepageGraph from "../components/HomepageGraph";
import HomepageSpaces from "../components/HomepageSpaces";
import HomepageTransfer from "../components/HomepageTransfer";
import Footer from "../components/Footer";

import { ExpensesProvider } from "../contexts/ExpensesContext";
import { SpacesProvider } from "../contexts/SpacesContext";
import { TransferProvider } from "../contexts/TransferContext";
import { useAuth } from "../contexts/FakeAuthContext";

import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./Homepage.module.css";

function Homepage() {
  useEffect(() => {
    document.title = "BankR : Track & Manage";
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

  const { user } = useAuth();

  return (
    <>
      <Col className="d-none d-md-block">
        <Sidebar />
      </Col>
      <Col className="d-md-none">
        <MobileNav />
      </Col>
      <motion.div
        key="homepage"
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className={styles.homepageMain}
      >
        {user && <h1>Welcome back !</h1>}
        <div className={styles.homepageSections}>
          <Container>
            <Row>
              <ExpensesProvider>
                <Col xs={12} md={10} lg={6} className="mx-auto">
                  <HomepageExpenses />
                </Col>
                <Col xs={12} md={10} lg={6} className="mx-auto">
                  <HomepageGraph />
                </Col>
              </ExpensesProvider>
            </Row>
            <Row>
              <Col xs={12} md={10} lg={6} className="mx-auto">
                <SpacesProvider>
                  <HomepageSpaces />
                </SpacesProvider>
              </Col>
              <Col xs={12} md={10} lg={6} className="mx-auto">
                <TransferProvider>
                  <HomepageTransfer />
                </TransferProvider>
              </Col>
            </Row>
            <Row className="d-md-none">
              <Footer />
            </Row>
          </Container>
        </div>
      </motion.div>
    </>
  );
}

export default Homepage;
