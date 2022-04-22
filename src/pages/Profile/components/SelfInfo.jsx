import React, { useState, useEffect} from "react";
import {useNavigate} from 'react-router-dom';
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import bcryptjs from "bcryptjs";
import axios from "axios";

const SelfInfo = ({Logout}) => {
  /////////////////身份核對///////////////////
  const [UserData, setUserData] = useState("");
  const Refresh = useNavigate();

  useEffect(() => {
    const GetSid = sessionStorage.getItem("Sid");
    axios({
      method: "POST",
      data: {
        _id: GetSid,
      },
      withCredentials: true,
      url: process.env.REACT_APP_AXIOS_USERINFO,
    }).then((response) => {
      setUserData(response.data);
    });
  }, []);

  //////////////修改密碼/////////////////////
  const ChangePassword = () => {
    const Block = document.getElementById("BlockDiv");
    const PasswordChange = document.getElementById("PasswordChangeDiv");
    Block.style.visibility = "visible";
    PasswordChange.style.visibility = "visible";
  };
  //密碼修改送出
  const submitPassword = () => {
    const getOldPassword = document.getElementById("OldPassword").value;
    const getNewPasswordFirst =
      document.getElementById("NewPassword_First").value;
    const getNewPasswordCheck =
      document.getElementById("NewPassword_Check").value;
    const GetSid = sessionStorage.getItem("Sid");
    if (
      getOldPassword === "" ||
      getNewPasswordFirst === "" ||
      getNewPasswordCheck === ""
    ) {
      alert("未輸入完成!");
    }
    if (getNewPasswordCheck === getNewPasswordFirst) {
      bcryptjs.hash(getNewPasswordFirst, 10).then((hashed) => {
        axios({
          method: "POST",
          data: {
            _id: GetSid,
            OldPassword: getOldPassword,
            NewPassword: hashed,
          },
          withCredentials: true,
          url: process.env.REACT_APP_AXIOS_CHANGEPASSWORD,
        }).then((response) => {
          if (response.data === "success") {
            alert("修改完成");
            const Block = document.getElementById("BlockDiv");
            const PasswordChange = document.getElementById("PasswordChangeDiv");
            Block.style.visibility = "hidden";
            PasswordChange.style.visibility = "hidden";
          } else {
            alert("修改失敗，舊密碼不一致");
          }
        });
      });
    } else {
      alert("新密碼不一致");
    }
  };
  //取消變更
  const cancelPassword = () => {
    const Block = document.getElementById("BlockDiv");
    const PasswordChange = document.getElementById("PasswordChangeDiv");
    Block.style.visibility = "hidden";
    PasswordChange.style.visibility = "hidden";
  };
  ////////////////////////////////////////////////////////
  ///////////////////////變更Email////////////////////////
  const ChangeEmail = () => {
      const Block = document.getElementById("BlockDiv");
      const EmailChange = document.getElementById("EmailChangeDiv");
      Block.style.visibility = "visible";
      EmailChange.style.visibility = "visible";
  }
  const submitEmail = () => {
    const getNewEmail = document.getElementById("NewEmail")
    const GetSid = sessionStorage.getItem("Sid");
    const emailRule = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;
    // ^\w+：@ 之前必須以一個以上的文字&數字開頭，例如 abc
    // ((-\w+)：@ 之前可以出現 1 個以上的文字、數字或「-」的組合，例如 -abc-
    // (\.\w+))：@ 之前可以出現 1 個以上的文字、數字或「.」的組合，例如 .abc.
    // ((-\w+)|(\.\w+))*：以上兩個規則以 or 的關係出現，並且出現 0 次以上 (所以不能 –. 同時出現)
    // @：中間一定要出現一個 @
    // [A-Za-z0-9]+：@ 之後出現 1 個以上的大小寫英文及數字的組合
    // (\.|-)：@ 之後只能出現「.」或是「-」，但這兩個字元不能連續時出現
    // ((\.|-)[A-Za-z0-9]+)*：@ 之後出現 0 個以上的「.」或是「-」配上大小寫英文及數字的組合
    // \.[A-Za-z]+$/：@ 之後出現 1 個以上的「.」配上大小寫英文及數字的組合，結尾需為大小寫英文
    if(getNewEmail.value.search(emailRule)!== -1){
        axios({
          method: "POST",
          data: {
              _id:GetSid,
              Email:getNewEmail.value,
          },
          withCredentials: true,
          url:process.env.REACT_APP_AXIOS_CHANGEEMAIL,
      }).then(response=>{
        if (response.data === "success") {
            alert("修改完成");
            Refresh('/Login');           
          }
      })
    }else{
        alert('電子郵件格式不正確')
    }
  }
  const cancelEmail = () => {
    const Block = document.getElementById("BlockDiv");
    const PasswordChange = document.getElementById("EmailChangeDiv");
    Block.style.visibility = "hidden";
    PasswordChange.style.visibility = "hidden";
  }
  //////////////////Btn goStudy////////////////
  const goStudy = () => {
    switch (UserData.Access){
        case '1':
            Refresh('/A1')
            break
        case '2':
            Refresh('/A2')
            break
        case '3':
            Refresh('/A3')
            break
        default:
            alert('尚未連接學習檔案，請聯絡管理員！')
            break
    }
  }
  const goCheck = () => {

  }
  return (
    <>
      <div className="PasswordChange" id="PasswordChangeDiv">
        <h3 className="PasswordChange_Title">修改密碼</h3>
        <div className="PasswordLine">
          <h5 className="PasswordLine_Title">輸入舊密碼</h5>
          <TextField id="OldPassword" label="舊密碼" variant="standard"/>
        </div>
        <div className="PasswordLine">
          <h5 className="PasswordLine_Title">輸入新密碼</h5>
          <TextField id="NewPassword_First" label="新密碼" variant="standard" />
        </div>
        <div className="PasswordLine">
          <h5 className="PasswordLine_Title">確認新密碼</h5>
          <TextField
            id="NewPassword_Check"
            label="再次輸入"
            variant="standard"
          />
        </div>
        <div className="PasswordBtn">
          <Button
            id="submitPassword"
            variant="contained"
            color="success"
            onClick={submitPassword}
          >
            確認修改
          </Button>
          <Button
            id="cancel"
            variant="outlined"
            color="error"
            onClick={cancelPassword}
          >
            取消
          </Button>
        </div>
      </div>

      <div className="EmailChange" id="EmailChangeDiv">
        <h3 className="EmailChange_Title">修改電子郵件</h3>
        <div className="EmailLine">
          <h5 className="EmailLine_Title">輸入新Email</h5>
          <TextField id="NewEmail" label="新Email" variant="standard" />
        </div>
        <div className="EmailBtn">
          <Button
            id="submitEmail"
            variant="contained"
            color="success"
            onClick={submitEmail}
          >
            確認修改
          </Button>
          <Button
            id="cancelEmail"
            variant="outlined"
            color="error"
            onClick={cancelEmail}
          >
            取消
          </Button>
        </div>
      </div>
      <div className="Block" id="BlockDiv"></div>
      <h1 className="ProfileTitle"  style={{userSelect: 'none'}}>PROFILE</h1>
      <div className="SelfProfile">
        <div className="SelfProfile_Stand">
          <h3 className="SelfProfile_Title">元智大學 Yzu Ze University</h3>
          <h3 className="SelfProfile_subTitle">{UserData.StudentId}</h3>
        </div>
        <div className="SelfProfile_Self">
          <h3 className="SelfProfile_Text">{UserData.Name}</h3>
          <h3 className="SelfProfile_Text">{UserData.Email}</h3>
          <Button
            variant="contained"
            style={{
              marginLeft: "1em",
              marginTop: "1em",
              height: "1.5em",
              fontSize: "1em",
            }}
            onClick={ChangePassword}
          >
            修改密碼
          </Button>
          <Button
            variant="contained"
            style={{
              marginLeft: "1em",
              marginTop: "1em",
              height: "1.5em",
              fontSize: "1em",
            }}
            onClick={ChangeEmail}
          >
            修改電子郵件
          </Button>
             <Button
        variant="contained"
        type="submit"
        style={{
          marginLeft: "1em",
          marginTop: "1em",
          height: "1.5em",
          fontSize: "1em",
          backgroundColor: "black",
        }}
        onClick={Logout}
      >
        登出
      </Button>
        </div>
        <div className="Classroom"  style={{userSelect: 'none'}}>
            <div className="GoStudy" onClick={goStudy}>進入課程</div>
            <div className="GoCheck" onClick={goCheck}>待開放</div>
        </div>
      </div>
    </>
  );
};

export default SelfInfo;
