import { NavLink } from "react-router-dom";
import { Nav, NavDropdown } from "react-bootstrap";
import { useAuth } from "../contexts/FakeAuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartLine,
  faMoneyBillTransfer,
  faFolder,
  faFileLines,
  faWallet,
  faRightFromBracket,
  faFileCirclePlus,
  faClockRotateLeft,
} from "@fortawesome/free-solid-svg-icons";
import Footer from "./Footer";
import LogoutModal from "./LogoutModal";

import styles from "./Sidebar.module.css";

function Sidebar() {
  const {
    isAuthenticated,
    showLogoutModal,
    handleLogoutClick,
    handleCloseLogoutModal,
    handleLogoutConfirm,
  } = useAuth();

  return (
    <nav className={styles.sidebar}>
      <NavLink to="/app" className={styles.logo}>
        <img src="/logo.png" alt="BankR" />
      </NavLink>
      <Nav className="flex-column">
        <NavDropdown
          title={
            <span>
              <FontAwesomeIcon
                icon={faWallet}
                style={{ marginRight: "10px" }}
              />
              Transactions
            </span>
          }
          id="transactions-dropdown"
          className={styles.navDropDown}
        >
          <NavDropdown.Item
            as={NavLink}
            to="/transactions/"
            className={styles.dropDownItem}
          >
            <FontAwesomeIcon
              icon={faClockRotateLeft}
              style={{ marginRight: "10px" }}
            />
            Last transactions
          </NavDropdown.Item>
          <NavDropdown.Item
            as={NavLink}
            to="/create-transaction"
            className={styles.dropDownItem}
          >
            <FontAwesomeIcon
              icon={faFileCirclePlus}
              style={{ marginRight: "10px" }}
            />
            Create transaction
          </NavDropdown.Item>
        </NavDropdown>
        <Nav.Link as={NavLink} to="/graph" className={styles.customNavLink}>
          <FontAwesomeIcon icon={faChartLine} style={{ marginRight: "10px" }} />
          Graph
        </Nav.Link>
        <Nav.Link as={NavLink} to="/spaces" className={styles.customNavLink}>
          <FontAwesomeIcon icon={faFolder} style={{ marginRight: "10px" }} />
          Spaces
        </Nav.Link>
        <Nav.Link as={NavLink} to="/transfer" className={styles.customNavLink}>
          <FontAwesomeIcon
            icon={faMoneyBillTransfer}
            style={{ marginRight: "10px" }}
          />
          Transfer
        </Nav.Link>
        <Nav.Link as={NavLink} to="/logs" className={styles.customNavLink}>
          <FontAwesomeIcon icon={faFileLines} style={{ marginRight: "15px" }} />
          Logs
        </Nav.Link>
        {isAuthenticated ? (
          <>
            <Nav.Link
              as={NavLink}
              onClick={handleLogoutClick}
              to="/"
              className={styles.customNavLink}
            >
              <FontAwesomeIcon
                icon={faRightFromBracket}
                style={{ marginRight: "10px" }}
              />
              Logout
            </Nav.Link>
            <LogoutModal
              show={showLogoutModal}
              handleClose={handleCloseLogoutModal}
              handleLogoutConfirm={handleLogoutConfirm}
            />
          </>
        ) : (
          <Nav.Link as={NavLink} to="/login">
            Login
          </Nav.Link>
        )}
      </Nav>
      <Footer />
    </nav>
  );
}

export default Sidebar;
