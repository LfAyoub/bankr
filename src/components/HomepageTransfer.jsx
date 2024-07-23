import { useLocation } from "react-router";
import { useTransfer } from "../contexts/TransferContext";
import { Link } from "react-router-dom";
import TransferItem from "./TransferItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoneyBillTransfer } from "@fortawesome/free-solid-svg-icons";

import styles from "./HomepageSection.module.css";

function HomepageTransfer() {
  const { beneficiaries } = useTransfer();
  const location = useLocation();
  const displayedBeneficiaries = beneficiaries.slice(0, 3);

  return (
    <div className={styles.homepageSection}>
      <Link to="/transfer" className={styles.sectionTitle}>
        <h3>
          Transfers{" "}
          <FontAwesomeIcon
            icon={faMoneyBillTransfer}
            style={{ marginLeft: "10px" }}
          />
        </h3>
      </Link>

      <div className={styles.homepageTransfer}>
        {displayedBeneficiaries.length > 0 ? (
          displayedBeneficiaries.map((beneficiary) => (
            <TransferItem
              deletable={location.pathname === "/transfer"}
              beneficiary={beneficiary}
              key={beneficiary.firstName + beneficiary.lastName}
            />
          ))
        ) : (
          <h4 className={styles.emptySectionMessage}>No beneficiary</h4>
        )}
      </div>
    </div>
  );
}

export default HomepageTransfer;
