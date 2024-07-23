import { createContext, useState, useContext } from "react";

const SortTypeContext = createContext();

function SortTypeProvider({ children }) {
  const [sortType, setSortType] = useState("all");

  return (
    <SortTypeContext.Provider value={{ sortType, setSortType }}>
      {children}
    </SortTypeContext.Provider>
  );
}

function useSortType() {
  const context = useContext(SortTypeContext);
  if (context === undefined)
    throw new Error("useSortType must be used within a SortTypeProvider");
  return context;
}

export { SortTypeProvider, useSortType };
