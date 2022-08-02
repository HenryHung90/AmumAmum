import React,{ useState } from "react";
import LoginPage from "./components/LoginPage";
import Loading from "../Loading";

const Login = ({ UserToken, User }) => {
  const [IsLoading,setLoading] = useState(false);
  return (
    <>
    {IsLoading && <Loading />}
    <div className="Outline">
      <img src="./Img/amumamum.PNG" className="indexImg" />
      <LoginPage UserToken={UserToken} User={User} SetLoading={setLoading}/>
    </div>
    </>
    
  );
};

export default Login;
