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
var arr = [];
let tmpArr = [];
let dndArr = [];
let disabled = true;
while (arr.length < 7) {
  let tmp = getRandom(5, 70);
  for (let j = 0; j < arr.length; j++) {
    if (arr[j] === tmp) {
      arr.splice(j, 1);
    }
  }
  arr.push(tmp);
  tmpArr = arr.sort((a, b) => {
    return a - b;
  });
}
for (let i = 0; i < tmpArr.length; i++) {
  dndArr[i] = { id: (i + 1).toString(), Task: tmpArr[i] };
}
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
          Adelson Velsky Landis Tree Interactive
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
const Kanban = () => {
  const [columns, setColumns] = useState(columnsFromBackend);
  const onDragEnd = (result, columns, setColumns) => {
    if (!result.destination) return;
    const { source, destination } = result;
    if (source.droppableId !== destination.droppableId) {
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
function AVLinteractive() {
  const [modalShow, setModalShow] = React.useState(false);
  const [record, setRecord] = useState([]);
  const scrollContainerStyle = { width: "100%", maxHeight: "500px" };
  const [open, setOpen] = useState("hide");
  let tmp = [...record];

  return (
    <div className="A3">
      <div className="AVlInteractive">
        <div className="hintContainer">
          <div className="loader"></div>
          <img
            className="hint"
            src="/Img/hint.gif"
            onClick={() => setModalShow(true)}
          />
        </div>
        <h1>AVL Interactive</h1>
        <div className="treeanddnd">
          <div className="avltreecontainer">
            <Kanban />
            <div className="avlinteractiveButtons">
              {/* <Button
                variant="outline-dark"
                style={{ marginTop: "220px", position: "static" }}
                onClick={() => {
                  // let old;
                  // for (let i = 0; i < 7; i++) {
                  //   old = document.getElementById("delete" + i);
                  //   old.remove();
                  //   console.log(old);
                  // }
                  tmpArr = [];
                  arr = [];
                  while (arr.length < 7) {
                    let tmp = getRandom(5, 70);
                    for (let j = 0; j < arr.length; j++) {
                      if (arr[j] === tmp) {
                        arr.splice(j, 1);
                      }
                    }
                    arr.push(tmp);
                    tmpArr = arr.sort((a, b) => {
                      return a - b;
                    });
                  }
                  for (let i = 0; i < tmpArr.length; i++) {
                    dndArr[i] = { id: (i + 1).toString(), Task: tmpArr[i] };
                  }
                  dndArr.splice(tmpArr.length, dndArr.length - 1);
                  disabled = false;
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
              </Button> */}
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
                        break;
                      } else {
                        flag++;
                      }
                    }
                  } else {
                    correctS.style.visibility = "hidden";
                    wrongS.style.visibility = "visible";
                  }
                  if (flag === 6) {
                    correctS.style.visibility = "visible";
                    wrongS.style.visibility = "hidden";
                    setRecord((prevArray) => [
                      ...record,
                      <div>
                        <p className="recordP">
                          {"Correct \n"}
                          <span
                            style={{
                              fontSize: "10px",
                              color: "rgb(155, 155, 155)",
                            }}
                          >
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
                  } else {
                    setRecord((prevArray) => [
                      ...record,
                      <div>
                        <p className="recordP">
                          {"Wrong \n"}
                          <span
                            style={{
                              fontSize: "10px",
                              color: "rgb(155, 155, 155)",
                            }}
                          >
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
                  }
                }}
              >
                Submit
              </Button>
              <img
                className="correct"
                src="/Img/correct.png"
                style={{
                  marginTop: "110px",
                }}
              />
              <img
                className="wrong"
                src="/Img/wrong.png"
                style={{
                  marginTop: "110px",
                }}
              />
            </div>
          </div>
        </div>
        <div className={`record ${open === "show" && "open"} `}>
          <div className="recordContainer">
            <Button
              variant="outline-dark"
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
      </div>
    </div>
  );
}

export default AVLinteractive;
