import React from "react";
import { Button, Modal } from "react-bootstrap";
import {
  BinarySearchTree,
  useBinarySearchTree,
  AVLTree,
  useAVLTree,
  RedBlackTree,
  useRedBlackTree,
} from "react-tree-vis";
import { useState, useEffect } from "react";
import { MDBContainer } from "mdbreact";
import A2_Header from "./Header";

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
var arrbst = [];
var arravl = [];
var arrrbt = [];
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
var bsttag = 0;
var avltag = 0;
var rbttag = 0;
var bstflag = 1;
for (let i = 0; i < getRandom(6, 8); i++) {
  let tmp = getRandom(5, 70);
  for (let j = 0; j < arrbst.length; j++) {
    if (arrbst[j] === tmp) {
      arrbst.splice(j, 1);
    }
  }
  if (bsttag === 0) {
    bsttag = tmp;
    console.log(bsttag);
  } else {
    arrbst.push(tmp);
  }
}
for (let i = 0; i < getRandom(5, 7); i++) {
  let tmp = getRandom(5, 70);
  for (let j = 0; j < arravl.length; j++) {
    if (arravl[j] === tmp) {
      arravl.splice(j, 1);
    }
  }
  arravl.push(tmp);
}
avltag = arravl[parseInt(arravl.length / 2)];
for (let i = 0; i < getRandom(5, 7); i++) {
  let tmp = getRandom(5, 70);
  for (let j = 0; j < arrrbt.length; j++) {
    if (arrrbt[j] === tmp) {
      arrrbt.splice(j, 1);
    }
  }
  arrrbt.push(tmp);
}
rbttag = arrrbt[parseInt(arrrbt.length / 2)];

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

