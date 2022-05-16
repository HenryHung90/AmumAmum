import React from "react";
import { Nav, Navbar, Container, Button } from "react-bootstrap";
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
              cursor: "pointer",
            }}
          >
            <img className="headerlogo" src="/Img/amumamum.PNG" />
          </div>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Button
                variant="outline-dark"
                onClick={() => {
                  setContainer(<Tree />);
                }}
                style={{
                  textDecoration: "none",
                  marginRight: "20px",
                }}
              >
                Introduction
              </Button>
              <Button
                variant="outline-dark"
                onClick={() => {
                  setContainer(<BST />);
                }}
                style={{
                  textDecoration: "none",
                  marginRight: "20px",
                }}
              >
                Binary Search Tree
              </Button>
              <Button
                variant="outline-dark"
                onClick={() => {
                  setContainer(<AVL />);
                }}
                style={{
                  textDecoration: "none",
                  marginRight: "20px",
                }}
              >
                Adelson Velsky Landis Tree
              </Button>
              <Button
                variant="outline-dark"
                onClick={() => {
                  setContainer(<RBT />);
                }}
                style={{
                  textDecoration: "none",
                  marginRight: "20px",
                  cursor: "pointer",
                }}
              >
                Red Black Tree
              </Button>
              <Button
                variant="outline-dark"
                href="https://forms.gle/SQc3WPkFbmaEtG9KA"
                target="_blank"
                style={{
                  textDecoration: "none",
                  cursor: "pointer",
                }}
              >
                Test
              </Button>
            </Nav>
          </Navbar.Collapse>
          <Nav className="logSystem">
            <Link
              to="/Profile"
              style={{
                textDecoration: "none",
                marginRight: "20px",
              }}
            >
              <img src="https://img.icons8.com/ios/50/000000/user--v2.png" />
            </Link>
          </Nav>
        </Container>
      </Navbar>
      {container}
    </div>
  );
}

export default Header;
