import React from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { useState, useEffect, useRef } from "react";
import { MDBContainer } from "mdbreact";
import { AVLTree, useAVLTree } from "react-tree-vis";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack";
import VanillaTilt from "vanilla-tilt";

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
function Showpdf() {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDoucumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1);
  }
  function changePage(offset) {
    setPageNumber((prePageNumber) => prePageNumber + offset);
  }
  function changePageBack() {
    changePage(-1);
  }
  function changePageNext() {
    changePage(+1);
  }
  return (
    <div className="pdfcontainer">
      <Document file="/AVL.pdf" onLoadSuccess={onDoucumentLoadSuccess}>
        <Page height="1000" pageNumber={pageNumber} />
      </Document>
      <p>
        Page {pageNumber} of {numPages}
      </p>
      <div style={{ display: "flex", flexDirection: "row" }}>
        {pageNumber > 1 && (
          <Button
            id="A3_PDF_AVL_PreviousPage"
            variant="outline-dark"
            onClick={changePageBack}
          >
            Previous Page
          </Button>
        )}
        {pageNumber < numPages && (
          <Button
            id="A3_PDF_AVL_NextPage"
            variant="outline-dark"
            onClick={changePageNext}
          >
            Next Page
          </Button>
        )}
      </div>
    </div>
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
          Adelson Velsky Landis Tree Interactive
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Showpdf />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-dark" onClick={props.onHide}>
          Try it!
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

function GameMyVerticallyCenteredModal(props) {
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
        <h3>How to play?</h3>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-dark" onClick={props.onHide}>
          Go play!
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

function Tilt(props) {
  const { options, ...rest } = props;
  const tilt = useRef(null);

  useEffect(() => {
    VanillaTilt.init(tilt.current, options);
  }, [options]);

  return <div ref={tilt} {...rest} />;
}
var opArr = [];
let change = 1;
function AVLGame() {
  const { ref, insert, remove, search, getData, clear, generateRandomTree } =
    useAVLTree();
  const [modalShow, setModalShow] = React.useState(false);
  const [gamemodalShow, setgameModalShow] = React.useState(false);
  const [diffcultymodalShow, setdiffcultyModalShow] = React.useState(true);
  const [record, setRecord] = useState([]);
  const scrollContainerStyle = { width: "100%", maxHeight: "500px" };
  const [open, setOpen] = useState("hide");
  const [playergrade, setPlayergrade] = useState(0);
  const [aigrade, setAigrade] = useState(0);
  let tmp = [...record];
  const [type, setType] = useState(4);
  const [round, setRound] = useState(1);

  function start() {
    var timer = document.querySelector(".timer");
    var number = 10;
    setInterval(function () {
      number--;
      if (number <= 0) {
        number = 0;
      }
      timer.innerText = number + 0;
    }, 1000);
  }
  const options = {
    scale: 1,
    max: 15,
    speed: 250,
  };

  function DifficultyMyVerticallyCenteredModal(props) {
    return (
      <Modal
        {...props}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        id="A3_AVL_Game_Difficulty"
      >
        <Modal.Body>
          <h2>Start to play!!</h2>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              accentColor: "center",
            }}
          >
            <div style={{ marginRight: "10px" }}>Difficulty </div>
            <Form.Select
              aria-label="Default select example"
              style={{ width: "200px" }}
              value={type}
              onChange={(e) => {
                setType(e.target.value);
              }}
            >
              <option value="4">Easy</option>
              <option value="6">Medium</option>
              <option value="8">Hard</option>
            </Form.Select>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="outline-dark"
            onClick={props.onHide}
            id={`A3_AVL_GameDifficulty_${type}`}
          >
            Go play!
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }

  if (change) {
    for (let i = 0; i < type * 4; i++) {
      opArr[i] = getRandom(5, 21);
    }
    change = 0;
  }

  return (
    <div className="A3">
      <div className="AVLgame">
        <div className="gamehintContainer" style={{ marginLeft: "250px" }}>
          <div className="loader"></div>
          <img
            id="A3_AVL_Gamerule"
            className="gamerule"
            onClick={() => setgameModalShow(true)}
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABmJLR0QA/wD/AP+gvaeTAAACUElEQVRoge2av04bQRDGfzoJYUVujBSUBJyGUFJZ4g3SJqGJ6IBXoCKv4LT0KYIipaBKlwKSUCXQ0URI/CmQsS0jKJyEAskpdiyfImNm9tbni3yftNrV+fb7Zry3s6udhR6eAltAC+ikXK6Bb8AqEJEA80BjBA70K1+BKR8nIuBASHaBGR8So96+6O2IXgk3GjV5fgAUrMRL0vkcKAYy1lfvCXAkv1etxB+l40ZCA0PpVYBb4A/w0EJ8KsSVJNYF1tuWd9YtxDfSqeRtmg0avWV555OWNJIOaUKj913qBS1pBFxIe85qkSc0eg2p1XMkAn5I+7mHUT7Q6P2W+oGF+BXphl+tXneBVCO+IH4BZj0NtOh1F8RBemZHAJ4Bde7fPgyrBHMEoAy8ZzSbxqCO3IXghMPQTbRlzhJyR7KG3JGsYewdKQJn9ELk3h3PtWWPhAg1IknXmVTWqXxBTBO5I1lDHrX+QR61QumO/RzJHMbekTxqDam/WiSPWp6YjLX7fYot3NFV2UI6ihGZQDe36rjDRRWy+GnN4vKdHdxxr+rL6keYRtS67w8s4g7CO8DL/zlqtYFNaS9rOvwSIVOuIgDaCt2KvHOsGZFLqacTGmZFU6F7IvVjjSOHUi96m+SHnxZdjSM7Ur/2MscfnxW63TxkTUM4jUve35JeLh7gES6XOEj3DW6OfNCSVqXDEe6aRVp4O0A3Hn5faAkL9PKMNWANzxs8RhTo5RvjuvEFcR/jVmsKdwXJutgNs1xg2KLEEQEruEtiVyN0oAm8I5YR/guUqaZe1GPGYQAAAABJRU5ErkJggg=="
          />
        </div>
        <div className="gamehintContainer" style={{ marginRight: "250px" }}>
          <div className="loader"></div>
          <img
            id="A3_AVL_Hint"
            className="hint"
            src="/Img/hint.gif"
            onClick={() => setModalShow(true)}
          />
        </div>
        <h1>AVL</h1>
        <div className="interactiveInterface">
          <Tilt className="gametitle" options={options}>
            <div className="playercontainer">
              <div className="namegrade">
                <div className="thegrade">{playergrade}</div>
                <h3>player</h3>
              </div>
              <div className="options">
                <Button
                  id={`AVL_Insert_${opArr[round]}`}
                  variant="outline-dark"
                  onClick={() => {
                    insert(opArr[round]);
                    search(opArr[round]);
                    setPlayergrade(playergrade + 5);
                  }}
                >
                  Insert {opArr[round]}
                </Button>
                <Button
                  id={`AVL_Remove_${opArr[round + 1]}`}
                  variant="outline-dark"
                  onClick={() => {
                    let orderValue = getData("inorder");
                    let tmp = 0;
                    orderValue.forEach((e) => {
                      if (e === opArr[round + 1]) {
                        tmp = 1;
                      }
                    });
                    if (tmp) {
                      search(opArr[round + 1]);
                      remove(opArr[round + 1]);
                    } else {
                      setPlayergrade(playergrade - 3);
                    }
                  }}
                >
                  Remove {opArr[round + 1]}
                </Button>
                <Button
                  id={`AVL_Insert_${opArr[round + 2]}`}
                  variant="outline-dark"
                  onClick={() => {
                    insert(opArr[round + 2]);
                    search(opArr[round + 2]);
                  }}
                >
                  Insert {opArr[round + 2]}
                </Button>
              </div>
            </div>
          </Tilt>
          <div className="timer">10</div>
          <Tilt className="gametitle" options={options}>
            <div className="AIcontainer">
              <div className="namegrade">
                <div className="thegrade">{aigrade}</div>
                <h3>AI</h3>
              </div>
              <div className="options">
                <Button
                  variant="outline-dark"
                  onClick={() => {
                    insert(opArr[round + 3]);
                    search(opArr[round + 3]);
                  }}
                >
                  Insert {opArr[round + 3]}
                </Button>
                <Button
                  variant="outline-dark"
                  onClick={() => {
                    search(opArr[round + 4]);
                    remove(opArr[round + 4]);
                  }}
                >
                  Remove {opArr[round + 4]}
                </Button>
                <Button
                  variant="outline-dark"
                  onClick={() => {
                    insert(opArr[round + 5]);
                    search(opArr[round + 5]);
                  }}
                >
                  Insert {opArr[round + 5]}
                </Button>
              </div>
            </div>
          </Tilt>
        </div>
        <div>
          <Button
            id="A3_AVL_GameStart"
            variant="outline-dark"
            style={{ marginTop: "20px" }}
            onClick={() => {
              start();
            }}
          >
            Start
          </Button>
          <Button
            id="A3_AVL_GameRestart"
            variant="outline-dark"
            style={{ marginTop: "20px" }}
            onClick={() => setdiffcultyModalShow(true)}
          >
            Restart
          </Button>
        </div>
        <AVLTree data={arr} ref={ref} />
        <MyVerticallyCenteredModal
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
        <GameMyVerticallyCenteredModal
          show={gamemodalShow}
          onHide={() => setgameModalShow(false)}
        />
        <DifficultyMyVerticallyCenteredModal
          show={diffcultymodalShow}
          onHide={() => setdiffcultyModalShow(false)}
        />
      </div>
    </div>
  );
}

export default AVLGame;
