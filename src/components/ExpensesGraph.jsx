import { useMemo } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  Tooltip,
  Legend,
} from "chart.js";
import "chart.js/auto";
import { useExpenses } from "../contexts/ExpensesContext";

import styles from "./ExpensesGraph.module.css";

// Enregistrer les composants nécessaires de Chart.js
ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend
);

function ExpensesGraph({ page }) {
  const { expenses } = useExpenses();

  function formatDate(dateString) {
    const [year, month, day] = dateString.split("-");
    return `${day}-${month}`;
  }

  const prepareData = (transactions) => {
    // Combiner les transactions par date
    const groupedByDate = transactions.reduce((acc, transaction) => {
      if (!acc[transaction.date]) {
        acc[transaction.date] = { expense: 0, income: 0 };
      }
      if (transaction.type === "expense") {
        acc[transaction.date].expense += transaction.amount;
      } else if (transaction.type === "income") {
        acc[transaction.date].income += transaction.amount;
      }
      return acc;
    }, {});

    // Tri des dates
    const sortedDates = Object.keys(groupedByDate).sort();

    let cumulativeBudget = 499.14;
    const cumulativeData = sortedDates.map((date) => {
      const { expense, income } = groupedByDate[date];
      cumulativeBudget += income - expense;
      return {
        date: formatDate(date),
        expense: expense,
        income: income,
        cumulativeBudget,
      };
    });

    return cumulativeData;
  };

  // Préparer les données pour le graphique
  const data = useMemo(() => {
    expenses;
    return prepareData(expenses);
  }, [expenses]);
  const labels = data.map((entry) => entry.date);
  const cumulativeBudgets = data.map((entry) => entry.cumulativeBudget);
  const expensesData = data.map((entry) => entry.expense);
  const incomesData = data.map((entry) => entry.income);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Cumulative Budget",
        data: cumulativeBudgets,
        borderColor: "rgba(54, 162, 235, 1)",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        fill: false,
        tension: 0.1,
      },
      {
        label: "Expenses",
        data: expensesData,
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        fill: false,
        tension: 0.1,
      },
      {
        label: "Income",
        data: incomesData,
        borderColor: "rgba(60, 187, 79, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: false,
        tension: 0.1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: "white",
        },
      },
      x: {
        ticks: {
          color: "white",
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: "white", // Changez la couleur de la légende ici
        },
      },
    },
  };

  return (
    <div
      className={styles.chartContainer}
      style={{
        boxShadow:
          page === "homepage"
            ? "none"
            : "  box-shadow: 0 2px 8px rgba(255, 255, 255, 0.25);",
        borderRadius: page === "homepage" ? "0" : "10px",
      }}
    >
      <Line data={chartData} options={options} />
    </div>
  );
}

export default ExpensesGraph;
