import { useEffect, useState, useRef } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import ButtonGroup from "@mui/material/ButtonGroup";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { v4 as uuidv4 } from "uuid";
import $ from "jquery";

import axios from "axios";

const Note = ({}) => {
  const GetSid = sessionStorage.getItem("Sid");
  //新增筆記內容State
  const [UserInputNote, setUserInputNote] = useState("");
  const [UserInputClassify, setUserInputClassify] = useState("");
  const [UserInputSubClassify, setUserInputSubClassify] = useState("");
  //學生ID記錄儲存位置
  const [StateStudentId, setStateStudentId] = useState("");
  //筆記內容
  //辨識分類
  const [NotePage, setNotePage] = useState(0);
  //辨識小分類
  const [NoteSub, setNoteSub] = useState("");
  //辨識修改id
  const [NoteId, setNoteId] = useState("");
  //暫存上傳圖片項目
  const [NoteImg, setNoteImg] = useState([]);
  //分類儲存
  const [UserClassify, setUserClassify] = useState([]);
  //內容儲存
  const [UserContent, setUserContent] = useState([]);
  const [Test, setTest] = useState("");

  //總資料匯入Draggable
  const [columns, setColumns] = useState({});

  useEffect(() => {
    //初始化資料
    GetStudentIdAndReadNote();
  }, []);
  useEffect(() => {
    //排列樣式儲存 避免有回到上一動之BUG
    if (UserContent.length > 0) {
      RerenderUserContent();
    }
  }, [columns]);
  //取得學號載入筆記
  function GetStudentIdAndReadNote() {
    if (GetSid !== null || GetSid !== "null") {
      //取得學號
      axios({
        method: "POST",
        data: {
          _id: GetSid,
        },
        withCredentials: true,
        url: process.env.REACT_APP_AXIOS_USERINFO,
      })
        .then((response) => {
          setStateStudentId(response.data.StudentId);
          return response.data.StudentId;
        })
        .then((response) => {
          //取得該學生Note資料
          axios({
            method: "POST",
            data: { StudentId: response },
            withCredentials: true,
            url: process.env.REACT_APP_AXIOS_NOTEREAD,
          }).then((response) => {
            let TempUserClassify = response.data.UserClassify;
            let TempUserContent = response.data.UserContent;
            //State設定
            setUserClassify(TempUserClassify);
            setUserContent(TempUserContent);
            //若第一次進入Note或未新增大分類就直接跳出
            if (TempUserClassify === undefined) {
              return;
            }

            //set Columns
            let TempColumns = {};
            for (let i = 0; i < TempUserContent[NotePage].length; i++) {
              const PushData = {
                [i.toString()]: {
                  name: TempUserContent[NotePage][i].Title,
                  items: TempUserContent[NotePage][i].Note,
                },
              };
              TempColumns = { ...TempColumns, ...PushData };
            }
            setColumns(TempColumns);
          });
        });
    }
  }

  //重新設定排列樣式儲存到UserContentState function
  const RerenderUserContent = () => {
    let TempUserContent = UserContent;
    if (UserContent[NotePage] !== undefined) {
      for (let i = 0; i < TempUserContent[NotePage].length; i++) {
        //雲端樣式
        // console.log("Mogo", UserContent[NotePage][i].Note);
        //本地樣式
        // console.log("Local", columns[i].items);
        TempUserContent[NotePage][i].Title = columns[i].name;
        TempUserContent[NotePage][i].Note = columns[i].items;
      }
      setUserContent(TempUserContent);
    }
  };

  //新增筆記
  const CreatingNote = (Name) => {
    document.getElementById("CreateContent").style.display = "inline";
    document.getElementById("NoteBlock").style.visibility = "visible";
    document.body.style.overflow = "hidden";
    //確認欲新增筆記之小分類為何
    setNoteSub(Name);
  };
  const CancelNote = (e) => {
    document.getElementById("CreateContent").style.display = "none";
    document.getElementById("NoteBlock").style.visibility = "hidden";
    document.body.style.overflow = "auto";
    setUserInputNote("");
    setNoteImg([]);
  };
  const SubmitNote = () => {
    if (UserInputNote.length <= 0) {
      window.alert("筆記欄位不得為空");
      return;
    }
    //找出欲新增筆記內容的小分類
    for (let i = 0; i < UserContent[NotePage].length; i++) {
      if (UserContent[NotePage][i].Title === NoteSub) {
        //建立圖片暫存檔
        let files = NoteImg;
        let formData = new FormData();
        for (let i = 0; i < files.length; i++) {
          formData.append("photos", files[i]);
        }
        axios({
          method: "POST",
          data: formData,
          withCredentials: true,
          url: "http://localhost:4000/note/uploadpicture",
        })
          .then((response) => {
            setNoteImg([]);
            return response.data;
          })
          .then((photolocation) => {
            //建立小分類樣式
            const UploadNote = {
              id: uuidv4(),
              content: UserInputNote,
              img: [...photolocation],
            };
            console.log(UploadNote);
            let TempUserContent = UserContent;
            //推入資料（上傳用）
            TempUserContent[NotePage][i].Note.push(UploadNote);
            setUserContent(TempUserContent);
            setTest("");

            //推入Draggable
            let TempColumns = {};
            for (let i = 0; i < TempUserContent[NotePage].length; i++) {
              const PushData = {
                [i.toString()]: {
                  name: TempUserContent[NotePage][i].Title,
                  items: TempUserContent[NotePage][i].Note,
                },
              };
              TempColumns = { ...TempColumns, ...PushData };
            }
            setColumns(TempColumns);
          });
        break;
      }
    }
    window.alert("新增完成!");
    CancelNote();
  };
  //修改筆記
  const UpdatingNotes = (Id, SubName) => {
    let TempUserContent = UserContent;

    for (let i = 0; i < TempUserContent[NotePage].length; i++) {
      if (TempUserContent[NotePage][i].Title === SubName) {
        for (let j = 0; j < TempUserContent[NotePage][i].Note.length; j++) {
          if (TempUserContent[NotePage][i].Note[j].id === Id) {
            //TempUserContent[NotePage][i].Note[j]
            setUserInputNote(TempUserContent[NotePage][i].Note[j].content);
            setNoteImg(TempUserContent[NotePage][i].Note[j].img);
            setNoteId(j);
            setNoteSub(i);
            break;
          }
        }
        break;
      }
    }
    document.getElementById("UpdateContent").style.display = "inline";
    document.getElementById("NoteBlock").style.visibility = "visible";
    document.body.style.overflow = "hidden";
  };
  const CancelUpdatingNote = (e) => {
    document.getElementById("UpdateContent").style.display = "none";
    document.getElementById("NoteBlock").style.visibility = "hidden";
    document.body.style.overflow = "auto";
    setUserInputNote("");
    setNoteImg([]);
  };
  const SubmitUpdatingNote = () => {
    if (UserInputNote.length <= 0) {
      window.alert("筆記欄位不得為空");
      return;
    }
    if (window.confirm("確認修改？")) {
      let TempUserContent = UserContent;

      TempUserContent[NotePage][NoteSub].Note[NoteId].content = UserInputNote;

      //不確定為何可以直接連動到columns
      setUserContent(TempUserContent);
      CancelUpdatingNote();
    }
  };
  //刪除筆記
  const DeletingNote = (Id, SubName) => {
    if (window.confirm("確定刪除？")) {
      let TempColumns = columns;
      let NewItems = TempColumns[Id].items.filter((val, index) => {
        if (TempColumns[Id].items[index] !== TempColumns[Id].items[SubName]) {
          return TempColumns[Id].items[index];
        }
      });

      TempColumns[Id].items = NewItems;

      setColumns(TempColumns);
      RerenderUserContent();
      ChangePage(NotePage);
    }
  };

  //新增分類
  const CreatingClassify = (e) => {
    document.getElementById("CreateClassify").style.display = "inline";
    document.getElementById("NoteBlock").style.visibility = "visible";
    document.body.style.overflow = "hidden";
  };
  const CancelClassify = (e) => {
    document.getElementById("CreateClassify").style.display = "none";
    document.getElementById("NoteBlock").style.visibility = "hidden";
    document.body.style.overflow = "auto";
    setUserInputClassify("");
  };
  const UploadClassify = () => {
    if (UserInputClassify.length <= 0) {
      window.alert("分類名稱不得為空");
      return;
    }
    if (UserInputClassify.length > 7) {
      window.alert("分類名稱不得超過7個字元");
      return;
    }
    const Data = {
      StudentId: StateStudentId,
      NewClassify: UserInputClassify,
    };
    axios({
      method: "POST",
      data: Data,
      withCredentials: true,
      url: process.env.REACT_APP_AXIOS_CLASSIFYCREATE,
    }).then((response) => {
      if (response.data === "該分類已經存在") {
        window.alert(response.data);
        return;
      }

      let TempClassify = UserClassify;
      if (UserClassify !== undefined) {
        TempClassify.push(UserInputClassify);
      } else {
        TempClassify = [UserInputClassify];
      }
      setUserClassify(TempClassify);
      setTest("");
      window.alert(response.data);
      CancelClassify();
    });
  };
  //修改分類
  const EditingClassify = (index) => {
    ChangePage(index);

    setUserInputClassify(UserClassify[index]);
    document.getElementById("EditClassify").style.display = "inline";
    document.getElementById("NoteBlock").style.visibility = "visible";
    document.body.style.overflow = "hidden";
  };
  const CancelEditingClassify = (e) => {
    document.getElementById("EditClassify").style.display = "none";
    document.getElementById("NoteBlock").style.visibility = "hidden";
    document.body.style.overflow = "auto";
    setUserInputClassify("");
  };
  const SubmitEditClassify = () => {
    if (UserInputClassify.length <= 0) {
      window.alert("分類名稱不得為空");
      return;
    }
    if (UserInputClassify.length > 7) {
      window.alert("分類名稱不得超過7個字元");
      return;
    }
    if (window.confirm("確認修改？")) {
      let TempClassify = UserClassify;

      TempClassify[NotePage] = UserInputClassify;

      const Data = {
        StudentId: StateStudentId,
        UploadClassify: UserInputClassify,
        UploadIndex: NotePage,
      };

      axios({
        method: "POST",
        data: Data,
        withCredentials: true,
        url: process.env.REACT_APP_AXIOS_CLASSIFYUPDATE,
      }).then((response) => {
        if (response.data === "該分類已經存在") {
          window.alert(response.data);
          return;
        }

        setUserClassify(TempClassify);

        setTest("");
        window.alert(response.data);
        CancelEditingClassify();
      });
    }
  };
  //刪除分類
  const DeletingClassify = (Index) => {
    ChangePage(Index);

    if (
      window.confirm(`確定刪除${UserClassify[Index]}?將會刪除所有該分類內容`)
    ) {
      axios({
        method: "POST",
        data: {
          StudentId: StateStudentId,
          DeleteClassify: Index,
        },
        withCredentials: true,
        url: process.env.REACT_APP_AXIOS_CLASSIFYDELETE,
      }).then((response) => {
        let TempUserClassify = UserClassify.filter((val, index) => {
          if (index === Index) {
            return;
          }
          return val;
        });
        let TempUserContent = UserContent.filter((val, index) => {
          if (index === Index) {
            return;
          }
          return val;
        });

        setUserClassify(TempUserClassify);
        setUserContent(TempUserContent);
        ChangePage(Index - 1);

        window.alert(response.data);
      });
    }
  };

  //新增小分類
  const CreatingSubClassify = (e) => {
    document.getElementById("CreateSubClassify").style.display = "inline";
    document.getElementById("NoteBlock").style.visibility = "visible";
    document.body.style.overflow = "hidden";
  };
  const CancelSubClassify = (e) => {
    document.getElementById("CreateSubClassify").style.display = "none";
    document.getElementById("NoteBlock").style.visibility = "hidden";
    document.body.style.overflow = "auto";
    setUserInputSubClassify("");
  };
  const UploadSubClassify = () => {
    //確認欲新增小分類之大分類為何
    let TempUserContent = UserContent;
    let TempColumns = columns;

    let UploadSubData = {};
    let UploadColumns = {};

    //第一次寫入
    if (TempUserContent === undefined) {
      UploadSubData = {
        id: "0",
        Title: UserInputSubClassify,
        Note: [
          {
            id: uuidv4(),
            content: "新增項目",
            img: [],
          },
        ],
      };
      UploadColumns = {
        ["0"]: {
          name: UserInputSubClassify,
          items: UploadSubData.Note,
        },
      };
      TempUserContent = [[UploadSubData]];
    } else {
      //大分類第一次寫入
      if (TempUserContent[NotePage] === undefined) {
        UploadSubData = {
          id: "0",
          Title: UserInputSubClassify,
          Note: [
            {
              id: uuidv4(),
              content: "新增項目",
              img: [],
            },
          ],
        };

        TempUserContent.push([UploadSubData]);

        UploadColumns = {
          ["0"]: {
            name: UserInputSubClassify,
            items: UploadSubData.Note,
          },
        };
      } else {
        console.log(TempUserContent[NotePage].length);
        console.log(TempUserContent[NotePage]);
        UploadSubData = {
          id: TempUserContent[NotePage].length.toString(),
          Title: UserInputSubClassify,
          Note: [
            {
              id: uuidv4(),
              content: "新增項目",
              img: [],
            },
          ],
        };

        UploadColumns = {
          [TempUserContent[NotePage].length.toString()]: {
            name: UserInputSubClassify,
            items: UploadSubData.Note,
          },
        };

        TempUserContent[NotePage].push(UploadSubData);
      }
    }

    setUserContent(TempUserContent);
    TempColumns = { ...TempColumns, ...UploadColumns };
    console.log(TempColumns);
    setColumns(TempColumns);
    setTest("");
    CancelSubClassify();
  };
  const EditingSubClassify = (index) => {
    setNoteSub(index);
    setUserInputSubClassify(UserContent[NotePage][index].Title);

    document.getElementById("UpdateSubClassify").style.display = "inline";
    document.getElementById("NoteBlock").style.visibility = "visible";
    document.body.style.overflow = "hidden";
  };
  const CancelEditingSubClassify = (e) => {
    document.getElementById("UpdateSubClassify").style.display = "none";
    document.getElementById("NoteBlock").style.visibility = "hidden";
    document.body.style.overflow = "auto";
    setUserInputSubClassify("");
  };
  const SubmitEditSubClassify = () => {
    if (UserInputSubClassify.length <= 0) {
      window.alert("分類名稱不得為空");
      return;
    }
    if (UserInputSubClassify.length > 10) {
      window.alert("分類名稱不得超過10個字元");
      return;
    }

    if (window.confirm("確認修改？")) {
      let TempColumns = columns;

      TempColumns[NoteSub].name = UserInputSubClassify;

      setColumns(TempColumns);
      RerenderUserContent();
      CancelEditingSubClassify();
    }
  };
  const DeletingSubClassify = (Index) => {
    if (
      window.confirm(
        `確定刪除${UserContent[NotePage][Index].Title}?將刪除小分類內所有筆記`
      )
    ) {
      let TempUserContent = UserContent;
      let TempUserColumns = {};

      let DeleteContent = TempUserContent[NotePage].filter((val, index) => {
        if (index === Index) return;
        return val;
      });

      TempUserContent[NotePage] = DeleteContent;
      TempUserContent[NotePage].map((val, index) => {
        const data = {
          [index.toString()]: {
            name: val.Title,
            items: val.Note,
          },
        };
        TempUserColumns = { ...TempUserColumns, ...data };
      });

      setUserContent(TempUserContent);
      setColumns(TempUserColumns);
    }
  };

  //變更分類頁面
  const ChangePage = (Page) => {
    setNotePage(Page);

    let TempColumns = {};
    if (UserContent[Page] !== undefined) {
      for (let i = 0; i < UserContent[Page].length; i++) {
        const ChangeColumns = {
          [i.toString()]: {
            name: UserContent[Page][i].Title,
            items: UserContent[Page][i].Note,
          },
        };
        TempColumns = { ...TempColumns, ...ChangeColumns };
      }
    }

    setColumns(TempColumns);
  };
  //問問題頁面
  const CreatingQuestion = () => {};
  //儲存所有變更
  const SaveNote = () => {
    if (window.confirm("確認修改？")) {
      RerenderUserContent();

      const UploadData = {
        StudentId: StateStudentId,
        NoteContent: UserContent,
      };
      axios({
        method: "POST",
        data: UploadData,
        withCredentials: true,
        url: process.env.REACT_APP_AXIOS_NOTEUPDATE,
      }).then((response) => {
        window.alert(response.data);
      });
    }
  };
  //////Draggable Function/////
  const onDragEnd = (result, columns, setColumns) => {
    if (!result.destination) return;
    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems,
        },
      });
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems,
        },
      });
    }
  };

  /////img Func/////
  function previewFile(Id, Input) {
    let preview = document.querySelector(`#${Id}`);
    let files = document.querySelector(`#${Input}`).files;

    let TempImg = NoteImg;
    TempImg.push(...files);
    setNoteImg(TempImg);

    console.log(TempImg);

    function readAndPreview(file) {
      // 支援的圖片型別（可自定義）
      if (/\.(jpe?g|png)$/i.test(file.name)) {
        let reader = new FileReader();
        reader.addEventListener(
          "load",
          function () {
            var image = new Image();
            image.height = 100;
            image.title = file.name;
            image.src = this.result;
            preview.appendChild(image);
          },
          false
        );
        reader.readAsDataURL(file);
      }
    }
    //files 就是input選中的檔案，你也可以對上傳圖片個數進行限制 （files.length）
    if (files.length <= 3) {
      [].forEach.call(files, readAndPreview);
    } else {
      window.alert("單個筆記不得上傳超過三張圖片");
      return;
    }
  }

  return (
    <>
      <div
        className="Note_Create"
        id="CreateContent"
        style={{ display: "none" }}
      >
        <h2 className="Note_h2">新增筆記</h2>
        <TextField
          id="CreateNote"
          label="寫下你的筆記"
          multiline
          rows={10}
          style={{ width: "80%", left: "10%" }}
          placeholder="開始吧！"
          value={UserInputNote}
          onChange={(e) => {
            setUserInputNote(e.target.value);
          }}
        />

        <div className="Note_ShowImage" id="AddNote_ShowImage">
          {NoteImg.map((val, index) => {
            return (
              <img
                style={{ width: "80px", height: "80px" }}
                src={`${process.env.REACT_APP_AXIOS_FINDPIC}/${val}`}
                alt={`筆記圖片_${index}`}
              ></img>
            );
          })}
        </div>
        <div className="Note_CreateBtn">
          <Button
            variant="outlined"
            style={{
              marginRight: "5px",
              fontSize: "20px",
            }}
            onClick={() => {
              SubmitNote();
            }}
          >
            確認
          </Button>
          <Button
            variant="outlined"
            style={{
              color: "red",
              marginLeft: "5px",
              fontSize: "20px",
            }}
            onClick={CancelNote}
          >
            關閉
          </Button>
          <label>
            <input
              id="AddNote_InputImg"
              type="file"
              accept="image/jpeg,image/png"
              multiple
              style={{
                display: "none",
              }}
              onChange={() => {
                previewFile("AddNote_ShowImage", "AddNote_InputImg");
              }}
            />
            上傳圖片
          </label>
        </div>
      </div>
      <div
        className="Note_Create"
        id="UpdateContent"
        style={{ display: "none" }}
      >
        <h2 className="Note_h2">修改筆記</h2>
        <TextField
          id="CreateNote"
          label="寫下你的筆記"
          multiline
          rows={10}
          style={{ width: "80%", left: "10%" }}
          placeholder="開始吧！"
          value={UserInputNote}
          onChange={(e) => {
            setUserInputNote(e.target.value);
          }}
        />
        <div className="Note_ShowImage" id="EditNote_ShowImage">
          {NoteImg.map((val, index) => {
            return <img src={val} alt={`Note_${index}`}></img>;
          })}
        </div>
        <div className="Note_CreateBtn">
          <Button
            variant="outlined"
            style={{
              marginRight: "5px",
              fontSize: "20px",
            }}
            onClick={() => {
              SubmitUpdatingNote();
            }}
          >
            確認
          </Button>
          <Button
            variant="outlined"
            style={{
              color: "red",
              marginLeft: "5px",
              fontSize: "20px",
            }}
            onClick={CancelUpdatingNote}
          >
            關閉
          </Button>
          <label>
            <input
              id="EditNote_InputImg"
              type="file"
              accept="image/jpeg,image/png"
              multiple
              style={{
                display: "none",
              }}
              onChange={() => {
                previewFile("EditNote_ShowImage", "EditNote_InputImg");
              }}
            />
            上傳圖片
          </label>
        </div>
      </div>
      <div
        className="Note_Create"
        id="CreateClassify"
        style={{ display: "none" }}
      >
        <h2 className="Note_h2">新增分類</h2>
        <TextField
          id="CreateNote"
          label="寫下你欲新增分類"
          rows={1}
          style={{ width: "80%", left: "10%" }}
          placeholder="開始吧！"
          value={UserInputClassify}
          onChange={(e) => {
            setUserInputClassify(e.target.value);
          }}
        />
        <div className="Note_CreateBtn">
          <Button
            variant="outlined"
            style={{
              marginRight: "5px",
              fontSize: "20px",
            }}
            onClick={() => {
              UploadClassify();
            }}
          >
            新增分類
          </Button>
          <Button
            variant="outlined"
            style={{
              color: "red",
              marginLeft: "5px",
              fontSize: "20px",
            }}
            onClick={CancelClassify}
          >
            關閉
          </Button>
        </div>
      </div>
      <div
        className="Note_Create"
        id="CreateSubClassify"
        style={{ display: "none" }}
      >
        <h2 className="Note_h2">新增小分類</h2>
        <TextField
          id="CreateNote"
          label="寫下你欲新增小分類"
          rows={1}
          style={{ width: "80%", left: "10%" }}
          placeholder="開始吧！"
          value={UserInputSubClassify}
          onChange={(e) => {
            setUserInputSubClassify(e.target.value);
          }}
        />
        <div className="Note_CreateBtn">
          <Button
            variant="outlined"
            style={{
              marginRight: "5px",
              fontSize: "20px",
            }}
            onClick={() => {
              UploadSubClassify();
            }}
          >
            新增小分類
          </Button>
          <Button
            variant="outlined"
            style={{
              color: "red",
              marginLeft: "5px",
              fontSize: "20px",
            }}
            onClick={CancelSubClassify}
          >
            關閉
          </Button>
        </div>
      </div>
      <div
        className="Note_Create"
        id="EditClassify"
        style={{ display: "none" }}
      >
        <h2 className="Note_h2">修改分類名稱</h2>
        <TextField
          id="CreateNote"
          label="寫下新的修改分類"
          rows={1}
          style={{ width: "80%", left: "10%" }}
          placeholder="開始吧！"
          value={UserInputClassify}
          onChange={(e) => {
            setUserInputClassify(e.target.value);
          }}
        />
        <div className="Note_CreateBtn">
          <Button
            variant="outlined"
            style={{
              marginRight: "5px",
              fontSize: "20px",
            }}
            onClick={() => {
              SubmitEditClassify();
            }}
          >
            修改分類
          </Button>
          <Button
            variant="outlined"
            style={{
              color: "red",
              marginLeft: "5px",
              fontSize: "20px",
            }}
            onClick={CancelEditingClassify}
          >
            關閉
          </Button>
        </div>
      </div>
      <div
        className="Note_Create"
        id="UpdateSubClassify"
        style={{ display: "none" }}
      >
        <h2 className="Note_h2">修改小分類</h2>
        <TextField
          id="CreateNote"
          label="寫下新的小分類名稱"
          rows={1}
          style={{ width: "80%", left: "10%" }}
          placeholder="開始吧！"
          value={UserInputSubClassify}
          onChange={(e) => {
            setUserInputSubClassify(e.target.value);
          }}
        />
        <div className="Note_CreateBtn">
          <Button
            variant="outlined"
            style={{
              marginRight: "5px",
              fontSize: "20px",
            }}
            onClick={() => {
              SubmitEditSubClassify();
            }}
          >
            修改小分類
          </Button>
          <Button
            variant="outlined"
            style={{
              color: "red",
              marginLeft: "5px",
              fontSize: "20px",
            }}
            onClick={CancelEditingSubClassify}
          >
            關閉
          </Button>
        </div>
      </div>
      <div id="NoteBlock"></div>
      <div className="Note_Container">
        <div className="Note_Box">
          <div className="Note_Box_Classify">
            <h3>分類</h3>
            <ButtonGroup
              orientation="vertical"
              aria-label="vertical outlined button group"
              style={{ width: "80%" }}
            >
              {UserClassify !== undefined &&
                UserClassify.map((val, index) => {
                  return (
                    <div style={{ display: "flex" }}>
                      <Button
                        key={index}
                        onClick={() => {
                          ChangePage(index);
                        }}
                        style={{ width: "80%" }}
                      >
                        {UserClassify[index]}
                      </Button>
                      <div className="NoteEditBtn">
                        <div
                          className="NoteEditClassify"
                          onClick={() => {
                            EditingClassify(index);
                          }}
                        >
                          <EditIcon
                            key={index}
                            fontSize="small"
                            style={{
                              marginBottom: "0",
                            }}
                          />
                        </div>
                        <div
                          className="NoteDeleteClassify"
                          onClick={() => {
                            DeletingClassify(index);
                          }}
                        >
                          <DeleteIcon
                            key={index}
                            fontSize="small"
                            style={{
                              marginBottom: "0",
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              <Button variant="contained" key="Add" onClick={CreatingClassify}>
                <AddIcon style={{ marginBottom: "0" }} />
              </Button>
              <Button
                variant="contained"
                key="Question"
                style={{ marginTop: "20px", backgroundColor: "red" }}
                onClick={CreatingQuestion}
              >
                問題提問
              </Button>
            </ButtonGroup>
          </div>
          <div className="Note_Box_Content">
            <div
              style={{
                display: "flex",
                justifyContent: "left",
                height: "100%",
              }}
            >
              <DragDropContext
                onDragEnd={(result) => {
                  onDragEnd(result, columns, setColumns);
                }}
              >
                {Object.entries(columns).map(([columnId, column], index) => {
                  return (
                    <div
                      style={{
                        padding: "10px",
                        border: "1px solid rgba(0, 0, 0, 0.2)",
                        display: "flex",
                        flexDirection: "column",
                        borderRadius: "20px",
                        marginLeft: "10px",
                      }}
                      key={columnId}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <h3 style={{ marginLeft: "10px" }}>{column.name}</h3>
                        <div
                          id={`NoteEditSubClassify_${index}`}
                          style={{ display: "flex" }}
                        >
                          <div
                            className="NoteEditClassify"
                            onClick={() => {
                              EditingSubClassify(index);
                            }}
                          >
                            <EditIcon
                              fontSize="small"
                              style={{
                                marginBottom: "0",
                              }}
                            />
                          </div>
                          <div
                            className="NoteDeleteClassify"
                            onClick={() => {
                              DeletingSubClassify(index);
                            }}
                          >
                            <DeleteIcon
                              fontSize="small"
                              style={{
                                marginBottom: "0",
                                marginLeft: "2px",
                              }}
                            />
                          </div>
                        </div>
                      </div>
                      <div style={{ margin: 8 }}>
                        <Droppable droppableId={columnId} key={columnId}>
                          {(provided, snapshot) => {
                            return (
                              <div
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                style={{
                                  borderRadius: "20px",
                                  background: snapshot.isDraggingOver
                                    ? "lightblue"
                                    : "lightgrey",
                                  padding: 4,
                                  width: 250,
                                  minHeight: 500,
                                }}
                              >
                                {column.items.map((item, index) => {
                                  return (
                                    <Draggable
                                      key={item.id}
                                      draggableId={item.id}
                                      index={index}
                                    >
                                      {(provided, snapshot) => {
                                        return (
                                          <div
                                            className="NoteDroppable"
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            style={{
                                              color: "white",
                                              ...provided.draggableProps.style,
                                            }}
                                          >
                                            <div
                                              className="NoteContentTxt"
                                              onClick={() => {
                                                UpdatingNotes(
                                                  item.id,
                                                  column.name
                                                );
                                              }}
                                              style={{
                                                width: "100%",
                                                borderRadius: "20px 0 0 20px",
                                                padding: "10px 10px 0 10px",
                                                minHeight: "40px",
                                                backgroundColor:
                                                  snapshot.isDragging
                                                    ? "#263B4A"
                                                    : "#456C86",
                                                color: "white",
                                              }}
                                            >
                                              {item.content}
                                            </div>
                                            <div
                                              className="NoteDeleteIcon"
                                              style={{
                                                backgroundColor:
                                                  snapshot.isDragging
                                                    ? "#263B4A"
                                                    : "#456C86",
                                              }}
                                              onClick={() => {
                                                DeletingNote(columnId, index);
                                              }}
                                            >
                                              <DeleteIcon />
                                            </div>
                                          </div>
                                        );
                                      }}
                                    </Draggable>
                                  );
                                })}
                                {provided.placeholder}
                                <div
                                  className="AddNote"
                                  onClick={() => {
                                    CreatingNote(column.name);
                                  }}
                                >
                                  <AddIcon
                                    fontSize="large"
                                    style={{ marginTop: "5px" }}
                                  />
                                </div>
                              </div>
                            );
                          }}
                        </Droppable>
                      </div>
                    </div>
                  );
                })}
              </DragDropContext>
              {UserClassify !== undefined && (
                <div className="AddSubClassify" onClick={CreatingSubClassify}>
                  <AddIcon fontSize="large" style={{ marginTop: "250px" }} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div style={{ textAlign: "center" }}>
        <Button
          variant="contained"
          onClick={SaveNote}
          style={{ fontSize: "large" }}
        >
          儲存變更
        </Button>
      </div>
    </>
  );
};

export default Note;
