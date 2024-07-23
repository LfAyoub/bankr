import { useState, useRef } from "react";
import { TransferProvider, useTransfer } from "../contexts/TransferContext";
import { useExpenses } from "../contexts/ExpensesContext";
import { useBalance } from "../contexts/BalanceContext";
import { Container, Row, Col, Button } from "react-bootstrap";
import TransferItem from "./TransferItem";
import BeneficiaryModal from "./BeneficiaryModal";
import TransferModal from "./TransferModal";
import DeleteModal from "./DeleteModal";
import Balance from "./Balance";

import styles from "./TransferList.module.css";

function TransferList() {
  const [showBeneficiaryModal, setShowBeneficiaryModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const {
    beneficiaries,
    setBeneficiaries,
    selectedBeneficiary,
    showTransferModal,
    setShowTransferModal,
    setStep,
  } = useTransfer();

  const [modalContent, setModalContent] = useState({
    title: "",
    body: null,
    footer: null,
  });

  function handleCloseTransferModal() {
    setShowTransferModal(false);
    setStep(0);
  }

  function handleCloseBeneficiaryModal() {
    setShowBeneficiaryModal(false);
  }

  function handleCloseDeleteModal() {
    setShowDeleteModal(false);
  }

  const bottomRef = useRef(null);

  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  function handleAddForm() {
    setShowBeneficiaryModal(true);
  }

  return (
    <>
      <Container>
        <Row>
          <Col xl={3} lg={4} md={6} xs={9} className="mx-auto">
            <Balance />
          </Col>
        </Row>
        <Row>
          <Col xl={5} lg={7} md={6} xs={12} className="mx-auto">
            <div className={styles.expensesHeader}></div>

            <div className={styles.transferList}>
              {beneficiaries.length > 0 ? (
                beneficiaries.map((beneficiary) => (
                  <TransferItem
                    key={beneficiary.firstName + beneficiary.lastName}
                    beneficiary={beneficiary}
                    deletable={true}
                    setStep={setStep}
                    setShowDeleteModal={setShowDeleteModal}
                  />
                ))
              ) : (
                <p className={styles.noBeneficiary}>No beneficiary</p>
              )}
              <div className={styles.transferItem} onClick={handleAddForm}>
                <h2>
                  <span className={styles.addIcon}>+</span> New beneficiary
                </h2>
              </div>
            </div>
            {showBeneficiaryModal && (
              <BeneficiaryModal
                show={showBeneficiaryModal}
                handleClose={handleCloseBeneficiaryModal}
              />
            )}
            {selectedBeneficiary && (
              <TransferModal
                show={showTransferModal}
                handleClose={handleCloseTransferModal}
              />
            )}
            {showDeleteModal && (
              <DeleteModal
                show={showDeleteModal}
                handleClose={handleCloseDeleteModal}
                beneficiary={selectedBeneficiary}
              />
            )}
          </Col>
        </Row>
      </Container>
      <div ref={bottomRef}></div>
    </>
  );
}

export default TransferList;
