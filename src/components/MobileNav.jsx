import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useAuth } from "../contexts/FakeAuthContext";
import LogoutModal from "./LogoutModal";
import styles from "./MobileNav.module.css";
import "bootstrap/dist/css/bootstrap.min.css";

function MobileNav() {
  const {
    isAuthenticated,
    showLogoutModal,
    handleLogoutClick,
    handleCloseLogoutModal,
    handleLogoutConfirm,
  } = useAuth();

  return (
    <Navbar expand="md" className={`${styles.nav} ${styles.customNavbar}`}>
      <NavLink to="/app" className={styles.logo}>
        <img src="/logo.png" alt="BankR" />
      </NavLink>
      <Navbar.Toggle
        aria-controls="basic-navbar-nav"
        className={styles.customToggle}
      />
      <Navbar.Collapse id="basic-navbar-nav" className={styles.navbarCollapse}>
        <Nav className="ml-auto">
          <NavDropdown
            title="Transactions"
            id="expenses-dropdown"
            className={styles.navDropDown}
          >
            <NavDropdown.Item
              as={NavLink}
              to="/transactions"
              className={styles.dropDownItem}
            >
              Last transactions
            </NavDropdown.Item>
            <NavDropdown.Item
              as={NavLink}
              to="/create-transaction"
              className={styles.dropDownItem}
            >
              Create transaction
            </NavDropdown.Item>
          </NavDropdown>
          <Nav.Link as={NavLink} to="/graph" className={styles.customNavLink}>
            Graph
          </Nav.Link>
          <Nav.Link as={NavLink} to="/spaces" className={styles.customNavLink}>
            Spaces
          </Nav.Link>
          <Nav.Link
            as={NavLink}
            to="/transfer"
            className={styles.customNavLink}
          >
            Transfer
          </Nav.Link>
          <Nav.Link as={NavLink} to="/logs" className={styles.customNavLink}>
            Logs
          </Nav.Link>
          {isAuthenticated ? (
            <>
              <Nav.Link
                as={NavLink}
                onClick={handleLogoutClick}
                className={styles.customNavLink}
                to="/"
              >
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
      </Navbar.Collapse>
    </Navbar>
  );
}

export default MobileNav;
