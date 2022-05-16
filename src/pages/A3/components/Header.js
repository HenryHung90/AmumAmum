import React from "react";
import { Nav, Navbar, Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState } from "react";
import Home from "./Home";
import Tree from "./Treedocument";
import BST from "./BSTGame";
import AVL from "./AVLGame";
import RBT from "./RBTGame";

function Header() {
  const [container, setContainer] = useState(<Home />);
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
            <img className="headerlogo" src="./Img/amumamum.PNG" />
          </div>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Button
                onClick={() => {
                  setContainer(<Tree />);
                }}
                variant="outline-dark"
                style={{
                  textDecoration: "none",
                  marginRight: "20px",
                }}
              >
                Introduction
              </Button>
              <Button
                onClick={() => {
                  setContainer(<BST />);
                }}
                variant="outline-dark"
                style={{
                  textDecoration: "none",
                  marginRight: "20px",
                }}
              >
                Binary Search Tree
              </Button>
              <Button
                onClick={() => {
                  setContainer(<AVL />);
                }}
                variant="outline-dark"
                style={{
                  textDecoration: "none",
                  marginRight: "20px",
                }}
              >
                Adelson Velsky Landis Tree
              </Button>
              <Button
                onClick={() => {
                  setContainer(<RBT />);
                }}
                variant="outline-dark"
                style={{
                  textDecoration: "none",
                  marginRight: "20px",
                }}
              >
                Red Black Tree
              </Button>
              <Button
                href="https://forms.gle/SQc3WPkFbmaEtG9KA"
                target="_blank"
                variant="outline-dark"
                style={{
                  textDecoration: "none",
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
                color: "white",
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
