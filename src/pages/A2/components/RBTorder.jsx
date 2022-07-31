import React from "react";
import { RedBlackTree, useRedBlackTree } from "react-tree-vis";
import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { MDBContainer } from "mdbreact";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
//產生隨機陣列並排序他
var arr = [];
let tmpArr = [];
//沒按random不能按change
let disabled = true;
for (let i = 0; i < getRandom(5, 7); i++) {
  let tmp = getRandom(5, 70);
  for (let j = 0; j < arr.length; j++) {
    if (arr[j] === tmp) {
      arr.splice(j, 1);
    }
  }
  arr.push(tmp);
  tmpArr = arr;
}
//dnd的array
const getItems = (count) =>
  Array.from({ length: count }, (tmpArr, k) => k).map((k) => ({
    id: `item-${k + 1}`,
    content: `${tmpArr[k]}`,
  }));
// 重新記錄陣列順序
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  //刪除並記錄 刪除元素
  const [removed] = result.splice(startIndex, 1);
  //將原來的元素新增進陣列
  result.splice(endIndex, 0, removed);
  return result;
};

const grid = 8;

// 設定樣式
const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: grid * 2,
  margin: `0 ${grid}px 0 0 `,
  background: isDragging ? "#95e5f5" : "#fff",
  ...draggableStyle,
});

const getListStyle = () => ({
  background: "black",
  display: "flex",
  padding: grid,
  overflow: "auto",
});

