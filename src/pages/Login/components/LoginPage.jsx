import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import bcryptjs from "bcryptjs";

const Login = ({ AccessToken, UserToken}) => {
  const Navigate = useNavigate();
  const Admin = [process.env.REACT_APP_ADMIN_ONE]
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
  ////////////////////////////////////////////////
  const CheckLogin = () => {
    axios
      .post(process.env.REACT_APP_AXIOS_LOGIN, {
        StudentId: Account,
      })
      .then((response) => {
        if (response.data[0] == null) {
          alert("帳號密碼錯誤或不存在");
        } else if(IsAdmin(response.data[0],Admin)){
          bcryptjs.compare(Password, response.data[0].Password).then((gate) => {
            if (gate) {
              sessionStorage.setItem('StudentId',Account);
              AccessToken();
              UserToken();
              Navigate("/Profile");
              setPassword("");
            } else {
              alert("密碼錯誤");
              setPassword("");
            }
          });
        }else{
          bcryptjs.compare(Password, response.data[0].Password).then((gate) => {
            if (gate) {
              console.log("User")
              AccessToken();
              Navigate("/Profile");
              setPassword("");
            } else {
              alert("密碼錯誤");
              setPassword("");
            }
          });
        }
      });
  };

  function IsAdmin(data,Admin){
    for(let email of Admin){
       return data.Email === email?true:false;
    }
  }

  return (
    <div className="login">
      <h1 className="Login_h1">D.S.V PORTAL</h1>
      <h3 className="Login_h3">帳號</h3>
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
      <h3 className="Login_h3">密碼</h3>
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
