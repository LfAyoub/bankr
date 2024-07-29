import { useEffect, useState } from "react";
import { useExpenses } from "../contexts/ExpensesContext";
import { Link } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";

import { useSortType } from "../contexts/SortTypeContext";
import ExpenseItem from "./ExpenseItem";
import SortSelect from "./SortSelect";
import Balance from "./Balance";

import styles from "./ExpensesList.module.css";

function ExpensesList() {
  const { expenses } = useExpenses();
  const { sortType } = useSortType();
  const [sortedExpenses, setSortedExpenses] = useState([]);
  const [transactionsNumber, setTransactionsNumber] = useState(6);

  useEffect(() => {
    const filteredExpenses = expenses.filter((expense) => {
      if (sortType === "all") {
        return true; // Retourner toutes les dépenses
      } else {
        return expense.type === sortType; // Retourner seulement les dépenses du type sélectionné
      }
    });
    setSortedExpenses(
      filteredExpenses.sort((a, b) => new Date(b.date) - new Date(a.date))
    );
  }, [expenses, sortType]);

  function showMore() {
    setTransactionsNumber(transactionsNumber + 6);
  }

  return (
    <>
      <Container>
        <Col xl={7} lg={8} md={10} xs={12} className="mx-auto">
          <Row>
            <div className={styles.expensesHeader}>
              <Col md={2} sm={5} xs={3}>
                <SortSelect />
              </Col>
              <Col xl={6} lg={6} md={6} sm={7} xs={8}>
                <Balance />
              </Col>
            </div>
          </Row>
        </Col>
        <Col xl={7} lg={8} md={10} xs={12} className="mx-auto">
          <div className={styles.expensesList}>
            {sortedExpenses.slice(0, transactionsNumber).map((expense) =>
              expense.type === "expense" ? (
                <Link to={`${expense.id}`} key={`${expense.id}`}>
                  <ExpenseItem expense={expense} />
                </Link>
              ) : (
                <ExpenseItem key={expense.id} expense={expense} />
              )
            )}
          </div>
        </Col>
        {transactionsNumber <= sortedExpenses.length ? (
          <Row>
            <Col className="text-center mt-3">
              <Button variant="secondary" onClick={showMore}>
                Show more
              </Button>
            </Col>
          </Row>
        ) : null}
      </Container>
    </>
  );
}

export default ExpensesList;
