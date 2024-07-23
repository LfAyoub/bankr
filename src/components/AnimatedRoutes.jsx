import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import Homepage from "../pages/Homepage";
import Login from "../pages/Login";
import Expenses from "../pages/Expenses";
import Graph from "../pages/Graph";
import Spaces from "../pages/Spaces";
import Transfer from "../pages/Transfer";
import NewSpace from "../pages/NewSpace";
import SpacePage from "../pages/SpacePage";
import ExpensePage from "../pages/ExpensePage";
import ProtectedRoutes from "../pages/ProtectedRoutes";
import CreateTransaction from "../pages/CreateTransaction";
import Logs from "../pages/Logs";
import Landing from "../pages/Landing";
import { AuthProvider } from "../contexts/FakeAuthContext";

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AuthProvider>
      <AnimatePresence wait>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Landing />} />
          <Route
            path="/app"
            element={
              <ProtectedRoutes>
                <Homepage />
              </ProtectedRoutes>
            }
          />
          <Route path="login" element={<Login />} />
          <Route
            path="transactions"
            element={
              <ProtectedRoutes>
                <Expenses />
              </ProtectedRoutes>
            }
          />
          <Route
            path="transactions/:id"
            element={
              <ProtectedRoutes>
                <ExpensePage />
              </ProtectedRoutes>
            }
          />
          <Route
            path="graph"
            element={
              <ProtectedRoutes>
                <Graph />
              </ProtectedRoutes>
            }
          />
          <Route
            path="spaces"
            element={
              <ProtectedRoutes>
                <Spaces />
              </ProtectedRoutes>
            }
          />
          <Route
            path="spaces/new"
            element={
              <ProtectedRoutes>
                <NewSpace />
              </ProtectedRoutes>
            }
          />
          <Route
            path="spaces/:spaceName"
            element={
              <ProtectedRoutes>
                <SpacePage />
              </ProtectedRoutes>
            }
          />
          <Route
            path="transfer"
            element={
              <ProtectedRoutes>
                <Transfer />
              </ProtectedRoutes>
            }
          />
          <Route
            path="create-transaction"
            element={
              <ProtectedRoutes>
                <CreateTransaction />
              </ProtectedRoutes>
            }
          />
          <Route
            path="logs"
            element={
              <ProtectedRoutes>
                <Logs />
              </ProtectedRoutes>
            }
          />
        </Routes>
      </AnimatePresence>
    </AuthProvider>
  );
}

export default AnimatedRoutes;