//每個order的拖拉區塊
class InReactBeautifulDndHorizontal extends React.Component {
  constructor(props) {
    super(props);
    this.onDragEnd = this.onDragEnd.bind(this);
    this.state = {
      items: getItems(this.props.arr.length),
    };
  }
  onDragEnd(result) {
    if (!result.destination) {
      return;
    }

    const items = reorder(
      this.state.items,
      result.source.index,
      result.destination.index
    );

    this.setState({
      items,
    });
  }
  render() {
    return (
      <div className="A2orderDND">
        <h3>Inorder</h3>
        <img className="correct" src="/Img/correct.png" />
        <img className="wrong" src="/Img/wrong.png" />
        <Button
          variant="outline-dark"
          style={{ marginBottom: "10px" }}
          disabled={disabled}
          onClick={() => {
            this.setState({ items: getItems(tmpArr.length) });
            disabled = true;
          }}
        >
          Change
        </Button>
        <div className="Dndcontainer">
          <DragDropContext onDragEnd={this.onDragEnd}>
            <Droppable droppableId="droppable" direction="horizontal">
              {(provided, snapshot) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  style={getListStyle(snapshot.isDraggingOver)}
                >
                  {this.state.items.map((item, index) => (
                    <Draggable
                      key={item.id}
                      draggableId={item.id}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={getItemStyle(
                            snapshot.isDragging,
                            provided.draggableProps.style
                          )}
                          className="Inorderitems"
                        >
                          {item.content}
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      </div>
    );
  }
}
class PreReactBeautifulDndHorizontal extends React.Component {
  constructor(props) {
    super(props);
    this.onDragEnd = this.onDragEnd.bind(this);
    this.state = {
      items: getItems(this.props.arr.length),
    };
  }
  onDragEnd(result) {
    if (!result.destination) {
      return;
    }

    const items = reorder(
      this.state.items,
      result.source.index,
      result.destination.index
    );

    this.setState({
      items,
    });
  }
  render() {
    return (
      <div className="A2orderDND">
        <h3>Preorder</h3>
        <img className="correct" src="/Img/correct.png" />
        <img className="wrong" src="/Img/wrong.png" />
        <Button
          variant="outline-dark"
          style={{ marginBottom: "10px" }}
          disabled={disabled}
          onClick={() => {
            this.setState({ items: getItems(tmpArr.length) });
            disabled = true;
          }}
        >
          Change
        </Button>
        <div className="Dndcontainer">
          <DragDropContext onDragEnd={this.onDragEnd}>
            <Droppable droppableId="droppable" direction="horizontal">
              {(provided, snapshot) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  style={getListStyle(snapshot.isDraggingOver)}
                >
                  {this.state.items.map((item, index) => (
                    <Draggable
                      key={item.id}
                      draggableId={item.id}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={getItemStyle(
                            snapshot.isDragging,
                            provided.draggableProps.style
                          )}
                          className="Preorderitems"
                        >
                          {item.content}
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      </div>
    );
  }
}
class PostReactBeautifulDndHorizontal extends React.Component {
  constructor(props) {
    super(props);
    this.onDragEnd = this.onDragEnd.bind(this);
    this.state = {
      items: getItems(this.props.arr.length),
    };
  }
  onDragEnd(result) {
    if (!result.destination) {
      return;
    }

    const items = reorder(
      this.state.items,
      result.source.index,
      result.destination.index
    );

    this.setState({
      items,
    });
  }
  render() {
    return (
      <div className="A2orderDND">
        <h3>Postorder</h3>
        <img className="correct" src="/Img/correct.png" />
        <img className="wrong" src="/Img/wrong.png" />
        <Button
          variant="outline-dark"
          style={{ marginBottom: "10px" }}
          disabled={disabled}
          onClick={() => {
            this.setState({ items: getItems(tmpArr.length) });
            disabled = true;
          }}
        >
          Change
        </Button>
        <div className="Dndcontainer">
          <DragDropContext onDragEnd={this.onDragEnd}>
            <Droppable droppableId="droppable" direction="horizontal">
              {(provided, snapshot) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  style={getListStyle(snapshot.isDraggingOver)}
                >
                  {this.state.items.map((item, index) => (
                    <Draggable
                      key={item.id}
                      draggableId={item.id}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={getItemStyle(
                            snapshot.isDragging,
                            provided.draggableProps.style
                          )}
                          className="Postorderitems"
                        >
                          {item.content}
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      </div>
    );
  }
}
//規則
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
          Binary Search Tree Interactive
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h3>What can you do ?</h3>
        <p>
          透過拖拉下方的方塊，將其排列成中序,前序,後序的
          <br />
          並且按下Submit來知道你的答案是否正確
          <br />
          假如你還想做更多測驗的話
          <br />
          你可以按下Random之後，會有更多的題目讓你練習
        </p>
        <h3>About function</h3>
        <p>
          Random: 可隨機生成一棵樹
          <br />
          Change: 更改拖曳欄位
          <br />
          Submit: 送出答案
          <br />
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-dark" onClick={props.onHide}>
          Try it!
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
function RBTorder() {
  const { ref, getData, generateRandomTree } = useRedBlackTree();
  const [modalShow, setModalShow] = React.useState(false);
  const [record, setRecord] = useState([]);
  const scrollContainerStyle = { width: "100%", maxHeight: "500px" };

  let tmp = [...record];
  return (
    <div className="A3">
      <div className="BSTInteractive">
        <div className="rowCss">
          <h1>RBT Order</h1>
          <div className="hintContainer">
            <div className="loader"></div>
            <img
              className="hint"
              src="/Img/hint.gif"
              onClick={() => setModalShow(true)}
            />
          </div>
        </div>
        <div className="rowCssA2Input">
          <div className="bsttreecontainer">
            <RedBlackTree data={arr} ref={ref} />
            <Button
              variant="outline-dark"
              style={{ marginTop: "20px" }}
              onClick={() => {
                async function newTree(params) {
                  tmpArr = [];
                  await generateRandomTree(getRandom(5, 7));
                  tmpArr = getData("inorder");
                  tmpArr.sort(function () {
                    return 0.5 - Math.random();
                  });
                }
                newTree();
                let correctS = document.querySelectorAll(".correct");
                let wrongS = document.querySelectorAll(".wrong");
                disabled = false;
                correctS[0].style.visibility = "hidden";
                wrongS[0].style.visibility = "hidden";
                correctS[1].style.visibility = "hidden";
                wrongS[1].style.visibility = "hidden";
                correctS[2].style.visibility = "hidden";
                wrongS[2].style.visibility = "hidden";
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
          </div>
          <div className="dropdrupcontainer">
            <InReactBeautifulDndHorizontal arr={tmpArr} />
            <PreReactBeautifulDndHorizontal arr={tmpArr} />
            <PostReactBeautifulDndHorizontal arr={tmpArr} />
            <Button
              variant="outline-dark"
              style={{ marginTop: "20px" }}
              onClick={() => {
                //對答案
                let inorderValue = getData("inorder");
                let preorderValue = getData("preorder");
                let postorderValue = getData("postorder");
                let inorder = document.querySelectorAll(".Inorderitems");
                let preorder = document.querySelectorAll(".Preorderitems");
                let postorder = document.querySelectorAll(".Postorderitems");
                let inTF = 1;
                let preTF = 1;
                let postTF = 1;
                let correctS = document.querySelectorAll(".correct");
                let wrongS = document.querySelectorAll(".wrong");
                let tmp = "";
                for (let i = 0; i < inorder.length; i++) {
                  if (
                    inorder[i].innerText !== inorderValue[i].toString() &&
                    inTF === 1
                  ) {
                    correctS[0].style.visibility = "hidden";
                    wrongS[0].style.visibility = "visible";
                    inTF = 0;
                    tmp += "inorder wrong \n";
                  }
                  if (
                    preorder[i].innerText !== preorderValue[i].toString() &&
                    preTF === 1
                  ) {
                    correctS[1].style.visibility = "hidden";
                    wrongS[1].style.visibility = "visible";
                    preTF = 0;
                    tmp += "preorder wrong \n";
                  }
                  if (
                    postorder[i].innerText !== postorderValue[i].toString() &&
                    postTF === 1
                  ) {
                    correctS[2].style.visibility = "hidden";
                    wrongS[2].style.visibility = "visible";
                    postTF = 0;
                    tmp += "postorder wrong \n";
                  }
                }
                if (inTF) {
                  correctS[0].style.visibility = "visible";
                  wrongS[0].style.visibility = "hidden";
                  tmp += "inorder correct \n";
                }
                if (preTF) {
                  correctS[1].style.visibility = "visible";
                  wrongS[1].style.visibility = "hidden";
                  tmp += "preorder correct \n";
                }
                if (postTF) {
                  correctS[2].style.visibility = "visible";
                  wrongS[2].style.visibility = "hidden";
                  tmp += "postorder correct \n";
                }
                setRecord((prevArray) => [
                  ...record,
                  <div>
                    <div className="recordP">
                      {tmp}
                      <span
                        style={{
                          fontSize: "10px",
                          color: "rgb(155, 155, 155)",
                        }}
                      >
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
              Submit
            </Button>
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
      </div>
    </div>
  );
}

export default RBTorder;
