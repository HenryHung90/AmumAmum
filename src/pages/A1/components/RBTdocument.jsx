import React from "react";
import { useState } from "react";
import { Button, ToggleButton } from "react-bootstrap";

//總共有幾頁
let pageArr = [];
for (let i = 0; i < 13; i++) {
  pageArr[i] = i;
}

function RBTdocument(props) {
  const [page, setPage] = useState(0);
  const [checked, setChecked] = useState(0);
  //用按鈕來控制switch
  function Showdocument(params) {
    switch (page) {
      case 0:
        return (
          <div>
            <label className="titlePDF">Red BlackTree</label>
            <label className="subtitle">定義：</label>
            <p>
              又稱紅⿊樹，簡單來說就是，他是BST和AVL的中間值
              <br /> 為什麼會這樣說，是因為BST可能會有最壞的情況發⽣，
              <span className="red">變成斜曲的⼆元樹</span>
              <br />{" "}
              ⽽AVL是為了避免這種情況的發⽣，嚴格執⾏平衡的動做，但相對付出的時間
              <br />{" "}
              也就很多，⽽紅⿊數則是不那麼要求平衡，你可以想成說他犧牲⼀點平衡去換
              <br /> 來時間跟效率，他的尋找、插⼊的時間複雜度較低，為Ｏ(logN)。
            </p>
            <label className="subtitle">使用：</label>
            <p>
              我們可以先將資料建成紅⿊樹，之後如果需要資料時，即可透透過此紅⿊樹快速找到我們想要的資料，
              <br />
              以降低我們查詢資料的時間，另外可以對他進⾏增加和刪除的動作。
            </p>
            <label className="subtitle">操作：</label>
            <label className="secSubtitle">搜尋（一）</label>
            <p>
              原則為<span className="red">依序比較比節點⼤或小</span>
              ，以下圖搜尋39為例
              <br />
              第⼀步：39 比13⼤，往13的右⼦樹⾛
              <br />
              第⼆步：39 比21⼤，往21的右⼦樹⾛
              <br />
              第三步：找到39
            </p>
            <div className="center">
              <img className="pdfImg" src="./Img/RBT/pic1.jpg" alt="" />
            </div>
          </div>
        );
      case 1:
        return (
          <div>
            <label className="secSubtitle">搜尋（二）</label>
            <p>
              你可能會好奇假如找不到怎麼辦，請看下圖，假設要找69
              <br />
              第⼀步：69 比27⼤，往27的右⼦樹⾛
              <br />
              第⼆步：69 比40⼤，往40的右⼦樹⾛
              <br />
              第三步：69 比58⼤，往58的右⼦樹⾛
              <br />
              第四步：58沒有右⼦數，表示找不到，則回傳null
            </p>
            <div className="center">
              <img className="pdfImg" src="./Img/RBT/pic2.jpg" alt="" />
            </div>
            <label className="secSubtitle">插⼊（規則）</label>
            <p>
              基於搜尋的規則，先找到適合插⼊的位置，
              <span className="red">⽽新增的節點先標紅⾊</span>，且在插⼊
              的時候，
              <br />
              若發現某個Node兩個⼦點是紅⾊Node的話，則做
              <span className="red">color change</span>
              ，再判斷是否要『旋轉』，
              <br />
              旋轉是為了要達到符合
              <span className="red">『紅⿊數的五⼤條件』</span>，分別為
              <br />
              ⼀． Node 必為⿊⾊或紅⾊
              <br />
              ⼆． root(跟節點)必為⿊⾊
              <br />
              三． null(空節點)必為⿊⾊
              <br />
              四． 不會有連續兩個紅⾊節點
              <br />
              五． 到每個leaf上的⿊⾊節點數是⼀樣的
              <br />
              旋轉又分為『LL旋轉』,『RR旋轉』,『LR旋轉』,和『RL旋轉』，和AVL的
              旋轉差不多，
              <br />
              只是加上顏⾊的變化，⽽這些旋轉都圍繞著⼀個原則，
              <span className="red">
                『中間值向 上提標⿊，⼤的放左小的放右標紅』
              </span>
            </p>
          </div>
        );
      case 2:
        return (
          <div>
            <label className="secSubtitle">插⼊（color change）</label>
            <p>
              請看下⽅兩張圖
              <br />
              因為新增Node 5的時候，必須先搜尋要插⼊的位置，搜尋的過程中發現，有
              Node 8的兩個⼦點為紅⾊，
              <br />
              因此必須做
              <span className=" red ">color change</span>，⽽color
              change的作法為
              <span className="red ">『該Node改為紅⾊，⼦點改為⿊⾊』</span>
              ，<br />
              並且檢查有無連續的紅節點，若無才可
              進祥下⼀步，因此我們可以插⼊Node 5了，
              <br />
              插⼊完還要檢查是否有違反規則
            </p>
            <div className="center ">
              <img className="pdfImg" src="./Img/RBT/pic3.jpg " alt=" " />
            </div>
            <div className="center ">
              <img src="./Img/RBT/arrow.png " alt=" " />
            </div>
            <div className="center ">
              <img className="pdfImg" src="./Img/RBT/pic4.jpg " alt=" " />
            </div>
            <div className="center ">
              <img src="./Img/RBT/arrow.png " alt=" " />
            </div>
            <div className="center ">
              <img className="pdfImg" src="./Img/RBT/pic5.jpg " alt=" " />
            </div>
          </div>
        );
      case 3:
        return (
          <div>
            <label className="secSubtitle ">插⼊（LL旋轉）</label>
            <p>
              請看下⽅兩張圖
              <br />
              因為新增Node 5的時候，必須先搜尋要插⼊的位置，搜尋的過程中沒發現有
              Node的兩個⼦點為紅⾊，
              <br />
              可進⾏下⼀步Node
              5的插⼊，但插⼊完後發現有連續的紅節點，從違反規則的地⽅，
              <br />
              由後往前算分別為Node 5,Node 6，Node 8，
              因此需做LL旋轉，中間值為Node 6往上提標⿊，
              <br />
              左節點則為Node 5標紅，右節點則為Node
              8標紅，做完之後需檢查有無違反規則，
              <br />
              若皆無違反的話，恭喜你完成LL旋轉了！
            </p>
            <div className="center ">
              <img className="pdfImg" src="./Img/RBT/pic6.jpg " alt=" " />
            </div>
            <div className="center ">
              <img src="./Img/RBT/arrow.png " alt=" " />
            </div>
            <div className="center ">
              <img className="pdfImg" src="./Img/RBT/pic7.jpg " alt=" " />
            </div>
          </div>
        );
      case 4:
        return (
          <div>
            <label className="secSubtitle ">插⼊（RR 旋轉）</label>
            <p>
              請看下⽅兩張圖
              <br />
              因為新增Node
              15的時候，必須先搜尋要插⼊的位置，搜尋的過程中沒發現有
              Node的兩個⼦點為紅⾊，
              <br />
              可進⾏下⼀步Node 15的插⼊，但插⼊完後發現有連
              續的紅節點，從違反規則的地⽅，
              <br />
              由後往前算分別為Node 15,Node 12，Node
              10，因此需做RR旋轉，中間值為Node 12往上提標⿊，
              <br />
              左節點則為Node 10 標紅，右節點則為Node
              15標紅，做完之後需檢查有無違反規則，
              <br />
              若皆無違反 的話，恭喜你完成RR旋轉了！
            </p>
            <div className="center ">
              <img className="pdfImg" src="./Img/RBT/pic8.jpg " alt=" " />
            </div>
            <div className="center ">
              <img src="./Img/RBT/arrow.png " alt=" " />
            </div>
            <div className="center ">
              <img className="pdfImg" src="./Img/RBT/pic9.jpg " alt=" " />
            </div>
          </div>
        );
      case 5:
        return (
          <div>
            <label className="secSubtitle ">插⼊（LR旋轉）</label>
            <p>
              <br />
              請看下⽅兩張圖 因為新增Node 17的時候，必須先搜尋要插⼊的位置，
              <br />
              搜尋的過程中沒發現有 Node的兩個⼦點為紅⾊，可進⾏下⼀步Node
              17的插⼊，
              <br />
              但插⼊完後發現有連
              續的紅節點，從違反規則的地⽅，由後往前算分別為Node 17,Node
              16，Node 18，
              <br />
              因此需做LR旋轉，中間值為Node 17往上提標⿊，左節點則為Node 16標
              紅，
              <br />
              右節點則為Node 18標紅，做完之後需檢查有無違反規則，若皆無違反的
              話，恭喜你完成LR旋轉了！
            </p>
            <div className="center ">
              <img className="pdfImg" src="./Img/RBT/pic10.jpg " alt=" " />
            </div>
            <div className="center ">
              <img src="./Img/RBT/arrow.png " alt=" " />
            </div>
            <div className="center ">
              <img className="pdfImg" src="./Img/RBT/pic11.jpg " alt=" " />
            </div>
          </div>
        );
      case 6:
        return (
          <div>
            <label className="secSubtitle ">插⼊（RL旋轉）</label>
            <p>
              請看下⽅兩張圖
              <br />
              因為新增Node 9的時候，必須先搜尋要插⼊的位置，搜尋的過程中沒發現有
              Node的兩個⼦點為紅⾊，
              <br />
              可進⾏下⼀步Node 9的插⼊，但插⼊完後發現有連
              續的紅節點，從違反規則的地⽅，
              <br />
              由後往前算分別為Node 9,Node 10，Node
              8，因此需做RL旋轉，中間值為Node 9往上提標⿊，
              <br />
              左節點則為Node 8標 紅，右節點則為Node
              10標紅，做完之後需檢查有無違反規則，
              <br />
              若皆無違反的 話，恭喜你完成RL旋轉了！
            </p>
            <div className="center ">
              <img className="pdfImg" src="./Img/RBT/pic12.jpg " alt=" " />
            </div>
            <div className="center ">
              <img src="./Img/RBT/arrow.png " alt=" " />
            </div>
            <div className="center ">
              <img className="pdfImg" src="./Img/RBT/pic13.jpg " alt=" " />
            </div>
          </div>
        );
      case 7:
        return (
          <div>
            <label className="secSubtitle ">移除（規則）</label>
            <p>
              動作和BST的移除類似，只是多了要檢查
              <span className="red ">是否移除會造成違反規則</span> ，<br />
              若會造成 違反規則記得旋轉，請看下圖移除20，
              <br />
              且以左⼦樹最⼤取代
              首先直接移除20，並且以25取代原本位置，沒有違反任何規則
            </p>
            <div className="center ">
              <img className="pdfImg" src="./Img/RBT/pic14.jpg " alt=" " />
            </div>
            <div className="center ">
              <img src="./Img/RBT/arrow.png " alt=" " />
            </div>
            <div className="center ">
              <img className="pdfImg" src="./Img/RBT/pic15.jpg " alt=" " />
            </div>
          </div>
        );
      case 8:
        return (
          <div>
            <label className="secSubtitle">建立⼀顆紅⿊數</label>
            <p>
              假設有筆資料為[40,60,55,15,20,5,25,30]，建成⼀顆紅⿊數該怎麼建呢？
              <br />
              我們可以把建立看成多次的插⼊，記住⼀個原則
              <span className="red">⼤的放右小的放左</span>，<br />
              且在每次 的插⼊完後，⼀定要檢查是否符合規則。
              <br />
              第⼀步：40當樹根標⿊，因root必為⿊
              <br />
              第⼆步：60 比40⼤，往40右⼦樹放標紅
              <br />
              第三步：55
              比40⼤，55比60小，往60的左⼦樹放，但違反『連續兩紅⾊節點』，因此需做RL旋轉
              <br />
              第四步：在15搜尋插⼊點時，發現55的兩節點為紅⾊，需做color change，
              因此40和60改為⿊⾊，但55為root，因此標⿊，再插⼊15標紅
              <br />
              第五步：20
              比55小，20比40小，20比15⼤，往15的右⼦樹放，但違反『連續兩紅⾊節點』，因此需做LR旋轉
              <br />
              第六步：在5搜尋插⼊點時，發現20的兩節點為紅⾊，需做color change，
              因此15和40改為⿊⾊，20標紅，再插⼊5標紅
              <br />
              第七步：25 比55小，25比20⼤，25比40小，往40的左⼦樹放
              <br />
              第⼋步：30 比55小，30比20⼤，30比40小，30
              比25⼤，往25的右⼦樹放，但違反『連續兩紅⾊節點』，因此需做LR旋轉
            </p>
            <div className="center">
              <img className="pdfImg" src="./Img/RBT/pic16.jpg" alt="" />
            </div>
          </div>
        );
      case 9:
        return (
          <div>
            <label className="secSubtitle">中序</label>
            <p>
              為⼀種⾛訪的順序，順序為
              <span className="red">
                拜訪左⼦樹(L)，印出該節點(D)，拜訪右⼦數(R)
              </span>
              ，
              <br />
              每到⼀個新的節點，都會重複此動作，如果該節點沒有⼦樹，則⾛到下⼀步，
              起點皆為樹根，請看下圖
              <br />
              第⼀步：37有左⼦樹，往37的左⼦樹⾛
              <br />
              第⼆步：11有左⼦樹，往11的左⼦樹⾛
              <br />
              第三步：3沒有左⼦樹，印出3
              <br />
              第四步：３沒有右⼦樹，返回上⼀個，及為11
              <br />
              第五步：印出11，11沒有右⼦樹，返回上⼀個，及為37
              <br />
              第六步：印出37，37有右⼦樹，往37的右⼦樹⾛
              <br />
              第七步：46有左⼦樹，往46的左⼦樹⾛
              <br />
              第⼋步：38沒有左⼦樹，印出38
              <br />
              第九步：38沒有右⼦樹，返回上⼀個，及為46
              <br />
              第⼗步：印出46，46有右⼦樹，往46的右⼦樹⾛
              <br />
              第⼗⼀步：52沒有左⼦樹，印出52
              <br />
              第⼗⼆步：52沒有右⼦樹，結束中序⾛訪
              <br />
              因此這顆紅⿊數的中序⾛訪為『3,11,37,38,46,52』，你可能會很訝異，
              <br />
              剛好為由 小到⼤的排序，這並不是剛好，⽽是⼆元搜尋樹的特性，
              紅⿊樹的中序⾛訪剛好為由小到⼤的順序
            </p>
            <div className="center">
              <img className="pdfImg" src="./Img/RBT/pic17.jpg" alt="" />
            </div>
          </div>
        );
      case 10:
        return (
          <div>
            <label className="secSubtitle">前序</label>
            <p>
              是⼀種⾛訪的順序，順序為
              <span className="red">
                印出該節點(D)，拜訪左⼦樹(L)，拜訪右⼦數(R)
              </span>
              ，
              <br />
              每到⼀個新的節點，都會重複此動作，如果該節點沒有⼦樹，則⾛到下⼀步，
              起點皆為樹根，請看下圖
              <br />
              第⼀步：印出37，37有左⼦樹，往37的左⼦樹⾛
              <br />
              第⼆步：印出11, 11有左⼦樹，往11的左⼦樹⾛
              <br />
              第三步：印出3，3沒有左⼦樹，也沒右⼦樹，返回上⼀個，及為11
              <br />
              第四步：11沒有右⼦樹，返回上⼀個，及為37
              <br />
              第五步：37有右⼦樹，往37的右⼦樹⾛
              <br />
              第六步：印出46, 46有左⼦樹，往46的左⼦樹⾛
              <br />
              第七步：印出38, 38沒有左⼦樹，也沒右⼦樹，返回上⼀個，及為46
              <br />
              第⼋步：46有右⼦樹，往46的右⼦樹⾛
              <br />
              第九步：印出52，52沒有左⼦樹，也沒右⼦樹，結束前序⾛訪
              <br />
              因此這顆紅⿊樹的前序⾛訪為『37,11,3,46,38,52』
            </p>
            <div className="center">
              <img className="pdfImg" src="./Img/RBT/pic18.jpg" alt="" />
            </div>
          </div>
        );
      case 11:
        return (
          <div>
            <label className="secSubtitle">後序</label>
            <p>
              為⼀種⾛訪的順序，順序為
              <span className="red">
                拜訪左⼦樹(L) ，拜訪右⼦數(R)，印出該節點(D)
              </span>
              ，
              <br />
              每到⼀個新的節點，都會重複此動作，如果該節點沒有⼦樹，則⾛到下⼀步，
              起點皆為樹根，請看下圖
              <br />
              第⼀步：37有左⼦樹，往37的左⼦樹⾛
              <br />
              第⼆步：11有左⼦樹，往11的左⼦樹⾛
              <br />
              第三步：3沒有左⼦樹，３沒有右⼦樹，印出3，返回上⼀個，及為11
              <br />
              第四步：11沒有右⼦樹，印出11，返回上⼀個，及為37
              <br />
              第五步：37有右⼦樹，往37的右⼦樹⾛
              <br />
              第六步：46有左⼦樹，往46的左⼦樹⾛
              <br />
              第七步：38沒有左⼦樹，38沒有右⼦樹，印出38，返回上⼀個，及為46
              <br />
              第⼋步：46有右⼦樹，往46的右⼦樹⾛
              <br />
              第九步：52沒有左⼦樹，52沒有右⼦樹，印出52，返回上⼀個，及為46
              <br />
              第⼗步：印出46，返回上⼀個，及為37
              <br />
              第⼗⼀步：印出37, 結束中序⾛訪
              <br />
              因此這顆紅⿊樹的後序⾛訪為『3,11,38,52,46,37』
            </p>
            <div className="center">
              <img className="pdfImg" src="./Img/RBT/pic19.jpg" alt="" />
            </div>
          </div>
        );
      case 12:
        return (
          <div>
            <label className="subtitle">實際應用</label>
            <p>
              假設有筆資料為[12,34,6,25,58]，我們先將它建成紅⿊樹，之後假設我們要找58
              這筆數據的話， 我們只需要三步就可以找到了，分別是
              <br />
              第⼀步：58 比12⼤，往12的右⼦樹找
              <br />
              第⼆步：58 比34⼤，往34的右⼦樹找
              <br />
              第三步：此值剛好為58，找到了
            </p>
            <div className="center">
              <img className="pdfImg" src="./Img/RBT/pic20.jpg" alt="" />
            </div>
            <p>
              但假設我們的資料改為[6,12,25,34,58]，再依序建成紅⿊樹你覺得還會只需要三
              步就可找到58嗎？ 來看看下⽅的結果 答案是會的，因為它會平衡
            </p>
            <div className="center">
              <img className="pdfImg" src="./Img/RBT/pic21.jpg" alt="" />
            </div>
          </div>
        );
      default:
        break;
    }
  }
  let showPDFname = "showPDF MT";
  if (props.modal) {
    showPDFname = "showPDF";
  }
  return (
    <div className="A1">
      <div className={showPDFname}>
        <Showdocument />
        <div className="rowCss" style={{ marginBottom: "20px" }}>
          <Button
            variant="outline-dark"
            onClick={() => {
              if (page > 0) {
                setPage(page - 1);
                setChecked(page - 1);
              }
            }}
          >
            Prev
          </Button>
          <div className="pageNumber rowCss">
            {pageArr.map((val, key) => {
              return (
                <div key={pageArr[key]}>
                  <ToggleButton
                    className="pageButton"
                    variant="outline-dark"
                    type="checkbox"
                    checked={checked === key}
                    onClick={() => {
                      setChecked(key);
                      setPage(pageArr[key]);
                    }}
                  >
                    {pageArr[key] + 1}
                  </ToggleButton>
                </div>
              );
            })}
          </div>
          <Button
            variant="outline-dark"
            style={{ marginLeft: "10px" }}
            onClick={() => {
              if (page < 12) {
                setPage(page + 1);
                setChecked(page + 1);
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

export default RBTdocument;
