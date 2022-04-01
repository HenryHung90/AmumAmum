import React from "react";
import { MDBContainer } from "mdbreact";
function ScrollBarPage(params) {
  const scrollContainerStyle = { width: "100%", maxHeight: "600px" };
  return (
    <MDBContainer>
      <div className="scrollbar   mt-5 mx-auto" style={scrollContainerStyle}>
        <div>
          <h3>What is tree ?</h3>
          <span>
            Tree是一種抽象資料類型或是實作這種抽象資料類型的資料結構,
            <br />
            用來類比具有樹狀結構性質的資料集合。它是由數個有限節點組成一個具有層次關係的集合。
            <br />
            把它叫做「樹」是因為它看起來像一棵倒掛的樹，也就是說它是根朝上，而葉朝下的。
            <br />
            樹有非常多種，針對不同的情況有各自適合的樹來做應用。
          </span>
        </div>
        <div>
          <h3>Tree's noun</h3>
          <span>
            1.樹根結點 (<span style={{ color: "#ea6b66" }}>root</span>):
            就是最上面的结點 (node)，每個 tree 只會有一個 root。(下圖
            <span style={{ color: "#ea6b66" }}>紅色節點</span>)
            <br />
            2.子樹 (<span style={{ color: "#4874b1" }}> child tree</span>):
            由结點 (node) 和其後代構成。(下圖
            <span style={{ color: "#4874b1" }}>藍色區域</span>
            及為<span style={{ color: "#ea6b66" }}>紅色節點</span>的子樹)
            <br />
            3.子结點(child node):有父结點的结點，所以基本上除了 root
            都是。(下圖4及為3的子節點)
            <br />
            4.葉结點或稱外部结點(
            <span style={{ color: "rgb(58 181 57)" }}>leaf</span>
            ): 沒有子结點的結點。(下圖
            <span style={{ color: "rgb(58 181 57)" }}>綠色節點</span>
            為這棵樹的<span style={{ color: "rgb(58 181 57)" }}>leaf</span>)
            <br />
            5.樹的高度（height): 最大深度到第幾層。(下圖高度為3)
            <img src="./Img/tree.png" />
          </span>
        </div>
        <div>
          <h3>What is tree's function ?</h3>
          <div className="functionA">
            <div className="functionG">
              <span>Insert: 新增結點到該Tree </span>
              <span>Remove: 從該Tree刪掉節點</span>
              <span>Search: 在該Tree找尋該節點</span>
              <span>Balance: 讓該Tree變成平衡的狀態</span>
            </div>
            <div className="functionG">
              <span>Inorder: LDR</span>
              <span>Preorder: DLR</span>
              <span>Postorder: LRD</span>
              <span>(L:拜訪左子樹 R:拜訪右子數 D:印出節點資料)</span>
            </div>
          </div>
        </div>
        <div>
          <h3>How can we use tree ?</h3>
          <span>
            樹狀結構是資訊領域常用的資料結構之一，例如目前流行的檔案系統就是樹狀結構的一種，
            <br />
            樹在資料的管理,儲存,搜尋,排序都扮演一個非常重要的角色
          </span>
        </div>
      </div>
    </MDBContainer>
  );
}
function Tree() {
  return (
    <div className="tree">
      <h1>Tree Intruduction</h1>
      <div className="intruduction">
        <ScrollBarPage />
      </div>
    </div>
  );
}

export default Tree;