function Test() {
  const [firstAns, setfirstAns] = useState("");
  const [secondtAns, setsecondAns] = useState("");
  const [thirdAns, setthirdAns] = useState("");
  const [forthtAns, setforthAns] = useState("");
  const [fifthtAns, setsfifthAns] = useState("");
  const [sixthAns, setsixthAns] = useState("");
  const [seventhAns, setsevenththAns] = useState("");
  const [eightthAns, seteightthAns] = useState("");
  const [ninethAns, setninethAns] = useState("");
  const [tenthAns, settenthAns] = useState("");
  const [modalShow, setModalShow] = React.useState(false);
  const [record, setRecord] = useState([]);
  const scrollContainerStyle = { width: "100%", maxHeight: "500px" };
  const [open, setOpen] = useState("hide");

  let tmp = [...record];
  let firstorderValue;
  let secondorderValue;
  let thirdorderValue;
  function BuildBST(params) {
    /*bst */
    const { ref, insert, getData, remove } = useBinarySearchTree();
    return (
      <div>
        <input
          style={{ width: "300px" }}
          type="string"
          onChange={(elem) => {
            let tmp = elem.currentTarget.value;
            if (bstflag) {
              insert(bsttag);
              bstflag = 0;
              firstorderValue = getData("preorder");
              remove(bsttag);
            }
            console.log(firstorderValue);
            tmp = tmp.match(/[0-9]+/);
            console.log(tmp);

            let flag = 1;
            for (let i = 0; i < tmp.length; i++) {
              console.log(tmp[i]);
              if (parseInt(tmp[i]) !== firstorderValue[i]) {
                console.log("wrong");
                flag = 0;
                break;
              }
            }
            if (flag) {
              console.log("correct");
            }
            console.log("-------------------");
          }}
        />
        <BinarySearchTree data={arrbst} ref={ref} />
      </div>
    );
  }

  function BuildAVL() {
    /*avl */
    const { ref, remove, getData } = useAVLTree();
    const [avlansValue, setavlansValue] = useState("");
    const [avlremoveValue, setavlRemoveValue] = useState(0);
    const [avlPostorderValue, setavlPostorderValue] = useState("");
    console.log(secondtAns);

    return <AVLTree data={arravl} ref={ref} />;
  }

  function BuildRBT() {
    /*rbt */
    const { ref, remove } = useRedBlackTree();
    const [rbtansValue, setrbtansValue] = useState("");
    const [PreorderValue, setPreorderValue] = useState("");
    const [rbtremoveValue, setrbtRemoveValue] = useState(0);
    console.log(thirdAns);

    return <RedBlackTree data={arrrbt} ref={ref} />;
  }

  return (
    <div className="A2">
      <A2_Header />
      <div className="test">
        <div className="hintContainer">
          <div className="loader"></div>
          <img
            className="hint"
            src="/Img/hint.gif"
            onClick={() => setModalShow(true)}
          />
        </div>
        <h1>Test</h1>
        <div className="AnsInput">
          <p>
            1.根據圖一，insert {bsttag}之後的Preorder結果為何？(請用逗號區隔)
          </p>

          <BuildBST />
          <p style={{ display: "flex", justifyContent: "center" }}>圖一</p>
          <p>
            2.根據圖二，remove {avltag}之後的Postorder結果為何？(請用逗號區隔)
          </p>
          <input
            style={{ width: "300px" }}
            type="string"
            onChange={(elem) => {
              let tmp = elem.currentTarget.value;
              tmp = tmp.split(",");
              setsecondAns(tmp);
            }}
          />
          <BuildAVL />
          <p style={{ display: "flex", justifyContent: "center" }}>圖二</p>
          <p>
            3.根據圖三，remove {rbttag}之後的Preorder結果為何？(請用逗號區隔)
          </p>
          <input
            style={{ width: "300px" }}
            type="string"
            onChange={(elem) => {
              let tmp = elem.currentTarget.value;
              tmp = tmp.split(",");
              setthirdAns(tmp);
            }}
          />
          <BuildRBT />
          <p style={{ display: "flex", justifyContent: "center" }}>圖三</p>
          <p>
            4.根據下列的Inorder和Preorder，請問此棵樹的最右邊的leaf為何(avl)
            <br />
            Inorder {avlInorder}
            <br />
            Preorder {avlPreorder}
          </p>
          <input
            type="string"
            onChange={(elem) => {
              setforthAns(parseInt(elem.target.value));
              if (parseInt(elem.target.value) === 69) {
                console.log("correct");
              }
            }}
          />
          <p>
            5.根據下列的Inorder和Postorder，請問此棵樹的最右邊的leaf為何(rbt)
            <br />
            Inorder {rbtInorder}
            <br />
            Postorder {rbtPostorder}
          </p>
          <input
            type="string"
            onChange={(elem) => {
              setsfifthAns(parseInt(elem.target.value));
              if (parseInt(elem.target.value) === 70) {
                console.log("correct");
              }
            }}
          />
          <p>6.一顆二元搜尋樹的左右子樹必為二元搜尋樹？</p>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              marginBottom: "10px",
            }}
          >
            <Button
              variant="secondary"
              onClick={() => {
                setsixthAns("True");
              }}
            >
              True
            </Button>
            <Button
              variant="secondary"
              onClick={() => {
                setsixthAns("False");
              }}
            >
              False
            </Button>
          </div>
          <p>7.一顆樹的左子樹為AVL，右子樹也為AVL，則他必為AVL？</p>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              marginBottom: "10px",
            }}
          >
            <Button
              variant="secondary"
              onClick={() => {
                setsixthAns("True");
              }}
            >
              True
            </Button>
            <Button
              variant="secondary"
              onClick={() => {
                setsixthAns("False");
              }}
            >
              False
            </Button>
          </div>
          <p>
            8.如果今天的資料是靜態的，只需要做查詢的動作，
            <br />
            請問何種資料結構較適合？
          </p>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              marginBottom: "10px",
            }}
          >
            <Button
              variant="secondary"
              onClick={() => {
                seteightthAns("BST");
              }}
            >
              BST
            </Button>
            <Button
              variant="secondary"
              onClick={() => {
                seteightthAns("AVL");
              }}
            >
              AVL
            </Button>
            <Button
              variant="secondary"
              onClick={() => {
                seteightthAns("RBT");
              }}
            >
              RBT
            </Button>
          </div>
          <p>
            9.如果今天的資料是需要時常做插入刪除的動作，
            <br />
            請問何種資料結構較適合？
          </p>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              marginBottom: "10px",
            }}
          >
            <Button
              variant="secondary"
              onClick={() => {
                seteightthAns("BST");
              }}
            >
              BST
            </Button>
            <Button
              variant="secondary"
              onClick={() => {
                seteightthAns("AVL");
              }}
            >
              AVL
            </Button>
            <Button
              variant="secondary"
              onClick={() => {
                seteightthAns("RBT");
              }}
            >
              RBT
            </Button>
          </div>
          <p>10.</p>
        </div>
        <Button
          variant="secondary"
          style={{ marginTop: "10px" }}
          onClick={() => {}}
        >
          Submit
        </Button>
        <MyVerticallyCenteredModal
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
      </div>
    </div>
  );
}

export default Test;
