import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Gateway = ({ Location, UserToken, User }) => {
  const Navigate = useNavigate();

  useEffect(() => {
    GatewayRedirect();
  });

  const GatewayRedirect = () => {
    const GetSid = sessionStorage.getItem("Sid");
    if (GetSid !== null) {
      axios({
        method: "POST",
        data: {
          _id: GetSid,
        },
        withCredentials: true,
        url: process.env.REACT_APP_AXIOS_USERINFO,
      })
        .then((response) => {
          User();
          UserToken(() => {
            console.log(123);
            return response.data;
          });
        })
        .then((response) => {
          if (
            Location === "/Gateway" ||
            Location === "/Login" ||
            Location === "/"
          ) {
            Navigate("/Profile");
          } else {
            Navigate(Location);
          }
        });
    } else {
      Navigate("/Login");
    }
  };
  return (
    <>
      <h1>重新導向中...</h1>
      <p>目前網址：{Location}</p>
    </>
  );
};

export default Gateway;
