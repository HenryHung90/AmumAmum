import React, { useState } from "react";
import SelfInfo from "./components/SelfInfo";
import EmailChange from "./components/EmailChange";
import PasswordChange from "./components/PasswordChange";

const Profile = ({ Logout, UserToken }) => {
  return (
    <div>
      <SelfInfo Logout={Logout} UserToken={UserToken} />
    </div>
  );
};

export default Profile;
