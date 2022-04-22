import React from "react";
import { Nav, Navbar, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "./Home";
import Tree from "./Treedocument";
import BST from "./BSTdocument";
import AVL from "./AVLdocument";
import RBT from "./RBTdocument";
import Test from "../../A2/components/Test";
import axios from "axios";

function Header() {
  const [container, setContainer] = useState(<Home />);
  const [UserData, setUserData] = useState("");

  useEffect(() => {
    const GetSid = sessionStorage.getItem("Sid");
    axios({
      method: "POST",
      data: {
        _id: GetSid,
      },
      withCredentials: true,
      url: process.env.REACT_APP_AXIOS_USERINFO,
    }).then((response) => {
      setUserData(response.data);
    });
  }, []);
  return (
    <div>
      <Navbar expand="lg" variant="dark" sticky="top" className="Header">
        <Container>
          <div
            onClick={() => {
              setContainer(<Home />);
            }}
            to="/A3/Home"
            style={{
              textDecoration: "none",
              marginRight: "20px",
              fontSize: "30px",
              color: "white",
              cursor: "pointer",
            }}
          >
            D.S.V
          </div>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <div
                onClick={() => {
                  setContainer(<Tree />);
                }}
                style={{
                  textDecoration: "none",
                  marginRight: "20px",
                  color: "white",
                  cursor: "pointer",
                }}
              >
                Introduction
              </div>
              <div
                onClick={() => {
                  setContainer(<BST />);
                }}
                style={{
                  textDecoration: "none",
                  marginRight: "20px",
                  color: "white",
                  cursor: "pointer",
                }}
              >
                Binary Search Tree
              </div>
              <div
                onClick={() => {
                  setContainer(<AVL />);
                }}
                style={{
                  textDecoration: "none",
                  marginRight: "20px",
                  color: "white",
                  cursor: "pointer",
                }}
              >
                Adelson Velsky Landis Tree
              </div>
              <div
                onClick={() => {
                  setContainer(<RBT />);
                }}
                style={{
                  textDecoration: "none",
                  marginRight: "20px",
                  color: "white",
                  cursor: "pointer",
                }}
              >
                Red Black Tree
              </div>
              <div
                onClick={() => {
                  setContainer(<Test />);
                }}
                style={{
                  textDecoration: "none",
                  color: "white",
                  cursor: "pointer",
                }}
              >
                Test
              </div>
            </Nav>
          </Navbar.Collapse>
          <Nav className="logSystem">
            <Link
              to="/Profile"
              style={{
                textDecoration: "none",
                marginRight: "20px",
                color: "white",
              }}
            >
              <img src="https://img.icons8.com/ios/50/000000/user--v2.png" />
            </Link>
          </Nav>
          {UserData.Name}
        </Container>
      </Navbar>
      {container}
    </div>
  );
}

export default Header;
