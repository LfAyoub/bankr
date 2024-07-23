import { createContext, useState, useContext, useEffect } from "react";

const context = createContext();

function LogsProvider({ children }) {
  const [logs, setLogs] = useState(() => {
    const savedLogs = localStorage.getItem("logs");
    return savedLogs ? JSON.parse(savedLogs) : [];
  });

  useEffect(() => {
    localStorage.setItem("logs", JSON.stringify(logs));
  }, [logs]);

  return (
    <context.Provider value={{ logs, setLogs }}>{children}</context.Provider>
  );
}

function useLogs() {
  const contextValue = useContext(context);

  if (!contextValue) {
    throw new Error("useLogs must be used within a LogsProvider");
  }

  return contextValue;
}

export { LogsProvider, useLogs };
