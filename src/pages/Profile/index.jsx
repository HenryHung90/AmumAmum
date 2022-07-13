import React, { useState } from "react";
import SelfInfo from "./components/SelfInfo";

const Profile = ({ Logout, UserToken }) => {
  return (
    <div>
      <SelfInfo Logout={Logout} UserToken={UserToken} />
    </div>
  );
};

export default Profile;
