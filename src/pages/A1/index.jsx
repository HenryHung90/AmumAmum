import React from "react";
import { Nav, Navbar, NavDropdown, Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Home from "./components/Home";
import Tree from "./components/Treedocument";
import BST from "./components/BSTdocument";
import AVL from "./components/AVLdocument";
import RBT from "./components/RBTdocument";
import Grade from "../Grade/components/Grade";
import Treedocument from "./components/Treedocument";
import BSTdocument from "./components/BSTdocument";
import AVLdocument from "./components/AVLdocument";
import RBTdocument from "./components/RBTdocument";
import Suggestion from "search-suggestion";
import { MDBContainer } from "mdbreact";

//Google表癲link
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
//Search
const scrollContainerStyle = { width: "100%", maxHeight: "100px" };
let Searchitems = [
  "根節點",
  "root",
  "子樹",
  "child tree",
  "子结點",
  "child node",
  "葉结點",
  "外部结點",
  "leaf",
  "樹高",
  "tree height",
  "完滿二元樹",
  "full binary tree",
  "完整二元樹",
  "complete binary tree",
  "完美二元樹",
  "perfect binary tree",
  "中序",
  "inorder",
  "前序",
  "preorder",
  "後序",
  "postorder",
  "二元搜尋樹",
  "binary search tree",
  "bst",
  "bst定義",
  "bst搜尋",
  "bst插入",
  "bst刪除",
  "bst建立",
  "avl",
  "avl定義",
  "avl搜尋",
  "avl插入",
  "avl刪除",
  "avl建立",
  "紅黑樹",
  "rbt",
  "Red Black Tree",
  "red black tree",
  "redblacktree定義",
  "redblacktree搜尋",
  "redblacktree插入",
  "redblacktree刪除",
  "redblacktree建立",
];
class A1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Container: <Home />,
      StudentId: "",
      currentData: [],
    };
    this.handle = this.handle.bind(this);
  }

  handle(Num) {
    this.setState({ Container: Num });
  }

  //Searching
  createData = (word, data) => {
    const re = new RegExp(`${word.toLowerCase()}.*\\B`, "g");
    return data.filter((item) => re.test(item.toLowerCase()));
  };
  //只要有改input就馬上做此function，並在下方用Suggestion輸出結果，用MDBContainer包起來為了可以滾
  handleChange = (e) => {
    const value = e.target.value;
    let filterData = [];
    if (value) {
      filterData = this.createData(value, Searchitems);
    }
    if (filterData.length === 0) {
      let notFound = ["Not Found!!"];
      this.setState({
        currentData: notFound,
      });
    } else {
      this.setState({
        currentData: filterData,
      });
    }
  };
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
                  <Suggestion
                    getDisplayName={(item) => item}
                    items={this.state.currentData}
                  >
                    {({
                      getInputProps,
                      getListItemProps,
                      getItemProps,
                      items,
                      isOpen,
                    }) => (
                      <div>
                        <input
                          style={{ width: "200px" }}
                          {...getInputProps({
                            placeholder: "Tap to search!",
                            onChange: this.handleChange,
                          })}
                        />
                        {isOpen && (
                          <MDBContainer>
                            <div
                              className="scrollbar body mx-auto searchBar"
                              style={
                                (scrollContainerStyle,
                                { whiteSpace: "pre-wrap" })
                              }
                              {...getListItemProps()}
                            >
                              {items.map((item, index) => (
                                <div
                                  className="searchItem "
                                  {...getItemProps({ item, index })}
                                  onClick={() => {
                                    if (
                                      item === "根節點" ||
                                      item === "root" ||
                                      item === "子樹" ||
                                      item === "child tree" ||
                                      item === "子结點" ||
                                      item === "child node" ||
                                      item === "葉结點" ||
                                      item === "外部结點" ||
                                      item === "leaf" ||
                                      item === "樹高" ||
                                      item === "tree height" ||
                                      item === "完滿二元樹" ||
                                      item === "full binary tree" ||
                                      item === "完整二元樹" ||
                                      item === "complete binary tree" ||
                                      item === "完美二元樹" ||
                                      item === "perfect binary tree" ||
                                      item === "中序" ||
                                      item === "inorder" ||
                                      item === "前序" ||
                                      item === "preorder" ||
                                      item === "後序" ||
                                      item === "postorder"
                                    ) {
                                      this.handle(<Treedocument />);
                                    }
                                    if (
                                      item === "二元搜尋樹" ||
                                      item === "binary search tree" ||
                                      item === "bst" ||
                                      item === "bst定義" ||
                                      item === "bst搜尋" ||
                                      item === "bst插入" ||
                                      item === "bst刪除" ||
                                      item === "bst建立"
                                    ) {
                                      this.handle(<BSTdocument />);
                                    }
                                    if (
                                      item === "avl" ||
                                      item === "avl定義" ||
                                      item === "avl搜尋" ||
                                      item === "avl插入" ||
                                      item === "avl刪除" ||
                                      item === "avl建立"
                                    ) {
                                      this.handle(<AVLdocument />);
                                    }
                                    if (
                                      item === "紅黑樹" ||
                                      item === "rbt" ||
                                      item === "Red Black Tree" ||
                                      item === "red black tree" ||
                                      item === "redblacktree定義" ||
                                      item === "redblacktree搜尋" ||
                                      item === "redblacktree插入" ||
                                      item === "redblacktree刪除" ||
                                      item === "redblacktree建立"
                                    ) {
                                      this.handle(<RBTdocument />);
                                    }
                                  }}
                                  key={item}
                                >
                                  {item}
                                </div>
                              ))}
                            </div>
                          </MDBContainer>
                        )}
                      </div>
                    )}
                  </Suggestion>
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
