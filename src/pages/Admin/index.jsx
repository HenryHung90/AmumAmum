import React from "react";
import Signup from "./components/Signup";
import MemberList from "./components/MemberList";
import "./index.css";
const Admit = () => {
  return (
    <div>
      <h1>管理頁面</h1>
      <Signup />
      <MemberList />
    </div>
  );
};

export default Admit;
