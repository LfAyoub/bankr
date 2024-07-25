import { createContext, useContext, useState, useEffect } from "react";

const TransferContext = createContext();

function TransferProvider({ children }) {
  const initialBeneficiaries = [
    {
      firstName: "Ayoub",
      lastName: "Lafdail",
    },
    {
      firstName: "John",
      lastName: "Doe",
    },
    {
      firstName: "Ned",
      lastName: "Stark",
    },
  ];
  const [selectedBeneficiary, setSelectedBeneficiary] = useState();
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [step, setStep] = useState(1);

  const [beneficiaries, setBeneficiaries] = useState(() => {
    const savedBeneficiaries = localStorage.getItem("beneficiaries");
    return savedBeneficiaries
      ? JSON.parse(savedBeneficiaries)
      : initialBeneficiaries;
  });

  // Date d'aujourd'hui
  const today = new Date();

  // Récupérez l'année, le mois et le jour
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0"); // Les mois commencent à 0, donc ajoutez 1 et pad avec des zéros
  const day = String(today.getDate()).padStart(2, "0"); // Pad avec des zéros

  // Formatez la date en "AAAA-MM-DD"
  const formattedDate = `${year}-${month}-${day}`;

  useEffect(() => {
    localStorage.setItem("beneficiaries", JSON.stringify(beneficiaries));
  }, [beneficiaries]);

  return (
    <TransferContext.Provider
      value={{
        beneficiaries,
        setBeneficiaries,
        selectedBeneficiary,
        setSelectedBeneficiary,
        showTransferModal,
        setShowTransferModal,
        formattedDate,
        step,
        setStep,
      }}
    >
      {children}
    </TransferContext.Provider>
  );
}

function useTransfer() {
  const context = useContext(TransferContext);
  if (context === undefined) {
    throw new Error("useTransfer must be used within a TransferProvider");
  }
  return context;
}

export { TransferProvider, useTransfer };
