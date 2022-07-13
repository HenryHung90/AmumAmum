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
import Error from "./pages/Error";
import AdminGrades from "./pages/AdminGrades";
import AboutUs from "./pages/AboutUs";
import axios from "axios";
DialogflowSetting();

const Container = () => {
  ///////////////Login審查/////////
  const [user, setUser] = useState(false);
  const [userAccess, setUserAccess] = useState("");
  ///////////////LoginUser存取//////
  const [admin, setAdmin] = useState(false);
  ///////////////資料設定///////////
  const [userData, setUserData] = useState(null);
  ////////////////////////////////
  const SetLogout = () => {
    sessionStorage.clear();
    sessionStorage.removeItem("UserInput");
    setUser(false);
    setUserData(null);
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

    if (GetSid !== null || GetSid !== "null") {
      axios({
        method: "POST",
        data: {
          _id: GetSid,
        },
        withCredentials: true,
        url: process.env.REACT_APP_AXIOS_USERINFO,
      })
        .then((response) => {
          if (response.data === false) {
            return;
          }
          setUserAccess(response.data.Access);
          if (response.data.Access === "Admin") {
            setAdmin(true);
          }
          setUserData(response.data);
          setUser(true);
        })
        .then((response) => {
          <Navigate to={window.location.pathname} />;
        });
    }
  }, [user]);

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
  if (user === true) {
    return (
      <Router>
        <Routes>
          <Route
            path="/"
            element={<Profile Logout={SetLogout} UserToken={userData} />}
          />
          <Route
            path="/Profile"
            element={<Profile Logout={SetLogout} UserToken={userData} />}
          />
          <Route path="/Grade" element={<A1 UserToken={userData} />} />
          <Route path="/AboutUs" element={<AboutUs />} />
          {userAccess === "1" && (
            <Route path="/A1" element={<A1 UserToken={userData} />} />
          )}
          {userAccess === "2" && (
            <Route path="/A2" element={<A2 UserToken={userData} />} />
          )}
          {userAccess === "3" && (
            <Route path="/A3" element={<A3 UserToken={userData} />} />
          )}
          {userAccess === "12" && (
            <>
              <Route path="/A1" element={<A1 UserToken={userData} />} />
              <Route path="/A2" element={<A2 UserToken={userData} />} />
            </>
          )}
          {userAccess === "13" && (
            <>
              <Route path="/A1" element={<A2 UserToken={userData} />} />
              <Route path="/A3" element={<A3 UserToken={userData} />} />
            </>
          )}
          {userAccess === "23" && (
            <>
              <Route path="/A2" element={<A2 UserToken={userData} />} />
              <Route path="/A3" element={<A3 UserToken={userData} />} />
            </>
          )}
          {userAccess === "123" && (
            <>
              <Route path="/A1" element={<A1 UserToken={userData} />} />
              <Route path="/A2" element={<A2 UserToken={userData} />} />
              <Route path="/A3" element={<A3 UserToken={userData} />} />
            </>
          )}
          {admin && (
            <>
              <Route path="/A1" element={<A1 UserToken={userData} />} />
              <Route path="/A2" element={<A2 UserToken={userData} />} />
              <Route path="/A3" element={<A3 UserToken={userData} />} />
              <Route path="/Admin" element={<Admin />} />
              <Route path="/AdminGrade" element={<AdminGrades />} />
            </>
          )}
          <Route path="*" element={<Error />} />
        </Routes>
      </Router>
    );
  } else {
    return (
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <Login
                User={() => {
                  setUser(true);
                }}
              />
            }
          />
          <Route
            path="/Profile"
            element={
              <Login
                User={() => {
                  setUser(true);
                }}
              />
            }
          />
          <Route path="*" element={<Error />} />
        </Routes>
      </Router>
    );
  }

  // <Route path="/Gateway" element={
  //           <Gateway
  //             Location={window.location.pathname}
  //             UserToken={setUserData}
  //             User={() => setUser(true)}
  //           />
  //         }
  //       />
};

function DialogflowSetting() {
  var Dialogflow = document.createElement("script");
  Dialogflow.type = "text/javascript";
  Dialogflow.async = true;
  Dialogflow.src = process.env.REACT_APP_DIALOGFLOW;
  document.head.appendChild(Dialogflow);
}

export default Container;
