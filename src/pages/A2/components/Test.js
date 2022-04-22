import React from "react";
import {
  Button,
  Modal,
  ToggleButtonGroup,
  ToggleButton,
} from "react-bootstrap";
import { useState, useEffect } from "react";
import { MDBContainer } from "mdbreact";
import axios from "axios";

var avlInorder = [
  5 + "->",
  12 + "->",
  18 + "->",
  26 + "->",
  54 + "->",
  68 + "->",
  69,
];
var avlPreorder = [
  54 + "->",
  18 + "->",
  5 + "->",
  12 + "->",
  26 + "->",
  68 + "->",
  69,
];
var rbtInorder = [
  18 + "->",
  23 + "->",
  31 + "->",
  46 + "->",
  56 + "->",
  58 + "->",
  70,
];
var rbtPostorder = [
  18 + "->",
  23 + "->",
  56 + "->",
  46 + "->",
  70 + "->",
  58 + "->",
  31,
];
let wrongtimes = 0;

function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Test</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h3>About test ?</h3>
        <p>
          1到5題屬於基本操作題，只要有看懂教學文件就會
          <br />
          6到9題屬於觀念題，必須融會貫通每棵樹的特性
          <br />
          第10題屬於申論題，幫助我們了解你的學習狀況
          <br />
          旁邊有個hide的按鈕，按下後會有你的成績記錄表
          <br />
          記錄你的成績與答題時間
          <br />
          <div style={{ color: "red" }}>若你答錯太多次，會有小提示跳出來</div>
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onHide}>
          Go test!
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
function TestMyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Help</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h3>About 1~5 ?</h3>
        <p>你他媽一定是白痴</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onHide}>
          Go test!
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

