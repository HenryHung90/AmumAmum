import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { Card, ToggleButton } from "react-bootstrap";

function ThePlan() {
  return (
    <div className="AnoutUscontainerThePlan">
      <h3>(一)計畫名稱：</h3>
      <h5>整合式STEM學習環境輔助遊戲程式設計之教學實踐設計與評估</h5>
      <h3>(二)計畫內容：</h3>
      <h5>
        探討學生對於學習資料結構樹的單元，且以三種不同方式的學習情況，分別為傳統式學習,互動式學習,遊戲式學習
        <br />
        搭配Google表單的課後測驗，來判斷學生的學習狀況，並且會詳細記錄學生的學習動作，分析學生的學習模式，以改進不足之處
      </h5>
      <div style={{ marginLeft: "100px" }}>
        <h4>1.傳統式學習：</h4>
        <h5>給予學生單純的文字教材，讓學生閱讀完這些教材之後，就去做測驗</h5>
        <h4>2.互動式學習：</h4>
        <h5>
          讓學生自己實際動手操作，了解插入,搜尋,移除等動作是如何做的，並將這些過程演示出來
          <br />
          讓學生能夠仔細的了解每一個步驟的前因後果，提升學生的學習成效
        </h5>
        <h4>3.遊戲式學習：</h4>
        <h5>
          透過遊戲讓學生了解每個樹的規則，並且與電腦來回對戰，刺激學生的勝負欲
          <br />
          進而讓學生的學習成效有所提升
        </h5>
      </div>
      <h3>
        (三)受測人員：
        <span style={{ fontSize: "1.25rem" }}>
          元智大學資訊傳播學系一年級至三年級學生
        </span>
      </h3>
      <h3>
        (四)指導教授：<span style={{ fontSize: "1.25rem" }}>張家榮</span>
      </h3>
      <h3>
        (五)製作人員：
        <span style={{ fontSize: "1.25rem" }}>温存正 洪立恒 林意軒</span>
      </h3>
    </div>
  );
}
function Thedeveloper(params) {
  return (
    <div className="AboutUsChildContainer">
      <div style={{ display: "flex", flexDirection: "row" }}>
        <Card>
          <h3>Developer</h3>
          <Card.Img variant="top" src="/Img/WEN.png" />
          <Card.Body>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <h2>Wen</h2>
              <h4>AKA 腳底有風的男人</h4>
            </div>
            <span>Job</span>
            <Card.Text>前端網頁，google表單測驗題，文字教材編輯</Card.Text>
            <span>Skill</span>
            <Card.Text>React/ node.js/ mongodb</Card.Text>
            <span>Contact</span>
            <div className="contactImg">
              <a
                href="https://www.instagram.com/chao_brother/?hl=zh-tw"
                target="_blank"
              >
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABmJLR0QA/wD/AP+gvaeTAAADBUlEQVRoge2avU8UQRjGfxqw4aJYqlxh5MNIYxQojFqI16I0/ifGfwCjliqFH0Gp7cSI0eMIkPgnKBBLsFIwAQQbDot5x1su7OzOh8wW9yRP9pKb95n32Z3ZeXdnoYUW/guOWLbvA24DFeAMUAY6AuXyG1gBVoEq8BZYDqT9DwNADdg7ZH4GroQw0A6MA/UIJjTrwFOgzdXESWA2ooFm1iQnK7QTZyhlcQE4ZmNkvABJp/FJXhMDxJ0TWawDl/MYKeKQamY1y0Rf5ATfA13C6Yy2PSYj9yIb6UrkUs5oezeZ+NEmIzdNLguGiunPZfzP6howAdxCDdUOoS5vXgHrKbHTqCtRBj5k9LNkMrLhYWAbGAOOmzoQnADuS4xrfxumDlxFV9l/S6wAL1FnbUu4CLxg//AdkFjXfoMaWaUxSXuB+RwxczTuOl0eZoIZ2aZxJa6TPvbT5tI1iR0EdmIaGZO4XksTSTPdovEwlpE11KSFfMMpjbOi0elwMoIYmZCYiocJzWHReu1qpHlBtMGUHO94aGhojSljKwvYnI1eiVmyjDuIi6JlW+sFMVKSmM0ARjZFq+RqxGdohURdjs75+Bg5LcfvHhoaWuOUq4CPkQtyXPDQ0NAa/a4CPkZG5PjGQ0NDa4wYW1nAZqIlF8Q5y9gka6LRCfyyjA1iZA9VigOcBX44xCdLlEcO8cGM7KBKcVAF4JpF7E/gqsQOEblo3GN/Gd9NvreTNeCcxJRRdy2XvoMa0WYGEzrDwHPgK2qx2wS+AM+AG4l2Qx4mjEZ8HnV3gAeoSZuFTtSc+OPRn/FRN8TLh3VUFTsKnEeVHSX5PQpMYn93OojGlw/VAB0cFj8mE29eEDNfRRYIn0x/9hD/TOelfoxIxUwBksyi8WpoXAR2C5BsGnfJua0Aas8udsJpfJzXBKiNxyIOsXkst95AbTwWadNnhnyL7YFoQ+3ZxdyK20UNJ+ft6ST6gXcRTFSBS3kStP2Eo4fGJxxlVNVbMkbkxxbqE44VGp9wfAuk3UILrvgLg845wjFhUzAAAAAASUVORK5CYII=" />
              </a>
              <a href="https://github.com/WenHank" target="_blank">
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABmJLR0QA/wD/AP+gvaeTAAAEJklEQVRoge3ZS2heRRQH8J8xIalpah82VolWqa9INYIKaqoixUerBRFB8LURxSeRom4VN+JGLBFcuXHlRtGFz6ogqPjoopHWapoarVVbkJpYm/pI/FzM/ezNzfeY+73SRf5wyM29M+ec/8yZmTPnYwHHFo5roK5luBqDOB9r0Ivu5PthHMB3+Bof4yNMNNCHmtGJO/AuplHIKdN4G7cnulqORdiMnyKcjZV9eBRdrSKxAWMNJJCV3bi+mQQ6saWJBLLysjDzDcXJ2NZCEkX5QtgwGoIzhOluNYmijCY+1IWV+GYeSRRlDKtqJdFlfsKpUpjVtEW/eAw4n5XhvCQ2VFH4hBB2l+BJfF+Hc7vwOAaE7OC5Ku2viyWxSPVzoi/TpyshdATvYwjrcLaQonTjnOTdg3gDh/AIjs/oGqhie1RkiG2uoqig/OnbEWOgSttTIuwPVVPeKS7taPhBlcKqCPs/ysxKW0bJrTg1wtjqOp2thDURbfpwS/pFlsjdkcYujGxXCy6KbHdX+p80kWVYH6lkbWS7WjAQ2e5aLCn14WZx2+WksCCbhX78HenLpmKn9IysizT0En6p39+y2IXXItteWXxIE+mP7PxKrEd14NXIdueVejmq+lT+g/a63ayOcyN8KQgJLWbPyPIIA5PCPbvZmIpst6L4kB7dnoiOPULlpZDDqVpwYup5WkhnYKnZlZ//fU4TKTa4Br8lnSeEdKRlBYEEO1L+tDvqcNGf5UKxomQ5a0IY6c+wHXvwq7BD7UnJbc3xfRaGlV8XhxO/CjhY7JBm9K2QoX6IESE1Hxdm5/dEJh0l3Ey0CeHVg8WJrBRSo9OFQ/MGYbH3Mzu0xhMinwsVwTOFMOtNKVua/L1XqHI0A8OJ/ilh0I4kz/vxA/ZiZ0JkvJSCp8Vfhv4Qf4DmwX34N4cfT5VSsj6HgoIwSvdoTP24E8/mJFEQImYOTsBfORUV8KmQ82RvejHoFgZjTw12/5S6F2VH8x2ly5V3Jp2ewUllnDogXHM/ERbhXmF3mUy+r3B0wV6Aq4QRXRzDuATewo3lPm5SfssbFO7g+8u0yYbdY0KFsoje5N1URP8Y2ViJZZvw+0WpjiPJ90uFrbgSicEKNgYbQGa3uZfCORiqoKA4lWuFMDwkrKuDQihtxU3VDOD+Ook8FGFDB74qo+DNGAURaKtgo5pslyMDvwIzJZTMaNz58UANJGZwWV5DL5RRNiEU1vpExGkFnFUDkS21GOrABzkN5TlLOnLqfk++AuAsLJEvlvMiVu9OIc+rC6uFn5Pni8gOnFYXgxR6hJO01US2asBMZNEhpNildrNGE5nB85pc6LgYX5ZxIC9K6RjB5Q3xNALtwhac/h1lXw16fk71H8PDWlNumoM2IW15XYVMtAI2JX03qu9MWsACmoX/ALeEN4NrGxnlAAAAAElFTkSuQmCC" />
              </a>
            </div>
          </Card.Body>
        </Card>
        <Card>
          <h3>Developer</h3>
          <Card.Img variant="top" src="/Img/BEAN.png" />
          <Card.Body>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <h2>Bean Bean</h2>
              <h4>AKA Youth 大團長</h4>
            </div>
            <span>Job</span>
            <Card.Text>後端網頁，架設Server，架設資料庫</Card.Text>
            <span>Skill</span>
            <Card.Text>React/ node.js/ mongodb</Card.Text>
            <span>Contact</span>
            <div className="contactImg">
              <a
                href="https://www.instagram.com/hung_dodo0427/?hl=zh-tw"
                target="_blank"
              >
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABmJLR0QA/wD/AP+gvaeTAAADBUlEQVRoge2avU8UQRjGfxqw4aJYqlxh5MNIYxQojFqI16I0/ifGfwCjliqFH0Gp7cSI0eMIkPgnKBBLsFIwAQQbDot5x1su7OzOh8wW9yRP9pKb95n32Z3ZeXdnoYUW/guOWLbvA24DFeAMUAY6AuXyG1gBVoEq8BZYDqT9DwNADdg7ZH4GroQw0A6MA/UIJjTrwFOgzdXESWA2ooFm1iQnK7QTZyhlcQE4ZmNkvABJp/FJXhMDxJ0TWawDl/MYKeKQamY1y0Rf5ATfA13C6Yy2PSYj9yIb6UrkUs5oezeZ+NEmIzdNLguGiunPZfzP6howAdxCDdUOoS5vXgHrKbHTqCtRBj5k9LNkMrLhYWAbGAOOmzoQnADuS4xrfxumDlxFV9l/S6wAL1FnbUu4CLxg//AdkFjXfoMaWaUxSXuB+RwxczTuOl0eZoIZ2aZxJa6TPvbT5tI1iR0EdmIaGZO4XksTSTPdovEwlpE11KSFfMMpjbOi0elwMoIYmZCYiocJzWHReu1qpHlBtMGUHO94aGhojSljKwvYnI1eiVmyjDuIi6JlW+sFMVKSmM0ARjZFq+RqxGdohURdjs75+Bg5LcfvHhoaWuOUq4CPkQtyXPDQ0NAa/a4CPkZG5PjGQ0NDa4wYW1nAZqIlF8Q5y9gka6LRCfyyjA1iZA9VigOcBX44xCdLlEcO8cGM7KBKcVAF4JpF7E/gqsQOEblo3GN/Gd9NvreTNeCcxJRRdy2XvoMa0WYGEzrDwHPgK2qx2wS+AM+AG4l2Qx4mjEZ8HnV3gAeoSZuFTtSc+OPRn/FRN8TLh3VUFTsKnEeVHSX5PQpMYn93OojGlw/VAB0cFj8mE29eEDNfRRYIn0x/9hD/TOelfoxIxUwBksyi8WpoXAR2C5BsGnfJua0Aas8udsJpfJzXBKiNxyIOsXkst95AbTwWadNnhnyL7YFoQ+3ZxdyK20UNJ+ft6ST6gXcRTFSBS3kStP2Eo4fGJxxlVNVbMkbkxxbqE44VGp9wfAuk3UILrvgLg845wjFhUzAAAAAASUVORK5CYII=" />
              </a>
              <a href="https://github.com/HenryHung90" target="_blank">
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABmJLR0QA/wD/AP+gvaeTAAAEJklEQVRoge3ZS2heRRQH8J8xIalpah82VolWqa9INYIKaqoixUerBRFB8LURxSeRom4VN+JGLBFcuXHlRtGFz6ogqPjoopHWapoarVVbkJpYm/pI/FzM/ezNzfeY+73SRf5wyM29M+ec/8yZmTPnYwHHFo5roK5luBqDOB9r0Ivu5PthHMB3+Bof4yNMNNCHmtGJO/AuplHIKdN4G7cnulqORdiMnyKcjZV9eBRdrSKxAWMNJJCV3bi+mQQ6saWJBLLysjDzDcXJ2NZCEkX5QtgwGoIzhOluNYmijCY+1IWV+GYeSRRlDKtqJdFlfsKpUpjVtEW/eAw4n5XhvCQ2VFH4hBB2l+BJfF+Hc7vwOAaE7OC5Ku2viyWxSPVzoi/TpyshdATvYwjrcLaQonTjnOTdg3gDh/AIjs/oGqhie1RkiG2uoqig/OnbEWOgSttTIuwPVVPeKS7taPhBlcKqCPs/ysxKW0bJrTg1wtjqOp2thDURbfpwS/pFlsjdkcYujGxXCy6KbHdX+p80kWVYH6lkbWS7WjAQ2e5aLCn14WZx2+WksCCbhX78HenLpmKn9IysizT0En6p39+y2IXXItteWXxIE+mP7PxKrEd14NXIdueVejmq+lT+g/a63ayOcyN8KQgJLWbPyPIIA5PCPbvZmIpst6L4kB7dnoiOPULlpZDDqVpwYup5WkhnYKnZlZ//fU4TKTa4Br8lnSeEdKRlBYEEO1L+tDvqcNGf5UKxomQ5a0IY6c+wHXvwq7BD7UnJbc3xfRaGlV8XhxO/CjhY7JBm9K2QoX6IESE1Hxdm5/dEJh0l3Ey0CeHVg8WJrBRSo9OFQ/MGYbH3Mzu0xhMinwsVwTOFMOtNKVua/L1XqHI0A8OJ/ilh0I4kz/vxA/ZiZ0JkvJSCp8Vfhv4Qf4DmwX34N4cfT5VSsj6HgoIwSvdoTP24E8/mJFEQImYOTsBfORUV8KmQ82RvejHoFgZjTw12/5S6F2VH8x2ly5V3Jp2ewUllnDogXHM/ERbhXmF3mUy+r3B0wV6Aq4QRXRzDuATewo3lPm5SfssbFO7g+8u0yYbdY0KFsoje5N1URP8Y2ViJZZvw+0WpjiPJ90uFrbgSicEKNgYbQGa3uZfCORiqoKA4lWuFMDwkrKuDQihtxU3VDOD+Ook8FGFDB74qo+DNGAURaKtgo5pslyMDvwIzJZTMaNz58UANJGZwWV5DL5RRNiEU1vpExGkFnFUDkS21GOrABzkN5TlLOnLqfk++AuAsLJEvlvMiVu9OIc+rC6uFn5Pni8gOnFYXgxR6hJO01US2asBMZNEhpNildrNGE5nB85pc6LgYX5ZxIC9K6RjB5Q3xNALtwhac/h1lXw16fk71H8PDWlNumoM2IW15XYVMtAI2JX03qu9MWsACmoX/ALeEN4NrGxnlAAAAAElFTkSuQmCC" />
              </a>
            </div>
          </Card.Body>
        </Card>
        <Card>
          <h3>Secretary</h3>
          <Card.Img variant="top" src="/Img/LIN.jpg" />
          <Card.Body>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <h2>林意軒</h2>
              <h4>AKA 資傳系會長</h4>
            </div>
            <span>Job</span>
            <Card.Text>資料分析與整理，問卷設計與統整</Card.Text>
            <span>Skill</span>
            <Card.Text>PhotoShop/ Illustrator </Card.Text>
            <span>Contact</span>
            <div className="contactImg">
              <a
                href="https://www.instagram.com/____bomb_/?hl=zh-tw"
                target="_blank"
              >
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABmJLR0QA/wD/AP+gvaeTAAADBUlEQVRoge2avU8UQRjGfxqw4aJYqlxh5MNIYxQojFqI16I0/ifGfwCjliqFH0Gp7cSI0eMIkPgnKBBLsFIwAQQbDot5x1su7OzOh8wW9yRP9pKb95n32Z3ZeXdnoYUW/guOWLbvA24DFeAMUAY6AuXyG1gBVoEq8BZYDqT9DwNADdg7ZH4GroQw0A6MA/UIJjTrwFOgzdXESWA2ooFm1iQnK7QTZyhlcQE4ZmNkvABJp/FJXhMDxJ0TWawDl/MYKeKQamY1y0Rf5ATfA13C6Yy2PSYj9yIb6UrkUs5oezeZ+NEmIzdNLguGiunPZfzP6howAdxCDdUOoS5vXgHrKbHTqCtRBj5k9LNkMrLhYWAbGAOOmzoQnADuS4xrfxumDlxFV9l/S6wAL1FnbUu4CLxg//AdkFjXfoMaWaUxSXuB+RwxczTuOl0eZoIZ2aZxJa6TPvbT5tI1iR0EdmIaGZO4XksTSTPdovEwlpE11KSFfMMpjbOi0elwMoIYmZCYiocJzWHReu1qpHlBtMGUHO94aGhojSljKwvYnI1eiVmyjDuIi6JlW+sFMVKSmM0ARjZFq+RqxGdohURdjs75+Bg5LcfvHhoaWuOUq4CPkQtyXPDQ0NAa/a4CPkZG5PjGQ0NDa4wYW1nAZqIlF8Q5y9gka6LRCfyyjA1iZA9VigOcBX44xCdLlEcO8cGM7KBKcVAF4JpF7E/gqsQOEblo3GN/Gd9NvreTNeCcxJRRdy2XvoMa0WYGEzrDwHPgK2qx2wS+AM+AG4l2Qx4mjEZ8HnV3gAeoSZuFTtSc+OPRn/FRN8TLh3VUFTsKnEeVHSX5PQpMYn93OojGlw/VAB0cFj8mE29eEDNfRRYIn0x/9hD/TOelfoxIxUwBksyi8WpoXAR2C5BsGnfJua0Aas8udsJpfJzXBKiNxyIOsXkst95AbTwWadNnhnyL7YFoQ+3ZxdyK20UNJ+ft6ST6gXcRTFSBS3kStP2Eo4fGJxxlVNVbMkbkxxbqE44VGp9wfAuk3UILrvgLg845wjFhUzAAAAAASUVORK5CYII=" />
              </a>
            </div>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}
function AboutUs() {
  const Refresh = useNavigate("");
  const [btnrefresh, setBtnrefresh] = useState(0);
  if (btnrefresh) {
    return (
      <div className="AnoutUscontainer">
        <img
          onClick={() => {
            Refresh("/Profile");
          }}
          style={{
            position: "absolute",
            left: "100px",
            top: "20px",
            cursor: "pointer",
          }}
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAABmJLR0QA/wD/AP+gvaeTAAAEs0lEQVR4nO2ba4hVVRTHf86MzuiUlaM9dCqmPlhCWVKJpB/ELDCH/GC+SFPCID9kGSiFhUREUNEDKqihJ/gheqE9hDRSYghTrBhMG3wxPbFEZrJxbOz2Ye3D2nvunTv3nHvO3nPp/uBy556791r/ve8+e6+19xmoUqVKlTCMBJYDnwHtwONAQ1BFnmgE7geOArkBry+BmnDSsqUJeAw4jtvoX4DvrM/zQgnMikuB54Ae3Ib/CKwG6oEJ1vUHw8hMn6uBN4A+3IbvARbiDvV51vd3+JWZPtcDbwP9uA3/CmgFRhSo86opcxo414/M9JkJbMVt9FlzbXqRejXAr6b81ow1pk4N8qvuxm14HzIKrirBxkyr3j3ZyEyfemAFcAC34T3AC0BzDFtPo6Pl4nRlZsNq4Dfchv8OPAKcn8Bep7GxKy2BWbIet+GHgDXA6IT2JuOuDqXcMsG4ADiFiP0JWArUlWmzGTc+OAO8CIwr024m3IYKbU3RbgvwDjIHRPb/BJal6CMVbkEFLsjA/jXkL6NvMozigkagGxG2I0M/d+LmC51I5wwLoiUrB8zI0M+FwIeWr25gbob+SmYSGtu/78HfWnRuOA0s8uBzSNrQwMXHsrUE6DU++5FEKiiT0V+lzZPPWcBfxmev+RyU99CYf5Inn7eit98JYIonvwW5EZ2gnvHodwGaZncC53j0ncd2dIb2GbltRDv/JY9+85hrCdno0W8NEofkgH+B+R5957EXzQbHePTbDPxhfB9F0vNE1JYp5CQSuTUiKfLuMu2VSrd5zUdS8BPA1558O9Qiu7s54AjFs8OlQBey/9eSgu86YL/xfRw4LwWbibgXnQvuGqRMHdJ4O+1tAy4p03erZXNDmbYSUw/8bER8T+Fd30XknwLlkOBmE+UdiXUYWwcH8e2FDWijbi/w/U50qN4EfIzbEfuBGxL6fsCyEyxCHItMiIX29qaiAp+yrs9G7+Ec8A8yGuLuMjWhucJrcYWnyZNoY262rkfJUz9w+YA6o5AYwj492gGMj+k7GlGHYqtOkYvQX2KLudYE/G2ufVCk7jTgB7QTDgPXxvBtb9b6yk0K8jIaoS0GXkGFzR6i7hhgs1X+JKVvusyw6i2JrTpFWtBRYL/aKW2GHgE8inRglGeUMrGNRJbWHPBEbNUpsxh3q7sDuCKmjVXonkMPcF0JdY6Z8q/H9JUJ45Bd5FkkD7dXop1wDNknLEa7Kbstob9hyTp0JO2ieGd+Ycrt9KDLK2+hnbC2SLnPTZntPkT5pAEJc6NJcbCT5z2mzKeedHllDjoKBpvkuob4vuKJNmJ7yY8Ux6JLZ6yssJKeyXvevDeQ/yTJVDTOOOhNUQC+RX7lvQOub0IPayb4FuWT6GyyH/dplGhv8pu4BivpFgBtYC3yHCLIyfE08/cncQ1WWgfY93e0HK4x72eRBzNjUWkdYOsdhaS+d5vPHyEhc2KDlYC9W9SHZH6jkfv/2SCKPLMCDYgeQtf+zSFF+SR6pjiHPqt4CrgspChf1FH4nyzuCynKJ8vIb/y7QRV5Zh9u4zuQHOB/wXTcxh8GJgZV5Bn7kfou4MqwcsKwEngYOWuoUqVKlVT4D0pjfHbbAVIsAAAAAElFTkSuQmCC"
        />
        <h1>AboutUs</h1>
        <div style={{ display: "flex", flexDuration: "row" }}>
          <ToggleButton
            className="aboutusButton"
            variant="outline-dark"
            type="checkbox"
            checked={btnrefresh === 0}
            onClick={() => {
              setBtnrefresh(0);
            }}
          >
            The Plan
          </ToggleButton>
          <ToggleButton
            className="aboutusButton"
            variant="outline-dark"
            type="checkbox"
            checked={btnrefresh === 1}
            onClick={() => {
              setBtnrefresh(1);
            }}
          >
            The Developer
          </ToggleButton>
        </div>
        <Thedeveloper />
      </div>
    );
  } else {
    return (
      <div className="AnoutUscontainer">
        <img
          onClick={() => {
            Refresh("/Profile");
          }}
          style={{
            position: "absolute",
            left: "100px",
            top: "20px",
            cursor: "pointer",
          }}
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAABmJLR0QA/wD/AP+gvaeTAAAEs0lEQVR4nO2ba4hVVRTHf86MzuiUlaM9dCqmPlhCWVKJpB/ELDCH/GC+SFPCID9kGSiFhUREUNEDKqihJ/gheqE9hDRSYghTrBhMG3wxPbFEZrJxbOz2Ye3D2nvunTv3nHvO3nPp/uBy556791r/ve8+e6+19xmoUqVKlTCMBJYDnwHtwONAQ1BFnmgE7geOArkBry+BmnDSsqUJeAw4jtvoX4DvrM/zQgnMikuB54Ae3Ib/CKwG6oEJ1vUHw8hMn6uBN4A+3IbvARbiDvV51vd3+JWZPtcDbwP9uA3/CmgFRhSo86opcxo414/M9JkJbMVt9FlzbXqRejXAr6b81ow1pk4N8qvuxm14HzIKrirBxkyr3j3ZyEyfemAFcAC34T3AC0BzDFtPo6Pl4nRlZsNq4Dfchv8OPAKcn8Bep7GxKy2BWbIet+GHgDXA6IT2JuOuDqXcMsG4ADiFiP0JWArUlWmzGTc+OAO8CIwr024m3IYKbU3RbgvwDjIHRPb/BJal6CMVbkEFLsjA/jXkL6NvMozigkagGxG2I0M/d+LmC51I5wwLoiUrB8zI0M+FwIeWr25gbob+SmYSGtu/78HfWnRuOA0s8uBzSNrQwMXHsrUE6DU++5FEKiiT0V+lzZPPWcBfxmev+RyU99CYf5Inn7eit98JYIonvwW5EZ2gnvHodwGaZncC53j0ncd2dIb2GbltRDv/JY9+85hrCdno0W8NEofkgH+B+R5957EXzQbHePTbDPxhfB9F0vNE1JYp5CQSuTUiKfLuMu2VSrd5zUdS8BPA1558O9Qiu7s54AjFs8OlQBey/9eSgu86YL/xfRw4LwWbibgXnQvuGqRMHdJ4O+1tAy4p03erZXNDmbYSUw/8bER8T+Fd30XknwLlkOBmE+UdiXUYWwcH8e2FDWijbi/w/U50qN4EfIzbEfuBGxL6fsCyEyxCHItMiIX29qaiAp+yrs9G7+Ec8A8yGuLuMjWhucJrcYWnyZNoY262rkfJUz9w+YA6o5AYwj492gGMj+k7GlGHYqtOkYvQX2KLudYE/G2ufVCk7jTgB7QTDgPXxvBtb9b6yk0K8jIaoS0GXkGFzR6i7hhgs1X+JKVvusyw6i2JrTpFWtBRYL/aKW2GHgE8inRglGeUMrGNRJbWHPBEbNUpsxh3q7sDuCKmjVXonkMPcF0JdY6Z8q/H9JUJ45Bd5FkkD7dXop1wDNknLEa7Kbstob9hyTp0JO2ieGd+Ycrt9KDLK2+hnbC2SLnPTZntPkT5pAEJc6NJcbCT5z2mzKeedHllDjoKBpvkuob4vuKJNmJ7yY8Ux6JLZ6yssJKeyXvevDeQ/yTJVDTOOOhNUQC+RX7lvQOub0IPayb4FuWT6GyyH/dplGhv8pu4BivpFgBtYC3yHCLIyfE08/cncQ1WWgfY93e0HK4x72eRBzNjUWkdYOsdhaS+d5vPHyEhc2KDlYC9W9SHZH6jkfv/2SCKPLMCDYgeQtf+zSFF+SR6pjiHPqt4CrgspChf1FH4nyzuCynKJ8vIb/y7QRV5Zh9u4zuQHOB/wXTcxh8GJgZV5Bn7kfou4MqwcsKwEngYOWuoUqVKlVT4D0pjfHbbAVIsAAAAAElFTkSuQmCC"
        />
        <h1>AboutUs</h1>
        <div style={{ display: "flex", flexDuration: "row" }}>
          <ToggleButton
            className="aboutusButton"
            variant="outline-dark"
            type="checkbox"
            checked={btnrefresh === 0}
            onClick={() => {
              setBtnrefresh(0);
            }}
          >
            The Plan
          </ToggleButton>
          <ToggleButton
            className="aboutusButton"
            variant="outline-dark"
            type="checkbox"
            checked={btnrefresh === 1}
            onClick={() => {
              setBtnrefresh(1);
            }}
          >
            The Developer
          </ToggleButton>
        </div>
        <ThePlan />
      </div>
    );
  }
}

export default AboutUs;
