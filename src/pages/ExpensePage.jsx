import { useParams } from "react-router";
import { motion } from "framer-motion";
import { Container, Row, Col } from "react-bootstrap";

import ManageExpenseForm from "../components/ManageExpenseForm";
import Sidebar from "../components/Sidebar";
import MobileNav from "../components/MobileNav";
import BackButton from "../components/BackButton";
import { ExpensesProvider } from "../contexts/ExpensesContext";
import { SpacesProvider } from "../contexts/SpacesContext";

import styles from "./ExpensePage.module.css";
import { useEffect } from "react";

function ExpensePage() {
  const { id } = useParams();
  useEffect(() => {
    document.title = `Bankr - Manage expense`;
  }, [id]);

  return (
    <div>
      <Col className="d-none d-md-block">
        <Sidebar />
      </Col>
      <Col className="d-md-none">
        <MobileNav />
        <BackButton />
      </Col>

      <div className={styles.expensePageMain}>
        <h1>Manage expense</h1>
        <ExpensesProvider>
          <SpacesProvider>
            <ManageExpenseForm id={id} />
          </SpacesProvider>
        </ExpensesProvider>
      </div>
    </div>
  );
}

export default ExpensePage;
