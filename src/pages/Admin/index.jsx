import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Signup from "./components/Signup";
import MemberList from "./components/MemberList";
import QuestionFromAdmin from "./components/QuestionFromAdmin";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";

const Admin = ({UserToken}) => {
  const Refresh = useNavigate();
  const pages = ["手動新增成員", "成員清單","問題區", "回到個人資料"];

  const [AdminPage, setAdminPage] = useState(<MemberList />);
  const [Test, setTest] = useState(1);

  console.log(UserToken);

  const GoPage = (event) => {
    switch(event.target.id){
      case "0":
        setAdminPage(<Signup />)
        break;
      case "1":
        setAdminPage(<MemberList />)
        break;
      case "2":
        setAdminPage(<QuestionFromAdmin UserId={UserToken.StudentId}/>)
        break;
      case "3":
        Refresh("/Profile");
    }
  };

  return (
    <div>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/Admin"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              管理介面
            </Typography>
            {/* 手機版本 */}
            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              管理介面
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page, index) => (
                <Button
                  key={page}
                  id={index}
                  onClick={GoPage}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {page}
                </Button>
              ))}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      {AdminPage}
    </div>
  );
};

export default Admin;
