import React from "react";
import { Button, Modal } from "react-bootstrap";
import { useState } from "react";
import { MDBContainer } from "mdbreact";
import { RedBlackTree, useRedBlackTree } from "react-tree-vis";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack";

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
      <Document file="/RedBlackTree.pdf" onLoadSuccess={onDoucumentLoadSuccess}>
        <Page height="1000" pageNumber={pageNumber} />
      </Document>
      <p>
        Page {pageNumber} of {numPages}
      </p>
      <div style={{ display: "flex", flexDirection: "row" }}>
        {pageNumber > 1 && (
          <Button
            id="A3_PDF_RBT_PreviousPage"
            variant="outline-dark"
            onClick={changePageBack}
          >
            Previous Page
          </Button>
        )}
        {pageNumber < numPages && (
          <Button
            id="A3_PDF_RBT_NextPage"
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
          Red Black Tree
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

function RBTGame() {
  const { ref, insert, remove, getData, search, clear, generateRandomTree } =
    useRedBlackTree();
  const [modalShow, setModalShow] = React.useState(false);
  const [gamemodalShow, setgameModalShow] = React.useState(true);
  const [record, setRecord] = useState([]);
  const scrollContainerStyle = { width: "100%", maxHeight: "500px" };
  const [open, setOpen] = useState("hide");
  const [playergrade, setPlayergrade] = useState(0);
  const [aigrade, setAigrade] = useState(0);
  let tmp = [...record];

  function start() {
    var timer = document.querySelector(".timer");
    var number = 10;
    setInterval(function () {
      number--;
      if (number <= 0) number = 0;
      timer.innerText = number + 0;
    }, 1000);
  }

  return (
    <div className="A3">
      <div className="AVLgame">
        <div className="gamehintContainer" style={{ marginLeft: "250px" }}>
          <div className="loader"></div>
          <img
            id="A3_RBT_Gamerule"
            className="gamerule"
            onClick={() => setgameModalShow(true)}
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABmJLR0QA/wD/AP+gvaeTAAACUElEQVRoge2av04bQRDGfzoJYUVujBSUBJyGUFJZ4g3SJqGJ6IBXoCKv4LT0KYIipaBKlwKSUCXQ0URI/CmQsS0jKJyEAskpdiyfImNm9tbni3yftNrV+fb7Zry3s6udhR6eAltAC+ikXK6Bb8AqEJEA80BjBA70K1+BKR8nIuBASHaBGR8So96+6O2IXgk3GjV5fgAUrMRL0vkcKAYy1lfvCXAkv1etxB+l40ZCA0PpVYBb4A/w0EJ8KsSVJNYF1tuWd9YtxDfSqeRtmg0avWV555OWNJIOaUKj913qBS1pBFxIe85qkSc0eg2p1XMkAn5I+7mHUT7Q6P2W+oGF+BXphl+tXneBVCO+IH4BZj0NtOh1F8RBemZHAJ4Bde7fPgyrBHMEoAy8ZzSbxqCO3IXghMPQTbRlzhJyR7KG3JGsYewdKQJn9ELk3h3PtWWPhAg1IknXmVTWqXxBTBO5I1lDHrX+QR61QumO/RzJHMbekTxqDam/WiSPWp6YjLX7fYot3NFV2UI6ihGZQDe36rjDRRWy+GnN4vKdHdxxr+rL6keYRtS67w8s4g7CO8DL/zlqtYFNaS9rOvwSIVOuIgDaCt2KvHOsGZFLqacTGmZFU6F7IvVjjSOHUi96m+SHnxZdjSM7Ur/2MscfnxW63TxkTUM4jUve35JeLh7gES6XOEj3DW6OfNCSVqXDEe6aRVp4O0A3Hn5faAkL9PKMNWANzxs8RhTo5RvjuvEFcR/jVmsKdwXJutgNs1xg2KLEEQEruEtiVyN0oAm8I5YR/guUqaZe1GPGYQAAAABJRU5ErkJggg=="
          />
        </div>
        <div className="gamehintContainer" style={{ marginRight: "250px" }}>
          <div className="loader"></div>
          <img
            id="A3_RBT_Hint"
            className="hint"
            src="/Img/hint.gif"
            onClick={() => setModalShow(true)}
          />
        </div>
        <h1>RBT</h1>
        <div className="interactiveInterface">
          <div className="playercontainer">
            <div className="namegrade">
              <div className="thegrade">{playergrade}</div>
              <h3>player</h3>
            </div>
            <div className="options">
              <Button variant="outline-dark" id="RBT_Insert_5">
                insert 5
              </Button>
              <Button variant="outline-dark" id="RBT_Remove_2">
                remove 2
              </Button>
              <Button variant="outline-dark" id="RBT_Insert_25">
                insert 25
              </Button>
            </div>
          </div>
          <div className="timer">10</div>
          <div className="AIcontainer">
            <div className="namegrade">
              <div className="thegrade">{aigrade}</div>
              <h3>AI</h3>
            </div>
            <div className="options">
              <Button variant="outline-dark">remove 31</Button>
              <Button variant="outline-dark">insert 15</Button>
              <Button variant="outline-dark">remove 12</Button>
            </div>
          </div>
        </div>
        <div>
          <Button
            id="A3_BST_GameStart"
            variant="outline-dark"
            style={{ marginTop: "20px" }}
            onClick={() => {
              start();
            }}
          >
            Start
          </Button>
          <Button
            id="A3_BST_GameRestart"
            variant="outline-dark"
            style={{ marginTop: "20px" }}
          >
            Restart
          </Button>
        </div>
        <RedBlackTree data={arr} ref={ref} />
        <MyVerticallyCenteredModal
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
        <GameMyVerticallyCenteredModal
          show={gamemodalShow}
          onHide={() => setgameModalShow(false)}
        />
      </div>
    </div>
  );
}

export default RBTGame;
