import React from "react";
import LoginPage from "./components/LoginPage";

const Login = ({ AccessToken, UserToken }) => {
  return (
    <div className="Outline">
      <LoginPage AccessToken={AccessToken} UserToken={UserToken} />
    </div>
  );
};

export default Login;
