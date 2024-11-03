// src/Components/LoginPage.tsx
import { useAuth0 } from "@auth0/auth0-react";
import GradientButton from "./GradientButtonOnClick";
GradientButton;

const Login = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <GradientButton buttonName="Log in" onClick={() => loginWithRedirect()} />
  );
};

export default Login;
