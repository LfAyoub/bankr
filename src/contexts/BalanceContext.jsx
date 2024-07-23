import { createContext, useState, useContext, useEffect } from "react";
import { useExpenses } from "../contexts/ExpensesContext";

const BalanceContext = createContext();

function BalanceProvider({ children }) {
  const { expenses } = useExpenses();
  const baseBalance = 499.14;
  const [balance, setBalance] = useState(
    expenses.reduce((acc, expense) => {
      if (expense.type === "expense") {
        return acc - expense.amount;
      } else {
        return acc + expense.amount;
      }
    }, baseBalance)
  );

  useEffect(() => {
    localStorage.setItem("balance", JSON.stringify(balance));
  }, [balance]);

  return (
    <BalanceContext.Provider value={{ baseBalance, balance, setBalance }}>
      {children}
    </BalanceContext.Provider>
  );
}

function useBalance() {
  const context = useContext(BalanceContext);
  if (context === undefined) {
    throw new Error("useBalance must be used within a BalanceProvider");
  }
  return context;
}

export { BalanceProvider, useBalance };
