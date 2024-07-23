import { Col } from "react-bootstrap";

import CreateTransactionForm from "../components/CreateTransactionForm";
import Sidebar from "../components/Sidebar";
import MobileNav from "../components/MobileNav";
import BackButton from "../components/BackButton";
import { ExpensesProvider } from "../contexts/ExpensesContext";
import { TransferProvider } from "../contexts/TransferContext";
import { LogsProvider } from "../contexts/LogsContext";

import styles from "./CreateTransaction.module.css";
import { useEffect } from "react";

function CreateTransaction() {
  useEffect(() => {
    document.title = "BankR - Create transaction";
  }, []);

  return (
    <>
      <Col className="d-none d-md-block">
        <Sidebar />
      </Col>
      <Col className="d-md-none">
        <MobileNav />
        <BackButton />
      </Col>
      <ExpensesProvider>
        <div className={styles.adminMain}>
          <h1>Create a new transaction</h1>
          <TransferProvider>
            <LogsProvider>
              <CreateTransactionForm />
            </LogsProvider>
          </TransferProvider>
        </div>
      </ExpensesProvider>
    </>
  );
}

export default CreateTransaction;
