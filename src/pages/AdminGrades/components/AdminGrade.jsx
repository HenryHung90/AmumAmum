import { useNavigate } from "react-router-dom";
import { Button, ToggleButton } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import Grade from "../../Grade/components/Grade";
import axios from "axios";

//引用Grade，並且用選取到的id找到該學生的名子
function AdminGrade() {
  const Refresh = useNavigate("");
  const [Member, setMember] = useState([]);
  const [searchID, setSearchID] = useState("");
  let MemberTemp = [];
  let GetSid = sessionStorage.getItem("Sid");
  const [checked, setChecked] = useState();
  const [searching, setSearching] = useState(0);
  useEffect(async () => {
    await axios.get(process.env.REACT_APP_AXIOS_READ).then((response) => {
      MemberTemp = response.data;
      for (let i = 0; i < MemberTemp.length; i++) {
        MemberTemp[i].Password = "";
      }
      setMember(MemberTemp);
    });
    await axios({
      method: "POST",
      data: {
        _id: GetSid,
      },
      withCredentials: true,
      url: process.env.REACT_APP_AXIOS_USERINFO,
    }).then((response) => {
      setSearchID(response.data.StudentId);
    });
  }, []);
  function RenderGrades() {
    if (searching) {
      return <Grade StudentId={searchID} />;
    } else {
      return <div></div>;
    }
  }
  return (
    <div className="AdminGrade">
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
      <h1>AdminGrade</h1>
      <div className="AdminGradeContainer">
        <div className="AdminmemberTable">
          {Member.map((val, key) => {
            return (
              <div>
                <ToggleButton
                  className="studentButton"
                  variant="outline-dark"
                  type="checkbox"
                  checked={checked === key}
                  onClick={() => {
                    let tmp = Member[key].StudentId.toString();
                    setSearchID(tmp);
                    setChecked(key);
                    setSearching(0);
                  }}
                >
                  {Member[key].StudentId}
                </ToggleButton>
              </div>
            );
          })}
        </div>
        <Button
          variant="outline-dark"
          onClick={() => {
            setSearching(1);
          }}
        >
          Search
        </Button>
        <div className="studentCard ">
          <RenderGrades />
        </div>
      </div>
    </div>
  );
}

export default AdminGrade;
