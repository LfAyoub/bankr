import { BrowserRouter } from "react-router-dom";
import { useLocation } from "react-router-dom";

import LogoutModal from "./components/LogoutModal";
import AnimatedRoutes from "./components/AnimatedRoutes";
import { AuthProvider } from "./contexts/FakeAuthContext";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <LogoutModal />
      </AuthProvider>
      <AnimatedRoutes />
    </BrowserRouter>
  );
}

export default App;
