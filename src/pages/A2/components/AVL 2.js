import React from "react";
import { useState } from "react";
import { AVLTree, useAVLTree } from "react-tree-vis";
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
          Adelson Velsky and Landis Tree
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h3>What is Adelson Velsky and Landis Tree ?</h3>
        <p>
          簡單來說就是，他是種
          <span style={{ color: "#4874b1" }}>平衡之後的BST，</span>
          <br />
          平衡的意思是
          <span style={{ color: "#4874b1" }}>
            左子樹的高度和右子樹的高度只能差1
          </span>
          ，請看下圖所示
          <br />
          左圖的左子樹高度為2，右子樹高度為1，
          <span style={{ color: "#4874b1" }}>兩著相差為1</span>，故為AVL
          <br />
          左圖的左子樹高度為2，右子樹高度為0，
          <span style={{ color: "#4874b1" }}> 兩著相差為2(大於1)</span>
          ，故不為AVL
          <img className="avlimg" src="/Img/avl1.png" />
          <img className="avlimg" src="/Img/avl2.png" />
          <br />
          你可能會想為什麼需要AVL，請看下圖
          <br />
          左圖為AVL，右圖為BST，假設我們要搜尋Node 1
          <br />而<span style={{ color: "#4874b1" }}>左圖只需比較3次</span>
          即可找到，而<span style={{ color: "#4874b1" }}>右圖需比較6次</span>，
          由此可看出平衡的重要性
          <br />
          <img className="avlimg" src="/Img/avl3.png" />
          <img className="avlimg" src="/Img/avl4.png" />
          <br />
          而AVL的尋找、插入的時間複雜度也為Ｏ(logN)。
        </p>
        <h3>How to make a AVL ?</h3>
        <p>
          針對不同的平衡狀況，衍伸出4種平衡的方式
          <br />
          分別是 <span style={{ color: "#4874b1" }}> LL RR LR RL</span>
          <br />
          記住一個原則，中間值向上提，大的放左小的放右
          <br />
          <span style={{ color: "rgb(72 177 86)", fontSize: "25px" }}>LL</span>
          <br />
          請看下方兩張圖
          <br />
          因為Node 5的新增導致Node 10的不平衡，因此從Node 10開始標記
          <span style={{ color: "#4874b1" }}>兩個L</span>
          <br />
          因Node 5在Node 10的左邊，所以在Node 10 到 Node 8之間標記L
          <br />
          因Node 5在Node 8的左邊，所以在Node 8 到 Node 6之間標記L
          <br />
          標記好之後就可以開始旋轉，目前被選取到的分別是Node 10, Node 8, Node 6
          <br />而<span style={{ color: "#4874b1" }}>中間值為Node 8</span>
          ，所以他向上提，左節點則為Node 6，右節點則為Node 10
          <br />
          你可能會想說啊其他節點像Node 12怎麼辦，
          <span style={{ color: "#4874b1" }}>別忘了AVL也是BST的一種</span>
          <br />
          所以請依照BST的規則排好即可，做到這裡你已經完成LL旋轉了！
          <br />
          <img className="avlimg" src="/Img/avl5.png" />
          <img className="avlimg" src="/Img/avl6.png" />
          <br />
          <span style={{ color: "rgb(72 177 86)", fontSize: "25px" }}>RR</span>
          <br />
          請看下方兩張圖
          <br />
          因為Node 15的新增導致Node 8的不平衡，因此從Node 8開始標記
          <span style={{ color: "#4874b1" }}>兩個L</span>
          <br />
          因Node 15在Node 8的右邊，所以在Node 8 到 Node 10之間標記R
          <br />
          因Node 15在Node 10的左邊，所以在Node 10 到 Node 12之間標記R
          <br />
          標記好之後就可以開始旋轉，目前被選取到的分別是Node 8, Node 10, Node 12
          <br />而<span style={{ color: "#4874b1" }}>中間值為Node 10</span>
          ，所以他向上提，左節點則為Node 8，右節點則為Node 12
          <br />
          你可能會想說啊其他節點像Node 6或Node 9怎麼辦，
          <span style={{ color: "#4874b1" }}>別忘了AVL也是BST的一種</span>
          <br />
          所以請依照BST的規則排好即可，做到這裡你已經完成RR旋轉了！
          <br />
          <img className="avlimg" src="/Img/avl7.png" />
          <img className="avlimg" src="/Img/avl8.png" />
          <br />
          做到這裡你會發現其實LL跟RR其實沒有什麼差別，只是一個是左邊不平衡，
          <br />
          一個是右邊不平衡，但接下來的LR跟RL就有點不一樣了：）
          <br />
          <span style={{ color: "rgb(72 177 86)", fontSize: "25px" }}>LR</span>
          <br />
          請看下方兩張圖
          <br />
          因為Node 13的新增導致Node 15的不平衡，因此從Node 15開始標記
          <span style={{ color: "#4874b1" }}>一個L, 一個R</span>
          <br />
          因Node 13在Node 15的左邊，所以在Node 8 到 Node 15之間標記L
          <br />
          因Node 13在Node 8的左邊，所以在Node 8 到 Node 10之間標記R
          <br />
          標記好之後就可以開始旋轉，目前被選取到的分別是Node 8, Node 10, Node 15
          <br />而<span style={{ color: "#4874b1" }}>中間值為Node 10</span>
          ，所以他向上提，左節點則為Node 8，右節點則為Node 15
          <br />
          <span style={{ color: "#edb91e" }}>
            這裏就是跟LL或RR不同的部分，一般來說中間點為被選取的第一個或第三個
            <br />
            這裡要搞清楚了，很多初學者都是敗在這裡
          </span>
          <br />
          你可能會想說啊其他節點像Node 6或Node 18怎麼辦
          <br />
          Node 6原本就是Node 8的左子點，不需要改動
          <br />
          Node 18也是同樣的道理，他原本就是Node 15的因此不需要變
          <br />
          你又可能會想說啊其他節點呢
          <span style={{ color: "#4874b1" }}>別忘了AVL也是BST的一種</span>
          <br />
          所以請依照BST的規則排好即可，做到這裡你已經完成LR旋轉了！
          <br />
          <img className="avlimg" src="/Img/avl9.png" />
          <img className="avlimg" src="/Img/avl10.png" />
          <br />
          <span style={{ color: "rgb(72 177 86)", fontSize: "25px" }}>RL</span>
          <br />
          請看下方兩張圖
          <br />
          因為Node 14的新增導致Node 10的不平衡，因此從Node 10開始標記
          <span style={{ color: "#4874b1" }}>一個R, 一個L</span>
          <br />
          因Node 14在Node 10的左邊，所以在Node 10 到 Node 15之間標記R
          <br />
          因Node 14在Node 15的左邊，所以在Node 15 到 Node 13之間標記L
          <br />
          標記好之後就可以開始旋轉，目前被選取到的分別是Node 10, Node 13, Node
          15
          <br />而<span style={{ color: "#4874b1" }}>中間值為Node 13</span>
          ，所以他向上提，左節點則為Node 10，右節點則為Node 15
          <br />
          你可能會想說啊其他節點像Node 8或Node 18怎麼辦
          <br />
          Node 8原本就是Node 10的左子點，不需要改動
          <br />
          Node 18也是同樣的道理，他原本就是Node 15的因此不需要變
          <br />
          你又可能會想說啊其他節點呢
          <span style={{ color: "#4874b1" }}>別忘了AVL也是BST的一種</span>
          <br />
          所以請依照BST的規則排好即可，做到這裡你已經完成RL旋轉了！
          <br />
          <img className="avlimg" src="/Img/avl11.png" />
          <img className="avlimg" src="/Img/avl12.png" />
          <br />
        </p>
        <h3>How can we use Adelson Velsky and Landis Tree ?</h3>
        <p>
          我們可以把資料建立成 AVL Tree，比起BST，AVL Tree更能有效的降低時間
          <br />
          因為BST可能會有上述的情況，進而影響到時間
        </p>
        <h3>About function</h3>
        <p>
          你可能會很好奇每個節點下面的小字是什麼？
          <br />
          <span style={{ color: "#4874b1" }}>他代表的是該節點的樹高</span>
          <br />
          Random: 可隨機新增一顆樹
          <br />
          Clear: 刪除整棵樹
          <br />
          Hide: 叫出記錄表(記錄你動作)
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
              <img src="/Img/inorder.png" />
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
function AVL() {
  const { ref, insert, remove, getData, search, clear, generateRandomTree } =
    useAVLTree();
  const [avlinsertValue, setavlInsertValue] = useState(0);
  const [avlremoveValue, setavlRemoveValue] = useState(0);
  const [avlsearchValue, setavlsearchValue] = useState(0);
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
      <div className="avl">
        <div className="hintContainer">
          <div className="loader"></div>
          <img
            className="hint"
            src="/Img/hint.gif"
            onClick={() => setModalShow(true)}
          />
        </div>
        <h1>Adelson Velsky Landis Tree</h1>
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
                setavlsearchValue(parseInt(elem.currentTarget.value, 10))
              }
            />
            <Button
              variant="secondary"
              onClick={() => {
                search(avlsearchValue);
                setRecord((prevArray) => [
                  ...record,
                  "-------------------",
                  new Date().toLocaleTimeString() + "\n",
                  new Date().getDate() + "日\n",
                  new Date().getMonth() + 1 + "月 ",
                  new Date().getFullYear() + " ",
                  `Search  ${avlsearchValue} \n`,
                ]);
              }}
            >
              Search
            </Button>
            <input
              type="number"
              onChange={(elem) =>
                setavlInsertValue(parseInt(elem.currentTarget.value, 10))
              }
            />
            <Button
              variant="secondary"
              onClick={() => {
                insert(avlinsertValue);
                search(avlinsertValue);
                setRecord((prevArray) => [
                  ...record,
                  "-------------------",
                  new Date().toLocaleTimeString() + "\n",
                  new Date().getDate() + "日\n",
                  new Date().getMonth() + 1 + "月 ",
                  new Date().getFullYear() + " ",
                  `Insert  ${avlinsertValue} \n`,
                ]);
              }}
            >
              Insert
            </Button>
            <input
              type="number"
              onChange={(elem) =>
                setavlRemoveValue(parseInt(elem.currentTarget.value, 10))
              }
            />
            <Button
              variant="secondary"
              onClick={() => {
                search(avlremoveValue);
                setTimeout(() => {
                  remove(avlremoveValue);
                }, 1200);
                setRecord((prevArray) => [
                  ...record,
                  "-------------------",
                  new Date().toLocaleTimeString() + "\n",
                  new Date().getDate() + "日\n",
                  new Date().getMonth() + 1 + "月 ",
                  new Date().getFullYear() + " ",
                  `Remove  ${avlremoveValue} \n`,
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
            <div className="Inorder">
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
            <div className="Inorder">
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
        <AVLTree data={arr} ref={ref} />
      </div>
    </div>
  );
}

export default AVL;
