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
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Gateway from "./pages/Gateway";
import axios from "axios";
DialogflowSetting();

const Container = () => {
  ///////////////Login審查/////////
  const [user, setUser] = useState(false);
  ///////////////LoginUser存取//////
  const [admin, setAdmin] = useState(true);
  ///////////////資料設定///////////
  const [userData, setUserData] = useState(null);
  ////////////////////////////////
  const SetLogout = () => {
    sessionStorage.clear();
    sessionStorage.removeItem("UserInput");
    setUser(false);
    setUserData(null);
    <Navigate to="/login" />;
  };
  /////////////////////////////////
  //人員審查
  useEffect(() => {
    sessionStorage.setItem("user", user);
  }, [user]);

  useEffect(() => {
    if (userData != null) {
      sessionStorage.setItem("Sid", userData._id);
    }
  }, [userData]);

  useEffect(() => {
    const GetSid = sessionStorage.getItem("Sid");

    if (GetSid != null || GetSid != "null") {
      axios({
        method: "POST",
        data: {
          _id: GetSid,
        },
        withCredentials: true,
        url: process.env.REACT_APP_AXIOS_CHECKUSER,
      }).then((response) => {
        setUser(response.data);
      });
    }
  }, []);
  ////////////////////////////////
  // 監聽視窗事件->儲存使用者行為
  // window.onbeforeunload = (e) => {
  //   let PushToDB = JSON.parse(sessionStorage.getItem("UserInput"));
  //   axios
  //     .post(process.env.REACT_APP_AXIOS_USERINPUT, {
  //       StudentId: userData.StudentId,
  //       Mark: PushToDB.Mark,
  //     })
  //     .then((response) => {
  //       sessionStorage.removeItem("UserInput");
  //     });
  //   return "";
  // };
  ////////////////////////////////////////////////////////////////////
  //禁止開發者工具
  //禁止右鍵、F12////////////////////////////////
  // window.oncontextmenu = function(){return false;}
  // window.onkeydown = function(e) {
  //     if (e.keyCode === 123) {
  //       e.preventDefault()
  //     }
  //   }
  // //禁用console、session、local
  // javascript:console.log=function(){};
  // javascript:sessionStorage.setItem=function(){};
  // javascript:localStorage.setItem=function(){};
  // //禁止調適
  // setInterval(function() {
  //    check();
  // }, 2000);
  // var check = function() {
  //    function doCheck(a) {
  //       if (('' + a / a)['length'] !== 1 || a % 20 === 0) {
  //           (function() {}['constructor']('debugger')());
  //       } else {
  //           (function() {}['constructor']('debugger')());
  //       }
  //       doCheck(++a);
  //    }
  //    try {
  //      doCheck(0);
  //    } catch (err) {}
  // };
  // check();
  ////////////////////////////////////////////////////////////////
  return (
    <Router>
      <Routes>
        {!user && (
          <>
            <Route
              path="/Login"
              element={
                <Login
                  User={() => {
                    setUser(true);
                  }}
                />
              }
            />
          </>
        )}
        {user && (
          <>
            <Route
              path="/Profile"
              element={<Profile Logout={SetLogout} UserToken={userData} />}
            />
          </>
        )}
        {userData != null && (
          <>
            {userData.Access === "1" && (
              <Route path="/A1" element={<A1 UserToken={userData} />} />
            )}
            {userData.Access === "2" && (
              <Route path="/A2" element={<A2 UserToken={userData} />} />
            )}
            {userData.Access === "3" && (
              <Route path="/A3" element={<A3 UserToken={userData} />} />
            )}
          </>
        )}

        {/* 防止輸入網址跑走 */}
        {/* <Route
          path="*"
          element={<Navigate to={user ? "/Profile" : "Login"} />}
          />
        <Route path="/Admin" element={<Admin />} /> */}
        <Route
          path="/Gateway"
          element={
            <Gateway
              Location={window.location.pathname}
              UserToken={setUserData}
              User={() => setUser(true)}
            />
          }
        />
        {/* <Route
          path="*"
          element={
            <Gateway
              Location={window.location.pathname}
              UserToken={setUserData}
              User={() => setUser(true)}
            />
          }
        /> */}
      </Routes>
    </Router>
  );
};

function DialogflowSetting() {
  var Dialogflow = document.createElement("script");
  Dialogflow.type = "text/javascript";
  Dialogflow.async = true;
  Dialogflow.src = process.env.REACT_APP_DIALOGFLOW;
  document.head.appendChild(Dialogflow);
}

export default Container;
