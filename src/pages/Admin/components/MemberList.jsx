import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import axios from "axios";

const MemberList = () => {
  //////////取得名單////////////
  const [Member, setMember] = useState([]);
  useEffect(() => {
    axios.get(process.env.REACT_APP_AXIOS_READ).then((response) => {
      setMember(response.data);
    });
  });
  ////////////////////////////////
  return (
    <div className="member">
      <h1  className="AdminTitle">成員名單</h1>
      <div className="memberTable_th">
        <h3 className="AdminStandText">姓名</h3>
        <h3 className="AdminStandText">學號</h3>
        <h3 className="AdminStandText">電子郵件</h3>
        <h3 className="AdminStandText">密碼</h3>
        <h3 className="AdminStandText">權限</h3>
      </div>
      {Member.map((val, key) => {
        return (
          <div className="memberTable_td">
            <TextField
              id={val.StudentId}
              label={key}
              variant="outlined"
              value={val.Name}
              disabled
            />
            <TextField
              id={val.StudentId}
              label={key}
              variant="outlined"
              value={val.StudentId}
              disabled
            />
            <TextField
              id={val.StudentId}
              label={key}
              variant="outlined"
              value={val.Email}
              disabled
            />
            <TextField
              id={val.StudentId}
              label={key}
              variant="outlined"
              value={val.Password}
              disabled
            />
            <TextField
              id={val.StudentId}
              label={key}
              variant="outlined"
              value={val.Access}
              disabled
            />
          </div>
        );
      })}
    </div>
  );
};

export default MemberList;
