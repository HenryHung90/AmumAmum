import React from "react";
import LoginPage from "./components/LoginPage";

const Login = ({ UserToken, User }) => {
  return (
    <div className="Outline">
      <LoginPage UserToken={UserToken} User={User} />
    </div>
  );
};

export default Login;
