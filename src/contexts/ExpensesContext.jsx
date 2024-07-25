import { createContext, useContext, useState, useEffect } from "react";

const ExpensesContext = createContext();

function ExpensesProvider({ children }) {
  const initialExpenses = [
    {
      id: 1,
      type: "expense",
      date: "2024-06-01",
      description: "Amazon",
      amount: 49.99,
      space: "",
      note: "New charger",
    },
    {
      id: 2,
      type: "expense",
      date: "2024-06-03",
      description: "Netflix",
      amount: 15.99,
      space: "Entertainment",
      note: "",
    },
    {
      id: 7,
      type: "income",
      date: "2024-06-05",
      description: "Salary",
      amount: 2648.77,
      space: "",
      note: "",
    },
    {
      id: 3,
      type: "expense",
      date: "2024-06-05",
      description: "Burger King",
      amount: 22.5,
      space: "Food",
      note: "",
    },
    {
      id: 4,
      type: "expense",
      date: "2024-06-07",
      description: "Spotify",
      amount: 9.99,
      space: "",
      note: "",
    },
    {
      id: 5,
      type: "expense",
      date: "2024-06-10",
      description: "Apple Store",
      amount: 99.0,
      space: "Gifts",
      note: "",
    },
  ];

  const [selectedExpense, setSelectedExpense] = useState(null);
  const [expenses, setExpenses] = useState(() => {
    const savedExpenses = localStorage.getItem("expenses");
    return savedExpenses ? JSON.parse(savedExpenses) : initialExpenses;
  });

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  function sortExpenses(space) {
    const sortedExpenses = expenses
      .filter((expense) => (space ? expense.space === space.spaceName : true))
      .sort((a, b) => new Date(b.date) - new Date(a.date));
    return sortedExpenses;
  }

  return (
    <ExpensesContext.Provider
      value={{
        expenses,
        setExpenses,
        selectedExpense,
        setSelectedExpense,
        sortExpenses,
      }}
    >
      {children}
    </ExpensesContext.Provider>
  );
}

function useExpenses() {
  const context = useContext(ExpensesContext);
  if (context === undefined)
    throw new Error("useExpenses must be used within a ExpensesProvider");
  return context;
}

export { ExpensesProvider, useExpenses };
