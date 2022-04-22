import React,{ useState } from "react";
import SelfInfo from "./components/SelfInfo";
import EmailChange from './components/EmailChange';
import PasswordChange from './components/PasswordChange';

const Profile = ({ Logout }) => {
  return (
    <div>
      <SelfInfo Logout={Logout}/>
    </div>
  );
};

export default Profile;
