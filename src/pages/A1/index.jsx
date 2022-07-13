import React from "react";
import { Nav, Navbar, NavDropdown, Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Home from "./components/Home";
import Tree from "./components/Treedocument";
import BST from "./components/BSTdocument";
import AVL from "./components/AVLdocument";
import RBT from "./components/RBTdocument";
import Grade from "../Grade/components/Grade";

function BSTTEST(params) {
  return (
    <div className="testContainer">
      <iframe
        src="https://docs.google.com/forms/d/e/1FAIpQLSfQiQz29af9rDxC0XJw65MTlgGa0ARVTRVYK8L6I95IQZv8Hw/viewform?embedded=true"
        width="640"
        height="4556"
        frameBorder="0"
        marginHeight="0"
        marginWidth="0"
      >
        載入中…
      </iframe>
    </div>
  );
}
function AVLTEST(params) {
  return (
    <div className="testContainer">
      <iframe
        src="https://docs.google.com/forms/d/e/1FAIpQLSeOS0jLLO6VG-Gb9XUJ73rMhr8qBBk5DoCj3XmdSJVxbWA1Yw/viewform?embedded=true"
        width="640"
        height="4556"
        frameBorder="0"
        marginHeight="0"
        marginWidth="0"
      >
        載入中…
      </iframe>
    </div>
  );
}
function RBTTEST(params) {
  return (
    <div className="testContainer">
      <iframe
        src="https://docs.google.com/forms/d/e/1FAIpQLSd6BogVec0_Fnkit5c-oZOiTzXn8e7480LzbM-cdezgeOMi8g/viewform?embedded=true"
        width="640"
        height="4556"
        frameBorder="0"
        marginHeight="0"
        marginWidth="0"
      >
        載入中…
      </iframe>
    </div>
  );
}
function MIXEDTEST(params) {
  return (
    <div className="testContainer">
      <iframe
        src="https://docs.google.com/forms/d/e/1FAIpQLSd6e6BWDc7ePfG_5hgO3SzLOq6at3_WawwnGlIjkQdQgu9rtg/viewform?embedded=true"
        width="640"
        height="4556"
        frameBorder="0"
        marginHeight="0"
        marginWidth="0"
      >
        載入中…
      </iframe>
    </div>
  );
}
class A1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Container: <Home />,
      StudentId: "",
    };
    this.handle = this.handle.bind(this);
  }

  handle(Num) {
    this.setState({ Container: Num });
  }
  /*到此 */
  render() {
    return (
      <div className="A3">
        <div>
          <Navbar expand="lg" variant="light" sticky="top" className="Header">
            <Container>
              <div
                onClick={() => {
                  this.handle(<Home />);
                }}
                to="/A3/Home"
                style={{
                  textDecoration: "none",
                  marginRight: "20px",
                  fontSize: "30px",
                  cursor: "pointer",
                }}
                id="301"
              >
                D.S.V
              </div>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                  <Button
                    variant="outline-dark"
                    onClick={() => {
                      this.handle(<Tree />);
                    }}
                    style={{
                      textDecoration: "none",
                      marginRight: "20px",
                      cursor: "pointer",
                    }}
                    id="302"
                  >
                    Introduction
                  </Button>
                  <Button
                    variant="outline-dark"
                    onClick={() => {
                      this.handle(<BST />);
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
                      this.handle(<AVL />);
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
                      this.handle(<RBT />);
                    }}
                    style={{
                      textDecoration: "none",
                      marginRight: "20px",
                      cursor: "pointer",
                    }}
                    id="305"
                  >
                    Red Black Tree
                  </Button>
                  <NavDropdown
                    title="Test"
                    id="basic-nav-dropdown"
                    style={{ marginRight: "20px" }}
                  >
                    <NavDropdown.Item
                      id="A3_Test"
                      onClick={() => {
                        this.handle(<BSTTEST />);
                      }}
                    >
                      BST Test
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      onClick={() => {
                        this.handle(<AVLTEST />);
                      }}
                      id="A3_Test"
                    >
                      AVL Test
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      onClick={() => {
                        this.handle(<RBTTEST />);
                      }}
                      id="A3_Test"
                    >
                      RBT Test
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      onClick={() => {
                        this.handle(<MIXEDTEST />);
                      }}
                      id="A3_Test"
                    >
                      Mixed Test
                    </NavDropdown.Item>
                  </NavDropdown>
                  <Button
                    variant="outline-dark"
                    onClick={() => {
                      this.handle(<Grade />);
                    }}
                    style={{
                      textDecoration: "none",
                      cursor: "pointer",
                    }}
                    id="305"
                  >
                    Grade
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
                  <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAABmJLR0QA/wD/AP+gvaeTAAAEpElEQVR4nO2bbYhVRRjHf9fdjWXR0lxRaTPfwkwJV8TCSnRVVKywNEIlXfSLoJUGWRSIvXwoiEgTUlcRFdECe0XUb75QoSAqlIjWaopaJqLoqtvL3j485/DM2Ze795x7ZmZd7w8ue++cOfP8Z86cmWeemYUiRYrczWQ82OwOvAIMB34DNgR/7wp6AKeArPH5F9gGjPCoyxkfoBU/AzQZv5uAXcA4b+ocsBOp7C/I6zcc2AL8Q7RX/ARMB7r4kWmPtUgFrwPlRvpDwCqggWhDHAdqgXvcyrTH82jlnm3leiWwArhMtCEuBun3uZFpjwr0Ka/Pka8r8BpwlmhDXANWAn3tyrTLN0hl/gJK28lbBsxFxgyzIW4Dm4HB9mTaoxatyNg87+mCvDI/Em2Iv5GGGJa+THv0REf9TxLcPx7YTbQhmpCe9XBKGq3yGHAJEf5rAeVUA9sRRypsiCvA0EIF2qI3sI6o4JMplDsIqEOdqp0plJkqGWAxMoKb7u8G4IEU7awPym4ESlIstyB6Ad8TfVd3YKebfow2bpmF8mMzDriAVv4sMMmSrQrgz8DOD5ZsxGIGcAut/JfA/RbtLTZsvWTRTl4sBf5D38d5lu2VAvXorOL1/X+H6JTkYmk7x7C50IG9NqlFp6JzwCMObGaAY+iCqTx3dnvUIN09i6zkHnVk9xn06b/pyGYL+gNX0XX+4w5t70NXiV6WyiXAfnSOn+7Q9hj06X/o0G6Etw0Rnzm2/R26NPYSHxiIvvdHcTsADUMH3DUO7UbYinb9UY5tb0LdXi9BkWrU2dmaUpmDkNXiHqAqR75+SCAkC3yRku3YfB0IuIVEdAuhP/JEzdD45znyf2rkG1mg7UT0QcXWFVBOBfAucJNodCcL3EC20JpTGVzLIj3FC8tQoaMTllEDnDbKaUJ6lbmoWdrKfSuM6zUJbRfMcXTkj0sFEtY2t8QOA08E1zPAiSD9FNGdoa7ofsHBJMLToAoVvizmvQNQvz30Gl+l5erN7AXTjPQlRvoLcYWnxSxDRByX9yngD+PeQ7Qdwe2Guta7g7Qy4Pcg7QQe9wxXByIayH+/biY6bWWR0FV7IatV6NgwHnjduH9BbNUpciAQsS/P/LPRGaMRmJ/nfYMRF7f57HAGzxul4ci9MY+8M9AQeAMwMaatBUR7zhXgyZhlpEoGfSrvtZN3BDpf30C6cRIGIg0xF/EBvFKOPo23cuSrRLpq6KtPtS/NDSVoA7yRI9+mPPPdkYQD2vttXK9BnZxvXYlyyUWkcutauZYBfkadnAcd6nJGGIPb28q1iXSAAKVt6pAKXqXlIcuvyL2S6xTMR59ytZF+Lzo+rPWgKzFxfepdSCUhesrrafS8T4fbn0+bI+iiJHwNzC2xO+oEV5JVVegGDwEmBN/DGN5lZKbo1HRDT3uEi6LQ+bnkS1RSkvSA62gvGIu4uo3B7/bO/XUaeqDhqXrgI3T93tOjLqeYoat64/tzPkW5pBQNkJif1T5FuaYKOfPbPKbvfe3ukim0/IeH5V4VeeBldK8wC5ynAx1WdMUiNBZwm070Xx5xmIwcX3/Rt5AiRYoUyYf/Afajg+opGChMAAAAAElFTkSuQmCC" />
                </Link>
              </Nav>
            </Container>
          </Navbar>
          <div id="A3_Container">{this.state.Container}</div>
        </div>
      </div>
    );
  }
}

export default A1;
