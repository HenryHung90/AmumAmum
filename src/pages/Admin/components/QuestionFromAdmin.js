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
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import AccountCircleTwoToneIcon from "@mui/icons-material/AccountCircleTwoTone";
import SpeakerNotesTwoToneIcon from "@mui/icons-material/SpeakerNotesTwoTone";
import DeleteOutlineTwoToneIcon from "@mui/icons-material/DeleteOutlineTwoTone";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SendTwoToneIcon from "@mui/icons-material/SendTwoTone";
import DoneAllIcon from "@mui/icons-material/DoneAll";

import $ from "jquery";
import axios from "axios";

const QuestionsFromAdmin = ({ UserId }) => {
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
    });
  }

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
        setQuestion(F_Question);
        window.alert(response.data);
      });
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
          window.alert(response.data);
        })
        .then((response) => {
          let TempAllQuestion = AllQuestion;
          TempAllQuestion[Index].IsCompleted = true;
          setQuestion(TempAllQuestion);
          setTest("");
        });
    }
  };

  //發布回復
  const SubmitResponseFromAdmin = (Id) => {
    if (UserInputResponse.length === 0) {
      window.alert("請輸入回覆內容！");
      return;
    }

    const ResponseData = {
      identify: "Teacher",
      replyid: UserId,
      content: UserInputResponse,
      time: GetNowTime(),
      img: [],
    };

    const Data = {
      QuestionId: Id,
      StudentId: UserId,
      Response: ResponseData,
    };

    axios({
      method: "POST",
      data: Data,
      url: process.env.REACT_APP_AXIOS_QUESTION_UPDATE,
      withCredentials: true,
    }).then((response) => {
      let TempContent = QuestionContent;
      TempContent.Response.unshift(ResponseData);

      window.alert(response.data);
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
      let TempQuestion = AllQuestion;
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
        setQuestion(TempQuestion);
        setQuestionContent(TempQuestion[OpenQuestion]);
        CancelQuestionReplyEdit(ResIndex);
      });
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
    $("#NoteBlock").css("height", $(document).height());
    $("#NoteBlock").css("width", $(document).width());
    $(`#NoteBlock`).fadeIn(200);
  };
  const CloseEditPage = (Name) => {
    $(`#${Name}`).fadeOut(200);
    $(`#NoteBlock`).fadeOut(200);
  };
  return (
    <div style={{ width: "100%", margin: "0 auto" }}>
      <div
        id="ImgToBig"
        style={{ display: "none" }}
        onClick={() => {
          CancelImgToBig();
        }}
      >
        <img id="ImgToBigSource" src="#"></img>
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
                variant="outlined"
                style={{
                  fontSize: "20px",
                  height: "50%",
                  border: 0,
                }}
                onClick={() => {
                  CloseEditPage("ShowQuestion");
                }}
              >
                <CancelIcon
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
                    variant="text"
                    onClick={() => {
                      SubmitResponseFromAdmin(QuestionContent.QuestionId);
                    }}
                  >
                    <SendTwoToneIcon style={{ marginBottom: 0 }} />
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
                <div className="QuestionResponse_Card" id={val.identify}>
                  <div className="Card_Account">
                    <h6 className="Card_Floor">B{index}</h6>
                    <AccountCircleIcon
                      style={{ marginBottom: 0, marginTop: 7 }}
                    />
                    <p className="Card_Id">{val.replyid}</p>
                    <div className="Card_Identify">{val.identify}</div>
                    <>
                      <div id={`Reply_Edit_${index}`}>
                        <Button
                          variant="text"
                          onClick={() => {
                            QuestionReplyEdit(index, val.content);
                          }}
                          size="small"
                        >
                          <EditIcon
                            fontSize="small"
                            style={{
                              color: "black",
                              marginBottom: 0,
                            }}
                          />
                        </Button>
                      </div>
                      <div
                        id={`Reply_Cancel_${index}`}
                        style={{ display: "none" }}
                      >
                        <Button
                          variant="text"
                          onClick={() => {
                            SumbitQuestionReplyEdit(index);
                          }}
                          size="small"
                        >
                          <CheckIcon
                            fontSize="small"
                            style={{
                              color: "black",
                              marginBottom: 0,
                            }}
                          />
                        </Button>
                        <Button
                          variant="text"
                          onClick={() => {
                            CancelQuestionReplyEdit(index);
                          }}
                          size="small"
                        >
                          <CancelIcon
                            fontSize="small"
                            style={{
                              color: "black",
                              marginBottom: 0,
                            }}
                          />
                        </Button>
                      </div>
                    </>
                  </div>
                  <div className="Card_Reply" id={`Status_${index}`}>
                    {val.content}
                  </div>
                  <div
                    className="Card_Reply"
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
      <div id="NoteBlock"></div>
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
                          maxHeight: 350,
                          margin: 1.5,
                          backgroundColor: "rgba(87, 87, 87, 0.3)",
                        }
                      : {
                          maxWidth: 230,
                          minWidth: 200,
                          maxHeight: 350,
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
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      onClick={() => {
                        setQuestionContent(val);
                        $(document).css({ overflow: "hidden" });
                        OpenEditPage("ShowQuestion");
                      }}
                    >
                      <SpeakerNotesTwoToneIcon style={{ marginBottom: 0 }} />
                    </Button>
                    <>
                      <Button
                        size="small"
                        onClick={() => {
                          DeleteQuestion(val.QuestionId);
                        }}
                      >
                        <DeleteOutlineTwoToneIcon
                          style={{ marginBottom: 0, color: "red" }}
                        />
                      </Button>
                      {!val.IsCompleted && (
                        <Button
                          size="small"
                          onClick={() => {
                            CompleteQuestion(val.QuestionId, index);
                          }}
                        >
                          <DoneAllIcon
                            style={{ marginBottom: 0, color: "green" }}
                          />
                        </Button>
                      )}
                    </>
                  </CardActions>
                </Card>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default QuestionsFromAdmin;
