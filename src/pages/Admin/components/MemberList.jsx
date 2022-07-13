import React, { useState, useEffect } from "react";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import axios from "axios";
import * as XLSX from "xlsx";

const MemberList = () => {
  //////////取得名單////////////
  const [Member, setMember] = useState([]);
  const [Test, setTest] = useState("");

  //學員資料顯示
  let MemberTemp = [];
  //讀取學員
  useEffect(() => {
    axios.get(process.env.REACT_APP_AXIOS_READ).then((response) => {
      MemberTemp = response.data;
      for (let i = 0; i < MemberTemp.length; i++) {
        MemberTemp[i].Password = "";
      }
      setMember(MemberTemp);
    });
  }, []);
  //初始化Disabled
  useEffect(() => {
    Member.map((val, key) => {
      document.getElementById(`${key}_StudentId`).disabled = true;
      document.getElementById(`${key}_Password`).disabled = true;
      document.getElementById(`${key}_Email`).disabled = true;
      document.getElementById(`${key}_Access`).disabled = true;
      document.getElementById(`${key}_StudentId`).style.opacity = 0.5;
      document.getElementById(`${key}_Password`).style.opacity = 0.5;
      document.getElementById(`${key}_Email`).style.opacity = 0.5;
      document.getElementById(`${key}_Access`).style.opacity = 0.5;
    });
  }, [Member]);

  //Member useState----------------
  function StudentIdChange(e) {
    MemberTemp = Member;
    let FindId = e.target.id.split("_");
    MemberTemp[FindId[0]].StudentId = e.target.value;

    setMember(MemberTemp);
    setTest(e.target.value);
  }
  function PasswordChange(e) {
    MemberTemp = Member;
    let FindId = e.target.id.split("_");

    MemberTemp[FindId[0]].Password = e.target.value;

    setMember(MemberTemp);
    setTest(e.target.value);
  }
  function EmailChange(e) {
    MemberTemp = Member;
    let FindId = e.target.id.split("_");
    MemberTemp[FindId[0]].Email = e.target.value;

    setMember(MemberTemp);
    setTest(e.target.value);
  }
  function AccessChange(e) {
    MemberTemp = Member;
    let FindId = e.target.id.split("_");
    MemberTemp[FindId[0]].Access = e.target.value;

    setMember(MemberTemp);
    setTest(e.target.value);
  }
  //--------------------------------
  //批量下載學員
  const DownloadMember = () => {
    const worksheet = XLSX.utils.json_to_sheet(Member);
    const workbook = XLSX.utils.book_new();
    const Month = new Date().getMonth();
    const Today = new Date().getDate();
    XLSX.utils.book_append_sheet(workbook, worksheet, "All_Member");
    //Buffer
    let buffer = XLSX.write(workbook, { book_type: "xlsx", type: "buffer" });
    //Binary string
    XLSX.write(workbook, { book_type: "xlsx", type: "binary" });

    XLSX.writeFile(workbook, `Student_List_${Month}\/${Today}.xlsx`);
  };
  //批量上傳學員
  const UploadMember = (e) => {
    const [file] = e.target.files;
    const reader = new FileReader();

    reader.onload = (evt) => {
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: "binary" });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const data = XLSX.utils.sheet_to_csv(ws, { header: 1 });

      let SPdata = data.split("\n");

      let DataContainer = [];
      let DataUpdate = [];
      for (let i = 1; i < SPdata.length; i++) {
        DataContainer[i - 1] = SPdata[i].split(",");
      }

      for (let i = 0; i < DataContainer.length; i++) {
        const UploadData = {
          Name: DataContainer[i][1],
          StudentId: DataContainer[i][2],
          Password: DataContainer[i][3],
          Email: DataContainer[i][4],
          Access: DataContainer[i][5],
        };
        DataUpdate.push(UploadData);
      }
      axios
        .post(process.env.REACT_APP_AXIOS_ADMINUPLOAD, DataUpdate)
        .then((response) => {
          if (response.data === "success") {
            window.alert(response.data);
          } else {
            window.alert("failed");
          }
        });
    };
    reader.readAsBinaryString(file);
  };

  //單個修改
  const EditStudent = (Id, key) => {
    const StudentIdField = document.getElementById(`${key}_StudentId`);
    const PasswordField = document.getElementById(`${key}_Password`);
    const EmailField = document.getElementById(`${key}_Email`);
    const AccessField = document.getElementById(`${key}_Access`);
    const EditedBtn = document.getElementById(`${key}_Edited`);
    const EditingBtn = document.getElementById(`${key}_Editing`);

    StudentIdField.disabled = !StudentIdField.disabled;
    PasswordField.disabled = !PasswordField.disabled;
    EmailField.disabled = !EmailField.disabled;
    AccessField.disabled = !AccessField.disabled;
    if (EditingBtn.style.display === "none") {
      EditedBtn.style.display = "none";
      EditingBtn.style.display = "inline-block";
    } else {
      EditedBtn.style.display = "inline-block";
      EditingBtn.style.display = "none";
    }

    if (StudentIdField.disabled === false) {
      StudentIdField.style.opacity = 1;
      PasswordField.style.opacity = 1;
      EmailField.style.opacity = 1;
      AccessField.style.opacity = 1;
    } else {
      StudentIdField.style.opacity = 0.5;
      PasswordField.style.opacity = 0.5;
      EmailField.style.opacity = 0.5;
      AccessField.style.opacity = 0.5;
    }
  };
  //確認修改
  const EditStudentCheck = (Id, key) => {
    if (window.confirm(`確定改${Id}？`)) {
      const Edit = {
        Name: Member[key].Name,
        StudentId: Member[key].StudentId,
        Password: Member[key].Password,
        Email: Member[key].Email,
        Access: Member[key].Access,
      };
      axios
        .post(process.env.REACT_APP_AXIOS_ADMINEDIT, Edit)
        .then((response) => {
          window.alert(response.data);
        });
    }
  };
  //單個刪除
  const DeleteStudent = (Id, key) => {
    if (window.confirm(`確定刪除${Id}?`)) {
      axios
        .post(process.env.REACT_APP_AXIOS_ADMINDELETED, {
          Name: Member[key].Name,
        })
        .then((response) => {
          let Temp = Member.filter((val, index) => {
            return index !== parseInt(key);
          });
          setMember(Temp);
          window.alert(response.data);
        });
    }
  };
  //下載學員活動紀錄
  const DownloadStudent = (Id, key) => {
    axios
      .post(process.env.REACT_APP_AXIOS_ADMINDOWNLOADMARK, {
        StudentId: Id,
      })
      .then((response) => {
        if (response.data === "undefined") {
          window.alert("暫無該使用者記錄");
          return;
        }
        const worksheet = XLSX.utils.json_to_sheet(response.data);
        const workbook = XLSX.utils.book_new();
        const Month = new Date().getMonth();
        const Today = new Date().getDate();
        XLSX.utils.book_append_sheet(workbook, worksheet, "User_Mark");
        //Buffer
        let buffer = XLSX.write(workbook, {
          book_type: "xlsx",
          type: "buffer",
        });
        //Binary string
        XLSX.write(workbook, { book_type: "xlsx", type: "binary" });

        XLSX.writeFile(workbook, `${Id}_Mark_${Month}\/${Today}.xlsx`);
      });
  };

  ////////////////////////////////
  return (
    <div className="AdminMember">
      <h1 className="AdminTitle">成員名單</h1>
      <div className="memberBtn">
        <h4 id="memberuploadText">批量修改學生（請先下載格式）</h4>
        <Button
          style={{ width: "200px" }}
          variant="contained"
          color="success"
          onClick={() => {
            DownloadMember();
          }}
        >
          下載學生資料
        </Button>
        <h4 id="memberuploadText">上傳</h4>
        <input
          id="memberuploadBtn"
          type="file"
          className="form-control"
          onChange={UploadMember}
        />
      </div>
      <table className="memberTable" id="Member">
        <thead>
          <tr>
            <th className="AdminStandText">姓名</th>
            <th className="AdminStandText">學號</th>
            <th className="AdminStandText">密碼</th>
            <th className="AdminStandText">電子郵件</th>
            <th className="AdminStandText">權限</th>
            <th className="AdminStandText" colSpan={3}>
              操作
            </th>
          </tr>
        </thead>
        <tbody>
          {Member.map((val, key) => {
            return (
              <tr key={val.StudentId}>
                <td className="memberTable_td">
                  <h3>{Member[key].Name}</h3>
                </td>
                <td className="memberTable_td">
                  <TextField
                    key={val.StudentId}
                    id={`${key}_StudentId`}
                    label={"學號"}
                    variant="outlined"
                    value={Member[key].StudentId}
                    onChange={StudentIdChange}
                  />
                </td>
                <td className="memberTable_td">
                  <TextField
                    id={`${key}_Password`}
                    label={"密碼"}
                    variant="outlined"
                    value={Member[key].Password}
                    onChange={PasswordChange}
                  />
                </td>
                <td className="memberTable_td">
                  <TextField
                    id={`${key}_Email`}
                    label={"電子郵件"}
                    variant="outlined"
                    value={Member[key].Email}
                    onChange={EmailChange}
                  />
                </td>
                <td className="memberTable_td">
                  <TextField
                    id={`${key}_Access`}
                    label={"權限"}
                    variant="outlined"
                    value={Member[key].Access}
                    onChange={AccessChange}
                  />
                </td>
                <td className="memberTable_td">
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => {
                      DeleteStudent(val.StudentId, key);
                    }}
                  >
                    刪除
                  </Button>
                </td>
                <td className="memberTable_td">
                  <div
                    className="EditedBtn"
                    id={`${key}_Edited`}
                    style={{ display: "inline-block" }}
                  >
                    <Button
                      variant="contained"
                      style={{
                        backgroundColor: "yellow",
                        color: "black",
                        width: "100%",
                      }}
                      onClick={() => {
                        EditStudent(val.StudentId, key);
                      }}
                    >
                      修改
                    </Button>
                  </div>
                  <div
                    className="EditingBtn"
                    id={`${key}_Editing`}
                    style={{ display: "none" }}
                  >
                    <Button
                      className="EditingBtn_btn"
                      variant="contained"
                      onClick={() => {
                        EditStudentCheck(val.StudentId, key);
                      }}
                    >
                      確認
                    </Button>
                    <Button
                      className="EditingBtn_btn"
                      variant="contained"
                      onClick={() => {
                        EditStudent(val.StudentId, key);
                      }}
                    >
                      取消
                    </Button>
                  </div>
                </td>
                <td className="memberTable_td">
                  <Button
                    variant="contained"
                    color="success"
                    onClick={() => {
                      DownloadStudent(val.StudentId, key);
                    }}
                  >
                    下載活動紀錄
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default MemberList;
