import { useNavigate } from "react-router-dom";

export function useRoutes() {
  const navigate = useNavigate();

  function toLogin() {
    navigate("/login");
  }

  function toSignup() {
    navigate("/signup");
  }

  function toHome() {
    navigate("/home");
  }

  function logout() {
    navigate("/");
  }

  return { toLogin, toSignup, toHome, logout };
}
