import React from "react";
import LoginPage from "./components/LoginPage";

const Login = ({ UserToken, User }) => {
  return (
    <div className="Outline">
      <img src="./Img/amumamum.PNG" className="indexImg" />
      <LoginPage UserToken={UserToken} User={User} />
    </div>
  );
};

export default Login;
