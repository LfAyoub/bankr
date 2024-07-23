import { useState, useRef } from "react";
import { Container, Row, Col } from "react-bootstrap";

import { useTransfer } from "../contexts/TransferContext";

import styles from "./TransferItem.module.css";

function TransferItem({ beneficiary, deletable, setStep, setShowDeleteModal }) {
  const fullName = `${beneficiary.firstName} ${beneficiary.lastName}`;
  const { setSelectedBeneficiary, setBeneficiaries, setShowTransferModal } =
    useTransfer();
  const [showButton, setShowButton] = useState(false);
  const bottomRef = useRef(null);

  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  function getRandomColor() {
    // Limiter les valeurs pour éviter les couleurs trop flashy
    const min = 100;
    const max = 200;

    // Générer une valeur aléatoire entre min et max pour chaque composante
    const r = Math.floor(Math.random() * (max - min + 1)) + min;
    const g = Math.floor(Math.random() * (max - min + 1)) + min;
    const b = Math.floor(Math.random() * (max - min + 1)) + min;

    // Convertir les valeurs RGB en hexadécimal
    const hexR = r.toString(16).padStart(2, "0");
    const hexG = g.toString(16).padStart(2, "0");
    const hexB = b.toString(16).padStart(2, "0");

    // Combiner les valeurs en une seule chaîne hexadécimale
    return `#${hexR}${hexG}${hexB}`;
  }
  function stringToHash(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = (hash << 3) - hash + char;
      hash |= 0; // Convert to 32bit integer
    }
    return hash;
  }

  function hashToHex(hash) {
    // Convert the hash to a positive integer
    const positiveHash = Math.abs(hash);

    // Convert the integer to a hexadecimal string
    let hex = positiveHash.toString(16);

    // Ensure the hex string is at least 6 characters long
    while (hex.length < 6) {
      hex = "0" + hex;
    }

    // Take the last 6 characters as the color
    return "#" + hex.slice(-6);
  }

  function getColorFromName(firstName, lastName) {
    const fullName = `${firstName} ${lastName}`;
    const hash = stringToHash(fullName);
    return hashToHex(hash);
  }

  function handleSelect() {
    setSelectedBeneficiary(beneficiary);
    setShowTransferModal(true);
    setStep(1);
  }

  function handleDelete(e) {
    e.stopPropagation();
    setSelectedBeneficiary(beneficiary);
    setShowDeleteModal(true);
  }

  return (
    <div
      className={styles.transferItem}
      onClick={handleSelect}
      onMouseEnter={() => (deletable ? setShowButton(true) : null)}
      onMouseLeave={() => setShowButton(false)}
    >
      <div className={styles.transferIcon}>
        <div
          className={styles.icon}
          style={{
            backgroundColor: getColorFromName(
              beneficiary.firstName,
              beneficiary.lastName
            ),
          }}
        >
          {beneficiary.firstName.charAt(0)}
          {beneficiary.lastName.charAt(0)}
        </div>
      </div>
      <div className={styles.transferName}>{fullName}</div>
      <button
        className={styles.deleteButton}
        style={{ display: showButton ? "block" : "none" }}
        onClick={handleDelete}
      >
        &times;
      </button>
      <div ref={bottomRef}></div>
    </div>
  );
}

export default TransferItem;
