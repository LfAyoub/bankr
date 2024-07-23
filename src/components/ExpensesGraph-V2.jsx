import { useExpenses } from "../contexts/ExpensesContext";
import { LineChart } from "@mui/x-charts/LineChart";
import { Container, Col } from "react-bootstrap";

import styles from "./ExpensesGraph.module.css";
import { useBalance } from "../contexts/BalanceContext";
import { color } from "chart.js/helpers";

function ExpensesGraph() {
  const { expenses } = useExpenses();
  const { baseBalance } = useBalance();

  const data = expenses.map((expense) => ({
    date: formatDate(expense.date),
    amount: expense.amount,
    type: expense.type,
  }));

  const expensesData = data.reduce((acc, curr) => {
    if (!acc[curr.date]) {
      acc[curr.date] = 0;
    }
    acc[curr.date] += curr.amount;
    return acc;
  }, {});
  const expensesArray = Object.entries(expensesData).map(([date, amount]) => ({
    date,
    amount,
  }));

  const incomeData = data.reduce((acc, curr) => {
    if (!acc[curr.date]) {
      acc[curr.date] = 0;
    }
    if (curr.type === "income") {
      acc[curr.date] += curr.amount;
    }
    return acc;
  }, {});

  function calculateCumulativeBudget(expensesData, incomeData, baseBudget) {
    const combinedData = {};

    // Combine les dépenses et les revenus dans un seul tableau
    data.forEach((entry) => {
      if (!combinedData[entry.date]) {
        combinedData[entry.date] = 0;
      }
      if (entry.type === "income") {
        combinedData[entry.date] += entry.amount;
      } else {
        combinedData[entry.date] -= entry.amount;
      }
    });

    // Trier les dates et calculer le budget cumulatif
    return Object.keys(combinedData)
      .sort()
      .reduce((acc, date) => {
        const previousBudget = acc.length
          ? acc[acc.length - 1].budget
          : baseBudget;
        const newBudget = previousBudget + combinedData[date];
        acc.push({ date, budget: newBudget });
        return acc;
      }, []);
  }

  const cumulativeBudget = calculateCumulativeBudget(
    expensesData,
    incomeData,
    baseBalance
  );

  // console.log(expensesData);
  console.log(expensesArray);
  // console.log(incomeData);
  console.log(cumulativeBudget);

  function formatDate(dateString) {
    const [year, month, day] = dateString.split("-");
    return `${day}-${month}`;
  }

  const props = {
    height: 450,
    xAxis: [
      { data: expensesArray.map((entry) => entry.date), scaleType: "band" },
      { data: cumulativeBudget.map((entry) => entry.date), scaleType: "band" },
      { data: expensesArray.map((entry) => entry.date), scaleType: "band" },
    ],
    colorMap: {
      CumulativeBudget: "#3e9af0",
      Expenses: "#de1f1f",
      Income: "green",
    },
  };

  return (
    <Container className={styles.chartContainer}>
      <Col md={12} xs={12}>
        <LineChart
          {...props}
          series={[
            {
              label: "Cumulative budget",
              data: cumulativeBudget.map((entry) => entry.budget.toFixed(2)),
              color: "#3e9af0",
            },
            {
              label: "Expenses",
              data: expensesArray.map((entry) => entry.amount.toFixed(2)),
              color: "#de1f1f",
            },

            {
              label: "Income",
              data: Object.keys(incomeData).map((date) =>
                incomeData[date].toFixed(2)
              ),
              color: "green",
            },
          ]}
          grid={{ vertical: true, horizontal: true }}
        />
      </Col>
    </Container>
  );
}

export default ExpensesGraph;
