import { createContext, useContext, useReducer, useState } from "react";

const AuthContext = createContext();

const initialState = { user: null, isAuthenticated: false };

function reducer(state, action) {
  switch (action.type) {
    case "login":
      return { ...state, user: action.payload, isAuthenticated: true };
    case "logout":
      return { ...state, user: null, isAuthenticated: false };
    default:
      throw new Error("Unknown action");
  }
}

const FAKE_USER = {
  name: "Jack",
  email: "jack@mail.com",
  password: "azerty",
};

function AuthProvider({ children }) {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    reducer,
    initialState
  );
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  function login(email, password) {
    if (email === FAKE_USER.email && password === FAKE_USER.password) {
      dispatch({ type: "login", payload: FAKE_USER });
    }
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
