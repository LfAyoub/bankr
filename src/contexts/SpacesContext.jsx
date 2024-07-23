import { createContext, useContext, useState, useEffect } from "react";

const SpacesContext = createContext();

function SpacesProvider({ children }) {
  const initialSpaces = [
    {
      name: "Loisirs",
      amount: 250,
    },
    {
      name: "Restaurant",
      amount: 500,
    },
    {
      name: "Cadeaux",
      amount: 300,
    },
    {
      name: "Voyages",
      amount: 1500,
    },
  ];

  const [spaces, setSpaces] = useState(() => {
    const savedSpaces = localStorage.getItem("spaces");
    return savedSpaces ? JSON.parse(savedSpaces) : initialSpaces;
  });

  useEffect(() => {
    localStorage.setItem("spaces", JSON.stringify(spaces));
  }, [spaces]);

  return (
    <SpacesContext.Provider value={{ spaces, setSpaces }}>
      {children}
    </SpacesContext.Provider>
  );
}

function useSpaces() {
  const context = useContext(SpacesContext);
  if (context === undefined)
    throw new Error("useSpaces must be used within a SpacesProvider");
  return context;
}

export { SpacesProvider, useSpaces };
