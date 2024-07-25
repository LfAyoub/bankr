import { createContext, useContext, useReducer, useState } from "react";

const AuthContext = createContext();

const initialState = {
  user: null,
  isAuthenticated: false,
  showErrorMessage: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "login":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        showErrorMessage: false,
      };
    case "logout":
      return { ...state, user: null, isAuthenticated: false };
    case "wrongCredentials":
      return { ...state, showErrorMessage: true };
    default:
      throw new Error("Unknown action");
  }
}

const FAKE_USER = {
  name: "Stark",
  email: "tony@stark.com",
  password: "azerty",
};

function AuthProvider({ children }) {
  const [{ user, isAuthenticated, showErrorMessage }, dispatch] = useReducer(
    reducer,
    initialState
  );
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  function login(email, password) {
    if (email === FAKE_USER.email && password === FAKE_USER.password) {
      dispatch({ type: "login", payload: FAKE_USER });
    } else dispatch({ type: "wrongCredentials" });
  }

  function logout() {
    dispatch({ type: "logout" });
  }

  function handleLogoutClick(e) {
    e.preventDefault();
    setShowLogoutModal(true);
  }

  function handleCloseLogoutModal() {
    setShowLogoutModal(false);
  }

  function handleLogoutConfirm() {
    logout();
    setShowLogoutModal(false);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        logout,
        handleLogoutClick,
        handleCloseLogoutModal,
        handleLogoutConfirm,
        showLogoutModal,
        showErrorMessage,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export { AuthProvider, useAuth };
