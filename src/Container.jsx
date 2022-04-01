import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import Admin from "./pages/Admin";
import A1 from "./pages/A1";
import A2 from "./pages/A2";
import A3 from "./pages/A3";
import Exam from "./pages/Exam";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import axios from "axios";
DialogflowSetting();

const Container = () => {
  ///////////////Login審查/////////
  const [user, setUser] = useState(null);
  ///////////////LoginUser存取//////
  const [admin, setAdmin] = useState(false);
  ///////////////Page檢查///////////
  const [page, setPage] = useState("Login");
  /////////////////////////////////
  //人員審查
  useEffect(() => {
    const IsLogin = sessionStorage.getItem("user");
    JSON.parse(IsLogin) ? setUser(IsLogin) : setUser(false);
  }, []);
  useEffect(() => {
    sessionStorage.setItem("user", user);
  }, [user]);
  useEffect(() => {
    setPage(window.location.pathname);
  }, [window.location.pathname]);
  ////////////////////////////////
  //監聽視窗事件->儲存使用者行為
  //

  window.onbeforeunload = e =>{
   //儲存機器人問答紀錄
  //  let UserTalkWithRobot = sessionStorage.getItem("UserInput"); 
  //  let PushToDB = JSON.parse(UserTalkWithRobot);
   
  //  axios.post(process.env.REACT_APP_AXIOS_USERINPUT,{
  //    StudentId:PushToDB.StudentId,
  //    Mark:PushToDB.Mark,
  //  })
  //  .then(response =>{
  //    console.log(response);
  //    sessionStorage.setItem("UserInput",null)
  //  })
  }
  ////////////////////////////////////////////////////////////////////////
  //禁止開發者工具
  //禁止右鍵、F12////////////////////////////////
  // window.oncontextmenu = function(){return false;}
  // window.onkeydown = function(e) {
  //     if (e.keyCode === 123) {
  //       e.preventDefault()
  //     }
  //   }
  // //禁用console
  // javascript:console.log=function(){};
  // //禁止調適
  // setInterval(function() {
  //       check();
  //     }, 2000);
  //     var check = function() {
  //       function doCheck(a) {
  //         if (('' + a / a)['length'] !== 1 || a % 20 === 0) {
  //           (function() {}['constructor']('debugger')());
  //         } else {
  //           (function() {}['constructor']('debugger')());
  //         }
  //         doCheck(++a);
  //       }
  //       try {
  //         doCheck(0);
  //       } catch (err) {}
  //     };
  //     check();
  ////////////////////////////////////////////////////////////////
  return (
    <Router>
      <Routes>
        {!user && (
          <Route
            path="/Login"
            element={<Login AccessToken={() => setUser(true)} UserToken={()=> setAdmin(true)}/>}
          />
        )}
        {user && (
          <>
            <Route path="/A1" element={<A1 />} />
            <Route path="/A2" element={<A2 />} />
            <Route path="/A3" element={<A3 />} />
            <Route path="/Exam" element={<Exam />} />
            <Route
              path="/Profile"
              element={<Profile Logout={() => {setUser(false);setAdmin(false)}} />}
            />
          </>
        )}
        {admin &&(
            <Route path="/Admin" element={<Admin />} />
        )}
        <Route path="*" element={<Navigate to={user ? "/profile" : "/Login"} />} />
      </Routes>
    </Router>
  );
};

function DialogflowSetting(){
  var Dialogflow = document.createElement("script");
  Dialogflow.type = "text/javascript";
  Dialogflow.async = true;
  Dialogflow.src = process.env.REACT_APP_DIALOGFLOW;
  document.head.appendChild(Dialogflow);
}

export default Container;
