import React from "react";
import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { RedBlackTree, useRedBlackTree } from "react-tree-vis";
import { MDBContainer } from "mdbreact";
import RBTdocument from "../../A1/components/RBTdocument";

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

//隨機產生一個陣列，當樹的初始值
var arr = [];
for (let i = 0; i < getRandom(5, 10); i++) {
  let tmp = getRandom(5, 70);
  for (let j = 0; j < arr.length; j++) {
    if (arr[j] === tmp) {
      arr.splice(j, 1);
    }
  }
  arr.push(tmp);
}
//AVL的文件用modal表示
function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Red Black Tree
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <RBTdocument modal={true} />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-dark" onClick={props.onHide}>
          Try it!
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
//Order的文件用modal表示
function InorderIntroduction(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Inorder</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="row">
          <div>
            <h3>What is Inorder ?</h3>
            <p>
              簡單來說，中序地走訪規則為LDR，
              <br />
              且一般來說會使用
              <span style={{ color: "rgb(58 181 57)" }}>遞迴</span>的方式來執行
              <br />
              L代表走訪左子樹
              <br />
              D代表印出該Node的數值
              <br />
              R代表走訪右子數
              <br />
              以下圖為例
              <br />
            </p>
            <img className="pdfImg" src="/Img/traversal.png" />
          </div>
          <div className="columnCss">
            <span style={{ color: "#4874b1" }}>走訪順序為：</span>
            L(Node 4 有左子樹)
            <br />
            L(Node 5 有左子樹)
            <br />
            L(Node 2 沒左子樹)
            <br />
            D(Node 2 印出2)
            <br />
            R(Node 2 沒右子樹)
            <br />
            D(Node 5 印出5)
            <br />
            R(Node 5 有右子樹)
            <br />
            L(Node 1 沒左子樹)
            <br />
            D(Node 1 印出1)
            <br />
            R(Node 1 沒右子樹)
            <br />
            D(Node 4 印出4)
            <br />
            R(Node 4 有右子樹)
            <br />
            L(Node 3 沒左子樹)
            <br />
            D(Node 3 印出3)
            <br />
            R(Node 3 有右子樹)
            <br />
            L(Node 6 沒左子樹)
            <br />
            D(Node 6 印出6)
            <br />
            R(Node 3 沒右子樹)
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-dark" onClick={props.onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
function PreorderIntroduction(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Preorder</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="row">
          <div>
            <h3>What is Preorder ?</h3>
            <p>
              簡單來說，前序地走訪規則為DLR，
              <br />
              且一般來說會使用
              <span style={{ color: "rgb(58 181 57)" }}>遞迴</span>的方式來執行
              <br />
              D代表印出該Node的數值
              <br />
              L代表走訪左子樹
              <br />
              R代表走訪右子數
              <br />
              以下圖為例
              <br />
            </p>
            <img className="pdfImg" src="/Img/traversal.png" />
          </div>
          <div className="columnCss">
            <span style={{ color: "#4874b1" }}>走訪順序為：</span>
            <br />
            D(Node 4 印出4)
            <br />
            L(Node 4 有左子樹)
            <br />
            D(Node 5 印出5)
            <br />
            L(Node 5 有左子樹)
            <br />
            D(Node 2 印出2)
            <br />
            L(Node 2 沒左子樹)
            <br />
            R(Node 2 沒右子樹)
            <br />
            R(Node 5 有右子樹)
            <br />
            D(Node 1 印出1)
            <br />
            L(Node 1 沒左子樹)
            <br />
            R(Node 1 沒右子樹)
            <br />
            R(Node 4 有右子樹)
            <br />
            D(Node 3 印出3)
            <br />
            L(Node 3 沒左子樹)
            <br />
            R(Node 3 有右子樹)
            <br />
            D(Node 6 印出6)
            <br />
            L(Node 6 沒左子樹)
            <br />
            R(Node 6 沒右子樹)
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-dark" onClick={props.onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
function PostorderIntroduction(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Postorder</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="row">
          <div>
            <h3>What is Inorder ?</h3>
            <p>
              簡單來說，中序地走訪規則為LDR，
              <br />
              且一般來說會使用
              <span style={{ color: "rgb(58 181 57)" }}>遞迴</span>的方式來執行
              <br />
              L代表走訪左子樹
              <br />
              R代表走訪右子數
              <br />
              D代表印出該Node的數值
              <br />
              以下圖為例
              <br />
            </p>
            <img className="pdfImg" src="/Img/traversal.png" />
          </div>
          <div className="columnCss">
            <span style={{ color: "#4874b1" }}>走訪順序為：</span>
            <br />
            L(Node 4 有左子樹)
            <br />
            L(Node 5 有左子樹)
            <br />
            L(Node 2 沒左子樹)
            <br />
            R(Node 2 沒右子樹)
            <br />
            D(Node 2 印出2)
            <br />
            R(Node 5 有右子樹)
            <br />
            L(Node 1 沒左子樹)
            <br />
            R(Node 1 沒右子樹)
            <br />
            D(Node 1 印出1)
            <br />
            R(Node 4 有右子樹)
            <br />
            L(Node 3 沒左子樹)
            <br />
            R(Node 3 有右子樹)
            <br />
            L(Node 6 沒左子樹)
            <br />
            R(Node 6 有右子樹)
            <br />
            D(Node 6 印出6)
            <br />
            D(Node 3 印出3)
            <br />
            D(Node 4 印出4)
            <br />
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-dark" onClick={props.onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
//印出Order的function
function Traversal(orderValue) {
  let print = orderValue[0];
  for (let i = 1; i < orderValue.length; i++) {
    print += "->";
    print += orderValue[i];
  }
  return print;
}
//在執行order動畫時，關掉一些button，避免干擾
function buttonDisabledTrue() {
  let Random = document.querySelector(".A2-Random");
  let Clear = document.querySelector(".A2-Clear");
  let Search = document.querySelector(".A2-Search");
  let Insert = document.querySelector(".A2-Insert");
  let Remove = document.querySelector(".A2-Remove");
  let Create = document.querySelector(".A2-Create");
  let inbtn = document.querySelector(".inbtn");
  let prebtn = document.querySelector(".prebtn");
  let postbtn = document.querySelector(".postbtn");
  inbtn.disabled = true;
  prebtn.disabled = true;
  postbtn.disabled = true;
  Random.disabled = true;
  Clear.disabled = true;
  Search.disabled = true;
  Insert.disabled = true;
  Remove.disabled = true;
  Create.disabled = true;
}
function buttonDisabledFalse() {
  let Random = document.querySelector(".A2-Random");
  let Clear = document.querySelector(".A2-Clear");
  let Search = document.querySelector(".A2-Search");
  let Insert = document.querySelector(".A2-Insert");
  let Remove = document.querySelector(".A2-Remove");
  let Create = document.querySelector(".A2-Create");
  let inbtn = document.querySelector(".inbtn");
  let prebtn = document.querySelector(".prebtn");
  let postbtn = document.querySelector(".postbtn");
  inbtn.disabled = false;
  prebtn.disabled = false;
  postbtn.disabled = false;
  Random.disabled = false;
  Clear.disabled = false;
  Search.disabled = false;
  Insert.disabled = false;
  Remove.disabled = false;
  Create.disabled = false;
}
function RBT() {
  const { ref, insert, remove, getData, search, clear, generateRandomTree } =
    useRedBlackTree();
  const [rbtinsertValue, setrbtInsertValue] = useState(0);
  const [rbtremoveValue, setrbtRemoveValue] = useState(0);
  const [rbtsearchValue, setrbtsearchValue] = useState(0);
  const [InorderValue, setInorderValue] = useState("");
  const [PreorderValue, setPreorderValue] = useState("");
  const [PostorderValue, setPostorderValue] = useState("");
  const [modalShow, setModalShow] = React.useState(false);
  const [inordermodalShow, setinorderModalShow] = React.useState(false);
  const [preordermodalShow, setpreorderModalShow] = React.useState(false);
  const [postordermodalShow, setpostorderModalShow] = React.useState(false);
  const [record, setRecord] = useState([]);
  const scrollContainerStyle = { width: "100%", maxHeight: "500px" };

  //把紀錄反過來
  let tmp = [...record];

  //create的正規化
  const [numVal, setNumVal] = useState("");
  const handleChange = (val) => {
    val = val.replace(/[^0-9,]+/g, "");
    setNumVal(val);
  };
  return (
    <div className="A2">
      <div className="rbt">
        <div className="rowCss">
          <h1>Red Black Tree</h1>
          <div className="hintContainer">
            <div className="loader"></div>
            <img
              className="hint"
              src="/Img/hint.gif"
              onClick={() => setModalShow(true)}
            />
          </div>
        </div>
        <div className="columnCss">
          <div className="rowCssA2Input" style={{ marginTop: "10px" }}>
            <Button
              className="A2-Random"
              variant="outline-dark"
              onClick={() => {
                generateRandomTree(getRandom(5, 10));
                setRecord((prevArray) => [
                  ...record,
                  <div>
                    <div className="recordP">
                      {"Random \n"}
                      <span style={{ fontSize: "10px", color: "#9b9b9b" }}>
                        {new Date().toLocaleTimeString() +
                          "/" +
                          new Date().getFullYear() +
                          "年" +
                          (new Date().getMonth() + 1) +
                          "月" +
                          new Date().getDate() +
                          "日"}
                      </span>
                    </div>
                  </div>,
                ]);
              }}
            >
              Random
            </Button>
            <Button
              className="A2-Clear"
              variant="outline-dark"
              onClick={() => {
                clear();
                setRecord((prevArray) => [
                  ...record,
                  <div>
                    <div className="recordP">
                      {"Clear \n"}
                      <span style={{ fontSize: "10px", color: "#9b9b9b" }}>
                        {new Date().toLocaleTimeString() +
                          "/" +
                          new Date().getFullYear() +
                          "年" +
                          (new Date().getMonth() + 1) +
                          "月" +
                          new Date().getDate() +
                          "日"}
                      </span>
                    </div>
                  </div>,
                ]);
              }}
            >
              Clear
            </Button>
          </div>
          <div className="rowCssA2Input" style={{ marginTop: "10px" }}>
            <div>
              <input
                type="number"
                onChange={(elem) =>
                  setrbtsearchValue(parseInt(elem.currentTarget.value, 10))
                }
              />
              <Button
                className="A2-Search"
                variant="outline-dark"
                onClick={() => {
                  search(rbtsearchValue);
                  setRecord((prevArray) => [
                    ...record,
                    <div>
                      <div className="recordP">
                        {`Search ${rbtsearchValue} \n`}
                        <span style={{ fontSize: "10px", color: "#9b9b9b" }}>
                          {new Date().toLocaleTimeString() +
                            "/" +
                            new Date().getFullYear() +
                            "年" +
                            (new Date().getMonth() + 1) +
                            "月" +
                            new Date().getDate() +
                            "日"}
                        </span>
                      </div>
                    </div>,
                  ]);
                }}
              >
                Search
              </Button>
            </div>
            <div>
              <input
                type="number"
                onChange={(elem) =>
                  setrbtInsertValue(parseInt(elem.currentTarget.value, 10))
                }
              />
              <Button
                className="A2-Insert"
                variant="outline-dark"
                onClick={() => {
                  insert(rbtinsertValue);
                  search(rbtinsertValue);
                  setRecord((prevArray) => [
                    ...record,
                    <div>
                      <div className="recordP">
                        {`Insert ${rbtinsertValue} \n`}
                        <span style={{ fontSize: "10px", color: "#9b9b9b" }}>
                          {new Date().toLocaleTimeString() +
                            "/" +
                            new Date().getFullYear() +
                            "年" +
                            (new Date().getMonth() + 1) +
                            "月" +
                            new Date().getDate() +
                            "日"}
                        </span>
                      </div>
                    </div>,
                  ]);
                }}
              >
                Insert
              </Button>
            </div>
            <div>
              <input
                type="number"
                onChange={(elem) =>
                  setrbtRemoveValue(parseInt(elem.currentTarget.value, 10))
                }
              />
              <Button
                className="A2-Remove"
                variant="outline-dark"
                onClick={() => {
                  search(rbtremoveValue);
                  setTimeout(() => {
                    remove(rbtremoveValue);
                  }, 1200);
                  setRecord((prevArray) => [
                    ...record,
                    <div>
                      <div className="recordP">
                        {`Remove ${rbtremoveValue} \n`}
                        <span style={{ fontSize: "10px", color: "#9b9b9b" }}>
                          {new Date().toLocaleTimeString() +
                            "/" +
                            new Date().getFullYear() +
                            "年" +
                            (new Date().getMonth() + 1) +
                            "月" +
                            new Date().getDate() +
                            "日"}
                        </span>
                      </div>
                    </div>,
                  ]);
                }}
              >
                Remove
              </Button>
            </div>
          </div>
          <div className="rowCssA2Input" style={{ marginTop: "10px" }}>
            <input
              style={{ width: "300px" }}
              type="text"
              value={numVal}
              onChange={(e) => handleChange(e.target.value)}
            />
            <Button
              className="A2-Create"
              variant="outline-dark"
              onClick={() => {
                buttonDisabledTrue();
                clear();
                let tmparr = numVal.split(",");
                setRecord((prevArray) => [
                  ...record,
                  <div>
                    <div className="recordP">
                      {"Create \n"}
                      <span style={{ fontSize: "10px", color: "#9b9b9b" }}>
                        {new Date().toLocaleTimeString() +
                          "/" +
                          new Date().getFullYear() +
                          "年" +
                          (new Date().getMonth() + 1) +
                          "月" +
                          new Date().getDate() +
                          "日"}
                      </span>
                    </div>
                  </div>,
                ]);
                let i = 0;
                let CreatTree = setInterval(() => {
                  if (i === tmparr.length) {
                    clearInterval(CreatTree);
                    buttonDisabledFalse();
                  } else {
                    insert(parseInt(tmparr[i]));
                    search(parseInt(tmparr[i]));
                    i++;
                  }
                }, 800);
              }}
            >
              Create
            </Button>
          </div>
          <div className="rowCss" style={{ marginTop: "10px" }}>
            <div className="Inorder">
              <img
                className="hint"
                src="/Img/hint.gif"
                onClick={() => setinorderModalShow(true)}
              />
            </div>
            <Button
              className="inbtn"
              variant="outline-dark"
              onClick={() => {
                let inbtn = document.querySelector(".inbtn");
                let prebtn = document.querySelector(".prebtn");
                let postbtn = document.querySelector(".postbtn");
                buttonDisabledTrue();
                let orderValue = getData("inorder");
                setInorderValue(getData("inorder"));
                setRecord((prevArray) => [
                  ...record,
                  <div>
                    <div className="recordP">
                      {"Inorder \n"}
                      <span style={{ fontSize: "10px", color: "#9b9b9b" }}>
                        {new Date().toLocaleTimeString() +
                          "/" +
                          new Date().getFullYear() +
                          "年" +
                          (new Date().getMonth() + 1) +
                          "月" +
                          new Date().getDate() +
                          "日"}
                      </span>
                    </div>
                  </div>,
                ]);
                //用search跟insert的function依序建成一棵樹
                let i = 0;
                let Inordertraversal = setInterval(() => {
                  if (i > orderValue.length) {
                    inbtn.disabled = false;
                    prebtn.disabled = false;
                    postbtn.disabled = false;
                    buttonDisabledFalse();
                    let thenode = document.querySelector(".highlight");
                    thenode.classList.remove("highlight");
                    let allnode = document.querySelectorAll(".normal");
                    if (allnode) {
                      allnode.forEach((e) => (e.style.textShadow = "none"));
                    }
                    clearInterval(Inordertraversal);
                  } else {
                    let allnode = document.querySelectorAll(".normal");
                    if (allnode) {
                      allnode.forEach((e) => (e.style.textShadow = "none"));
                    }
                    search(parseInt(orderValue[i]));
                    let thenode = document.querySelector(".highlight");
                    thenode.style.textShadow =
                      "rgb(255 255 255) 0px 0px 5px, rgb(255 255 255) 0px 0px 10px, rgb(255 0 0) 0px 0px 15px, #dc3545 0px 0px 20px, #dc3545 0px 0px 25px, #dc3545 0px 0px 30px, #dc3545 0px 0px 35px";
                    i++;
                  }
                }, 800);
              }}
            >
              Inorder
            </Button>
            <div className="showTraversal">{Traversal(InorderValue)}</div>
          </div>
          <div className="rowCss" style={{ marginTop: "10px" }}>
            <div className=" Preorder">
              <img
                className="hint"
                src="/Img/hint.gif"
                onClick={() => setpreorderModalShow(true)}
              />
            </div>
            <Button
              className="prebtn"
              variant="outline-dark"
              onClick={() => {
                let inbtn = document.querySelector(".inbtn");
                let prebtn = document.querySelector(".prebtn");
                let postbtn = document.querySelector(".postbtn");
                buttonDisabledTrue();
                let orderValue = getData("preorder");
                setPreorderValue(getData("preorder"));
                setRecord((prevArray) => [
                  ...record,
                  <div>
                    <div className="recordP">
                      {"Preorder \n"}
                      <span style={{ fontSize: "10px", color: "#9b9b9b" }}>
                        {new Date().toLocaleTimeString() +
                          "/" +
                          new Date().getFullYear() +
                          "年" +
                          (new Date().getMonth() + 1) +
                          "月" +
                          new Date().getDate() +
                          "日"}
                      </span>
                    </div>
                  </div>,
                ]);
                //用search跟insert的function依序建成一棵樹
                let i = 0;
                let Preordertraversal = setInterval(() => {
                  if (i > orderValue.length) {
                    inbtn.disabled = false;
                    prebtn.disabled = false;
                    postbtn.disabled = false;
                    buttonDisabledFalse();
                    let thenode = document.querySelector(".highlight");
                    thenode.classList.remove("highlight");
                    let allnode = document.querySelectorAll(".normal");
                    if (allnode) {
                      allnode.forEach((e) => (e.style.textShadow = "none"));
                    }
                    clearInterval(Preordertraversal);
                  } else {
                    let allnode = document.querySelectorAll(".normal");
                    if (allnode) {
                      allnode.forEach((e) => (e.style.textShadow = "none"));
                    }
                    search(parseInt(orderValue[i]));
                    let thenode = document.querySelector(".highlight");
                    thenode.style.textShadow =
                      "0 0 5px #fff, 0 0 10px #fff, 0 0 15px #00ccff, 0 0 20px #00ccff, 0 0 25px #00ccff, 0 0 30px #00ccff, 0 0 35px #00ccff";
                    i++;
                  }
                }, 800);
              }}
            >
              Preorder
            </Button>
            <div className="showTraversal">{Traversal(PreorderValue)}</div>
          </div>
          <div className="rowCss" style={{ marginTop: "10px" }}>
            <div className=" Postorder">
              <img
                className="hint"
                src="/Img/hint.gif"
                onClick={() => setpostorderModalShow(true)}
              />
            </div>
            <Button
              variant="outline-dark"
              className="postbtn"
              onClick={() => {
                let inbtn = document.querySelector(".inbtn");
                let prebtn = document.querySelector(".prebtn");
                let postbtn = document.querySelector(".postbtn");
                buttonDisabledTrue();
                let orderValue = getData("postorder");
                setPostorderValue(getData("postorder"));
                setRecord((prevArray) => [
                  ...record,
                  <div>
                    <div className="recordP">
                      {"Postorder \n"}
                      <span style={{ fontSize: "10px", color: "#9b9b9b" }}>
                        {new Date().toLocaleTimeString() +
                          "/" +
                          new Date().getFullYear() +
                          "年" +
                          (new Date().getMonth() + 1) +
                          "月" +
                          new Date().getDate() +
                          "日"}
                      </span>
                    </div>
                  </div>,
                ]);
                //用search跟insert的function依序建成一棵樹
                let i = 0;
                let Postordertraversal = setInterval(() => {
                  if (i > orderValue.length) {
                    inbtn.disabled = false;
                    prebtn.disabled = false;
                    postbtn.disabled = false;
                    buttonDisabledFalse();
                    let thenode = document.querySelector(".highlight");
                    thenode.classList.remove("highlight");
                    let allnode = document.querySelectorAll(".normal");
                    if (allnode) {
                      allnode.forEach((e) => (e.style.textShadow = "none"));
                    }
                    clearInterval(Postordertraversal);
                  } else {
                    let allnode = document.querySelectorAll(".normal");
                    if (allnode) {
                      allnode.forEach((e) => (e.style.textShadow = "none"));
                    }
                    search(parseInt(orderValue[i]));
                    let thenode = document.querySelector(".highlight");
                    thenode.style.textShadow =
                      "0 0 5px #fff, 0 0 10px #fff, 0 0 15px #ffc107, 0 0 20px #ffc107, 0 0 25px #ffc107, 0 0 30px #ffc107, 0 0 35px #ffc107";
                    i++;
                  }
                }, 800);
              }}
            >
              Postorder
            </Button>
            <div className="showTraversal">{Traversal(PostorderValue)}</div>
          </div>
        </div>
        <label>
          <input type="checkbox" className="recordinput" />
          <div className="toggle">
            <div className="top-line common"></div>
            <div className="middle-line common"></div>
            <div className="bottom-line common"></div>
          </div>
          <div className="slide">
            <h2>Record</h2>
            <MDBContainer>
              <div
                className="scrollbar body mx-auto"
                style={(scrollContainerStyle, { whiteSpace: "pre-wrap" })}
              >
                {tmp.reverse()}
              </div>
            </MDBContainer>
          </div>
        </label>
        <MyVerticallyCenteredModal
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
        <InorderIntroduction
          show={inordermodalShow}
          onHide={() => setinorderModalShow(false)}
        />
        <PreorderIntroduction
          show={preordermodalShow}
          onHide={() => setpreorderModalShow(false)}
        />
        <PostorderIntroduction
          show={postordermodalShow}
          onHide={() => setpostorderModalShow(false)}
        />
        <RedBlackTree data={arr} ref={ref} />
      </div>
    </div>
  );
}

export default RBT;
