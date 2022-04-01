import React from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";

const profile = ({ Logout }) => {
  return (
    <div>
      This is profile page
      <Link to="/A1">A1</Link>
      <Link to="/A2">A2</Link>
      <Link to="/A3">A3</Link>
      <Link to="/Admin">Admin</Link>
      <Button
        variant="contained"
        type="submit"
        style={{
          fontSize: 14,
          backgroundColor: "black",
        }}
        onClick={() => Logout()}
      >
        登出
      </Button>
    </div>
  );
};

export default profile;
