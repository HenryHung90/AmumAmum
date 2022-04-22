import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import Admin from "./pages/Admin";
import A1 from "./pages/A1";
import A1_Tree from "./pages/A1/components/Treedocument";
import A1_BST from "./pages/A1/components/BSTdocument";
import A1_AVL from "./pages/A1/components/AVLdocument";
import A1_RBT from "./pages/A1/components/RBTdocument";
import A2 from "./pages/A2";
import A2_Tree from "./pages/A2/components/Treedocument";
import A2_BST from "./pages/A2/components/BST";
import A2_AVL from "./pages/A2/components/AVL";
import A2_RBT from "./pages/A2/components/RBT";
import A2_Test from "./pages/A2/components/Test";
import A3 from "./pages/A3";
//import A3_Tree from './pages/A3/components/Treedocument';
import A3_BST from "./pages/A3/components/BSTInteractive";
import A3_AVL from "./pages/A3/components/AVLInteractive";
// import A3_RBT from './pages/A3/components/RBTInteractive';
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import axios from "axios";
DialogflowSetting();

const Container = () => {
  ///////////////Login審查/////////
  const [user, setUser] = useState(null);
  ///////////////LoginUser存取//////
  const [admin, setAdmin] = useState(true);
  ///////////////資料設定///////////
  const [userData, setUserData] = useState("null");
  const [Sid, setSid] = useState("null");
  ////////////////////////////////
  const SetLogout = () => {
    sessionStorage.clear();
    setUser(false);
    setSid("null");
    setUserData("null");
  };
  /////////////////////////////////
  //人員審查
  useEffect(() => {
    sessionStorage.setItem("user", user);
  }, [user]);

  useEffect(() => {
    if (userData.data != null) {
      sessionStorage.setItem("Sid", userData.data._id);
      setSid(sessionStorage.getItem("Sid"));
    }
  }, [userData]);

  useEffect(() => {
    const GetSid = sessionStorage.getItem("Sid");

    if (GetSid != null) {
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
  //監聽視窗事件->儲存使用者行為
  //

  window.onbeforeunload = (e) => {
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
  };
  ////////////////////////////////////////////////////////////////////////
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
            element={
              <Login UserToken={setUserData} User={() => setUser(true)} />
            }
          />
        )}
        {user && (
          <>
            <Route path="/A1" element={<A1 />} />
            <Route path="/A1/Tree" element={<A1_Tree />} />
            <Route path="/A1/BST" element={<A1_BST />} />
            <Route path="/A1/AVL" element={<A1_AVL />} />
            <Route path="/A1/RBT" element={<A1_RBT />} />
            <Route path="/A2" element={<A2 />} />
            <Route path="/A2/Tree" element={<A2_Tree />} />
            <Route path="/A2/BST" element={<A2_BST />} />
            <Route path="/A2/AVL" element={<A2_AVL />} />
            <Route path="/A2/RBT" element={<A2_RBT />} />
            <Route path="/A2/Test" element={<A2_Test />} />
            <Route path="/A3" element={<A3 />} />
            {/* <Route path="/A3/Tree" element={<A3_Tree />} /> */}
            <Route path="/A3/BST" element={<A3_BST />} />
            <Route path="/A3/AVL" element={<A3_AVL />} />
            {/* <Route path="/A3/RBT" element={<A3_RBT />} /> */}
            <Route path="/Profile" element={<Profile Logout={SetLogout} />} />
          </>
        )}
        {admin && <Route path="/Admin" element={<Admin />} />}
        <Route
          path="*"
          element={<Navigate to={user ? "/Profile" : "/Login"} />}
        />
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
