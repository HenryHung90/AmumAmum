import React from "react";
import { Button, Modal } from "react-bootstrap";
import { useState } from "react";
import { MDBContainer } from "mdbreact";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import styled from "@emotion/styled";
import { v4 as uuidv4 } from "uuid";
import TaskCard from "./TaskCard";

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
//產生隨機陣列並排序他
var arr = [];
let tmpArr = [];
let dndArr = [];
while (arr.length < 7) {
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
for (let i = 0; i < tmpArr.length; i++) {
  dndArr[i] = { id: (i + 1).toString(), Task: tmpArr[i] };
}

function RandomTree() {
  let arr = [];
  let tmpArr = [];
  while (arr.length < 7) {
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
  for (let i = 0; i < tmpArr.length; i++) {
    dndArr[i] = { id: (i + 1).toString(), Task: tmpArr[i] };
  }
}

//每個item就是存放的位址
const columnsFromBackend = {
  [uuidv4()]: {
    title: "4",
    items: [],
  },
  [uuidv4()]: {
    title: "2",
    items: [],
  },
  [uuidv4()]: {
    title: "5",
    items: [],
  },
  [uuidv4()]: {
    title: "1",
    items: [],
  },
  [uuidv4()]: {
    title: "6",
    items: [],
  },
  [uuidv4()]: {
    title: "3",
    items: [],
  },
  [uuidv4()]: {
    title: "7",
    items: [],
  },
  [uuidv4()]: {
    title: "table",
    items: dndArr,
  },
};
const Container = styled.div`
  display: flex;
  height: 300px;
`;

const TaskList = styled.div`
  display: flex;
  flex-direction: column;
  background: #f3f3f3;
  border-radius: 5px;
  padding: 15px 15px;
`;

const TaskColumnStyles = styled.div`
  margin: 8px;
  display: flex;
  width: 100%;
`;

const Title = styled.span`
  background: rgb(155, 155, 155);
  padding: 2px 10px;
  border-radius: 5px;
  align-self: flex-start;
`;

let Treestyle = [
  "300px",
  "150px",
  "300px",
  "0px",
  "300px",
  "150px",
  "300px",
  "0px",
];
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
          Adelson Velsky Landis Tree Create
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h3>What can you do ?</h3>
        <p>
          透過右邊的拖拉方塊，拖曳到左邊適合的位址
          <br />
          依照拖曳方塊的順序
          <br />
          將其組合成一顆完整的AVL Tree
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
//將dndarray轉乘一個個拖拉的小格子
const Kanban = () => {
  const [columns, setColumns] = useState(columnsFromBackend);
  const onDragEnd = (result, columns, setColumns) => {
    if (!result.destination) return;
    const { source, destination } = result;
    if (
      (source.droppableId !== destination.droppableId &&
        columns[destination.droppableId].items.length === 0) ||
      (columns[destination.droppableId].title === "table" &&
        source.droppableId !== destination.droppableId)
    ) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems,
        },
      });
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems,
        },
      });
    }
  };

  return (
    <DragDropContext
      onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
    >
      <Container>
        <TaskColumnStyles>
          {Object.entries(columns).map(([columnId, column], index) => {
            return (
              <Droppable key={columnId} droppableId={columnId}>
                {(provided, snapshot) => (
                  <TaskList
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    style={{
                      height:
                        index === 7
                          ? "570px"
                          : `${column.items.length * 30 + 120}px`,
                      position: "relative",
                      top: `${Treestyle[index]}`,
                      marginLeft: "10px",
                    }}
                    id={index.toString()}
                  >
                    <Title>{column.title}</Title>
                    {column.items.map((item, index) => (
                      <TaskCard key={item + index} item={item} index={index} />
                    ))}
                    {provided.placeholder}
                  </TaskList>
                )}
              </Droppable>
            );
          })}
        </TaskColumnStyles>
      </Container>
    </DragDropContext>
  );
};
function AVLcreate() {
  const [modalShow, setModalShow] = React.useState(false);
  const [record, setRecord] = useState([]);
  const scrollContainerStyle = { width: "100%", maxHeight: "500px" };
  //反序紀錄
  let tmp = [...record];

  return (
    <div className="A3">
      <div className="AVlInteractive">
        <div className="rowCss">
          <h1>AVL Create</h1>
          <div className="hintContainer">
            <div className="loader"></div>
            <img
              className="hint"
              src="/Img/hint.gif"
              onClick={() => setModalShow(true)}
            />
          </div>
        </div>
        <div className="treeanddnd">
          <div className="avltreecontainer">
            <Kanban />
            <div className="avlinteractiveButtons">
              <div className="rowCss" style={{ alignItems: "baseline" }}>
                <Button
                  variant="outline-dark"
                  style={{ marginTop: "20px" }}
                  onClick={() => {
                    async function newTree(params) {
                      RandomTree();
                    }
                    newTree();
                    let correctS = document.querySelectorAll(".correct");
                    let wrongS = document.querySelectorAll(".wrong");
                    correctS[0].style.visibility = "hidden";
                    wrongS[0].style.visibility = "hidden";
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
                  variant="outline-dark"
                  style={{
                    marginLeft: "50px",
                    marginTop: "220px",
                    position: "static",
                  }}
                  onClick={() => {
                    let ans = [];
                    let flag = 0;
                    let correctS = document.querySelector(".correct");
                    let wrongS = document.querySelector(".wrong");
                    async function check() {
                      function catchItems() {
                        for (let i = 0; i < dndArr.length; i++) {
                          let b = document
                            .getElementById(i.toString())
                            .getElementsByClassName("theItem");
                          if (b.length > 1 || b.length === 0) {
                            correctS.style.visibility = "hidden";
                            wrongS.style.visibility = "visible";
                            break;
                          } else {
                            ans.push(b[0].innerText);
                          }
                        }
                      }
                      catchItems();
                    }
                    check();
                    if (ans.length === 7) {
                      for (let i = 0; i < 6; i++) {
                        if (ans[i] > ans[i + 1]) {
                          correctS.style.visibility = "hidden";
                          wrongS.style.visibility = "visible";
                          flag = 0;
                          break;
                        }
                        flag = 1;
                      }
                    } else {
                      correctS.style.visibility = "hidden";
                      wrongS.style.visibility = "visible";
                    }
                    if (flag === 1) {
                      correctS.style.visibility = "visible";
                      wrongS.style.visibility = "hidden";
                      setRecord((prevArray) => [
                        ...record,
                        <div>
                          <div className="recordP">
                            {"Correct \n"}
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
                    } else {
                      setRecord((prevArray) => [
                        ...record,
                        <div>
                          <div className="recordP">
                            {"Wrong \n"}
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
                    }
                  }}
                >
                  Submit
                </Button>
              </div>
              <div className="rowCss">
                <img className="correct" src="/Img/correct.png" />
                <img className="wrong" src="/Img/wrong.png" />
              </div>
            </div>
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

export default AVLcreate;
