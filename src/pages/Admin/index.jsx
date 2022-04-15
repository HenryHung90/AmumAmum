import React from "react";
import Signup from "./components/Signup";
import MemberList from "./components/MemberList";

const Admin = () => {
  return (
    <div>
      <h1 className="AdminTitle">管理頁面</h1>
      <Signup />
      <MemberList />
    </div>
  );
};

export default Admin;
