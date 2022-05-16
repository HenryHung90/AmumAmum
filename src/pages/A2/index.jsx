import React from "react";
import { Nav, Navbar, NavDropdown, Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Home from "./components/Home";
import Tree from "./components/Treedocument";
import BST from "./components/BST";
import BSTInteractive from "./components/BSTInteractive";
import AVL from "./components/AVL";
import AVLInteractive from "./components/AVLInteractive";
import RBT from "./components/RBT";
import axios from "axios";

class A2 extends React.Component {
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
  componentDidMount() {
    const GetSid = sessionStorage.getItem("Sid");

    if (GetSid !== null || GetSid !== "null") {
      axios({
        method: "POST",
        data: {
          _id: GetSid,
        },
        withCredentials: true,
        url: process.env.REACT_APP_AXIOS_USERINFO,
      }).then((response) => {
        this.setState({ StudentId: response.data.StudentId });
      });
    }

    //監聽事件
    document.addEventListener("click", this.MarkUserClickWithContainer, false);
  }
  //A2_Container
  MarkUserClickWithContainer = (e) => {
    let ContainerKey = e.target.id;
    let ContainerDraggable = e.path[1].id;
    //提取使用者輸入內容
    let UserInput = JSON.parse(sessionStorage.getItem("UserInput"));
    //儲存時間
    const UserClickTime = new Date();

    //描述暫存
    let DescriptionTemp = "";
    //對話暫存紀錄
    let OptNode = {
      Mark: {
        Saying: {
          Text: [],
          Time: [],
        },
        Clicking: {
          Text: [],
          Time: [],
        },
        Operating: {
          Text: [],
          Time: [],
        },
        Description: [],
      },
    };
    if (UserInput === null) {
      sessionStorage.setItem("UserInput", JSON.stringify(OptNode));
      UserInput = OptNode;
    }
    //點擊物件
    const ContainerTarget = new Map([
      //Home
      ["A2_Home", "A2_到主畫面"],
      ["A2_Intro", "A2_到教學文件頁面"],
      ["A2_BST_Demonstrate", "A2_到BST論證頁面"],
      ["A2_BST_Interactive", "A2_到BST互動頁面"],
      ["A2_AVL_Demonstrate", "A2_到AVL論證頁面"],
      ["A2_AVL_Interactive", "A2_到AVL互動頁面"],
      ["A2_RBT", "A2_到RBT頁面"],
      ["A2_Test", "A2_到測驗頁面"],
      ["A2_Profile", "A2_回到個人檔案頁面"],
      //PDF
      ["canvas", "A2_教學文件"],
      ["span", "A2_教學文件文字"],
      ["A2_PDF_BST_PreviousPage", "A2_BST教學文件上一頁"],
      ["A2_PDF_BST_NextPage", "A2_BST教學文件下一頁"],
      ["A2_PDF_AVL_PreviousPage", "A2_AVL教學文件上一頁"],
      ["A2_PDF_AVL_NextPage", "A2_AVL教學文件下一頁"],
      ["A2_PDF_RBT_PreviousPage", "A2_RBT教學文件上一頁"],
      ["A2_PDF_RBT_NextPage", "A2_RBT教學文件下一頁"],
      //BST
      //--General
      ["A2_BST_Hint", "A2_BST教學"],
      ["A2_BST_Gamerule", "A2_BST_互動遊戲教學"],
      //--Demonstrate
      ["A2_BST_Demonstrate_Recordtable_hide", "A2_關閉BST論證頁面記錄表"],
      ["A2_BST_Demonstrate_Recordtable_show", "A2_打開BST論證頁面記錄表"],
      ["A2_BST_Demonstrate_Inorder_Hint", "A2_BST論證頁面 Inorder教學"],
      ["A2_BST_Demonstrate_Preorder_Hint", "A2_BS論證頁面 Preorder教學"],
      ["A2_BST_Demonstrate_Postorder_Hint", "A2_BST論證頁面 Postorder教學"],
      //--Interactive
      ["A2_BST_Interactive_InorderChange","A2_BST互動頁面 Inorder更新"],
      ["A2_BST_Interactive_PreorderChange","A2_BST互動頁面 Preorder更新"],
      ["A2_BST_Interactive_PostorderChange","A2_BST互動頁面 Postorder更新"],
      ["A2_BST_Interactive_submit", "A2_BST互動頁面 送出答案"],
      ["A2_BST_Interactive_Recordtable_hide", "A2_關閉BST互動頁面記錄表"],
      ["A2_BST_Interactive_Recordtable_show", "A2_打開BST互動頁面記錄表"],

      //AVL
      //--General
      ["A2_AVL_Hint", "A2_AVL教學"],
      ["A2_AVL_Gamerule", "A2_AVL_互動遊戲教學"],
      //--Demonstrate
      ["A2_AVL_Demonstrate_Recordtable_hide", "A2_關閉AVL論證頁面記錄表"],
      ["A2_AVL_Demonstrate_Recordtable_show", "A2_打開AVL論證頁面記錄表"],
      ["A2_AVL_Demonstrate_Inorder_Hint", "A2_AVL Inorder教學"],
      ["A2_AVL_Demonstrate_Preorder_Hint", "A2_AVL Preorder教學"],
      ["A2_AVL_Demonstrate_Postorder_Hint", "A2_AVL Postorder教學"],
      //--Interactive
      ["A2_AVL_Interactive_submit", "A2_AVL互動頁面 送出答案"],
      ["A2_AVL_Interactive_Recordtable_hide", "A2_關閉AVL互動頁面記錄表"],
      ["A2_AVL_Interactive_Recordtable_show", "A2_打開AVL互動頁面記錄表"],

      //RBT
      ["A2_RBT_Hint", "A2_RBT教學"],
      ["A2_RBT_Demonstrate_Recordtable_hide", "A2_關閉RBT論證頁面記錄表"],
      ["A2_RBT_Demonstrate_Recordtable_show", "A2_打開RBT論證頁面記錄表"],
      ["A2_RBT_Demonstrate_Inorder_Hint", "A2_RBT Inorder教學"],
      ["A2_RBT_Demonstrate_Preorder_Hint", "A2_RBT Preorder教學"],
      ["A2_RBT_Demonstrate_Postorder_Hint", "A2_RBT Postorder教學"]
    ]);

    //儲存抓到的名稱
    const UserClick = ContainerTarget.get(ContainerKey);
    //拖動偵測
    let GameDrag = ContainerDraggable.split("_");

    //拖動
    if(GameDrag[1] === "Interactive"){
      let DragInput = GameDrag.join(" ");
      UserInput.Mark.Operating.Text.push(DragInput);
      UserInput.Mark.Operating.Time.push(UserClickTime);
      //描述儲存
      DescriptionTemp = "在 " + UserClickTime + " 操作 " + DragInput;
      UserInput.Mark.Description.push(DescriptionTemp);
      sessionStorage.setItem("UserInput", JSON.stringify(UserInput));
    }else{
      if (ContainerKey !== "") {
      if (UserClick !== undefined) {
        //點擊動作、時間儲存
        UserInput.Mark.Clicking.Text.push(UserClick);
        UserInput.Mark.Clicking.Time.push(UserClickTime);
        //描述儲存
        DescriptionTemp = "在 " + UserClickTime + " 點擊 " + UserClick;
        UserInput.Mark.Description.push(DescriptionTemp);
      } else {
        //遊戲選項
        let GameOption = ContainerKey.split("_");
        if (
          GameOption[1] === "Interactive" ||
          GameOption[1] === "Demonstrate"
        ) {
          //遊戲
          let OptionInput = GameOption.join(" ");
          UserInput.Mark.Operating.Text.push(OptionInput);
          UserInput.Mark.Operating.Time.push(UserClickTime);
          //描述儲存
          DescriptionTemp = "在 " + UserClickTime + " 操作 " + OptionInput;
          UserInput.Mark.Description.push(DescriptionTemp);
        }
      }
      //儲存完畢 上傳session
      //console.log(UserInput);
      sessionStorage.setItem("UserInput", JSON.stringify(UserInput));
    }
    }
  };

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
                id="A2_Home"
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
                    id="A2_Intro"
                  >
                    Introduction
                  </Button>
                  <NavDropdown
                    title="Binary Search Tree"
                    id="basic-nav-dropdown"
                  >
                    <Button
                      onClick={() => {
                        this.handle(<BST />);
                      }}
                      variant="light"
                      style={{
                        textDecoration: "none",
                        marginRight: "20px",
                        width: "100%",
                      }}
                      id="A2_BST_Demonstrate"
                    >
                      demonstrate
                    </Button>
                    <Button
                      onClick={() => {
                        this.handle(<BSTInteractive />);
                      }}
                      variant="light"
                      style={{
                        textDecoration: "none",
                        marginRight: "20px",
                        width: "100%",
                      }}
                      id="A2_BST_Interactive"
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
                        this.handle(<AVL />);
                      }}
                      variant="light"
                      style={{
                        textDecoration: "none",
                        marginRight: "20px",
                        width: "100%",
                      }}
                      id="A2_AVL_Demonstrate"
                    >
                      demonstrate
                    </Button>
                    <Button
                      onClick={() => {
                        this.handle(<AVLInteractive />);
                      }}
                      variant="light"
                      style={{
                        textDecoration: "none",
                        marginRight: "20px",
                        width: "100%",
                      }}
                      id="A2_AVL_Interactive"
                    >
                      Interactive
                    </Button>
                  </NavDropdown>
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
                    id="A2_RBT"
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
                    id="A2_Test"
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
                  <img
                    src="https://img.icons8.com/ios/50/000000/user--v2.png"
                    id="A2_Profile"
                    alt="Profile"
                  />
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

export default A2;
