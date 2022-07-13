import React from "react";
import { useState } from "react";
import { Button } from "react-bootstrap";

function Treedocument() {
  const [page, setPage] = useState(1);

  function Showdocument(params) {
    switch (page) {
      case 1:
        return (
          <div>
            <label className="titlePDF">Tree Introduction</label>
            <label className="subtitle">定義：</label>
            <p>
              Tree是一種抽象資料類型或是實作這種抽象資料類型的資料結構,
              用來類比具有樹狀結構性質的資料集合。
              <br />
              它是由數個有限節點組成一個具有層次關係的集合。
              <br />
              把它叫做「樹」是因為它看起來像一棵倒掛的樹，也就是說它是根朝上，而葉朝下的。
              <br />
              樹有非常多種，針對不同的情況有各自適合的樹來做應用。
            </p>
            <label className="subtitle">名詞解釋：</label>
            <p>
              一．樹根結點 (root): 就是最上面的结點 (node)，每個 tree 只會有一個
              root。(下圖<span className="red">紅色節點</span>) <br />
              二．子樹 ( child tree): 由结點 (node) 和其後代構成。(下圖
              <span className="blue">藍色區域</span>及為
              <span className="red">紅色節點</span>的子樹) <br />
              三．子结點(child node):有父结點的结點，所以基本上除了 root
              都是。(下圖4及為3的子節點) <br />
              四．葉结點或稱外部结點(leaf): 沒有子结點的結點。(下圖
              <span className="green">綠色節點</span>為這棵樹的leaf) <br />
              五．樹的高度（height): 最大深度到第幾層。(下圖高度為3)．
            </p>
            <div className="center">
              <img src="./img/treeintroduction/introduction.png" alt="" />
            </div>
            <label className="subtitle">功能：</label>
            <p>
              一． 搜尋：在該Tree找尋該節點 <br />
              二． 插入：新增結點到該Tree <br />
              三． 移除：從該Tree刪掉節點 <br />
              四． 中序：拜訪左子樹, 印出節點資料, 拜訪右子數 <br />
              五． 前序：印出節點資料, 拜訪左子樹, 拜訪右子數 <br />
              六． 後序：拜訪左子樹, 拜訪右子數, 印出節點資料
            </p>
          </div>
        );
      case 2:
        return (
          <div>
            <label className="subtitle">如何運用樹：</label>
            <p>
              樹狀結構是資訊領域常用的資料結構之一，例如目前流行的檔案系統就是樹狀結構的一種，
              <br />
              樹在資料的管理,儲存,搜尋,排序都扮演一個非常重要的角色。
            </p>
            <label className="subtitle">補充</label>
            <br />
            <label className="secSubtitle">
              一．Full binary tree（完滿二元樹）
            </label>
            <p>解釋：除了 Leaf 以外，每個節點都有兩個 child</p>
            <p>圖示</p>
            <div className="center">
              <img src="./img/treeintroduction/full.png" alt="" />
            </div>
            <br />
            <label className="secSubtitle">
              二．Complete binary tree（完整二元樹）
            </label>
            <p>解釋：也就是各層節點全滿，除了最後一層，最後一層節點全部靠左</p>
            <p>圖示</p>
            <div className="center">
              <img src="./img/treeintroduction/complete.png" alt="" />
            </div>
            <br />
            <label className="secSubtitle">
              三．Perfect binary tree（完美二元樹）
            </label>
            <p>解釋：同時滿足完滿二元樹和完整二元樹的條件</p>
            <p>圖示</p>
            <div className="center">
              <img src="./img/treeintroduction/perfect.png" alt="" />
            </div>
          </div>
        );
      default:
        break;
    }
  }
  return (
    <div className="A1">
      <div className="showPDF">
        <Showdocument />
        <div style={{ display: "flex", flexDuraction: "row" }}>
          <Button
            variant="outline-dark"
            onClick={() => {
              if (page > 1) {
                setPage(page - 1);
              }
            }}
          >
            Prev
          </Button>
          <Button
            variant="outline-dark"
            onClick={() => {
              if (page < 2) {
                setPage(page + 1);
              }
            }}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Treedocument;
