import React, { useState, useEffect } from 'react';
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import axios from 'axios';

const SelfInfo = () =>{
    const [UserData, setUserData] = useState("");

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

    const ChangePassword = () =>{
        const Block = document.getElementById('BlockDiv');
        const PasswordChange = document.getElementById('PasswordChangeDiv')
        Block.style.visibility = 'visible';
        PasswordChange.style.visibility = 'visible';
    }

    const submitPassword = () => {
        const getOldPassword = document.getElementById('OldPassword').value;
        const getNewPasswordFirst = document.getElementById('NewPassword_First').value;
        const getNewPasswordCheck = document.getElementById('NewPassword_Check').value;
        const GetSid = sessionStorage.getItem('Sid');
        if(getOldPassword == '' || getNewPasswordFirst == ''|| getNewPasswordCheck == ''){
            alert('未輸入完成!')
        }
        if(getNewPasswordCheck === getNewPasswordFirst){
            axios({
            method: 'POST',
            data:{
                _id:GetSid,
                OldPassword:getOldPassword,
                NewPassword:getNewPasswordFirst,
            },
            withCredentials:true,
            url: process.env.REACT_APP_AXIOS_CHECKPASSWORD
            }).then( response => {

            })
        }else{
            alert('新密碼不一致')
        }

       
    }
    const cancelPassword = () => {
        const Block = document.getElementById('BlockDiv');
        const PasswordChange = document.getElementById('PasswordChangeDiv')
        Block.style.visibility = 'hidden';
        PasswordChange.style.visibility = 'hidden';
    }
    return(
        <>
        <div className="PasswordChange" id="PasswordChangeDiv">
            <h3 className="PasswordChange_Title">修改密碼</h3>
            <div className="PasswordLine">
                <h5 className="PasswordLine_Title">輸入舊密碼</h5>
                <TextField id="OldPassword" label="舊密碼" variant="standard" />
            </div>
            <div className="PasswordLine">
                <h5 className="PasswordLine_Title">輸入新密碼</h5>
                <TextField id="NewPassword_First" label="新密碼" variant="standard" />
            </div>
            <div className="PasswordLine">
                <h5 className="PasswordLine_Title">確認新密碼</h5>
                <TextField id="NewPassword_Check" label="再次輸入" variant="standard" />
            </div>
            <div className="PasswordBtn">
                <Button id="submitPassword"
                    variant="contained" 
                    color="success"
                    onClick={submitPassword}>確認修改</Button>
                <Button id="cancel" 
                    variant="outlined" 
                    color="error"
                    onClick={cancelPassword}>取消</Button>
            </div>
            
        </div>
        <div className="Block" id='BlockDiv'></div>
        <h1 className="ProfileTitle">PROFILE</h1>
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
                    marginLeft:"1em",
                    marginTop:"1em",
                    height:"1.5em",
                    fontSize: "1em",
                }}
                onClick={ChangePassword}
                >修改密碼</Button>
            </div>
        </div>
        <div className="ChangePassword">
                
        </div>
        </>
    )
}

export default SelfInfo;