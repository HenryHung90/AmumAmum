import React from "react";
import { BinarySearchTree, useBinarySearchTree } from "react-tree-vis";
import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { MDBContainer } from "mdbreact";
import A2_Header from "./Header";

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
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
// function getli(params) {
//   let fuck = document.querySelectorAll("li.null");
//   console.log(fuck[0]);
//   return document.querySelectorAll("li");
// }
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
          Binary Search Tree
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h3>What is Binary Search Tree ?</h3>
        <p>
          簡單來說就是，任一個節點的
          <span style={{ color: "#4874b1" }}>左子樹都比父節點小</span> ，
          <span style={{ color: "#4874b1" }}>右子樹都比父節點大</span>
          ，
          <br />
          且每一個節點的值都不重複。所以當我們要查找資料的時候，就可以從根節點開始，
          <br />
          比根節點<span style={{ color: "#4874b1" }}>小的就從左子樹</span>
          開始找，比較<span style={{ color: "#4874b1" }}>大的就從右子樹</span>
          開始找。
          <br />
          相對於其他資料結構而言，尋找、插入的時間複雜度較低，為Ｏ(logN)。
        </p>
        <h3>How can we use Binary Search Tree ?</h3>
        <p>我們可以把資料建立成Binary Search Tree，以降低我們搜尋的時間</p>
        <h3>About function</h3>
        <p>
          Random: 可隨機新增一顆樹
          <br />
          Clear: 刪除整棵樹
          <br />
          Hide: 叫出記錄表()
          <br />
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onHide}>
          Try it!
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
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
        <div className="traversal">
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
          </div>
          <div>
            <h3>Inorder Algo</h3>
            <p>
              <img src="/Img/Inorder.png" />
            </p>
          </div>
        </div>
        <div className="traversalbox">
          <img src="/Img/traversal.png" />
          <div>
            <span style={{ color: "#4874b1" }}>走訪順序為：</span>
            <br />
            L(Node 4 有左子樹) D(Node 4 印出4)
            <br />
            L(Node 5 有左子樹) R(Node 4 有右子樹)
            <br />
            L(Node 2 沒左子樹) L(Node 3 沒左子樹)
            <br />
            D(Node 2 印出2) &nbsp;&nbsp;&nbsp;&nbsp; D(Node 3 印出3)
            <br />
            R(Node 2 沒右子樹) R(Node 3 有右子樹)
            <br />
            D(Node 5 印出5) &nbsp;&nbsp;&nbsp;&nbsp; L(Node 6 沒左子樹)
            <br />
            R(Node 5 有右子樹) D(Node 6 印出6)
            <br />
            L(Node 1 沒左子樹) R(Node 3 沒右子樹)
            <br />
            D(Node 1 印出1)
            <br />
            R(Node 1 沒右子樹)
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onHide}>
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
        <div className="traversal">
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
          </div>
          <div>
            <h3>Preorder Algo</h3>
            <p>
              <img src="/Img/Preorder.png" />
            </p>
          </div>
        </div>
        <div className="traversalbox">
          <img src="/Img/traversal.png" />
          <div>
            <span style={{ color: "#4874b1" }}>走訪順序為：</span>
            <br />
            D(Node 4 印出4)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; R(Node 1 沒右子樹)
            <br />
            L(Node 4 有左子樹) R(Node 4 有右子樹)
            <br />
            D(Node 5 印出5)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; D(Node 3 印出3)
            <br />
            L(Node 5 有左子樹) L(Node 3 沒左子樹)
            <br />
            D(Node 2 印出2)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; R(Node 3 有右子樹)
            <br />
            L(Node 2 沒左子樹) D(Node 6 印出6)
            <br />
            R(Node 2 沒右子樹) L(Node 6 沒左子樹)
            <br />
            R(Node 5 有右子樹) R(Node 6 沒右子樹)
            <br />
            D(Node 1 印出1)
            <br />
            L(Node 1 沒左子樹)
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onHide}>
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
        <div className="traversal">
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
          </div>
          <div>
            <h3>Inorder Algo</h3>
            <p>
              <img src="/Img/Postorder.png" />
            </p>
          </div>
        </div>
        <div className="traversalbox">
          <img src="/Img/traversal.png" />
          <div>
            <span style={{ color: "#4874b1" }}>走訪順序為：</span>
            <br />
            L(Node 4 有左子樹) L(Node 3 沒左子樹)
            <br />
            L(Node 5 有左子樹) R(Node 3 有右子樹)
            <br />
            L(Node 2 沒左子樹) L(Node 6 沒左子樹)
            <br />
            R(Node 2 沒右子樹) R(Node 6 有右子樹)
            <br />
            D(Node 2 印出2) &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; D(Node 6 印出6)
            <br />
            R(Node 5 有右子樹) D(Node 3 印出3)
            <br />
            L(Node 1 沒左子樹)&nbsp; D(Node 4 印出4)
            <br />
            R(Node 1 沒右子樹)
            <br />
            D(Node 1 印出1)
            <br />
            R(Node 4 有右子樹)
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
function Traversal(orderValue) {
  let print = orderValue[0];
  for (let i = 1; i < orderValue.length; i++) {
    print += "->";
    print += orderValue[i];
  }
  return print;
}
function BST() {
  const { ref, insert, remove, getData, search, clear, generateRandomTree } =
    useBinarySearchTree();
  const [bstinsertValue, setbstInsertValue] = useState(0);
  const [bstremoveValue, setbstRemoveValue] = useState(0);
  const [bstsearchValue, setbstsearchValue] = useState(0);
  const [InorderValue, setInorderValue] = useState("");
  const [PreorderValue, setPreorderValue] = useState("");
  const [PostorderValue, setPostorderValue] = useState("");
  const [modalShow, setModalShow] = React.useState(false);
  const [inordermodalShow, setinorderModalShow] = React.useState(false);
  const [preordermodalShow, setpreorderModalShow] = React.useState(false);
  const [postordermodalShow, setpostorderModalShow] = React.useState(false);
  const [record, setRecord] = useState([]);
  const scrollContainerStyle = { width: "100%", maxHeight: "500px" };
  const [open, setOpen] = useState("hide");

  let tmp = [...record];
  return (
    <div className="A2">
      <A2_Header />
      <div className="bst">
        <div className="hintContainer">
          <div className="loader"></div>
          <img
            className="hint"
            src="/Img/hint.gif"
            onClick={() => setModalShow(true)}
          />
        </div>
        <h1>Binary Search Tree</h1>
        <div className="Input">
          <div className="InputGroup">
            <Button
              variant="secondary"
              onClick={() => {
                generateRandomTree(getRandom(5, 10));
                setRecord((prevArray) => [
                  ...record,
                  "-------------------",
                  new Date().toLocaleTimeString() + "\n",
                  new Date().getDate() + "日\n",
                  new Date().getMonth() + 1 + "月 ",
                  new Date().getFullYear() + " ",
                  "Random \n",
                ]);
              }}
            >
              Random
            </Button>
            <Button
              variant="secondary"
              onClick={() => {
                clear();
                setRecord((prevArray) => [
                  ...record,
                  "-------------------",
                  new Date().toLocaleTimeString() + "\n",
                  new Date().getDate() + "日\n",
                  new Date().getMonth() + 1 + "月 ",
                  new Date().getFullYear() + " ",
                  "Clear \n",
                ]);
              }}
            >
              Clear
            </Button>
          </div>
          <div className="InputGroup">
            <input
              type="number"
              onChange={(elem) =>
                setbstsearchValue(parseInt(elem.currentTarget.value, 10))
              }
            />
            <Button
              variant="secondary"
              onClick={() => {
                search(bstsearchValue);
                setRecord((prevArray) => [
                  ...record,
                  "-------------------",
                  new Date().toLocaleTimeString() + "\n",
                  new Date().getDate() + "日\n",
                  new Date().getMonth() + 1 + "月 ",
                  new Date().getFullYear() + " ",
                  `Search  ${bstsearchValue} \n`,
                ]);
              }}
            >
              Search
            </Button>
            <input
              type="number"
              onChange={(elem) =>
                setbstInsertValue(parseInt(elem.currentTarget.value, 10))
              }
            />
            <Button
              variant="secondary"
              onClick={() => {
                insert(bstinsertValue);
                search(bstinsertValue);
                setRecord((prevArray) => [
                  ...record,
                  "-------------------",
                  new Date().toLocaleTimeString() + "\n",
                  new Date().getDate() + "日\n",
                  new Date().getMonth() + 1 + "月 ",
                  new Date().getFullYear() + " ",
                  `Insert  ${bstinsertValue} \n`,
                ]);
              }}
            >
              Insert
            </Button>
            <input
              type="number"
              onChange={(elem) =>
                setbstRemoveValue(parseInt(elem.currentTarget.value, 10))
              }
            />
            <Button
              variant="secondary"
              onClick={() => {
                search(bstremoveValue);
                setTimeout(() => {
                  remove(bstremoveValue);
                }, 1200);
                setRecord((prevArray) => [
                  ...record,
                  "-------------------",
                  new Date().toLocaleTimeString() + "\n",
                  new Date().getDate() + "日\n",
                  new Date().getMonth() + 1 + "月 ",
                  new Date().getFullYear() + " ",
                  `Remove  ${bstremoveValue} \n`,
                ]);
              }}
            >
              Remove
            </Button>
          </div>
          <div className="InputGroup">
            <div className="Inorder">
              <img
                className="hint"
                src="/Img/hint.gif"
                onClick={() => setinorderModalShow(true)}
              />
            </div>
            <Button
              variant="secondary"
              onClick={() => {
                let orderValue = getData("inorder");
                setInorderValue(getData("inorder"));
                setRecord((prevArray) => [
                  ...record,
                  "-------------------",
                  new Date().toLocaleTimeString() + "\n",
                  new Date().getDate() + "日\n",
                  new Date().getMonth() + 1 + "月 ",
                  new Date().getFullYear() + " ",
                  `Inorder  \n`,
                ]);
                let i = 0;
                let Inordertraversal = setInterval(() => {
                  if (i > orderValue.length) {
                    clearInterval(Inordertraversal);
                  }
                  search(parseInt(orderValue[i]));
                  i++;
                }, 800);
              }}
            >
              Inorder
            </Button>
            <div className="showTraversal">{Traversal(InorderValue)}</div>
          </div>
          <div className="InputGroup">
            <div className=" Preorder">
              <img
                className="hint"
                src="/Img/hint.gif"
                onClick={() => setpreorderModalShow(true)}
              />
            </div>
            <Button
              variant="secondary"
              onClick={() => {
                let orderValue = getData("preorder");
                setPreorderValue(getData("preorder"));
                setRecord((prevArray) => [
                  ...record,
                  "-------------------",
                  new Date().toLocaleTimeString() + "\n",
                  new Date().getDate() + "日\n",
                  new Date().getMonth() + 1 + "月 ",
                  new Date().getFullYear() + " ",
                  `Preorder  \n`,
                ]);
                let i = 0;
                let Preordertraversal = setInterval(() => {
                  if (i > orderValue.length) {
                    clearInterval(Preordertraversal);
                  }
                  search(parseInt(orderValue[i]));
                  i++;
                }, 800);
              }}
            >
              Preorder
            </Button>
            <div className="showTraversal">{Traversal(PreorderValue)}</div>
          </div>
          <div className="InputGroup">
            <div className=" Postorder">
              <img
                className="hint"
                src="/Img/hint.gif"
                onClick={() => setpostorderModalShow(true)}
              />
            </div>
            <Button
              variant="secondary"
              onClick={() => {
                let orderValue = getData("postorder");
                setPostorderValue(getData("postorder"));
                setRecord((prevArray) => [
                  ...record,
                  "-------------------",
                  new Date().toLocaleTimeString() + "\n",
                  new Date().getDate() + "日\n",
                  new Date().getMonth() + 1 + "月 ",
                  new Date().getFullYear() + " ",
                  `Postorder  \n`,
                ]);
                let i = 0;
                let Postordertraversal = setInterval(() => {
                  if (i > orderValue.length) {
                    clearInterval(Postordertraversal);
                  }
                  search(parseInt(orderValue[i]));
                  i++;
                }, 800);
              }}
            >
              Postorder
            </Button>
            <div className="showTraversal">{Traversal(PostorderValue)}</div>
          </div>
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
                <div className="title">Record Table</div>
                {tmp.reverse()}
              </div>
            </MDBContainer>
          </div>
        </div>
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
        <BinarySearchTree data={arr} ref={ref} />
      </div>
    </div>
  );
}

export default BST;
