import { useState, useEffect } from "react";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

import CancelIcon from "@mui/icons-material/Cancel";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import MessageIcon from "@mui/icons-material/Message";
import DeleteIcon from "@mui/icons-material/Delete";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import AccountCircleTwoToneIcon from "@mui/icons-material/AccountCircleTwoTone";
import SpeakerNotesTwoToneIcon from "@mui/icons-material/SpeakerNotesTwoTone";
import DeleteOutlineTwoToneIcon from "@mui/icons-material/DeleteOutlineTwoTone";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SendTwoToneIcon from "@mui/icons-material/SendTwoTone";
import DoneAllIcon from "@mui/icons-material/DoneAll";

import $ from "jquery";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const Question = ({ StudentId, SetLoading }) => {
  //問題輸入框
  const [UserInputTitle, setUserInputTitle] = useState("");
  const [UserInputQuestion, setUserInputQuestion] = useState("");
  //問答集內容
  const [QuestionContent, setQuestionContent] = useState({
    StudentId: "",
    QuestionId: "",
    Question: { question: "", time: "", img: [] },
    Response: [],
  });
  //回覆問題
  const [UserInputResponse, setUserInputResponse] = useState("");
  //編輯問題
  const [UserEditResponse, setUserEditResponse] = useState("");
  //圖片儲存
  const [UserImg, setUserImg] = useState([]);
  //所有問題儲存
  const [AllQuestion, setQuestion] = useState([]);
  const [OpenQuestion, setOpenQuestion] = useState("");

  const [Test, setTest] = useState("");

  useEffect(() => {
    GetAllQuestion();
  }, []);

  function GetAllQuestion() {
    axios(process.env.REACT_APP_AXIOS_QUESTION_READ).then((response) => {
      setQuestion(response.data);
      SetLoading(false);
    });
  }

  //發布問題
  const SubmitQuestion = () => {
    if (UserInputTitle.length === 0) {
      window.alert("主題不得為空！");
      return;
    } else if (UserInputTitle.length > 15) {
      window.alert("主題長度不得超過15個字元！");
      return;
    }
    if (UserInputQuestion.length <= 5) {
      window.alert("內容至少需大於5個字元");
      return;
    }
    const data = {
      QuestionId: uuidv4(),
      StudentId: StudentId,
      Question: {
        title: UserInputTitle,
        question: UserInputQuestion,
        time: GetNowTime(),
        img: [],
      },
      Response: [],
    };
    axios({
      method: "POST",
      data: data,
      url: process.env.REACT_APP_AXIOS_QUESTION_CREATE,
      withCredentials: true,
    }).then((response) => {
      let TempQuestion = AllQuestion;
      TempQuestion.unshift(data);
      SetLoading(false);
      CloseEditPage("CreateQuestion");
      setUserInputQuestion("");
      setUserInputTitle("");
      setQuestion(TempQuestion);
    });
  };
  //刪除問題
  const DeleteQuestion = (QuestionId) => {
    if (window.confirm("確定要刪除問題這項問題嗎？")) {
      axios({
        method: "POST",
        url: process.env.REACT_APP_AXIOS_QUESTION_DELETE,
        data: { QuestionId: QuestionId },
        withCredentials: true,
      }).then((response) => {
        let TempAllQuestion = AllQuestion;
        let F_Question = TempAllQuestion.filter((val, index) => {
          return val.QuestionId !== QuestionId;
        });
        SetLoading(false);
        setQuestion(F_Question);
      });
    } else {
      SetLoading(false);
    }
  };
  //完成問題
  const CompleteQuestion = (QuestionId, Index) => {
    if (window.confirm("確認完成該問題？確認後將不接受回覆及修改！")) {
      axios({
        method: "POST",
        url: process.env.REACT_APP_AXIOS_QUESTION_COMPLETED,
        data: {
          QuestionId: QuestionId,
          IsCompleted: true,
        },
        withCredentials: true,
      })
        .then((response) => {
          SetLoading(false);
        })
        .then(() => {
          let TempAllQuestion = [...AllQuestion];
          TempAllQuestion[Index].IsCompleted = true;

          setTest("");
          setQuestion(TempAllQuestion);
        });
    } else {
      SetLoading(false);
    }
  };

  //發布回復
  const SubmitResponse = (Id, ReplyId) => {
    if (UserInputResponse.length === 0) {
      window.alert("請輸入回覆內容！");
      return;
    }
    //是否為作者？
    let ReplyState = "Student";
    ReplyId === StudentId ? (ReplyState = "Author") : (ReplyState = "Student");

    const ResponseData = {
      identify: ReplyState,
      replyid: StudentId,
      content: UserInputResponse,
      time: GetNowTime(),
      img: [],
    };

    const Data = {
      QuestionId: Id,
      StudentId: StudentId,
      Response: ResponseData,
    };

    axios({
      method: "POST",
      data: Data,
      url: process.env.REACT_APP_AXIOS_QUESTION_UPDATE,
      withCredentials: true,
    }).then((response) => {
      let TempContent = QuestionContent;
      TempContent.Response.push(ResponseData);
      SetLoading(false);
      setUserInputResponse("");
      setQuestionContent(TempContent);
    });
  };
  //修改回覆
  const QuestionReplyEdit = (Index, Content) => {
    $(`#Status_${Index}`).css("display", "none");
    $(`#Editing_${Index}`).css("display", "inline");
    $(`#Reply_Edit_${Index}`).css("display", "none");
    $(`#Reply_Cancel_${Index}`).css("display", "inline");
    setUserEditResponse(Content);
  };
  const CancelQuestionReplyEdit = (Index) => {
    $(`#Status_${Index}`).css("display", "inline");
    $(`#Editing_${Index}`).css("display", "none");
    $(`#Reply_Edit_${Index}`).css("display", "inline");
    $(`#Reply_Cancel_${Index}`).css("display", "none");
    setUserEditResponse("");
  };
  //確認修改回復
  const SumbitQuestionReplyEdit = (ResIndex) => {
    if (UserEditResponse.length === 0) {
      window.alert("請輸入回覆內容！");
      return;
    }
    if (window.confirm("確認修改？")) {
      let TempQuestion = [...AllQuestion];
      TempQuestion[OpenQuestion].Response[ResIndex].time = GetNowTime();
      TempQuestion[OpenQuestion].Response[ResIndex].content = UserEditResponse;

      const Data = {
        QuestionId: TempQuestion[OpenQuestion].QuestionId,
        Response: TempQuestion[OpenQuestion].Response,
        EditResponse: true,
      };

      axios({
        method: "POST",
        data: Data,
        url: process.env.REACT_APP_AXIOS_QUESTION_UPDATE,
        withCredentials: true,
      }).then((response) => {
        SetLoading(false);
        setQuestion(TempQuestion);
        setQuestionContent(TempQuestion[OpenQuestion]);
        CancelQuestionReplyEdit(ResIndex);
      });
    } else {
      SetLoading(false);
    }
  };

  //刪除回覆
  const DeleteQuestionReply = (ResIndex) => {
    if (window.confirm("確認刪除？不後悔喔")) {
      let TempQuestion = [...AllQuestion];
      TempQuestion[OpenQuestion].Response[ResIndex] = {
        time: GetNowTime(),
        content: "錯過的就不會出現了，就像愛情一樣。",
        replyid: "空樓層",
        identify: "Delete",
        img: [],
      };

      const Data = {
        QuestionId: TempQuestion[OpenQuestion].QuestionId,
        Response: TempQuestion[OpenQuestion].Response,
        EditResponse: true,
      };
      axios({
        method: "POST",
        data: Data,
        url: process.env.REACT_APP_AXIOS_QUESTION_UPDATE,
        withCredentials: true,
      }).then((response) => {
        setQuestion(TempQuestion);
        SetLoading(false);
        setQuestionContent(TempQuestion[OpenQuestion]);
        CancelQuestionReplyEdit(ResIndex);
      });
    } else {
      SetLoading(false);
    }
  };
  //獲得當前時間
  function GetNowTime() {
    const Timer = new Date();
    const NowTime =
      Timer.getFullYear() +
      "/" +
      Timer.getMonth() +
      "/" +
      Timer.getDate() +
      " " +
      Timer.getHours() +
      ":" +
      Timer.getMinutes();
    return NowTime;
  }

  /////img Func/////
  function previewFile(Id, Input) {
    let preview = document.querySelector(`#${Id}`);
    let files = document.querySelector(`#${Input}`).files;

    if (files.size > 1024 * 1024 * 6) {
      window.alert("禁止上傳大於 6MB 之圖片");
      return;
    }

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
            image.className = "TempImg";
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
      window.alert("不得一次性上傳三張以上照片");
      return;
    }
  }

  //產生放大圖片
  function BigImg(source) {
    $("#ImgToBig").css({
      position: "absolute",
      width: $(window).width(),
      height: $(window).height(),
      backgroundColor: "rgba(0,0,0,0.5)",
    });
    $("#ImgToBig").fadeIn();
    $("#ImgToBigSource").attr("src", source);
    $("#ImgToBigSource").css({
      marginLeft: "10%",
      marginTop: "5%",
      width: $(window).width() * 0.8,
      height: $(window).height() * 0.5,
      objectFit: "scale-down",
    });
  }

  //放大照片取消
  const CancelImgToBig = (e) => {
    $("#ImgToBig").fadeOut();
  };

  const OpenEditPage = (Name) => {
    $(`#${Name}`).fadeIn(200);
    $("#NoteBlock").css("height", $("body").height() + 100);
    $("#NoteBlock").css("width", $("body").width());
    $(`#NoteBlock`).fadeIn(200);
  };
  const CloseEditPage = (Name) => {
    $(`#${Name}`).fadeOut(200);
    $(`#NoteBlock`).fadeOut(200);
  };
  return (
    <div className="Question_Box_Content">
      <div
        id="ImgToBig"
        style={{ display: "none" }}
        onClick={() => {
          CancelImgToBig();
        }}
      >
        <img id="ImgToBigSource" src="#"></img>
      </div>
      <div
        className="Note_Create"
        id="CreateQuestion"
        style={{ display: "none" }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "20px",
          }}
        >
          <h5 className="Note_h2">新增問題</h5>
          <Button
            id="A3_Question_CancelCreate"
            variant="outlined"
            style={{
              color: "red",
              marginRight: "10%",
              fontSize: "20px",
              height: "50%",
              marginTop: "10%",
              border: 0,
            }}
          >
            <CancelIcon
              id="A3_Question_CancelCreate"
              fontSize="large"
              style={{ color: "black", margin: 0 }}
              onClick={() => {
                CloseEditPage("CreateQuestion");
              }}
            />
          </Button>
        </div>
        <TextField
          id="CreateNote"
          label="寫下你想問的主題!"
          style={{ width: "80%", left: "10%", marginBottom: "3px" }}
          placeholder="開始吧！"
          value={UserInputTitle}
          onChange={(e) => {
            setUserInputTitle(e.target.value);
          }}
        />
        <TextField
          id="CreateNote"
          label="寫下你的問題"
          multiline
          rows={10}
          style={{ width: "80%", left: "10%" }}
          placeholder="開始吧！"
          value={UserInputQuestion}
          onChange={(e) => {
            setUserInputQuestion(e.target.value);
          }}
        />
        <div className="Note_ShowImage" id="AddQuestion_ShowImage"></div>
        <div className="Note_CreateBtn">
          <Button
            id={`A3_Question_Question_Create_${UserInputTitle}`}
            variant="outlined"
            style={{
              marginRight: "5px",
              fontSize: "20px",
            }}
            onClick={() => {
              SetLoading(true);
              SubmitQuestion();
            }}
          >
            發布問題
          </Button>
          {/* <label className="UploadImgBtn">
            <input
              id="AddQuestion_InputImg"
              type="file"
              accept="image/jpeg,image/png"
              multiple
              style={{
                display: "none",
              }}
              onChange={() => {
                previewFile("AddQuestion_ShowImage", "AddQuestion_InputImg");
              }}
            />
            上傳圖片
          </label> */}
        </div>
      </div>
      {QuestionContent !== null && (
        <div
          className="Question_Create"
          id="ShowQuestion"
          style={{ display: "none" }}
        >
          <div className="QuestionTxt">
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              <h2 className="QuestionTitle">
                {QuestionContent.Question.title}
              </h2>
              <Button
                id={`A3_Question_Question_Close_${QuestionContent.Question.title}`}
                variant="outlined"
                style={{
                  position: "fixed",
                  fontSize: "20px",
                  right: "25%",
                  top: "10%",
                  border: 0,
                }}
                onClick={() => {
                  CloseEditPage("ShowQuestion");
                  //若有開啟編輯忘記關 自動回復
                  $(".Card_Reply").css("display", "inline");
                  $(".Reply_Edit").css("display", "inline");
                  $(".Reply_Cancel").css("display", "none");
                  $(".Card_Cancel").css("display", "none");
                  setQuestionContent({
                    StudentId: "",
                    QuestionId: "",
                    Question: { question: "", time: "", img: [] },
                    Response: [],
                  });
                }}
              >
                <CancelIcon
                  id={`A3_Question_Question_Close_${QuestionContent.Question.title}`}
                  fontSize="large"
                  style={{ color: "black", margin: 0 }}
                />
              </Button>
            </div>
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              <h6 className="QuestionSubTitle">
                <AccountCircleTwoToneIcon
                  fontSize="small"
                  style={{ marginBottom: "3px" }}
                />{" "}
                {QuestionContent.StudentId}
              </h6>
              <h6 className="QuestionSubTitle">
                <AccessTimeFilledIcon
                  fontSize="small"
                  style={{ marginBottom: "3px" }}
                />{" "}
                {QuestionContent.Question.time}
              </h6>
            </div>
          </div>
          <div className="QuestionContent">
            {QuestionContent.Question.question}
          </div>
          <div className="QuestionResponse">
            {!QuestionContent.IsCompleted && (
              <div className="QuestionResponse_sendResponse">
                <TextField
                  id="CreateNote"
                  label="寫下你的回覆吧！"
                  multiline
                  rows={2}
                  style={{ width: "95%" }}
                  placeholder="回覆"
                  value={UserInputResponse}
                  onChange={(e) => {
                    setUserInputResponse(e.target.value);
                  }}
                />
                <div className="sendResponseBtn">
                  <Button
                    id={`A3_Question_Reply_Reply_${UserInputResponse}`}
                    variant="text"
                    onClick={() => {
                      SetLoading(true);
                      SubmitResponse(
                        QuestionContent.QuestionId,
                        QuestionContent.StudentId
                      );
                    }}
                  >
                    <SendTwoToneIcon
                      id={`A3_Question_Reply_Reply_${UserInputResponse}`}
                      style={{ marginBottom: 0 }}
                    />
                  </Button>
                </div>
              </div>
            )}
            {/* <div className="QuestionResponse_Card" id="Student">
              <div className="Card_Account">
                <AccountCircleIcon style={{ marginBottom: 0, marginTop: 7 }} />
                <p className="Card_Id">1082020</p>
              </div>
              <div className="Card_Reply"></div>
            </div>
            <div className="QuestionResponse_Card" id="Teacher">
              <div className="Card_account"></div>
            </div>
            <div className="QuestionResponse_Card" id="Author">
              <div className="Card_account"></div>
            </div> */}

            {QuestionContent.Response.map((val, index) => {
              return (
                <div className="QuestionResponse_Card">
                  <div className="Card_Account">
                    <h6 className="Card_Floor">B{index}</h6>
                    <AccountCircleIcon
                      style={{ marginBottom: 0, marginTop: 7 }}
                    />
                    <p className="Card_Id">{val.replyid}</p>
                    <div className="Card_Identify" id={val.identify}>
                      {val.identify}
                    </div>
                    {val.replyid == StudentId && (
                      <>
                        <div className="Reply_Edit" id={`Reply_Edit_${index}`}>
                          <Button
                            id={`A3_Question_Reply_Edit_${val.content}`}
                            variant="text"
                            onClick={() => {
                              QuestionReplyEdit(index, val.content);
                            }}
                            size="small"
                          >
                            <EditIcon
                              id={`A3_Question_Reply_Edit_${val.content}`}
                              fontSize="small"
                              style={{ color: "black", marginBottom: 0 }}
                            />
                          </Button>
                          <Button
                            id={`A3_Question_Reply_Delete_${val.content}`}
                            variant="text"
                            onClick={() => {
                              SetLoading(true);
                              DeleteQuestionReply(index);
                            }}
                            size="small"
                          >
                            <DeleteIcon
                              id={`A3_Question_Reply_Delete_${val.content}`}
                              fontSize="small"
                              style={{ color: "black", marginBottom: 0 }}
                            />
                          </Button>
                        </div>
                        <div
                          className="Reply_Cancel"
                          id={`Reply_Cancel_${index}`}
                          style={{ display: "none" }}
                        >
                          <Button
                            id={`A3_Question_Reply_Edited_${UserEditResponse}`}
                            variant="text"
                            onClick={() => {
                              SetLoading(true);
                              SumbitQuestionReplyEdit(index);
                            }}
                            size="small"
                          >
                            <CheckIcon
                              id={`A3_Question_Reply_Edited_${UserEditResponse}`}
                              fontSize="small"
                              style={{ color: "black", marginBottom: 0 }}
                            />
                          </Button>
                          <Button
                            id="A3_Question_Reply_CancelEdit"
                            variant="text"
                            onClick={() => {
                              CancelQuestionReplyEdit(index);
                            }}
                            size="small"
                          >
                            <CancelIcon
                              id="A3_Question_Reply_CancelEdit"
                              fontSize="small"
                              style={{ color: "black", marginBottom: 0 }}
                            />
                          </Button>
                        </div>
                      </>
                    )}
                  </div>
                  <div className="Card_Reply" id={`Status_${index}`}>
                    {val.content}
                  </div>
                  <div
                    className="Card_Cancel"
                    id={`Editing_${index}`}
                    style={{ display: "none" }}
                  >
                    <TextField
                      id="CreateNote"
                      label="編輯"
                      multiline
                      rows={2}
                      style={{ width: "95%" }}
                      placeholder="編輯"
                      value={UserEditResponse}
                      onChange={(e) => {
                        setUserEditResponse(e.target.value);
                      }}
                    />
                  </div>
                  <p className="Card_Time">
                    <AccessTimeFilledIcon
                      fontSize=""
                      style={{ marginBottom: 2, marginRight: 4 }}
                    />
                    {val.time}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}
      <div style={{ textAlign: "center" }}>
        <Button
          id="A3_Question_Create"
          variant="contained"
          style={{ fontSize: "large", width: "80%" }}
          onClick={() => {
            OpenEditPage("CreateQuestion");
          }}
        >
          問題提問
        </Button>
      </div>
      <div className="QuestionContainer">
        {AllQuestion.length !== 0 &&
          AllQuestion.map((val, index) => {
            return (
              <div className="QuestionCard" key={index}>
                <Card
                  sx={
                    val.IsCompleted
                      ? {
                          maxWidth: 230,
                          minWidth: 200,
                          maxHeight: 400,
                          margin: 1.5,
                          backgroundColor: "rgba(87, 87, 87, 0.3)",
                        }
                      : {
                          maxWidth: 230,
                          minWidth: 200,
                          maxHeight: 400,
                          margin: 1.5,
                        }
                  }
                >
                  <CardMedia
                    component="img"
                    height="140"
                    image={
                      val.Question.img.length === 0
                        ? "./Img/amumamum.PNG"
                        : `${process.env.REACT_APP_AXIOS_FINDPIC}/${val.Question.img[0]}`
                    }
                    alt={`問題${index}`}
                    onClick={async () => {
                      setQuestionContent(val);
                      $(document).css({ overflow: "hidden" });
                      OpenEditPage("ShowQuestion");
                      setOpenQuestion(index);
                    }}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {val.Question.title}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      <div className="NoteContentTxt">
                        {val.Question.question}
                      </div>
                    </Typography>
                    <Typography gutterBottom variant="caption" component="div">
                      <AccountCircleTwoToneIcon
                        fontSize="15"
                        style={{ marginBottom: "3px" }}
                      />
                      {`\t${val.StudentId}`}
                    </Typography>
                    <Typography gutterBottom variant="caption" component="div">
                      <AccessTimeFilledIcon
                        fontSize="15"
                        style={{ marginBottom: "3px" }}
                      />
                      {`\t${val.Question.time}`}
                    </Typography>
                    <Typography gutterBottom variant="caption" component="div">
                      <MessageIcon
                        fontSize="15"
                        style={{ marginBottom: "3px" }}
                      />
                      {`\t${val.Response.length}`}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      id={`A3_Question_Question_Open_${val.Question.title}`}
                      size="small"
                      onClick={async () => {
                        setQuestionContent(val);
                        $(document).css({ overflow: "hidden" });
                        OpenEditPage("ShowQuestion");
                        setOpenQuestion(index);
                      }}
                    >
                      <SpeakerNotesTwoToneIcon
                        id={`A3_Question_Question_Open_${val.Question.title}`}
                        style={{ marginBottom: 0 }}
                      />
                    </Button>
                    {val.StudentId === StudentId && (
                      <>
                        <Button
                          id={`A3_Question_Question_Delete_${val.Question.title}`}
                          size="small"
                          onClick={() => {
                            SetLoading(true);
                            DeleteQuestion(val.QuestionId);
                          }}
                        >
                          <DeleteOutlineTwoToneIcon
                            id={`A3_Question_Question_Delete_${val.Question.title}`}
                            style={{ marginBottom: 0, color: "red" }}
                          />
                        </Button>
                        {!val.IsCompleted && (
                          <Button
                            id={`A3_Question_Question_Complete_${val.Question.title}`}
                            size="small"
                            onClick={() => {
                              SetLoading(true);
                              CompleteQuestion(val.QuestionId, index);
                            }}
                          >
                            <DoneAllIcon
                              id={`A3_Question_Question_Complete_${val.Question.title}`}
                              style={{ marginBottom: 0, color: "green" }}
                            />
                          </Button>
                        )}
                      </>
                    )}
                  </CardActions>
                </Card>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Question;
