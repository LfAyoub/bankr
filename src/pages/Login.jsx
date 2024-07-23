import Sidebar from "../components/Sidebar";
import LoginForm from "../components/LoginForm";
import { useEffect } from "react";
import { AuthProvider } from "../contexts/FakeAuthContext";

function Login() {
  useEffect(() => {
    document.title = "BankR - Login";
  }, []);

  return (
    <div>
      <LoginForm />
    </div>
  );
}

export default Login;
