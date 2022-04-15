import React, { useState, useEffect } from "react";
import Robots from "./components/Robots";
import A3_Header from "./components/Header";
import A3_Home from "./components/Home";

class A3 extends React.Component {
  componentDidMount() {
    const dfMessanger_bot = document.querySelector("df-messenger");
    //一般文字選擇
    dfMessanger_bot.addEventListener(
      "df-user-input-entered",
      this.MarkUserTalkWithRobot,
      false
    );
    //列表選擇
    dfMessanger_bot.addEventListener(
      "df-list-element-clicked",
      this.MarkUserTalkWithRobot,
      false
    );
  }

  MarkUserTalkWithRobot(e) {
    //使用者說話
    //console.log(e.detail.input);
    //list選擇
    //console.log(e.detail.element.title_);

    //使用者輸入型別
    let UserInputType;

    switch (e.type) {
      case "df-user-input-entered":
        UserInputType = e.detail.input;
        break;
      case "df-list-element-clicked":
        UserInputType = e.detail.element.title_;
        break;
    }

    //提取使用者輸入內容
    const UserInput = sessionStorage.getItem("UserInput");
    const UserStudentId = sessionStorage.getItem("StudentId");
    //輸出暫存位置
    let UserOptString = null;
    //對話暫存紀錄
    let OptNode = {
      StudentId: UserStudentId,
      Mark: {
        Saying: [],
        Time: [],
      },
    };
    if (UserInput == null) {
      //尚未開始使用直接塞入
      sessionStorage.setItem("UserInput", null);
      //資料塞入預設Node
      OptNode.Mark.Saying.push(UserInputType);
      OptNode.Mark.Time.push(new Date());
      //建立第一次樣式
      UserOptString = OptNode;
    } else {
      //JSON轉陣列
      let StorageUserInput = JSON.parse(UserInput);
      console.log("儲存資料", StorageUserInput);
      StorageUserInput.Mark.Saying.push(UserInputType);
      StorageUserInput.Mark.Time.push(new Date());
      UserOptString = StorageUserInput;
    }
    //轉字串後塞入sessionStorage
    UserOptString = JSON.stringify(UserOptString);
    console.log("目前資料(字串)", UserOptString);
    sessionStorage.setItem("UserInput", UserOptString);
  }

  render() {
    return (
      <div className="A3">
        <A3_Header />
        <div className="container">
          <A3_Home />
        </div>
        <Robots />
      </div>
    );
  }
}

export default A3;
