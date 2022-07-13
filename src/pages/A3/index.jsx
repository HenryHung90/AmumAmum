import React from "react";
import { Nav, Navbar, Container, Button, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import Home from "./components/Home";
import Tree from "../A1/components/Treedocument";
import BST from "./components/BSTGame";
import AVL from "./components/AVLGame";
import RBT from "./components/RBTGame";
import Robots from "./components/Robots";
import Grade from "../Grade/components/Grade";
import axios from "axios";
import Note from "./components/Note";

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
class A3 extends React.Component {
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
        this.setState({ StudentId: response.StudentId });
      });
    }

    const dfMessanger_bot = document.querySelector("df-messenger");
    //一般文字選擇
    dfMessanger_bot.addEventListener(
      "df-user-input-entered",
      this.MarkUserTalkWithRobot,
      false
    );
    //列表選擇
    dfMessanger_bot.addEventListener(
      "df-list-element-clicked",
      this.MarkUserTalkWithRobot,
      false
    );
    //chip選擇
    dfMessanger_bot.addEventListener(
      "df-chip-clicked",
      this.MarkUserTalkWithRobot,
      false
    );
    // //監聽點擊事件(A3 Header)
    // const Header = document.querySelector("nav");
    // Header.addEventListener("click", this.MarkUserClickWithHeader, false);
    // //監聽點擊事件(A3 Container)
    // const Container = document.getElementById("A3_Container");
    // Container.addEventListener("click", this.MarkUserClickWithContainer, false);
    document.addEventListener("click", this.MarkUserClickWithContainer, false);
    //上傳監聽事件
    //window.addEventListener("beforeunload", this.Uploading, false);
  }
  //記錄使用者行為///////////////////////////////////////////
  // Uploading = (e) => {
  //   let PushToDB = JSON.parse(sessionStorage.getItem("UserInput"));
  //   axios
  //     .post(process.env.REACT_APP_AXIOS_USERINPUT, {
  //       StudentId: this.StudentId,
  //       Mark: PushToDB.Mark,
  //     })
  //     .then((response) => {
  //       console.log(response);
  //       sessionStorage.removeItem("UserInput");
  //     });
  // };
  MarkUserTalkWithRobot = (e) => {
    //使用者說話
    //console.log(e.detail.input);
    //list選擇
    //console.log(e.detail.element.title_);
    //chip選擇
    //console.log(e.detail.query);
    //使用者輸入型別
    let UserInputType;

    switch (e.type) {
      case "df-user-input-entered":
        UserInputType = e.detail.input;
        break;
      case "df-list-element-clicked":
        UserInputType = e.detail.element.title_;
        break;
      case "df-chip-clicked":
        UserInputType = e.detail.query;
        break;
      default:
        break;
    }

    //若選擇課程進行跳頁
    switch (UserInputType) {
      case "第一章:BST 二元搜尋樹":
        this.handle(<BST />);
        break;
      case "第二章:AVL 二元平衡樹":
        this.handle(<AVL />);
        break;
      case "第三章:RBT 紅黑樹":
        this.handle(<RBT />);
        break;
      case "從網頁修改筆記":
        this.handle(<Note />);
        break;
      default:
        break;
    }

    //提取使用者輸入內容
    const UserInput = sessionStorage.getItem("UserInput");
    //儲存時間
    const UserInputTime = new Date();

    //輸出暫存位置
    let UserOptString = null;
    //描述暫存
    let DescriptionTemp = "";
    //對話暫存紀錄
    let OptNode = {
      StudentId: this.StudentId,
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
    if (UserInput == null) {
      //尚未開始使用直接塞入
      sessionStorage.setItem("UserInput", null);
      //資料塞入預設Node
      OptNode.Mark.Saying.Text.push(UserInputType);
      OptNode.Mark.Saying.Time.push(UserInputTime);
      //建立紀錄形容
      DescriptionTemp = "在 " + UserInputTime + " 向機器人說 " + UserInputType;
      OptNode.Mark.Description.push(DescriptionTemp);
      //建立第一次樣式
      UserOptString = OptNode;
    } else {
      //JSON轉陣列
      let StorageUserInput = JSON.parse(UserInput);
      //console.log("儲存資料", StorageUserInput);
      StorageUserInput.Mark.Saying.Text.push(UserInputType);
      StorageUserInput.Mark.Saying.Time.push(UserInputTime);
      DescriptionTemp = "在 " + UserInputTime + " 向機器人說 " + UserInputType;
      StorageUserInput.Mark.Description.push(DescriptionTemp);
      UserOptString = StorageUserInput;
    }
    //轉字串後塞入sessionStorage
    UserOptString = JSON.stringify(UserOptString);
    //console.log("目前資料(字串)",UserOptString)
    sessionStorage.setItem("UserInput", UserOptString);
  };
  ////////////////////////////////////////////////////////////////////////
  //A3 Container////////////////////////////////////////////////
  MarkUserClickWithContainer = (e) => {
    //console.log(e.target.id);
    let ContainerKey = e.target.id;
    //let ContainerClassName = e.target.className;

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
      ["A3_Home", "A3_到主頁面"],
      ["A3_Intro", "A3_到教學文件頁面"],
      ["A3_BST", "A3_到BST頁面"],
      ["A3_AVL", "A3_到AVL頁面"],
      ["A3_RBT", "A3_到RBT頁面"],
      ["A3_Test", "A3_到測驗頁面"],
      ["A3_Profile", "A3_回到個人檔案頁面"],
      //PDF
      ["A3_PDF_BST_PreviousPage", "A3_BST教學文件上一頁"],
      ["A3_PDF_BST_NextPage", "A3_BST教學文件下一頁"],
      ["A3_PDF_AVL_PreviousPage", "A3_AVL教學文件上一頁"],
      ["A3_PDF_AVL_NextPage", "A3_AVL教學文件下一頁"],
      ["A3_PDF_RBT_PreviousPage", "A3_RBT教學文件上一頁"],
      ["A3_PDF_RBT_NextPage", "A3_RBT教學文件下一頁"],
      //BST
      ["A3_BST_GameDifficulty_4", "A3_BST遊戲難度設定簡單"],
      ["A3_BST_GameDifficulty_6", "A3_BST遊戲難度設定普通"],
      ["A3_BST_GameDifficulty_8", "A3_BST遊戲難度設定困難"],
      ["A3_BST_Game_Restart", "A3_BST遊戲重新開始"],
      ["A3_BST_Gamerule", "A3_BST遊戲規則"],
      ["A3_BST_Hint", "A3_BST教學"],
      ["A3_BST_Game_Start", "A3_BST遊戲開始"],
      //AVL
      ["A3_AVL_GameDifficulty_4", "A3_AVL遊戲難度設定簡單"],
      ["A3_AVL_GameDifficulty_6", "A3_AVL遊戲難度設定普通"],
      ["A3_AVL_GameDifficulty_8", "A3_AVL遊戲難度設定困難"],
      ["A3_AVL_Game_Restart", "A3_AVL遊戲重新開始"],
      ["A3_AVL_Gamerule", "A3_AVL遊戲規則"],
      ["A3_AVL_Hint", "A3_AVL教學"],
      ["A3_AVL_Game_Start", "A3_AVL遊戲開始"],
      //RBT
      ["A3_RBT_GameDifficulty_4", "A3_RBT遊戲難度設定簡單"],
      ["A3_RBT_GameDifficulty_6", "A3_RBT遊戲難度設定普通"],
      ["A3_RBT_GameDifficulty_8", "A3_RBT遊戲難度設定困難"],
      ["A3_RBT_Game_Restart", "A3_RBT遊戲重新開始"],
      ["A3_RBT_Gamerule", "A3_RBT遊戲規則"],
      ["A3_RBT_Hint", "A3_RBT教學"],
      ["A3_RBT_Game_Start", "A3_RBT遊戲開始"],
    ]);

    //儲存抓到的名稱
    let UserClick = ContainerTarget.get(ContainerKey);

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
        if (GameOption[1] === "Game") {
          let OptionInput = GameOption[0] + "遊戲選項 " + GameOption[3];
          UserInput.Mark.Operating.Text.push(OptionInput);
          UserInput.Mark.Operating.Time.push(UserClickTime);
          //描述儲存
          DescriptionTemp = "在 " + UserClickTime + " 操作 " + OptionInput;
          UserInput.Mark.Description.push(DescriptionTemp);
        }
      }
      //儲存完畢 上傳session
      console.log(UserInput);
      sessionStorage.setItem("UserInput", JSON.stringify(UserInput));
    }
  };
  ////////////////////////////////////////////////////////////////////////
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
                id="A3_Home"
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
                    id="A3_Intro"
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
                      cursor: "pointer",
                    }}
                    id="A3_BST"
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
                      cursor: "pointer",
                    }}
                    id="A3_AVL"
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
                    id="A3_RBT"
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
                    id="A3_Grade"
                  >
                    Grade
                  </Button>
                  <Button
                    variant="outline-dark"
                    onClick={() => {
                      this.handle(<Note />);
                    }}
                    style={{
                      textDecoration: "none",
                      cursor: "pointer",
                    }}
                    id="A3_Note"
                  >
                    Note
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
        <Robots />
      </div>
    );
  }
}

export default A3;
