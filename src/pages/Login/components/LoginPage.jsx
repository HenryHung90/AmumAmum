import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = ({ User,SetLoading }) => {
  //const Admin = [process.env.REACT_APP_ADMIN_ONE];
  //////////////////帳號紀錄/////////////////////////
  const [Account, setAccount] = useState("");
  function AccountChange(e) {
    setAccount(e.target.value);
  }
  //////////////////密碼紀錄/////////////////////////
  const [Password, setPassword] = useState("");
  function PasswordChange(e) {
    setPassword(e.target.value);
  }
  //const [Test,setTest] = useState("")
  ////////////////////////////////////////////////
  async function CheckLogin() {
    axios({
      method: "POST",
      data: {
        username: Account,
        password: Password,
      },
      withCredentials: true,
      url: process.env.REACT_APP_AXIOS_LOGIN,
    }).then((response) => {
      if (response.data !== process.env.REACT_APP_LOGIN_FAIL) {
        sessionStorage.setItem("Sid", response.data._id);
        User();
      } else {
        alert("帳號或密碼錯誤，請再試一次");
      }
      SetLoading(false);
    });
  }
  const Refresh = useNavigate();
  const goAboutUs = () => {
    Refresh("/Aboutus");
  };
  return (
    <div className="LoginMain">
      <h1 className="Login_h1" style={{ userSelect: "none" }}>
        D.S.V PORTAL
      </h1>
      <h3 className="Login_h3" style={{ userSelect: "none" }}>
        帳號
      </h3>
      <TextField
        id="account"
        name="account"
        label="學號(不加s)"
        variant="filled"
        size="small"
        style={{
          width: 300,
        }}
        onChange={AccountChange}
      />
      <h3 className="Login_h3" style={{ userSelect: "none" }}>
        密碼
      </h3>
      <TextField
        id="password"
        name="password"
        label="密碼(預設與學號相同)"
        variant="filled"
        size="small"
        style={{
          width: 300,
        }}
        type="password"
        onChange={PasswordChange}
      />
      <div className="subBtn">
        <Button
          variant="contained"
          type="submit"
          style={{
            fontSize: 14,
            backgroundColor: "black",
          }}
          onClick={() => {
            SetLoading(true);
            CheckLogin();
          }}
        >
          登入
        </Button>
      </div>
    </div>
  );
};

export default Login;
