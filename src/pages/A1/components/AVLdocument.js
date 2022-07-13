import React from "react";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack";
import { useState } from "react";
import { Button } from "react-bootstrap";

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
          <Button variant="outline-dark" onClick={changePageBack}>
            Previous Page
          </Button>
        )}
        {pageNumber < numPages && (
          <Button variant="outline-dark" onClick={changePageNext}>
            Next Page
          </Button>
        )}
      </div>
    </div>
  );
}

function AVLdocument() {
  const [page, setPage] = useState(1);

  function Showdocument(params) {
    switch (page) {
      case 1:
        return (
          <div>
            <label className="titlePDF">Adelson-Velsky and Landis Tree</label>
            <label className="subtitle">定義：</label>
            <p>
              又稱自平衡二元搜尋樹(AVL Tree)，簡單來說就是，
              <span className="red">
                任一個節點的左子樹都比父節點小 ，右子樹都比父節點大
              </span>
              。 <br />
              所以當我們要查找資料的時候，就可以從根
              節點開始，比根節點小的就從左子樹開始找，
              <br />
              比較大的就從右子樹開始找。
              相對於其他資料結構而言，尋找、插入的時間複雜度較低，為O(logN)。
            </p>
            <label className="subtitle">使用：</label>
            <p>
              我們可以先將資料建成 AVL Tree，之後如果需要資料時，即可透透過此
              AVL Tree 快速找到我們想要的資料，
              以降低我們查詢資料的時間，另外可以對他進 行增加和刪除的動作。
            </p>
            <label className="subtitle">操作：</label>
            <label className="secSubtitle">搜尋(一)</label>
            <p>
              原則為<span className="red">依序比較比節點大或小</span>
              ，以下圖搜尋 39 為例
              <br />
              第一步：39 比 13 大，往 13 的右子樹走 <br />
              第二步：39 比 21 大，往 21 的右子樹走 <br />
              第三步：找到 39
            </p>
            <div className="center">
              <img src="./img/AVL/pic_1.png" alt="" />
            </div>
          </div>
        );
      case 2:
        return (
          <div>
            <label className="secSubtitle">搜尋(二)</label>
            <p>
              你可能會好奇假如找不到怎麼辦，請看下圖，假設要找 69 <br />
              第一步：69 比 27 大，往 27 的右子樹走 <br />
              第二步：69 比 40 大，往 40 的右子樹走 <br />
              第三步：69 比 58 大，往 58 的右子樹走 <br />
              第四步：58 沒有右子數，表示找不到，則回傳 null
            </p>
            <div className="center">
              <img src="./img/AVL/pic_2.png" alt="" />
            </div>
            <label className="secSubtitle">插入(規則)</label>
            <p>
              基於搜尋的規則，先找到適合插入的位置，之後再判斷是否要『旋轉』，旋轉是
              為了要達到平衡化，
              <span className="red">
                平衡的意思是左子樹的高度和右子樹的高度只能差 1
              </span>
              ， 請看下圖所示 <br />
              圖中的左子樹高度為 2，右子樹高度為 1，兩著相差為 1，故為 AVL
            </p>
            <div>
              <img src="./img/AVL/pic_3.png" alt="" />
            </div>
            <p>
              圖中的左子樹高度為 2，右子樹高度為 0， 兩著相差為 2(大於
              1)，故不為 AVL
            </p>
            <div>
              <img src="./img/AVL/pic_4.png" alt="" />
            </div>
          </div>
        );
      case 3:
        return (
          <div>
            <p>
              旋轉又分為『LL 旋轉』,『RR 旋轉』,『LR 旋轉』, 和『RL 旋轉』
              <br />
              而這些旋轉都圍繞著一個原則，
              <span className="red">『中間值向上提，大的放左小的放右』</span>
            </p>
            <label className="secSubtitle">插入(LL 旋轉)</label>
            <p>
              請看下方兩張圖 <br />
              因為 Node 5 的新增導致 Node 10 的不平衡，因此從 Node 10
              開始標記兩個 L
              <br />
              因Node5在Node10的左邊，所以在Node10 到 Node8之間標記L <br />
              因Node5在Node8的左邊，所以在Node8 到 Node6之間標記L <br />
              標記好之後就可以開始旋轉，目前被選取到的分別是 Node 10, Node 8,
              Node 6
              <br />
              而中間值為 Node 8，所以他向上提，左節點則為 Node 6，右節點則為
              Node 10
              <br />
              你可能會想說啊其他節點像 Node 12 怎麼辦，別忘了 AVL Tree 也是 BST
              的一
              <br />
              種，所以請依照 BST 的規則排好即可，做到這裡你已經完成 LL 旋轉了!
            </p>
            <div className="center">
              <img src="./img/AVL/pic_5.png" alt="" />
            </div>
            <div className="center">
              <img src="./img/AVL/arrow.png" alt="" />
            </div>
            <br />
            <div className="center">
              <img src="./img/AVL/pic_6.png" alt="" />
            </div>
          </div>
        );
      case 4:
        return (
          <div>
            <label className="secSubtitle">插入(RR 旋轉)</label>
            <p>
              請看下方兩張圖 <br />
              因為 Node 15 的新增導致 Node 8 的不平衡，因此從 Node 8
              開始標記兩個 L
              <br />
              因Node15在Node8的右邊，所以在Node8 到 Node10之間標記R <br />
              因Node15在Node10的左邊，所以在Node10 到 Node12之間標記R <br />
              標記好之後就可以開始旋轉，目前被選取到的分別是 Node 8, Node 10,
              Node 12
              <br />
              而中間值為 Node 10，所以他向上提，左節點則為 Node 8，右節點則為
              Node 12
              <br />
              你可能會想說啊其他節點像 Node 6 或 Node 9 怎麼辦，
              <br />
              <span className="red">別忘了 AVL Tree 也是 BST 的一種</span>{" "}
              <br />
              所以請依照 BST 的規則排好即可，做到這裡你已經完成 RR 旋轉了!
            </p>
            <div className="center">
              <img src="./img/AVL/pic_7.png" alt="" />
            </div>
            <div className="center">
              <img src="./img/AVL/arrow.png" alt="" />
            </div>
            <br />
            <div className="center">
              <img src="./img/AVL/pic_8.png" alt="" />
            </div>
          </div>
        );
      case 5:
        return (
          <div>
            <label className="secSubtitle">插入(LR 旋轉)</label>
            <p>
              請看下方兩張圖 <br />
              因為 Node 13 的新增導致 Node 15 的不平衡
              <br />
              因此從 Node 15 開始標記一個 L, 一個 R <br />
              因Node13在Node15的左邊，所以在Node8 到 Node15之間標記L <br />
              因Node13在Node8的左邊，所以在Node8 到 Node10之間標記R <br />
              標記好之後就可以開始旋轉，目前被選取到的分別是 Node 8, Node 10,
              Node 15
              <br />
              而中間值為 Node 10，所以他向上提，左節點則為 Node 8，右節點則為
              Node 15
              <br />
              你又可能會想說啊其他節點呢別忘了
              <span className="red"> AVL Tree 也是 BST 的一種</span>
              <br />
              所以請依照 BST 的規則排好即可，做到這裡你已經完成 LR 旋轉了!
            </p>
            <div className="center">
              <img src="./img/AVL/pic_9.png" alt="" />
            </div>
            <div className="center">
              <img src="./img/AVL/arrow.png" alt="" />
            </div>
            <br />
            <div className="center">
              <img src="./img/AVL/pic_10.png" alt="" />
            </div>
          </div>
        );
      case 6:
        return (
          <div>
            <label className="secSubtitle">插入(RL 旋轉)</label>
            <p>
              請看下方兩張圖
              <br />
              因為 Node 14 的新增導致 Node 10 的不平衡
              <br />
              因此從 Node 10 開始標記一個 R, 一個 L <br />
              因Node14在Node10的左邊，所以在Node10 到 Node15之間標記R <br />
              因Node14在Node15的左邊，所以在Node15 到 Node13之間標記L <br />
              標記好之後就可以開始旋轉，目前被選取到的分別是 Node 10, Node 13,
              Node 15
              <br />
              而中間值為 Node 13，所以他向上提
              <br />
              左節點則為 Node 10，右節點則為 Node 15
              <br />
              你可能會想說啊其他節點像 Node 8 或 Node 18 怎麼辦
              <br />
              Node 8 原本就是 Node 10 的左子點，不需要改動
              <br />
              Node 18 也是同樣的道理，他原本就是 Node 15 的因此不需要變 <br />
              你又可能會想說啊其他節點呢別忘了 AVL Tree 也是 BST 的一種
              <br />
              所以請依照 BST 的規則排好即可，做到這裡你已經完成 RL 旋轉了!{" "}
              <br />
            </p>
            <div className="center">
              <img src="./img/AVL/pic_11.png" alt="" />
            </div>
            <div className="center">
              <img src="./img/AVL/arrow.png" alt="" />
            </div>
            <br />
            <div className="center">
              <img src="./img/AVL/pic_12.png" alt="" />
            </div>
          </div>
        );
      case 7:
        return (
          <div>
            <label className="secSubtitle">移除(規則)</label>
            <p>
              動作和 BST 的移除類似，只是多了要檢查
              <span className="red">是否移除會造成不平衡</span>，若會造成不{" "}
              <br />
              平衡記得旋轉，且可能會<span className="red">多次旋轉</span>
              ，請看下圖移除 10，且以左子樹最大取代
            </p>
            <div className="center">
              <img src="./img/AVL/pic_13.png" alt="" width="100%" />
            </div>
            <p>
              首先直接移除 10，且以左子樹最大 8 取代原本位置，但會造成 8
              的左子樹不平 衡，分別為 5, 3 和 1，因此需做 LL 旋轉
            </p>
            <div className="center">
              <img src="./img/AVL/pic_14.png" alt="" width="100%" />
            </div>
          </div>
        );
      case 8:
        return (
          <div>
            <p>
              中間值為 3，因此 3 往上提 5 和 1 放兩邊，但這時 8
              的右子數不平衡，因此需 做 RL 旋轉
            </p>
            <div className="center">
              <img src="./img/AVL/pic_15.png" alt="" width="100%" />
            </div>
            <p>
              中間值為 30，因此 30 往上提，8 和 50 放兩旁，
              <span className="red">其餘依大的放右小的放左排好</span>，
              這樣一來他就是一顆完整的 AVL Tree 了
            </p>
            <div className="center">
              <img src="./img/AVL/pic_16.png" alt="" width="100%" />
            </div>
          </div>
        );
      case 9:
        return (
          <div>
            <label className="secSubtitle">建立一顆自平衡二元搜尋樹</label>
            <pre>
              假設有筆資料為[16,21,35,54,68]，建成一顆 AVL Tree 該怎麼建呢?
              <br />
              我們可以把建立看成多次的插入，記住一個原則大的放右小的放左，且在買次{" "}
              <br />
              的插入完後，壹定要檢查是否平衡。
              <br />
              第一步：16 當樹根
              <br />
              第二步：21 比 16 大，往 21 的右子樹放
              <br />
              第三步：35 比 16 大，35 比 21 大，往 21 的左子樹放，但造成 16
              的不平衡
              <br />
              &#9;要做 RR 旋轉 <br />
              第四步：54 比 35 大，往 35 的右子樹放
              <b />
              第五步：68 比 35 大，68 比 54 大，
              <br />往 54 的右子樹放，但造成 35 的不平衡，要做 RR 旋轉
            </pre>
            <div className="center">
              <img src="./img/AVL/pic_17.png" alt="" width="60%" />
            </div>
          </div>
        );
      case 10:
        return (
          <div>
            <label className="secSubtitle">中序</label>
            <p>
              為一種走訪的順序，順序為
              <span className="red">
                拜訪左子樹(L)，印出該節點(D)，拜訪右子數(R)
              </span>
              ， <br />
              每到一個新的節點，都會重複此動作，如果該節點沒有子樹，則走到下一步，
              <br />
              起點皆為樹根，請看下圖
              <br />
              第一步:37 有左子樹，往 37 的左子樹走 <br />
              第二步:11 有左子樹，往 11 的左子樹走 <br />
              第三步:3 沒有左子樹，印出 3 <br />
              第四步:3沒有右子樹，返回上一個，及為 11 <br />
              第五步:印出 11，11 沒有右子樹，返回上一個，及為 37 <br />
              第六步:印出 37，37 有右子樹，往 37 的右子樹走
              <br />
              第七步:46 有左子樹，往 46 的左子樹走
              <br />
              第八步:38 沒有左子樹，印出 38 <br />
              第九步:38 沒有右子樹，返回上一個，及為 46 <br />
              第十步:印出 46，46 有右子樹，往 46 的右子樹走 <br />
              第十一步:52 沒有左子樹，印出 52 <br />
              第十二步:52 沒有右子樹，結束中序走訪 <br />
              因此這顆 AVL 的中序走訪為『3,11,37,38,46,52』，你可能會很訝異，
              <br />
              剛好為由小 到大的排序，這並不是剛好，而是二元搜尋樹的特性， <br />
              <span className="red">
                AVL Tree 的中序走訪剛好為由小到大的順序
              </span>
            </p>
            <div className="center">
              <img src="./img/AVL/pic_18.png" alt="" width="60%" />
            </div>
          </div>
        );
      case 11:
        return (
          <div>
            <label className="secSubtitle">前序</label>
            <p>
              是一種走訪的順序，順序為<span className="red">印出該節點(D)</span>
              ，<span className="red">拜訪左子樹(L)</span>，
              <span className="red">拜訪右子數(R)</span>， <br />
              每到一個新的節點，都會重複此動作，如果該節點沒有子樹，則走到下一步，
              <br />
              起點皆為樹根，請看下圖 <br />
              第一步:印出 37，37 有左子樹，往 37 的左子樹走
              <br />
              第二步:印出 11, 11 有左子樹，往 11 的左子樹走
              <br />
              第三步:印出 3，3 沒有左子樹，也沒右子樹，返回上一個，及為 11{" "}
              <br />
              第四步:11 沒有右子樹，返回上一個，及為 37 <br />
              第五步:37 有右子樹，往 37 的右子樹走 <br />
              第六步:印出 46, 46 有左子樹，往 46 的左子樹走 <br />
              第七步:印出 38, 38 沒有左子樹，也沒右子樹，返回上一個，及為 46{" "}
              <br />
              第八步:46 有右子樹，往 46 的右子樹走 <br />
              第九步:印出 52，52 沒有左子樹，也沒右子樹，結束前序走訪 <br />
              因此這顆 AVL Tree 的前序走訪為『37,11,3,46,38,52』
            </p>
            <div className="center">
              <img src="./img/AVL/pic_18.png" alt="" width="60%" />
            </div>
          </div>
        );
      case 12:
        return (
          <div>
            <label className="secSubtitle">後序</label>
            <p>
              為一種走訪的順序，順序為<span className="red">拜訪左子樹(L)</span>
              ，<span className="red">拜訪右子數(R)</span>，
              <span className="red"> 印出該節點(D)</span>， <br />
              每到一個新的節點，都會重複此動作，如果該節點沒有子樹，則走到下一步，
              <br />
              起點皆為樹根，請看下圖 <br />
              第一步:37 有左子樹，往 37 的左子樹走 <br />
              第二步:11 有左子樹，往 11 的左子樹走 <br />
              第三步:3 沒有左子樹，3沒有右子樹，印出 3，返回上一個，及為 11{" "}
              <br />
              第四步:11 沒有右子樹，印出 11，返回上一個，及為 37
              <br />
              第五步:37 有右子樹，往 37 的右子樹走
              <br />
              第六步:46 有左子樹，往 46 的左子樹走
              <br />
              第七步:38 沒有左子樹，38 沒有右子樹，印出 38，返回上一個，及為 46{" "}
              <br />
              第八步:46 有右子樹，往 46 的右子樹走
              <br />
              第九步:52 沒有左子樹，52 沒有右子樹，印出 52，返回上一個，及為 46{" "}
              <br />
              第十步:印出 46，返回上一個，及為 37
              <br />
              第十一步:印出 37, 結束中序走訪
              <br />
              因此這顆 AVL Tree 的後序走訪為『3,11,38,52,46,37』
            </p>
            <div className="center">
              <img src="./img/AVL/pic_18.png" alt="" width="60%" />
            </div>
          </div>
        );
      case 13:
        return (
          <div>
            <label className="subtitle">實際應用:</label>
            <p>
              假設有筆資料為[12,34,6,25,58]，我們先將它建成 AVL
              Tree，之後假設我們要找 58
              <br />
              這筆數據的話，我們只需要三部就可以找到了，分別是 <br />
              第一步:58 比 12 大，往 12 的右子樹找 <br />
              第二步:58 比 34 大，往 34 的右子樹找 <br />
              第三步:此值剛好為 58，找到了
            </p>
            <div className="center">
              <img src="./img/AVL/pic_19.png" alt="" width="100%" />
            </div>
            <p>
              但假設我們的資料改為[6,12,25,34,58]，再依序建成 AVL Tree
              你覺得還會只需要 <br />
              三步就可找到 58 嗎?來看看下方的結果
              <br />
              答案是會的，因為它會自動平衡
            </p>
            <div className="center">
              <img src="./img/AVL/pic_19.png" alt="" width="100%" />
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
        <div
          style={{
            display: "flex",
            flexDuraction: "row",
            alignItems: "center",
          }}
        >
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
          {page}
          <Button
            variant="outline-dark"
            style={{ marginLeft: "10px" }}
            onClick={() => {
              if (page < 13) {
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

export default AVLdocument;
