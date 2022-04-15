import React from "react";
import { useState } from "react";
import { Button, Modal, Carousel } from "react-bootstrap";
import { RedBlackTree, useRedBlackTree } from "react-tree-vis";
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
function ControlledCarousel() {
  return (
    <Carousel variant="dark">
      <Carousel.Item interval={3600}>
        <img
          className="d-block w-100  showrbimg"
          src="/Img/rb4.png"
          alt="First slide"
        />
      </Carousel.Item>
      <Carousel.Item interval={3000}>
        <img
          className="d-block w-100 showrbimg"
          src="/Img/rb5.png"
          alt="Second slide"
        />
      </Carousel.Item>
      <Carousel.Item interval={2400}>
        <img
          className="d-block w-100 showrbimg"
          src="/Img/rb6.png"
          alt="Third slide"
        />
      </Carousel.Item>
      <Carousel.Item interval={1800}>
        <img
          className="d-block w-100 showrbimg"
          src="/Img/rb7.png"
          alt="Fourth slide"
        />
      </Carousel.Item>
      <Carousel.Item interval={1200}>
        <img
          className="d-block w-100 showrbimg"
          src="/Img/rb8.png"
          alt="Fifth slide"
        />
      </Carousel.Item>
      <Carousel.Item interval={600}>
        <img
          className="d-block w-100 showrbimg"
          src="/Img/rb9.png"
          alt="sixth slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100 showrbimg"
          src="/Img/rb10.png"
          alt="seventh slide"
        />
      </Carousel.Item>
    </Carousel>
  );
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
          Red Black Tree
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h3>What is Red Black Tree ?</h3>
        <p>
          簡單來說就是，他是
          <span style={{ color: "#4874b1" }}>BST和AVL的中間值</span>
          <br />
          為什麼會這樣說，是因為BST可能會有最壞的情況發生，變成斜曲的二元樹
          <br />
          而AVL是為了避免這種情況的發生，嚴格執行平衡的動做，
          但相對付出的時間也就很多
          <br />
          而RedBlackTree 則是不那麼要求平衡
          <br />
          你可以想成說他犧牲一點平衡去換來時間跟效率
        </p>
        <h3>How to make a Red Black Tree ?</h3>
        <p>
          在實作之前，請先記住五大原則
          <br />
          1.<span style={{ color: "#4874b1" }}>Node 必為黑色或紅色</span>
          <br />
          2.<span style={{ color: "#4874b1" }}>root(跟節點)必為黑色</span>
          <br />
          3.<span style={{ color: "#4874b1" }}>null(空節點)必為黑色</span>
          <br />
          4.<span style={{ color: "#4874b1" }}>不會有連續兩個紅色節點</span>
          <br />
          5.
          <span style={{ color: "#4874b1" }}>
            每條路徑上的黑色節點數是一樣的
          </span>
          <br />
          你可能不太了解第4點與第5點是什麼意思，請看下圖
          <br />
          左圖中Node 6和 Node 7皆為紅色的，他違反第４點，需要調整成完整的Red
          Black Tree
          <br />
          右圖中，從root出發到每個節點的最短路徑，所經的黑色節點數是一樣的，遵守第５點
          <br />
          <img className="rbimg" src="/Img/rb1.png" />
          <img className="rbimg" src="/Img/rb2.png" />
          <br />
          接下拉就是要時做出一顆Red Black Tree了，他和AVL 一樣也有旋轉，
          <br />
          只是加上顏色的變化
          <br />
          <span style={{ color: "rgb(72 177 86)", fontSize: "25px" }}>
            LL RR LR RL
          </span>
          <br />
          旋轉方式都一樣，只是加上{" "}
          <span style={{ color: "#4874b1" }}>
            中減值向上提標黑色， 小的放左大的放右標紅色
          </span>
          <br />
          了解上述規則後，我們要來談Insert
          <br />
          <span style={{ color: "rgb(72 177 86)", fontSize: "25px" }}>
            Insert X
          </span>
          <br />
          Insert X有５個步驟：
          <br />
          第一步：先Serch for X，以便找出適當的插入位址
          <br />
          第二步：在Search for X的過程中，
          <span style={{ color: "#4874b1" }}>
            若發現某個Node 兩個子點是紅色Node
          </span>
          的話，
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;則做color
          change，請看下圖所示
          <br />
          <img src="/Img/rb3.png" />
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;color
          change 完後，須檢查有無連續的紅色Node，若有，則需做旋轉
          <br />
          第三步：此時才插入X
          <span style={{ color: "#4874b1" }}>且標記為紅色</span>
          <br />
          第四步：
          <span style={{ color: "#4874b1" }}>
            檢查有無連續紅色Node ，若有，則需做旋轉調整
          </span>
          <br />
          第五步：root一律改為黑色(if needed)
          <br />
          <span style={{ color: "#edb91e" }}>
            Note:Insert X 在第二步及第四步中，頂多發生一次旋轉
          </span>
          <br />
          看到這裡，你可能還不是很懂，請看下方的演示過程
          <br />
          有一筆資料為[8,4,6,9,3]要建成Red Black Tree
          <br />
          <ControlledCarousel />
        </p>
        <h3>How can we use Red Black Tree ?</h3>
        <p>
          我們可以把資料建立成 Red Black Tree，比起BST，Red Black
          Tree更能有效的降低時間
          <br />
          因為BST可能會有上述的情況，進而影響到時間
          <br />
          你可能會想說Red Black Tree 跟 AVL哪一個比較好
          <br />
          這就要是你的資料情況了，
          <br />
          若你常常需要新增刪除，Red Black Tree 可能會比較好
          <br />
          若你只是做查詢的動作，AVL可能比較好
        </p>
        <h3>About function</h3>
        <p>
          圖中紅色的代表紅節點，而灰色的則代表黑節點
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
  const [open, setOpen] = useState("hide");

  let tmp = [...record];
  return (
    <div className="A2">
      <A2_Header />
      <div className="rbt">
        <div className="hintContainer">
          <div className="loader"></div>
          <img
            className="hint"
            src="/Img/hint.gif"
            onClick={() => setModalShow(true)}
          />
        </div>
        <h1>Red Black Tree</h1>
        <div className="Input">
          <div className="InputGroup">
            <Button
              variant="secondary"
              onClick={() => {
                generateRandomTree(getRandom(5, 10));
                setRecord((prevArray) => [
                  ...record,
                  <div>
                    <p className="recordP">
                      {"Random \n"}
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
                  <div>
                    <p className="recordP">
                      {"Clear \n"}
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
              }}
            >
              Clear
            </Button>
          </div>
          <div className="InputGroup">
            <input
              type="number"
              onChange={(elem) =>
                setrbtsearchValue(parseInt(elem.currentTarget.value, 10))
              }
            />
            <Button
              variant="secondary"
              onClick={() => {
                search(rbtsearchValue);
                setRecord((prevArray) => [
                  ...record,
                  <div>
                    <p className="recordP">
                      {`Search  ${rbtsearchValue} \n`}
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
              }}
            >
              Search
            </Button>
            <input
              type="number"
              onChange={(elem) =>
                setrbtInsertValue(parseInt(elem.currentTarget.value, 10))
              }
            />
            <Button
              variant="secondary"
              onClick={() => {
                insert(rbtinsertValue);
                search(rbtinsertValue);
                setRecord((prevArray) => [
                  ...record,
                  <div>
                    <p className="recordP">
                      {`Insert  ${rbtinsertValue} \n`}
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
              }}
            >
              Insert
            </Button>
            <input
              type="number"
              onChange={(elem) =>
                setrbtRemoveValue(parseInt(elem.currentTarget.value, 10))
              }
            />
            <Button
              variant="secondary"
              onClick={() => {
                search(rbtremoveValue);
                setTimeout(() => {
                  remove(rbtremoveValue);
                }, 1200);
                setRecord((prevArray) => [
                  ...record,
                  <div>
                    <p className="recordP">
                      {`Remove  ${rbtremoveValue} \n`}
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
                  <div>
                    <p className="recordP">
                      {`Inorder \n`}
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
                  <div>
                    <p className="recordP">
                      {`Preorder \n`}
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
                  <div>
                    <p className="recordP">
                      {`Postorder \n`}
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
        <RedBlackTree data={arr} ref={ref} />
      </div>
    </div>
  );
}

export default RBT;
