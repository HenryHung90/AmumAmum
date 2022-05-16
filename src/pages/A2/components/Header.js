import React from "react";
import { Nav, Navbar, NavDropdown, Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState } from "react";
import Home from "./Home";
import Tree from "./Treedocument";
import BST from "./BST";
import AVL from "./AVL";
import RBT from "./RBT";
import BSTInteractive from "./BSTInteractive";
import AVLinteractive from "./AVLInteractive";
import Test from "../../A2/components/Test";

function Header() {
  const [container, setContainer] = useState(<Home />);
  return (
    <div>
      <Navbar expand="lg" variant="light" sticky="top" className="Header">
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
              <NavDropdown title="Binary Search Tree" id="basic-nav-dropdown">
                <Button
                  onClick={() => {
                    setContainer(<BST />);
                  }}
                  variant="light"
                  style={{
                    textDecoration: "none",
                    marginRight: "20px",
                    width: "100%",
                  }}
                >
                  demonstrate
                </Button>
                <Button
                  onClick={() => {
                    setContainer(<BSTInteractive />);
                  }}
                  variant="light"
                  style={{
                    textDecoration: "none",
                    marginRight: "20px",
                    width: "100%",
                  }}
                >
                  Interactive
                </Button>
              </NavDropdown>
              <NavDropdown
                title=" Adelson Velsky Landis Tree"
                id="basic-nav-dropdown"
              >
                <Button
                  onClick={() => {
                    setContainer(<AVL />);
                  }}
                  variant="light"
                  style={{
                    textDecoration: "none",
                    marginRight: "20px",
                    width: "100%",
                  }}
                >
                  demonstrate
                </Button>
                <Button
                  onClick={() => {
                    setContainer(<AVLinteractive />);
                  }}
                  variant="light"
                  style={{
                    textDecoration: "none",
                    marginRight: "20px",
                    width: "100%",
                  }}
                >
                  Interactive
                </Button>
              </NavDropdown>
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
                variant="outline-dark"
                href="https://forms.gle/SQc3WPkFbmaEtG9KA"
                target="_blank"
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
