import React from "react";
import { NavDropdown, Nav, Navbar, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

function Header() {
  return (
    <Navbar expand="lg" variant="dark" sticky="top" className="Header">
      <Container>
        <Link
          to="/A2"
          style={{
            textDecoration: "none",
            marginRight: "20px",
            fontSize: "30px",
            color: "white",
          }}
        >
          D.S.V
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link
              to="/A2/Tree"
              style={{
                textDecoration: "none",
                marginRight: "20px",
                color: "white",
              }}
            >
              Introduction
            </Link>
            <Link
              to="/A2/BST"
              style={{
                textDecoration: "none",
                marginRight: "20px",
                color: "white",
              }}
            >
              Binary Search Tree
            </Link>
            <Link
              to="/A2/AVL"
              style={{
                textDecoration: "none",
                marginRight: "20px",
                color: "white",
              }}
            >
              Adelson Velsky Landis Tree
            </Link>
            <Link
              to="/A2/RBT"
              style={{
                textDecoration: "none",
                marginRight: "20px",
                color: "white",
              }}
            >
              Red Black Tree
            </Link>
            <Link
              to="/A2/Test"
              style={{ textDecoration: "none", color: "white" }}
            >
              Test
            </Link>
          </Nav>
        </Navbar.Collapse>
        <Nav className="logSystem">
          <img src="https://img.icons8.com/ios/50/000000/user--v2.png" />
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Header;