let load = 1;
function Test() {
  const [ans1, setAns1] = useState("");
  const [ans2, setAns2] = useState("");
  const [ans3, setAns3] = useState("");
  const [ans4, setAns4] = useState("");
  const [ans5, setAns5] = useState("");
  const [ans6, setAns6] = useState("");
  const [ans7, setAns7] = useState("");
  const [ans8, setAns8] = useState("");
  const [ans9, setAns9] = useState("");
  const [ans10, setAns10] = useState("");

  const [question1, setQuestion1] = useState("");
  const [question2, setQuestion2] = useState("");
  const [question3, setQuestion3] = useState("");
  const [question4, setQuestion4] = useState("");
  const [question5, setQuestion5] = useState("");
  const [question6, setQuestion6] = useState("");
  const [question7, setQuestion7] = useState("");
  const [question8, setQuestion8] = useState("");
  const [question9, setQuestion9] = useState("");
  const [question10, setQuestion10] = useState("");
  const data = {
    Ans1: ans1,
    Ans2: ans2,
    Ans3: ans3,
    Ans4: ans4,
    Ans5: ans5,
    Ans6: ans6,
    Ans7: ans7,
    Ans8: ans8,
    Ans9: ans9,
    Ans10: ans10,
  };
  if (load) {
    load = 0;
    axios
      .get(
        "https://sheet.best/api/sheets/784e7abf-b2a9-4ab4-8886-db2ca09c27a1",
        data
      )
      .then((response) => {
        console.log("get");
        setQuestion1(response.data[0]);
        setQuestion2(response.data[1]);
        setQuestion3(response.data[2]);
        setQuestion4(response.data[3]);
        setQuestion5(response.data[4]);
        setQuestion6(response.data[5]);
        setQuestion7(response.data[6]);
        setQuestion8(response.data[7]);
        setQuestion9(response.data[8]);
        setQuestion10(response.data[9]);
        console.log("finish");
      })
      .catch((error) => {
        console.log(error);
      });
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        "https://sheet.best/api/sheets/6e23f4fb-cf03-4d26-904f-59b1e1df7d93",
        data
      )
      .then((response) => {
        console.log(response);
        setAns1("");
        setAns2("");
        setAns3("");
        setAns4("");
        setAns5("");
        setAns6("");
        setAns7("");
        setAns8("");
        setAns9("");
        setAns10("");
      });
  };

  const [modalShow, setModalShow] = React.useState(false);
  const [testmodalShow, settestModalShow] = React.useState(false);
  const [record, setRecord] = useState([]);
  const scrollContainerStyle = { width: "100%", maxHeight: "500px" };
  const [open, setOpen] = useState("hide");

  let tmp = [...record];
  return (
    <div className="A2">
      <div className="test">
        <div className="hintContainer">
          <div className="loader"></div>
          <img
            className="hint"
            src="/Img/hint.gif"
            onClick={() => setModalShow(true)}
          />
        </div>
        <div className="helpContainer">
          <div className="loader"></div>
          <img
            className="help"
            src="/Img/help.png"
            onClick={() => settestModalShow(true)}
          />
        </div>
        <h1>Test</h1>
        <div className="AnsInput">
          <form
            autoComplete="off"
            className="farm-group"
            onSubmit={handleSubmit}
          >
            <p>1.{question1.Question}</p>
            <input
              type="string"
              style={{ width: "300px", marginBottom: "10px" }}
              onChange={(elem) => {
                let tmp = elem.target.value;
                setAns1(tmp);
                tmp = tmp.split(",");
                let ans = question1.Ans.split(",");
                console.log(ans);
                let flag = 0;
                for (let i = 0; i < ans.length; i++) {
                  if (parseInt(tmp[i]) !== parseInt(ans[i])) {
                    console.log("wrong");
                    setAns1(10);
                    flag = 0;
                  } else {
                    flag++;
                  }
                }
                if (flag) {
                  setAns1(11);
                  console.log("correct");
                } else {
                  setAns1(10);
                  console.log("wrong");
                }
              }}
            />
            <img
              style={{
                height: "300px",
                width: "fit-content",
                display: "flex",
                left: "28%",
                position: "relative",
              }}
              src="/Img/testbst.png"
            />
            <p style={{ display: "flex", justifyContent: "center" }}>圖一</p>
            <p>2.{question2.Question}</p>
            <input
              type="string"
              style={{ width: "300px", marginBottom: "10px" }}
              onChange={(elem) => {
                let tmp = elem.target.value;
                tmp = tmp.split(",");
                setAns2(tmp);
                tmp = tmp.split(",");
                let ans = question2.Ans.split(",");
                console.log(ans);
                let flag = 0;
                for (let i = 0; i < ans.length; i++) {
                  if (parseInt(tmp[i]) !== parseInt(ans[i])) {
                    console.log("wrong");
                    setAns2(20);
                    flag = 0;
                  } else {
                    flag++;
                  }
                }
                if (flag) {
                  setAns2(21);
                  console.log("correct");
                } else {
                  setAns2(20);
                  console.log("wrong");
                }
              }}
            />
            <img
              style={{
                height: "300px",
                width: "fit-content",
                display: "flex",
                left: "26%",
                position: "relative",
              }}
              src="/Img/testavl.png"
            />
            <p style={{ display: "flex", justifyContent: "center" }}>圖二</p>
            <p>3.{question3.Question}</p>
            <input
              type="string"
              style={{ width: "300px", marginBottom: "10px" }}
              onChange={(elem) => {
                let tmp = elem.target.value;
                tmp = tmp.split(",");
                setAns3(tmp);
                tmp = tmp.split(",");
                let ans = question3.Ans.split(",");
                console.log(ans);
                let flag = 0;
                for (let i = 0; i < ans.length; i++) {
                  if (parseInt(tmp[i]) !== parseInt(ans[i])) {
                    console.log("wrong");
                    setAns3(30);
                    flag = 0;
                  } else {
                    flag++;
                  }
                }
                if (flag) {
                  setAns3(31);
                  console.log("correct");
                } else {
                  setAns3(30);
                  console.log("wrong");
                }
              }}
            />
            <img
              style={{
                height: "300px",
                width: "fit-content",
                display: "flex",
                left: "26%",
                position: "relative",
              }}
              src="/Img/testrbt.png"
            />
            <p style={{ display: "flex", justifyContent: "center" }}>圖三</p>
            <p>4.{question4.Question}</p>
            <input
              type="string"
              onChange={(elem) => {
                let tmp = elem.target.value;
                tmp = tmp.split(",");
                setAns4(tmp);
                tmp = tmp.split(",");
                let ans = question4.Ans.split(",");
                console.log(ans);
                let flag = 0;
                for (let i = 0; i < ans.length; i++) {
                  if (parseInt(tmp[i]) !== parseInt(ans[i])) {
                    console.log("wrong");
                    setAns4(40);
                    flag = 0;
                  } else {
                    flag++;
                  }
                }
                if (flag) {
                  setAns4(41);
                  console.log("correct");
                } else {
                  setAns4(40);
                  console.log("wrong");
                }
              }}
            />
            <p>5.{question5.Question}</p>
            <input
              type="string"
              onChange={(elem) => {
                let tmp = elem.target.value;
                tmp = tmp.split(",");
                setAns5(tmp);
                tmp = tmp.split(",");
                let ans = question5.Ans.split(",");
                console.log(ans);
                let flag = 0;
                for (let i = 0; i < ans.length; i++) {
                  if (parseInt(tmp[i]) !== parseInt(ans[i])) {
                    console.log("wrong");
                    setAns5(50);
                    flag = 0;
                  } else {
                    flag++;
                  }
                }
                if (flag) {
                  setAns5(51);
                  console.log("correct");
                } else {
                  setAns5(50);
                  console.log("wrong");
                }
              }}
            />
            <p>6.{question6.Question}</p>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                marginBottom: "10px",
              }}
            >
              <ToggleButtonGroup type="radio" name="options1">
                <ToggleButton
                  id="tbg-radio-1"
                  variant="secondary"
                  style={{ marginRight: "10px" }}
                  value={61}
                  onChange={(elem) => {
                    let tmp = elem.target.value;
                    tmp = tmp.split(",");
                    setAns6(tmp);
                    tmp = tmp.split(",");
                    let ans = question6.Ans.split(",");
                    console.log(ans);
                    let flag = 0;
                    for (let i = 0; i < ans.length; i++) {
                      if (parseInt(tmp[i]) !== parseInt(ans[i])) {
                        console.log("wrong");
                        setAns6(60);
                        flag = 0;
                      } else {
                        flag++;
                      }
                    }
                    if (flag) {
                      setAns6(61);
                      console.log("correct");
                    } else {
                      setAns6(60);
                      console.log("wrong");
                    }
                  }}
                >
                  True
                </ToggleButton>
                <ToggleButton
                  id="tbg-radio-2"
                  variant="secondary"
                  value={60}
                  onChange={(elem) => {
                    let tmp = elem.target.value;
                    tmp = tmp.split(",");
                    setAns6(tmp);
                    tmp = tmp.split(",");
                    let ans = question6.Ans.split(",");
                    console.log(ans);
                    let flag = 0;
                    for (let i = 0; i < ans.length; i++) {
                      if (parseInt(tmp[i]) !== parseInt(ans[i])) {
                        console.log("wrong");
                        setAns6(60);
                        flag = 0;
                      } else {
                        flag++;
                      }
                    }
                    if (flag) {
                      setAns6(61);
                      console.log("correct");
                    } else {
                      setAns6(60);
                      console.log("wrong");
                    }
                  }}
                >
                  False
                </ToggleButton>
              </ToggleButtonGroup>
            </div>
            <p>7.{question7.Question}</p>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                marginBottom: "10px",
              }}
            >
              <ToggleButtonGroup type="radio" name="options2">
                <ToggleButton
                  id="tbg-radio-3"
                  variant="secondary"
                  style={{ marginRight: "10px" }}
                  value={70}
                  onClick={() => {
                    setAns7(70);
                  }}
                >
                  True
                </ToggleButton>
                <ToggleButton
                  id="tbg-radio-4"
                  variant="secondary"
                  value={71}
                  onClick={() => {
                    setAns7(71);
                  }}
                >
                  False
                </ToggleButton>
              </ToggleButtonGroup>
            </div>
            <p>8.{question8.Question}</p>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                marginBottom: "10px",
              }}
            >
              <ToggleButtonGroup type="radio" name="options3">
                <ToggleButton
                  id="tbg-radio-5"
                  variant="secondary"
                  style={{ marginRight: "10px" }}
                  value={801}
                  onClick={() => {
                    setAns8(80);
                  }}
                >
                  BST
                </ToggleButton>
                <ToggleButton
                  id="tbg-radio-6"
                  variant="secondary"
                  style={{ marginRight: "10px" }}
                  value={81}
                  onClick={() => {
                    setAns8(81);
                  }}
                >
                  AVL
                </ToggleButton>
                <ToggleButton
                  id="tbg-radio-7"
                  variant="secondary"
                  value={802}
                  onClick={() => {
                    setAns8(80);
                  }}
                >
                  RBT
                </ToggleButton>
              </ToggleButtonGroup>
            </div>
            <p>9.{question9.Question}</p>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                marginBottom: "10px",
              }}
            >
              <ToggleButtonGroup type="radio" name="options4">
                <ToggleButton
                  id="tbg-radio-8"
                  variant="secondary"
                  style={{ marginRight: "10px" }}
                  value={901}
                  onClick={() => {
                    setAns9(90);
                  }}
                >
                  BST
                </ToggleButton>
                <ToggleButton
                  id="tbg-radio-9"
                  variant="secondary"
                  style={{ marginRight: "10px" }}
                  value={902}
                  onClick={() => {
                    setAns9(90);
                  }}
                >
                  AVL
                </ToggleButton>
                <ToggleButton
                  id="tbg-radio-10"
                  variant="secondary"
                  value={91}
                  onClick={() => {
                    setAns9(91);
                  }}
                >
                  RBT
                </ToggleButton>
              </ToggleButtonGroup>
            </div>
            <p>10.{question10.Question}</p>
            <img
              style={{
                height: "300px",
                width: "fit-content",
                display: "flex",
                position: "relative",
              }}
              src="/Img/testtable.png"
            />
            <textarea
              style={{ marginTop: "10px", height: "150px", width: "100%" }}
              onChange={(e) => {
                console.log(e.target.value);
                setAns10(e.target.value);
              }}
            >
              Hello there, this is some text in a text area
            </textarea>
            <Button
              type="submit"
              variant="secondary"
              style={{ marginTop: "10px" }}
              onClick={() => {
                let ans = [];
                ans.push(ans1);
                ans.push(ans2);
                ans.push(ans3);
                ans.push(ans4);
                ans.push(ans5);
                ans.push(ans6);
                ans.push(ans7);
                ans.push(ans8);
                ans.push(ans9);
                console.log("ans");
                console.log(ans);
                let grade = 0;
                let tmp = [];
                for (let i = 0; i < 9; i++) {
                  if (parseInt(ans[i]) % 2 === 0 || ans[i] === "") {
                    tmp.push("第" + (i + 1) + "題答錯 \n");
                  } else {
                    grade += 10;
                  }
                }
                console.log(wrongtimes);
                if (grade !== 90) {
                  wrongtimes++;
                }
                if (wrongtimes > 4) {
                  let helps = document.querySelectorAll(".helpContainer");
                  helps[0].style.visibility = "visible";
                }
                setRecord((prevArray) => [
                  ...record,
                  <div>
                    <p className="recordP">
                      {"Grade :" + grade + "\n" + tmp}
                      <span style={{ fontSize: "10px", color: "wheat" }}>
                        {new Date().toLocaleTimeString() +
                          "\n" +
                          new Date().getFullYear() +
                          "年" +
                          (new Date().getMonth() + 1) +
                          "月" +
                          new Date().getDate() +
                          "日"}
                      </span>
                    </p>
                  </div>,
                ]);
                ans.push(ans10);
                console.log(ans);
              }}
            >
              Submit
            </Button>
          </form>
        </div>
        <div className={`record ${open === "show" && "open"} `}>
          <div className="recordContainer">
            <Button
              variant="secondary"
              onClick={() => {
                if (open === "hide") {
                  setOpen("show");
                } else {
                  setOpen("hide");
                }
              }}
            >
              {open}
            </Button>
            <MDBContainer>
              <div
                className="scrollbar body mx-auto"
                style={(scrollContainerStyle, { whiteSpace: "pre-wrap" })}
              >
                <div className="title">Your grades</div>
                {tmp.reverse()}
              </div>
            </MDBContainer>
          </div>
        </div>

        <MyVerticallyCenteredModal
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
        <TestMyVerticallyCenteredModal
          show={testmodalShow}
          onHide={() => settestModalShow(false)}
        />
      </div>
    </div>
  );
}

export default Test;
