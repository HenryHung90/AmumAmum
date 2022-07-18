import React, { useState, useEffect, useRef } from "react";
import { Button, ToggleButton } from "react-bootstrap";
import VanillaTilt from "vanilla-tilt";
import { useNavigate } from "react-router-dom";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  RadialLinearScale,
  ArcElement,
} from "chart.js";
import { Line, Radar } from "react-chartjs-2";
import axios from "axios";
import Papa from "papaparse";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  RadialLinearScale,
  ArcElement
);
export const Lineoptions = {
  maintainAspectRatio: false,
};
export const Polaroptions = {
  maintainAspectRatio: false,
};
let labels = [];
for (let i = 0; i < 10; i++) {
  labels[i] = "第" + (i + 1) + "次";
}

let datalinebsteasy;
let datalineavleasy;
let datalinerbteasy;
let datalinebstmedium;
let datalineavlmedium;
let datalinerbtmedium;
let datalinebsthard;
let datalineavlhard;
let datalinerbthard;
let googledataBSTAnsType;
let googledataAVLAnsType;
let googledataRBTAnsType;
let googledataMIXEDAnsType;
let color = [
  "rgb(255, 99, 132)",
  "rgb(54, 162, 235)",
  "rgb(0 255 52)",
  "rgb(255 193 7)",
  "rgb(118 200 223)",
];
//計算成績
function caculate(arr) {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
  }
  return sum;
}
//浮動區塊
function Tilt(props) {
  const { options, ...rest } = props;
  const tilt = useRef(null);

  useEffect(() => {
    VanillaTilt.init(tilt.current, options);
  }, [options]);

  return <div ref={tilt} {...rest} />;
}
const radarData = {
  labels: ["知識型", "判斷型", "分析型", "應用型", "總分"],
  datasets: [
    {
      label: "Test 1",
      data: [0, 0, 0, 0, 0],
      fill: true,
      backgroundColor: "rgba(255, 99, 132, 0.2)",
      borderColor: "rgb(255, 99, 132)",
      pointBackgroundColor: "rgb(255, 99, 132)",
      pointBorderColor: "#fff",
      pointHoverBackgroundColor: "#fff",
      pointHoverBorderColor: "rgb(255, 99, 132)",
    },
  ],
};
export default function Grade(props) {
  const Refresh = useNavigate("");
  //存成績
  const [userBSTgradesEasy, setUserBSTgradesEasy] = useState("");
  const [userAVLgradesEasy, setUserAVLgradesEasy] = useState("");
  const [userRBTgradesEasy, setUserRBTgradesEasy] = useState("");
  const [userBSTgradesMedium, setUserBSTgradesMedium] = useState("");
  const [userAVLgradesMedium, setUserAVLgradesMedium] = useState("");
  const [userRBTgradesMedium, setUserRBTgradesMedium] = useState("");
  const [userBSTgradesHard, setUserBSTgradesHard] = useState("");
  const [userAVLgradesHard, setUserAVLgradesHard] = useState("");
  const [userRBTgradesHard, setUserRBTgradesHard] = useState("");

  const [userBSTgradesEasyTable, setUserBSTgradesEasyTable] = useState("");
  const [userAVLgradesEasyTable, setUserAVLgradesEasyTable] = useState("");
  const [userRBTgradesEasyTable, setUserRBTgradesEasyTable] = useState("");
  const [userBSTgradesMediumTable, setUserBSTgradesMediumTable] = useState("");
  const [userAVLgradesMediumTable, setUserAVLgradesMediumTable] = useState("");
  const [userRBTgradesMediumTable, setUserRBTgradesMediumTable] = useState("");
  const [userBSTgradesHardTable, setUserBSTgradesHardTable] = useState("");
  const [userAVLgradesHardTable, setUserAVLgradesHardTable] = useState("");
  const [userRBTgradesHardTable, setUserRBTgradesHardTable] = useState("");

  const [bsteasyranking, setBsteasyranking] = useState("");
  const [bstmediumranking, setBstmediumranking] = useState("");
  const [bsthardranking, setBsthardranking] = useState("");
  const [avleasyranking, setAvleasyranking] = useState("");
  const [avlmediumranking, setAvlmediumranking] = useState("");
  const [avlhardranking, setAvlhardranking] = useState("");
  const [rbteasyranking, setRbteasyranking] = useState("");
  const [rbtmediumranking, setRbtmediumranking] = useState("");
  const [rbthardranking, setRbthardranking] = useState("");

  const [minebsteasyranking, setmineBsteasyranking] = useState("XX");
  const [minebstmediumranking, setmineBstmediumranking] = useState("XX");
  const [minebsthardranking, setmineBsthardranking] = useState("XX");
  const [mineavleasyranking, setmineAvleasyranking] = useState("XX");
  const [mineavlmediumranking, setmineAvlmediumranking] = useState("XX");
  const [mineavlhardranking, setmineAvlhardranking] = useState("XX");
  const [minerbteasyranking, setmineRbteasyranking] = useState("XX");
  const [minerbtmediumranking, setmineRbtmediumranking] = useState("XX");
  const [minerbthardranking, setmineRbthardranking] = useState("XX");

  const [radarDataBST, setRadarDataBST] = useState(radarData);
  const [radarDataAVL, setRadarDataAVL] = useState(radarData);
  const [radarDataRBT, setRadarDataRBT] = useState(radarData);
  const [radarDataMixed, setRadarDataMixed] = useState(radarData);
  const [renderF, setRenderF] = useState("");

  let maxlength = 0;
  const options = {
    scale: 1,
    max: 15,
    speed: 250,
  };
  const [UserData, setUserData] = useState("");
  let GetSid = sessionStorage.getItem("Sid");
  let tmplength = [
    userBSTgradesEasy.length,
    userBSTgradesMedium.length,
    userBSTgradesHard.length,
    userAVLgradesEasy.length,
    userAVLgradesMedium.length,
    userAVLgradesHard.length,
    userRBTgradesEasy.length,
    userRBTgradesMedium.length,
    userRBTgradesHard.length,
  ];
  //找出最多的，並產生lable
  maxlength = Math.max(...tmplength);
  labels = [];
  for (let i = 0; i < maxlength; i++) {
    labels[i] = "第" + (i + 1) + "次";
  }
  let sID;
  //瘋狂GET資料
  useEffect(async () => {
    await axios({
      method: "POST",
      data: {
        _id: GetSid,
      },
      withCredentials: true,
      url: process.env.REACT_APP_AXIOS_USERINFO,
    }).then((response) => {
      setUserData(response.data);
      sID = response.data.StudentId;
      if (props.StudentId !== undefined) {
        console.log(props.StudentId);
        sID = props.StudentId;
        axios({
          method: "POST",
          data: {
            StudentId: sID,
          },
          withCredentials: true,
          url: process.env.REACT_APP_AXIOS_REVERSEUSERINFO,
        }).then((response) => {
          setUserData(response.data);
        });
      }
    });
    //Google sheet AnsType
    await axios({
      method: "POST",
      data: {
        MajorAndType: "BST",
      },
      withCredentials: true,
      url: process.env.REACT_APP_AXIOS_GOOGLESHEETGRADESINFO,
    }).then((response) => {
      googledataBSTAnsType = response.data.AnsType;
    });
    await axios({
      method: "POST",
      data: {
        MajorAndType: "AVL",
      },
      withCredentials: true,
      url: process.env.REACT_APP_AXIOS_GOOGLESHEETGRADESINFO,
    }).then((response) => {
      googledataAVLAnsType = response.data.AnsType;
    });
    await axios({
      method: "POST",
      data: {
        MajorAndType: "RBT",
      },
      withCredentials: true,
      url: process.env.REACT_APP_AXIOS_GOOGLESHEETGRADESINFO,
    }).then((response) => {
      googledataRBTAnsType = response.data.AnsType;
    });
    await axios({
      method: "POST",
      data: {
        MajorAndType: "MIXED",
      },
      withCredentials: true,
      url: process.env.REACT_APP_AXIOS_GOOGLESHEETGRADESINFO,
    }).then((response) => {
      googledataMIXEDAnsType = response.data.AnsType;
    });
    //BST AVL RBT EASYINFO
    await axios({
      method: "POST",
      data: {
        StudentId: sID,
      },
      withCredentials: true,
      url: process.env.REACT_APP_AXIOS_BSTGRADEINFOEASY,
    }).then((response) => {
      let tmp = [];
      let tmptable = [];
      for (let i = 0; i < response.data.Grades.length; i++) {
        let tmptime = response.data.Time[i].split(" ");
        let time =
          tmptime[0] +
          " " +
          tmptime[1] +
          " " +
          tmptime[2] +
          " " +
          tmptime[3] +
          " " +
          tmptime[4];
        tmp[i] = "第" + (i + 1) + "次";
        tmptable[i] = (
          <div
            key={"BSTEASY" + i}
            className="rankingItem"
            style={{ display: "flex", flexDirection: "row" }}
            label={i}
          >
            <div style={{ fontSize: "30px" }}>{i + 1} </div>
            <div style={{ fontSize: "20px", margin: "0 10px 0 0 " }}>
              {response.data.Grades[i]}分
            </div>
            <div style={{ margin: "0 10px 0 0 " }}>/</div>
            <div style={{ fontSize: "20px" }}>{time}</div>
          </div>
        );
      }
      labels = tmp;
      setUserBSTgradesEasyTable(tmptable);
      setUserBSTgradesEasy(response.data.Grades.map(Number));
    });
    await axios({
      method: "POST",
      data: {
        StudentId: sID,
      },
      withCredentials: true,
      url: process.env.REACT_APP_AXIOS_AVLGRADEINFOEASY,
    }).then((response) => {
      let tmptable = [];
      for (let i = 0; i < response.data.Grades.length; i++) {
        let tmptime = response.data.Time[i].split(" ");
        let time =
          tmptime[0] +
          " " +
          tmptime[1] +
          " " +
          tmptime[2] +
          " " +
          tmptime[3] +
          " " +
          tmptime[4];
        tmptable[i] = (
          <div
            key={"AVLEASY" + i}
            className="rankingItem"
            style={{ display: "flex", flexDirection: "row" }}
            label={i}
          >
            <div style={{ fontSize: "30px" }}>{i + 1} </div>
            <div style={{ fontSize: "20px", margin: "0 10px 0 0 " }}>
              {response.data.Grades[i]}分
            </div>
            <div style={{ margin: "0 10px 0 0 " }}>/</div>
            <div style={{ fontSize: "20px" }}>{time}</div>
          </div>
        );
      }
      setUserAVLgradesEasyTable(tmptable);
      setUserAVLgradesEasy(response.data.Grades.map(Number));
    });
    await axios({
      method: "POST",
      data: {
        StudentId: sID,
      },
      withCredentials: true,
      url: process.env.REACT_APP_AXIOS_RBTGRADEINFOEASY,
    }).then((response) => {
      let tmptable = [];
      for (let i = 0; i < response.data.Grades.length; i++) {
        let tmptime = response.data.Time[i].split(" ");
        let time =
          tmptime[0] +
          " " +
          tmptime[1] +
          " " +
          tmptime[2] +
          " " +
          tmptime[3] +
          " " +
          tmptime[4];
        tmptable[i] = (
          <div
            key={"RBTEASY" + i}
            className="rankingItem"
            style={{ display: "flex", flexDirection: "row" }}
            label={i}
          >
            <div style={{ fontSize: "30px" }}>{i + 1} </div>
            <div style={{ fontSize: "20px", margin: "0 10px 0 0 " }}>
              {response.data.Grades[i]}分
            </div>
            <div style={{ margin: "0 10px 0 0 " }}>/</div>
            <div style={{ fontSize: "20px" }}>{time}</div>
          </div>
        );
      }
      setUserRBTgradesEasyTable(tmptable);
      setUserRBTgradesEasy(response.data.Grades.map(Number));
    });
    //BST AVL RBT MEDIUMINFO
    await axios({
      method: "POST",
      data: {
        StudentId: sID,
      },
      withCredentials: true,
      url: process.env.REACT_APP_AXIOS_BSTGRADEINFOMEDIUM,
    }).then((response) => {
      let tmptable = [];
      for (let i = 0; i < response.data.Grades.length; i++) {
        let tmptime = response.data.Time[i].split(" ");
        let time =
          tmptime[0] +
          " " +
          tmptime[1] +
          " " +
          tmptime[2] +
          " " +
          tmptime[3] +
          " " +
          tmptime[4];
        tmptable[i] = (
          <div
            key={"BSTMEDIUM" + i}
            className="rankingItem"
            style={{ display: "flex", flexDirection: "row" }}
            label={i}
          >
            <div style={{ fontSize: "30px" }}>{i + 1} </div>
            <div style={{ fontSize: "20px", margin: "0 10px 0 0 " }}>
              {response.data.Grades[i]}分
            </div>
            <div style={{ margin: "0 10px 0 0 " }}>/</div>
            <div style={{ fontSize: "20px" }}>{time}</div>
          </div>
        );
      }
      setUserBSTgradesMediumTable(tmptable);
      setUserBSTgradesMedium(response.data.Grades.map(Number));
    });
    await axios({
      method: "POST",
      data: {
        StudentId: sID,
      },
      withCredentials: true,
      url: process.env.REACT_APP_AXIOS_AVLGRADEINFOMEDIUM,
    }).then((response) => {
      let tmptable = [];
      for (let i = 0; i < response.data.Grades.length; i++) {
        let tmptime = response.data.Time[i].split(" ");
        let time =
          tmptime[0] +
          " " +
          tmptime[1] +
          " " +
          tmptime[2] +
          " " +
          tmptime[3] +
          " " +
          tmptime[4];
        tmptable[i] = (
          <div
            key={"AVLMEDIUM" + i}
            className="rankingItem"
            style={{ display: "flex", flexDirection: "row" }}
            label={i}
          >
            <div style={{ fontSize: "30px" }}>{i + 1} </div>
            <div style={{ fontSize: "20px", margin: "0 10px 0 0 " }}>
              {response.data.Grades[i]}分
            </div>
            <div style={{ margin: "0 10px 0 0 " }}>/</div>
            <div style={{ fontSize: "20px" }}>{time}</div>
          </div>
        );
      }
      setUserAVLgradesMediumTable(tmptable);
      setUserAVLgradesMedium(response.data.Grades.map(Number));
    });
    await axios({
      method: "POST",
      data: {
        StudentId: sID,
      },
      withCredentials: true,
      url: process.env.REACT_APP_AXIOS_RBTGRADEINFOMEDIUM,
    }).then((response) => {
      let tmptable = [];
      for (let i = 0; i < response.data.Grades.length; i++) {
        let tmptime = response.data.Time[i].split(" ");
        let time =
          tmptime[0] +
          " " +
          tmptime[1] +
          " " +
          tmptime[2] +
          " " +
          tmptime[3] +
          " " +
          tmptime[4];
        tmptable[i] = (
          <div
            key={"RBTMEDIUM" + i}
            className="rankingItem"
            style={{ display: "flex", flexDirection: "row" }}
            label={i}
          >
            <div style={{ fontSize: "30px" }}>{i + 1} </div>
            <div style={{ fontSize: "20px", margin: "0 10px 0 0 " }}>
              {response.data.Grades[i]}分
            </div>
            <div style={{ margin: "0 10px 0 0 " }}>/</div>
            <div style={{ fontSize: "20px" }}>{time}</div>
          </div>
        );
      }
      setUserRBTgradesMediumTable(tmptable);
      setUserRBTgradesMedium(response.data.Grades.map(Number));
    });
    //BST AVL RBT HARD
    await axios({
      method: "POST",
      data: {
        StudentId: sID,
      },
      withCredentials: true,
      url: process.env.REACT_APP_AXIOS_BSTGRADEINFOHARD,
    }).then((response) => {
      let tmptable = [];
      for (let i = 0; i < response.data.Grades.length; i++) {
        let tmptime = response.data.Time[i].split(" ");
        let time =
          tmptime[0] +
          " " +
          tmptime[1] +
          " " +
          tmptime[2] +
          " " +
          tmptime[3] +
          " " +
          tmptime[4];
        tmptable[i] = (
          <div
            key={"BSTHARD" + i}
            className="rankingItem"
            style={{ display: "flex", flexDirection: "row" }}
            label={i}
          >
            <div style={{ fontSize: "30px" }}>{i + 1} </div>
            <div style={{ fontSize: "20px", margin: "0 10px 0 0 " }}>
              {response.data.Grades[i]}分
            </div>
            <div style={{ margin: "0 10px 0 0 " }}>/</div>
            <div style={{ fontSize: "20px" }}>{time}</div>
          </div>
        );
      }
      setUserBSTgradesHardTable(tmptable);
      setUserBSTgradesHard(response.data.Grades.map(Number));
    });
    await axios({
      method: "POST",
      data: {
        StudentId: sID,
      },
      withCredentials: true,
      url: process.env.REACT_APP_AXIOS_AVLGRADEINFOHARD,
    }).then((response) => {
      let tmptable = [];
      for (let i = 0; i < response.data.Grades.length; i++) {
        let tmptime = response.data.Time[i].split(" ");
        let time =
          tmptime[0] +
          " " +
          tmptime[1] +
          " " +
          tmptime[2] +
          " " +
          tmptime[3] +
          " " +
          tmptime[4];
        tmptable[i] = (
          <div
            key={"AVLHARD" + i}
            className="rankingItem"
            style={{ display: "flex", flexDirection: "row" }}
            label={i}
          >
            <div style={{ fontSize: "30px" }}>{i + 1} </div>
            <div style={{ fontSize: "20px", margin: "0 10px 0 0 " }}>
              {response.data.Grades[i]}分
            </div>
            <div style={{ margin: "0 10px 0 0 " }}>/</div>
            <div style={{ fontSize: "20px" }}>{time}</div>
          </div>
        );
      }
      setUserAVLgradesHardTable(tmptable);
      setUserAVLgradesHard(response.data.Grades.map(Number));
    });
    await axios({
      method: "POST",
      data: {
        StudentId: sID,
      },
      withCredentials: true,
      url: process.env.REACT_APP_AXIOS_RBTGRADEINFOHARD,
    }).then((response) => {
      let tmptable = [];
      for (let i = 0; i < response.data.Grades.length; i++) {
        let tmptime = response.data.Time[i].split(" ");
        let time =
          tmptime[0] +
          " " +
          tmptime[1] +
          " " +
          tmptime[2] +
          " " +
          tmptime[3] +
          " " +
          tmptime[4];
        tmptable[i] = (
          <div
            key={"RBTHARD" + i}
            className="rankingItem"
            style={{ display: "flex", flexDirection: "row" }}
            label={i}
          >
            <div style={{ fontSize: "30px" }}>{i + 1} </div>
            <div style={{ fontSize: "20px", margin: "0 10px 0 0 " }}>
              {response.data.Grades[i]}分
            </div>
            <div style={{ margin: "0 10px 0 0 " }}>/</div>
            <div style={{ fontSize: "20px" }}>{time}</div>
          </div>
        );
      }
      setUserRBTgradesHardTable(tmptable);
      setUserRBTgradesHard(response.data.Grades.map(Number));
    });
    //BST RANKING
    await axios({
      method: "POST",
      data: {
        MajorAndType: "BSTEASY",
      },
      withCredentials: true,
      url: process.env.REACT_APP_AXIOS_GRADESRANKINGINFO,
    }).then((response) => {
      let tmp = [];
      for (let i = 0; i < response.data.Ranking.length; i++) {
        if (response.data.Ranking[i].StudentId === sID) {
          setmineBsteasyranking(i + 1);
        }
        if (i === 0) {
          tmp[i] = (
            <div className="rankingItem" label={i} key={"BSTRANKINGEASY" + i}>
              <img
                className="rankingImg"
                src="data:image/png;base64,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"
              />
              <div style={{ fontSize: "20px" }}>
                {response.data.Ranking[i].StudentId}{" "}
              </div>
              <div style={{ fontSize: "20px" }}>
                {response.data.Ranking[i].Grades}
              </div>
            </div>
          );
        } else if (i === 1) {
          tmp[i] = (
            <div className="rankingItem" label={i} key={"BSTRANKINGEASY" + i}>
              <img
                className="rankingImg"
                src="data:image/png;base64,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"
              />
              <div style={{ fontSize: "20px" }}>
                {response.data.Ranking[i].StudentId}{" "}
              </div>
              <div style={{ fontSize: "20px" }}>
                {response.data.Ranking[i].Grades}
              </div>
            </div>
          );
        } else if (i === 2) {
          tmp[i] = (
            <div className="rankingItem" label={i} key={"BSTRANKINGEASY" + i}>
              <img
                className="rankingImg"
                src="data:image/png;base64,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"
              />
              <div style={{ fontSize: "20px" }}>
                {response.data.Ranking[i].StudentId}{" "}
              </div>
              <div style={{ fontSize: "20px" }}>
                {response.data.Ranking[i].Grades}
              </div>
            </div>
          );
        } else {
          tmp[i] = (
            <div
              label={i}
              key={"BSTRANKINGEASY" + i}
              className="rankingItem"
              style={{ display: "flex", flexDirection: "row" }}
            >
              <div style={{ fontSize: "30px" }}>{i + 1} </div>
              <div style={{ fontSize: "20px" }}>
                {response.data.Ranking[i].StudentId}{" "}
              </div>
              <div style={{ fontSize: "20px" }}>
                {response.data.Ranking[i].Grades}
              </div>
            </div>
          );
        }
      }
      setBsteasyranking(tmp);
    });
    await axios({
      method: "POST",
      data: {
        MajorAndType: "BSTMEDIUM",
      },
      withCredentials: true,
      url: process.env.REACT_APP_AXIOS_GRADESRANKINGINFO,
    }).then((response) => {
      let tmp = [];
      for (let i = 0; i < response.data.Ranking.length; i++) {
        if (response.data.Ranking[i].StudentId === sID) {
          setmineBstmediumranking(i + 1);
        }
        if (i === 0) {
          tmp[i] = (
            <div className="rankingItem" label={i} key={"BSTRANKINGMEDIUM" + i}>
              <img
                className="rankingImg"
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABmJLR0QA/wD/AP+gvaeTAAAJmklEQVRoge3Ze5DW5XUH8M/z7g1YQKgoBqEzXIy3ToxXeJdF3aYhGWpqx2ZMmqajjk46bWLMGNuQjEQRBO+5tHGiViedVFo16VS0Ro0Cld33XQxatcG0VjAhrY1GuS1bfHfZ9/SP98e6srffa/yjncl3huW3vz3nPOf7nOec8zzPj1/j/zCi2weiZG+U/QVEyWeiZF90WjSqTpezo2R/lF2W6Xw1Sl6LshOHyXY6Pkpejy5fgii7OEp2j2m/06Io2R1dLoHYqDFKuqPk6aFyhXdqacRUYUVsNUMyGVMUrB2VfYMWtAprotMUyVQcLVw/TDZZiaMUTI+SicIaTNNgwqj2C27ANMkRoMVFWIhJ7zR9+AyUPIalwhqTrdFrB46WdKSiTSONFSVdaBNWGHC3Ri9jorAwLfYjiG4nqfpX9GGB5ELhNkl3KiqOYvdDeEJ4Q5inX79mL0nmCB9Pi33/bb7DtF2bUfy8fhPxtez9NaPOWtXyTOcqjSq4HUny1SEy12bjfVvFm8JV2fvR7cr0kxtTux4tLpfMwTPa/MNQwWERgejyuOTDktUmuSFnVJ7Ah4Trtfi6PjswRVURPQpecCga4ZOSW1BObdpGtNftw6oexy9VzDNFgz7bcaSCpWmRHw6VHx6RGmqzFD6vV4twW/b76LMXvoyQfEFFQfKNbISVCoPRuAO7JFdmfxsryitAsjZ12K/fVTgSTx1OoiY2ml8lP8TvYJWKm7TYgaPGico/4nzhNn1WZTrTEaiomi/5wywaXalN+yh2PoJH8d+Yr2CqqpfRqqottes+XGe0iGBwtq7QqEm4tTbKmFG5GlXJn5lospTp1PLlTlPslfz5YfZHwsrM3g2pzQFVV2MyHhyJxJhEUpsSnsRUBVeY7K/wS5wbZeeOqLPYj3EfJhjwlWyNw1sG3KjXn2Km0JnaPDmSjei0TK28/pc+d8YWc/EZDGSERsRYEaGazUxyhV2asiUxdlRq6/6g5NIh8neZYi9ZNFJWGQ8nEVKWT7A2dXjLgJVoxr2p3bbRhh01RwaNl20QOnCNVrfmqmBd7pJqnR4VzJf8kXCjsXKj7GPCeuHn9jrONO/HczhowIlpiR2j+Tl2RDhU/+EL+jWSIypNrlMrtXCXir1D+saKEUmENGizYE1apoLrURDuGItELiJpsaewCdNVXK7V7XjdGLmi3xFoREXBjZp9FkehK7XbOKJO2fk4HTtNdU90a8fH0KvJmvH8HD8iHNojkXzRLk3Gi0pyndpM3mmi3YN9I42crBGSt3vX6nSyPlWrMp2vpbP8YnwXcyJKNuEcydUm+fpIuRJbTVLxCcndme39mKAWnZBsEZ4TntDnsdRhP0TZBcL38Ypmx6tYKnkYu1TMTx32vHdEOnUo2IA3Vc1V8Ce4GZtUXaTgy/i0Wr3Pgx7hbxXcJDyID+BSRd/R7VnhFMmXUtFNeYzlJgJR8s84G1/R6puDUaEfTWodfDMeVtWN7Qp2a1XQa47kGGEJzsdp2fgDaMB2FSdocSHuxatYkNocyONbvhwZZDLYca/Uax72DrFztwELVJ2X2tysoFXBNanNAfudhL9ORZsUrcYlGpyA+4f48JZGv4nrQLIqL4m6iaTFNgidkhn4FxyHFw04PbW5TIPTFTwAqt4gO/klvyG8CcrOlnw3LfRSavOJTGY7TtZgG+bjZU3urse3+iJS0/jL7KkBDwkdGrODUcVDmBlbTTLdC8LvgWYbhE9neseq+hZEl0/iPA0WSjaSnRSTW9MZ+uv2LS+y83IpSiJKHoptmqPb1Ch5Nko+y2ApHd9WKETJv0XZYoitmqJsQ2b7mdimuR7f6otIixUo4kXhUnt9MC2yT3KBQq3RpSTymEpJ1YBiKuqKbrP1uUv4Y7Vldpq9WT7mRD195NhskEbJWQY0K1gvuSgV/WBUva2aHDAHHLQzdTg4TKbL4wqesMjNup0llHFQ1YLUbmce/+qJyBfRIrknFT2bnQvOxk/H1Or3KQ22a7DdBLNHlJnmvMF+0W8nvocmKduf5UC+9fy8Vr1ew0QFJxhwsYL1qWjLmHrdZqvaglnZaHNTcWTi8bQ5DroP/6FqjYKf4ICqY1K7nvF8zBeRHuegFZvttAP7VN0SG4ffR0WnWVGyPMruUfXjQRLjodduyTcUXZLa/btaeZ+k4Jw86o25BmnwEYHwULrQAG7M/o0k+35hbb6UfxvZvuu+CIXoNjM7l5wmLMXD4+nnIxLOyJ5+FGWrhDc0+046Y7CzD/FIj/DMkDfHYWquYTqdoewxyUZVt0tITs+jm48IM0GTlxw0G2eqaBlJMC3yDIPERckP8NFco0z3gh5z0yL7otPxWQYfk0c1L5GasV57Uod1WJdTry6kk/XFxsG8fTX7f2Ye3bzltyn72RRlV0bJ2no7bx7ERhO0OBCld5w/ck12PiJhH2jyPrUq9FqdPuZC6vBWapO0Otbb1W54Ho6AfEsr2YEZqmalYv4mVS+i20xV/ekUu6LLsUPGHhd5z+zP10ayJLodFyVro5ydw99LhI/ip1F2uYIl2bvn86jmI1K1IXv6fQNaJInR91fvFqnob1TMUrBOOD97PeKN5OHImyP/hP/BqRr1paLlqegn2UbyPUGUXRbd2rOb9xn4IPZr9Uge/VxEUrseYR2SAavifg1R9l2sjxjHRvgFdmCHNHznO0Rur6q/i5ITFKxW2weuS6fozeVjHiGIkgV4Ua1ALMJvqXogteuJbZrTyYM3i3UhOs2SNKXFfhaPaHGE0yRd6NPgxLTQK3ns5N7GpzYvS26TzZQGD6Z2PdHl4/Z4Mu/JcLhhbdgcnY53tCmSe5GEW/OSoN4T4m7XoIT5qh6IbZolF+HylER0KcbGfPdaUfK5eMr70mLfkyzXaI9+92Ou0GlafSfE+m5RlqkouED4udBhn0c1uDgt9ly2RB7UZGrcryG6LB3mfLeToiu7qEiO1Jh9CGr2uKq/z279f4Y/qHep1n2LkhZ5DcsGyQzYEmULNZohrE7tXjXLqVLtO3v2wf9RUDVPyr7ZH/RN3BFdivo8jXOxU9XvpsVer9ev+q+DZF+mGpzp0DILZVVXC4+BRhPIvoEXTMO07PkpoTNCkhyNz2WJXVtO4cyxPuaM6dO7UTqEeESLaa7FlQxuIp+VrFe1WfKqiv8ELWYLsxQsyZrdqZl8n3CLaVa+28r3KxM5hNhsnkbLhU+pHYnzYL9a9buhnuo0Gt4TIocQG002wTLht9U681yHlhV78IraWXyDVo/kbXa/xv9H/C9Fs457MueAewAAAABJRU5ErkJggg=="
              />
              <div style={{ fontSize: "20px" }}>
                {response.data.Ranking[i].StudentId}{" "}
              </div>
              <div style={{ fontSize: "20px" }}>
                {response.data.Ranking[i].Grades}
              </div>
            </div>
          );
        } else if (i === 1) {
          tmp[i] = (
            <div className="rankingItem" label={i} key={"BSTRANKINGMEDIUM" + i}>
              <img
                className="rankingImg"
                src="data:image/png;base64,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"
              />
              <div style={{ fontSize: "20px" }}>
                {response.data.Ranking[i].StudentId}{" "}
              </div>
              <div style={{ fontSize: "20px" }}>
                {response.data.Ranking[i].Grades}
              </div>
            </div>
          );
        } else if (i === 2) {
          tmp[i] = (
            <div className="rankingItem" label={i} key={"BSTRANKINGMEDIUM" + i}>
              <img
                className="rankingImg"
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABmJLR0QA/wD/AP+gvaeTAAANQElEQVRoge2Za3Rc1XXHf/vcO6MnxsYPaUY2aEayIaiL8AgPUx52U0xLoXTxSEibLsiCRVebGIjjNsZY0vXID2xsTEJDiwlNslLcEqCrGEowAeNiO0Apj5AKlkEz8kOekXlY2JYlzeOe3Q935ApZj1HjD+1a2V9m7jr/vc/+n332OWefA7+V/1siQz/2ebGzHCvbVWVlXVtybbq54XZE1xljF9R6u18byUDai12GledQvSva1vnDTHO8RYVvYv150RV73h+K3b8sdroY2a6wvi6RWpNpbrhFRTcYY/9wNPvdXv1F1pqfKyyqS6R+pN48N2P37gBMNJG6YBBnhio5OC4wSUSb096caaDVwEnWl9WjjYRayoAqRFZ9/Denn6Qik4AZGGflcKwxLAemG5iy79szK1R0FTBZcctHs2+tcy8wWZSTAdJ2z83AhUDlUJwMV0w3x7cgLEBklTnau8pWVqWAGWLM/IjXsW2kztIt8Z3Axag0h/zCo3nX6QAqRLkw0pZ6AyDjNZ6p1v4ayPm+2+g4ha8A9yvyWl0iOXcku10t8S8beBH4JDQQivdWZvNl1nwAzAJuiCZSTx0bpONGAOMBoHqHrT65AmUDgPp+62ijhuqSYFh08UDYz6rIQ4BYaDkGseoBBuHvC6Hcp4IsBhBjR7Vrivqiumb62l1Hyq2zsEjizUgi9S9DscdFBCDdEn8BuALRFeZo372lRCXTEn9R4csgKzHOA9hCCjjJGDtXffeIin2XYjRcJ3+TIusEfTWS6Lx4JHv7W2JXCPIC8LFrKuJuf78zUKZJkKmKLqhLdP5iGOnjxaoJRknljnx1qEzhfhgvKtwNKOhdBt8g+j0A65vlivWKfT1MX99BMIsALIxqT5Dm4t/VM7z23oFyXQwyFXhlOIkAP4qkm+O/QPh90DbXVK4t2P4UMH3sXIn9K8i1CPdnxbaVWZMCpgQEyRZMviFk3a8psg7YGU2kLhnZTv2VYJ4HMv6RXEO4IjTJd6UDqDLGXjzSCjdiRADUkeJoyZ39A0dCCuth7KgYY5YBFuWvQrjVoOuLTYLoxnBv7pAifw1jRwPM8sAJuXfWhq5+GzLLgGqUp0dbpkclUuclfynwEjDJDbt3On1H/xb4GJF5Ga9x3kg6tV7yv4DHgXJj7VJReaHYNFCQwhqtqPxLoAbYMTORemkkGxkvfhXB8ro/6/gbu5edFlPV2wFfMMtGpT5aA4CqLgcQuLO/uiKkKutg7Kj4llagANyqwrpAXx8J9+YOqRyLhjdifyBqgzZBV8e83QPWuMuBMKKPRdo62kfrd9QcGZR0S3wrMF+UVuk/ur6kfaW14RFUbyt+Zn3fbTDG/zMRXcMYubG/JXaNIJuBfUd7zOyTJts5VngHKDjG/UKN90FqND/HjEiAUA9AhbvCTpUrjB8VLZAAcgAi8khZKHRIRIN9439Wo8/rgAjFvFRWzX6wI6vCSsAI+vBYJEoiEvU6X0F1GzBlICwLpa/3IeCjsXLFCXEy4AJZX2RN3vZ/E5gO7Iwkki+PpJPxGq4FzgP29jgV/5D24pcoXAMcdYyuGs/P8SMCiOMEq4jod/qrK0LjRcVaTRCM5Ea390iPwCIAMSMnq4JgtWhLVzR57Tl8bSv2uWGGt7t7XB9LIQKQbmnYBno56DLT1/fASLmS9qKVasu/KvBo0XYvUE4QHVXkdRF9B+VF11RsmeG19wZ68euwPAV0RrqnnN5d27NA4VngYNbYhpi3+7MTRiTT0jBf0a2gn4YGwrFCWe4vVOQ+VLfhyM0od6N8Hagu0eQR4B/F2LVY87TCWarcGnVSP87Y+FvAF1Xlu3VtybWlGCuZCEC6Jf7vwGXAUtN39PuDUQHyQIhgB98uyLOq9rWCU0jKIe0JOXljqytmCW4tVi9V9Frg3GL/PuAAyYg59YyMv/crCI8Jki4cyTbO2tDVX4pvJeXIMbCR5cW/i6ioigOHhth51DFuY2ggdHUkkbwPx1S56rbO2tDVrxVVZ2LNDyNex7baRHKFUb5hDWeoyM+G+DDwEelTERIAqtpWKokJE6n1kluBHcA0K7wNzAbes6rnRROp26zNn5cvLzwRoPUTUbkIQMWeIiqfAnQ3119mhZ/O9FIf1C1PflWMXgQkgSbfFtqBBoGOyIEpj07EtwkRARDVB4t/HYFnjJH5BpkLMGD0GdCatBet7KHiXfX1jwEi3VO3uln36wCKqQP9AcD+5oab1HK1zYcvBF4mWBhQZb1sfDM/Ib8mAlZvnttt97yiyFxVnv3Mqbi+lmx51vrbBB6NJDp/EGxs6Pi2MBkbf09Vbq1rS+7U288LZWp7tgDzgbd6TMXcJq89V6pvE4pIWvc2azD67zmO3HoKfWdP9ToOi9HrMM7LAKWQABAPm88V5ta1JXd2eY0zM7UHH/F9988Jptm5U7R/+Xg2PmevVOC+e+bUOU4hCbgYc4GhELbWbBbk5kgi+fPh+HavKTzZ9l0uymkiJq9Gfh3xOt4eiWi6Jf6CqrwYbUved6C5/gIr5lWggKEx6qX2luKfWyoRxyl8BygDeSTqdbwFkPbqL9OCHn+B4cUWYPt/AlIbhEjBKpmW+Ovd1v9a7Yo9nUPxPabi6iavPacgjq97rStPgt4oVhcDd5TiX0kR6V5cU2Urqw4AFb7lDMeRW4z1N9e27X59OLZ4W/ImxcQl2N3LCPYZgA+zxp4V83YPDNXbf0/DLOPYx1X4UH1WiZH3gf7QQKh2+tpdR8bzsaQc0eqqy4EqkO0zd6VSqnrYilnX6dUfdx+l1i49RkL5diSRmuSbXC3KYJE1O2yda4frhULlPRbzvYh0fqNuRecu4G2g0q/MX16KjyVNLVW9EgTBPiNP4ENqDbBmFPgVwY+8H21LPgCA13Vwvxe/TywLAESZPVypeO56XD3MgaWxGgubFc5VqwsIzl2/ORFUvgSghjfSrbE2VD4pz/LjU9akDn0OBpLRYr3h8LkkNVZP18GZ7Oh7I3WT9uJfyli24PKyMfKQWkWR80pxsdRkrwnA+kHBmpkYzs9VSNlwkIDSltw4+N119xlTJZRbKMoXi7UFAi/VtqeeHqmTHirerTXZ2FSv43DxnhjQ2hNJpBbgKHwWa0ttAjaVomTKBqZjTeuQJeUAyMpgeh4vTV57rtOrNwDhXDidL88DUlNSX6WAKK441X1loXRzfFG6Nb663WsKj6ckWfdTgTUCPyI4ttco+mK6JX79SPhOr768zJr+dEt8aP1R0mCXGpHDwLRsZT5irESx2oUzvlJkdcfHwBKATHP871R4HTCga4GnhuOLS7J0L66pypVXzpQglIeG434TIilgmoOJRhIdi0cDBRuhbAFQ5I66RHLwgEmkLfVGuiV+CJgMUq8eRjzsUP0DS2M1uXA+X+t1Hez2GupskOxjXjoMSolTS34FgNVL9y2Lz063xlenm+OLjjNWsB8e00Cv0SEbbpcXnwPBG4cg3cNJAFjX/IFjw7v3tzQsVKuXFu386oQRUWUrgKJ/EnKlTBRB/ePOV8HRQ98ufl7R3RrflG6pvzLjxW4wlmcoElOxT47UTySR/IlrKqKaD20qVpEIOuKN5P+KSDjr/hvQB5xTQHORRGpJdMWe9/fdM6fueItyO0FOocpNYJ5XK08Ac4qIt8rEOe5uK90cuy3txS+Z4bX3ipOdBnI20Ct9fc+dMCLT1+46gsgmQESlTW/ESbfGf+o4hc3qfd5G1Ev9J8ZeKOjjBCsVBHV5u8KSrLG/O9XrODy8DxEOYfmntFd/hoisILj43lS77sDRUnws/RjvNTQ6Vt8DXDF6kfXld8LZ0BPT1+460u41hUcrgg5+N37ylJ4pfaNVfHu9WVE374aiKzv3fLiwsaxiMucasTuBnLH+F4aflEeTkgurWV6yQ4IHH1Erm7QQfnr62l1HMl7shim2/yUdZVBOWZM6NFbZGsK9GEe2718WO71qqjnJiH0MEETWl0piQkQAentMK/BLoMGEck+0e01h68vN1tiFAtrV3Dj3I6+ppHut/c2xb3289LRIxOt8EmWJa/kMW/gZEAN29Ej5hCrECRGZ/WBH1inodcA+YP4U2/+8FsK3zPR2v7PXmxU1Yp8e4PAkvREn7cUWDNfPeI1ndjU3zgUwIlPzrhM8BDnuC77DPxPU63uMkesnUq9PmAhAzarOA8bIVYNkTCj3endz/YWCOw2VFad6+9KZpvg5WFkJwYN/uqXheQDBxo3oaoBcrvB9UftwV3PjXGzhPxCZB+wVNX9U6yU/mqhfEyYCwcuUU9DzKU4zK+ZVx5plqnZLEVKOBkcQizMZdDJACPMKsENBXNeZoZhvFRM7BuwwRs4f6zFnLJnQddBw+XBhY1nVKdZDWQQMHiLfEtgsRrZb/LRLVRdAgaMzDU5Uj12ZyjlFfA6RdT1Svnyi0+mEERmUA96cuG/9JaB/ClSVqNaL6Cbj23snsjqNJieEyKB85DVV+37fVSrye8DZBFNmcrH5M6AT4W1R3Sp9fc+Vutn9Vv4/yn8DfMXhC4XFZOIAAAAASUVORK5CYII="
              />
              <div style={{ fontSize: "20px" }}>
                {response.data.Ranking[i].StudentId}{" "}
              </div>
              <div style={{ fontSize: "20px" }}>
                {response.data.Ranking[i].Grades}
              </div>
            </div>
          );
        } else {
          tmp[i] = (
            <div
              key={"BSTRANKINGMEDIUM" + i}
              label={i}
              className="rankingItem"
              style={{ display: "flex", flexDirection: "row" }}
            >
              <div style={{ fontSize: "30px" }}>{i + 1} </div>
              <div style={{ fontSize: "20px" }}>
                {response.data.Ranking[i].StudentId}{" "}
              </div>
              <div style={{ fontSize: "20px" }}>
                {response.data.Ranking[i].Grades}
              </div>
            </div>
          );
        }
      }
      setBstmediumranking(tmp);
    });
    await axios({
      method: "POST",
      data: {
        MajorAndType: "BSTHARD",
      },
      withCredentials: true,
      url: process.env.REACT_APP_AXIOS_GRADESRANKINGINFO,
    }).then((response) => {
      let tmp = [];
      for (let i = 0; i < response.data.Ranking.length; i++) {
        if (response.data.Ranking[i].StudentId === sID) {
          setmineBsthardranking(i + 1);
        }
        if (i === 0) {
          tmp[i] = (
            <div className="rankingItem" label={i} key={"BSTRANKINGHARD" + i}>
              <img
                className="rankingImg"
                src="data:image/png;base64,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"
              />
              <div style={{ fontSize: "20px" }}>
                {response.data.Ranking[i].StudentId}{" "}
              </div>
              <div style={{ fontSize: "20px" }}>
                {response.data.Ranking[i].Grades}
              </div>
            </div>
          );
        } else if (i === 1) {
          tmp[i] = (
            <div className="rankingItem" label={i} key={"BSTRANKINGHARD" + i}>
              <img
                className="rankingImg"
                src="data:image/png;base64,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"
              />
              <div style={{ fontSize: "20px" }}>
                {response.data.Ranking[i].StudentId}{" "}
              </div>
              <div style={{ fontSize: "20px" }}>
                {response.data.Ranking[i].Grades}
              </div>
            </div>
          );
        } else if (i === 2) {
          tmp[i] = (
            <div className="rankingItem" label={i} key={"BSTRANKINGHARD" + i}>
              <img
                className="rankingImg"
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABmJLR0QA/wD/AP+gvaeTAAANQElEQVRoge2Za3Rc1XXHf/vcO6MnxsYPaUY2aEayIaiL8AgPUx52U0xLoXTxSEibLsiCRVebGIjjNsZY0vXID2xsTEJDiwlNslLcEqCrGEowAeNiO0Apj5AKlkEz8kOekXlY2JYlzeOe3Q935ApZj1HjD+1a2V9m7jr/vc/+n332OWefA7+V/1siQz/2ebGzHCvbVWVlXVtybbq54XZE1xljF9R6u18byUDai12GledQvSva1vnDTHO8RYVvYv150RV73h+K3b8sdroY2a6wvi6RWpNpbrhFRTcYY/9wNPvdXv1F1pqfKyyqS6R+pN48N2P37gBMNJG6YBBnhio5OC4wSUSb096caaDVwEnWl9WjjYRayoAqRFZ9/Denn6Qik4AZGGflcKwxLAemG5iy79szK1R0FTBZcctHs2+tcy8wWZSTAdJ2z83AhUDlUJwMV0w3x7cgLEBklTnau8pWVqWAGWLM/IjXsW2kztIt8Z3Axag0h/zCo3nX6QAqRLkw0pZ6AyDjNZ6p1v4ayPm+2+g4ha8A9yvyWl0iOXcku10t8S8beBH4JDQQivdWZvNl1nwAzAJuiCZSTx0bpONGAOMBoHqHrT65AmUDgPp+62ijhuqSYFh08UDYz6rIQ4BYaDkGseoBBuHvC6Hcp4IsBhBjR7Vrivqiumb62l1Hyq2zsEjizUgi9S9DscdFBCDdEn8BuALRFeZo372lRCXTEn9R4csgKzHOA9hCCjjJGDtXffeIin2XYjRcJ3+TIusEfTWS6Lx4JHv7W2JXCPIC8LFrKuJuf78zUKZJkKmKLqhLdP5iGOnjxaoJRknljnx1qEzhfhgvKtwNKOhdBt8g+j0A65vlivWKfT1MX99BMIsALIxqT5Dm4t/VM7z23oFyXQwyFXhlOIkAP4qkm+O/QPh90DbXVK4t2P4UMH3sXIn9K8i1CPdnxbaVWZMCpgQEyRZMviFk3a8psg7YGU2kLhnZTv2VYJ4HMv6RXEO4IjTJd6UDqDLGXjzSCjdiRADUkeJoyZ39A0dCCuth7KgYY5YBFuWvQrjVoOuLTYLoxnBv7pAifw1jRwPM8sAJuXfWhq5+GzLLgGqUp0dbpkclUuclfynwEjDJDbt3On1H/xb4GJF5Ga9x3kg6tV7yv4DHgXJj7VJReaHYNFCQwhqtqPxLoAbYMTORemkkGxkvfhXB8ro/6/gbu5edFlPV2wFfMMtGpT5aA4CqLgcQuLO/uiKkKutg7Kj4llagANyqwrpAXx8J9+YOqRyLhjdifyBqgzZBV8e83QPWuMuBMKKPRdo62kfrd9QcGZR0S3wrMF+UVuk/ur6kfaW14RFUbyt+Zn3fbTDG/zMRXcMYubG/JXaNIJuBfUd7zOyTJts5VngHKDjG/UKN90FqND/HjEiAUA9AhbvCTpUrjB8VLZAAcgAi8khZKHRIRIN9439Wo8/rgAjFvFRWzX6wI6vCSsAI+vBYJEoiEvU6X0F1GzBlICwLpa/3IeCjsXLFCXEy4AJZX2RN3vZ/E5gO7Iwkki+PpJPxGq4FzgP29jgV/5D24pcoXAMcdYyuGs/P8SMCiOMEq4jod/qrK0LjRcVaTRCM5Ea390iPwCIAMSMnq4JgtWhLVzR57Tl8bSv2uWGGt7t7XB9LIQKQbmnYBno56DLT1/fASLmS9qKVasu/KvBo0XYvUE4QHVXkdRF9B+VF11RsmeG19wZ68euwPAV0RrqnnN5d27NA4VngYNbYhpi3+7MTRiTT0jBf0a2gn4YGwrFCWe4vVOQ+VLfhyM0od6N8Hagu0eQR4B/F2LVY87TCWarcGnVSP87Y+FvAF1Xlu3VtybWlGCuZCEC6Jf7vwGXAUtN39PuDUQHyQIhgB98uyLOq9rWCU0jKIe0JOXljqytmCW4tVi9V9Frg3GL/PuAAyYg59YyMv/crCI8Jki4cyTbO2tDVX4pvJeXIMbCR5cW/i6ioigOHhth51DFuY2ggdHUkkbwPx1S56rbO2tDVrxVVZ2LNDyNex7baRHKFUb5hDWeoyM+G+DDwEelTERIAqtpWKokJE6n1kluBHcA0K7wNzAbes6rnRROp26zNn5cvLzwRoPUTUbkIQMWeIiqfAnQ3119mhZ/O9FIf1C1PflWMXgQkgSbfFtqBBoGOyIEpj07EtwkRARDVB4t/HYFnjJH5BpkLMGD0GdCatBet7KHiXfX1jwEi3VO3uln36wCKqQP9AcD+5oab1HK1zYcvBF4mWBhQZb1sfDM/Ib8mAlZvnttt97yiyFxVnv3Mqbi+lmx51vrbBB6NJDp/EGxs6Pi2MBkbf09Vbq1rS+7U288LZWp7tgDzgbd6TMXcJq89V6pvE4pIWvc2azD67zmO3HoKfWdP9ToOi9HrMM7LAKWQABAPm88V5ta1JXd2eY0zM7UHH/F9988Jptm5U7R/+Xg2PmevVOC+e+bUOU4hCbgYc4GhELbWbBbk5kgi+fPh+HavKTzZ9l0uymkiJq9Gfh3xOt4eiWi6Jf6CqrwYbUved6C5/gIr5lWggKEx6qX2luKfWyoRxyl8BygDeSTqdbwFkPbqL9OCHn+B4cUWYPt/AlIbhEjBKpmW+Ovd1v9a7Yo9nUPxPabi6iavPacgjq97rStPgt4oVhcDd5TiX0kR6V5cU2Urqw4AFb7lDMeRW4z1N9e27X59OLZ4W/ImxcQl2N3LCPYZgA+zxp4V83YPDNXbf0/DLOPYx1X4UH1WiZH3gf7QQKh2+tpdR8bzsaQc0eqqy4EqkO0zd6VSqnrYilnX6dUfdx+l1i49RkL5diSRmuSbXC3KYJE1O2yda4frhULlPRbzvYh0fqNuRecu4G2g0q/MX16KjyVNLVW9EgTBPiNP4ENqDbBmFPgVwY+8H21LPgCA13Vwvxe/TywLAESZPVypeO56XD3MgaWxGgubFc5VqwsIzl2/ORFUvgSghjfSrbE2VD4pz/LjU9akDn0OBpLRYr3h8LkkNVZP18GZ7Oh7I3WT9uJfyli24PKyMfKQWkWR80pxsdRkrwnA+kHBmpkYzs9VSNlwkIDSltw4+N119xlTJZRbKMoXi7UFAi/VtqeeHqmTHirerTXZ2FSv43DxnhjQ2hNJpBbgKHwWa0ttAjaVomTKBqZjTeuQJeUAyMpgeh4vTV57rtOrNwDhXDidL88DUlNSX6WAKK441X1loXRzfFG6Nb663WsKj6ckWfdTgTUCPyI4ttco+mK6JX79SPhOr768zJr+dEt8aP1R0mCXGpHDwLRsZT5irESx2oUzvlJkdcfHwBKATHP871R4HTCga4GnhuOLS7J0L66pypVXzpQglIeG434TIilgmoOJRhIdi0cDBRuhbAFQ5I66RHLwgEmkLfVGuiV+CJgMUq8eRjzsUP0DS2M1uXA+X+t1Hez2GupskOxjXjoMSolTS34FgNVL9y2Lz063xlenm+OLjjNWsB8e00Cv0SEbbpcXnwPBG4cg3cNJAFjX/IFjw7v3tzQsVKuXFu386oQRUWUrgKJ/EnKlTBRB/ePOV8HRQ98ufl7R3RrflG6pvzLjxW4wlmcoElOxT47UTySR/IlrKqKaD20qVpEIOuKN5P+KSDjr/hvQB5xTQHORRGpJdMWe9/fdM6fueItyO0FOocpNYJ5XK08Ac4qIt8rEOe5uK90cuy3txS+Z4bX3ipOdBnI20Ct9fc+dMCLT1+46gsgmQESlTW/ESbfGf+o4hc3qfd5G1Ev9J8ZeKOjjBCsVBHV5u8KSrLG/O9XrODy8DxEOYfmntFd/hoisILj43lS77sDRUnws/RjvNTQ6Vt8DXDF6kfXld8LZ0BPT1+460u41hUcrgg5+N37ylJ4pfaNVfHu9WVE374aiKzv3fLiwsaxiMucasTuBnLH+F4aflEeTkgurWV6yQ4IHH1Erm7QQfnr62l1HMl7shim2/yUdZVBOWZM6NFbZGsK9GEe2718WO71qqjnJiH0MEETWl0piQkQAentMK/BLoMGEck+0e01h68vN1tiFAtrV3Dj3I6+ppHut/c2xb3289LRIxOt8EmWJa/kMW/gZEAN29Ej5hCrECRGZ/WBH1inodcA+YP4U2/+8FsK3zPR2v7PXmxU1Yp8e4PAkvREn7cUWDNfPeI1ndjU3zgUwIlPzrhM8BDnuC77DPxPU63uMkesnUq9PmAhAzarOA8bIVYNkTCj3endz/YWCOw2VFad6+9KZpvg5WFkJwYN/uqXheQDBxo3oaoBcrvB9UftwV3PjXGzhPxCZB+wVNX9U6yU/mqhfEyYCwcuUU9DzKU4zK+ZVx5plqnZLEVKOBkcQizMZdDJACPMKsENBXNeZoZhvFRM7BuwwRs4f6zFnLJnQddBw+XBhY1nVKdZDWQQMHiLfEtgsRrZb/LRLVRdAgaMzDU5Uj12ZyjlFfA6RdT1Svnyi0+mEERmUA96cuG/9JaB/ClSVqNaL6Cbj23snsjqNJieEyKB85DVV+37fVSrye8DZBFNmcrH5M6AT4W1R3Sp9fc+Vutn9Vv4/yn8DfMXhC4XFZOIAAAAASUVORK5CYII="
              />
              <div style={{ fontSize: "20px" }}>
                {response.data.Ranking[i].StudentId}{" "}
              </div>
              <div style={{ fontSize: "20px" }}>
                {response.data.Ranking[i].Grades}
              </div>
            </div>
          );
        } else {
          tmp[i] = (
            <div
              key={"BSTRANKINGHARD" + i}
              label={i}
              className="rankingItem"
              style={{ display: "flex", flexDirection: "row" }}
            >
              <div style={{ fontSize: "30px" }}>{i + 1} </div>
              <div style={{ fontSize: "20px" }}>
                {response.data.Ranking[i].StudentId}{" "}
              </div>
              <div style={{ fontSize: "20px" }}>
                {response.data.Ranking[i].Grades}
              </div>
            </div>
          );
        }
      }
      setBsthardranking(tmp);
    });
    //AVL RANKING
    await axios({
      method: "POST",
      data: {
        MajorAndType: "AVLEASY",
      },
      withCredentials: true,
      url: process.env.REACT_APP_AXIOS_GRADESRANKINGINFO,
    }).then((response) => {
      let tmp = [];
      for (let i = 0; i < response.data.Ranking.length; i++) {
        if (response.data.Ranking[i].StudentId === sID) {
          setmineAvleasyranking(i + 1);
        }
        if (i === 0) {
          tmp[i] = (
            <div className="rankingItem" label={i} key={"AVLRANKINGEASY" + i}>
              <img
                className="rankingImg"
                src="data:image/png;base64,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"
              />
              <div style={{ fontSize: "20px" }}>
                {response.data.Ranking[i].StudentId}{" "}
              </div>
              <div style={{ fontSize: "20px" }}>
                {response.data.Ranking[i].Grades}
              </div>
            </div>
          );
        } else if (i === 1) {
          tmp[i] = (
            <div className="rankingItem" label={i} key={"AVLRANKINGEASY" + i}>
              <img
                className="rankingImg"
                src="data:image/png;base64,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"
              />
              <div style={{ fontSize: "20px" }}>
                {response.data.Ranking[i].StudentId}{" "}
              </div>
              <div style={{ fontSize: "20px" }}>
                {response.data.Ranking[i].Grades}
              </div>
            </div>
          );
        } else if (i === 2) {
          tmp[i] = (
            <div className="rankingItem" label={i} key={"AVLRANKINGEASY" + i}>
              <img
                className="rankingImg"
                src="data:image/png;base64,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"
              />
              <div style={{ fontSize: "20px" }}>
                {response.data.Ranking[i].StudentId}{" "}
              </div>
              <div style={{ fontSize: "20px" }}>
                {response.data.Ranking[i].Grades}
              </div>
            </div>
          );
        } else {
          tmp[i] = (
            <div
              key={"AVLRANKINGEASY" + i}
              label={i}
              className="rankingItem"
              style={{ display: "flex", flexDirection: "row" }}
            >
              <div style={{ fontSize: "30px" }}>{i + 1} </div>
              <div style={{ fontSize: "20px" }}>
                {response.data.Ranking[i].StudentId}{" "}
              </div>
              <div style={{ fontSize: "20px" }}>
                {response.data.Ranking[i].Grades}
              </div>
            </div>
          );
        }
      }
      setAvleasyranking(tmp);
    });
    await axios({
      method: "POST",
      data: {
        MajorAndType: "AVLMEDIUM",
      },
      withCredentials: true,
      url: process.env.REACT_APP_AXIOS_GRADESRANKINGINFO,
    }).then((response) => {
      let tmp = [];
      for (let i = 0; i < response.data.Ranking.length; i++) {
        if (response.data.Ranking[i].StudentId === sID) {
          setmineAvlmediumranking(i + 1);
        }
        if (i === 0) {
          tmp[i] = (
            <div className="rankingItem" label={i} key={"AVLRANKINGMEDIUM" + i}>
              <img
                className="rankingImg"
                src="data:image/png;base64,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"
              />
              <div style={{ fontSize: "20px" }}>
                {response.data.Ranking[i].StudentId}{" "}
              </div>
              <div style={{ fontSize: "20px" }}>
                {response.data.Ranking[i].Grades}
              </div>
            </div>
          );
        } else if (i === 1) {
          tmp[i] = (
            <div className="rankingItem" label={i} key={"AVLRANKINGMEDIUM" + i}>
              <img
                className="rankingImg"
                src="data:image/png;base64,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"
              />
              <div style={{ fontSize: "20px" }}>
                {response.data.Ranking[i].StudentId}{" "}
              </div>
              <div style={{ fontSize: "20px" }}>
                {response.data.Ranking[i].Grades}
              </div>
            </div>
          );
        } else if (i === 2) {
          tmp[i] = (
            <div className="rankingItem" label={i} key={"AVLRANKINGMEDIUM" + i}>
              <img
                className="rankingImg"
                src="data:image/png;base64,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"
              />
              <div style={{ fontSize: "20px" }}>
                {response.data.Ranking[i].StudentId}{" "}
              </div>
              <div style={{ fontSize: "20px" }}>
                {response.data.Ranking[i].Grades}
              </div>
            </div>
          );
        } else {
          tmp[i] = (
            <div
              label={i}
              className="rankingItem"
              style={{ display: "flex", flexDirection: "row" }}
              key={"AVLRANKINGMEDIUM" + i}
            >
              <div style={{ fontSize: "30px" }}>{i + 1} </div>
              <div style={{ fontSize: "20px" }}>
                {response.data.Ranking[i].StudentId}{" "}
              </div>
              <div style={{ fontSize: "20px" }}>
                {response.data.Ranking[i].Grades}
              </div>
            </div>
          );
        }
      }
      setAvlmediumranking(tmp);
    });
    await axios({
      method: "POST",
      data: {
        MajorAndType: "AVLHARD",
      },
      withCredentials: true,
      url: process.env.REACT_APP_AXIOS_GRADESRANKINGINFO,
    }).then((response) => {
      let tmp = [];
      for (let i = 0; i < response.data.Ranking.length; i++) {
        if (response.data.Ranking[i].StudentId === sID) {
          setmineAvlhardranking(i + 1);
        }
        if (i === 0) {
          tmp[i] = (
            <div className="rankingItem" label={i} key={"AVLRANKINGHARD" + i}>
              <img
                className="rankingImg"
                src="data:image/png;base64,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"
              />
              <div style={{ fontSize: "20px" }}>
                {response.data.Ranking[i].StudentId}{" "}
              </div>
              <div style={{ fontSize: "20px" }}>
                {response.data.Ranking[i].Grades}
              </div>
            </div>
          );
        } else if (i === 1) {
          tmp[i] = (
            <div className="rankingItem" label={i} key={"AVLRANKINGHARD" + i}>
              <img
                className="rankingImg"
                src="data:image/png;base64,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"
              />
              <div style={{ fontSize: "20px" }}>
                {response.data.Ranking[i].StudentId}{" "}
              </div>
              <div style={{ fontSize: "20px" }}>
                {response.data.Ranking[i].Grades}
              </div>
            </div>
          );
        } else if (i === 2) {
          tmp[i] = (
            <div className="rankingItem" label={i} key={"AVLRANKINGHARD" + i}>
              <img
                className="rankingImg"
                src="data:image/png;base64,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"
              />
              <div style={{ fontSize: "20px" }}>
                {response.data.Ranking[i].StudentId}{" "}
              </div>
              <div style={{ fontSize: "20px" }}>
                {response.data.Ranking[i].Grades}
              </div>
            </div>
          );
        } else {
          tmp[i] = (
            <div
              label={i}
              className="rankingItem"
              style={{ display: "flex", flexDirection: "row" }}
              key={"AVLRANKINGHARD" + i}
            >
              <div style={{ fontSize: "30px" }}>{i + 1} </div>
              <div style={{ fontSize: "20px" }}>
                {response.data.Ranking[i].StudentId}{" "}
              </div>
              <div style={{ fontSize: "20px" }}>
                {response.data.Ranking[i].Grades}
              </div>
            </div>
          );
        }
      }
      setAvlhardranking(tmp);
    });
    //RBT RANKING
    await axios({
      method: "POST",
      data: {
        MajorAndType: "RBTEASY",
      },
      withCredentials: true,
      url: process.env.REACT_APP_AXIOS_GRADESRANKINGINFO,
    }).then((response) => {
      let tmp = [];
      for (let i = 0; i < response.data.Ranking.length; i++) {
        if (response.data.Ranking[i].StudentId === sID) {
          setmineRbteasyranking(i + 1);
        }
        if (i === 0) {
          tmp[i] = (
            <div className="rankingItem" label={i} key={"RBTRANKINGEASY" + i}>
              <img
                className="rankingImg"
                src="data:image/png;base64,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"
              />
              <div style={{ fontSize: "20px" }}>
                {response.data.Ranking[i].StudentId}{" "}
              </div>
              <div style={{ fontSize: "20px" }}>
                {response.data.Ranking[i].Grades}
              </div>
            </div>
          );
        } else if (i === 1) {
          tmp[i] = (
            <div className="rankingItem" label={i} key={"RBTRANKINGEASY" + i}>
              <img
                className="rankingImg"
                src="data:image/png;base64,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"
              />
              <div style={{ fontSize: "20px" }}>
                {response.data.Ranking[i].StudentId}{" "}
              </div>
              <div style={{ fontSize: "20px" }}>
                {response.data.Ranking[i].Grades}
              </div>
            </div>
          );
        } else if (i === 2) {
          tmp[i] = (
            <div className="rankingItem" label={i} key={"RBTRANKINGEASY" + i}>
              <img
                className="rankingImg"
                src="data:image/png;base64,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"
              />
              <div style={{ fontSize: "20px" }}>
                {response.data.Ranking[i].StudentId}{" "}
              </div>
              <div style={{ fontSize: "20px" }}>
                {response.data.Ranking[i].Grades}
              </div>
            </div>
          );
        } else {
          tmp[i] = (
            <div
              label={i}
              className="rankingItem"
              style={{ display: "flex", flexDirection: "row" }}
              key={"RBTRANKINGEASY" + i}
            >
              <div style={{ fontSize: "30px" }}>{i + 1} </div>
              <div style={{ fontSize: "20px" }}>
                {response.data.Ranking[i].StudentId}{" "}
              </div>
              <div style={{ fontSize: "20px" }}>
                {response.data.Ranking[i].Grades}
              </div>
            </div>
          );
        }
      }
      setRbteasyranking(tmp);
    });
    await axios({
      method: "POST",
      data: {
        MajorAndType: "RBTMEDIUM",
      },
      withCredentials: true,
      url: process.env.REACT_APP_AXIOS_GRADESRANKINGINFO,
    }).then((response) => {
      let tmp = [];
      for (let i = 0; i < response.data.Ranking.length; i++) {
        if (response.data.Ranking[i].StudentId === sID) {
          setmineRbtmediumranking(i + 1);
        }
        if (i === 0) {
          tmp[i] = (
            <div className="rankingItem" label={i} key={"RBTRANKINGMEDIUM" + i}>
              <img
                className="rankingImg"
                src="data:image/png;base64,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"
              />
              <div style={{ fontSize: "20px" }}>
                {response.data.Ranking[i].StudentId}{" "}
              </div>
              <div style={{ fontSize: "20px" }}>
                {response.data.Ranking[i].Grades}
              </div>
            </div>
          );
        } else if (i === 1) {
          tmp[i] = (
            <div className="rankingItem" label={i} key={"RBTRANKINGMEDIUM" + i}>
              <img
                className="rankingImg"
                src="data:image/png;base64,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"
              />
              <div style={{ fontSize: "20px" }}>
                {response.data.Ranking[i].StudentId}{" "}
              </div>
              <div style={{ fontSize: "20px" }}>
                {response.data.Ranking[i].Grades}
              </div>
            </div>
          );
        } else if (i === 2) {
          tmp[i] = (
            <div className="rankingItem" label={i} key={"RBTRANKINGMEDIUM" + i}>
              <img
                className="rankingImg"
                src="data:image/png;base64,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"
              />
              <div style={{ fontSize: "20px" }}>
                {response.data.Ranking[i].StudentId}{" "}
              </div>
              <div style={{ fontSize: "20px" }}>
                {response.data.Ranking[i].Grades}
              </div>
            </div>
          );
        } else {
          tmp[i] = (
            <div
              className="rankingItem"
              label={i}
              style={{ display: "flex", flexDirection: "row" }}
              key={"RBTRANKINGMEDIUM" + i}
            >
              <div style={{ fontSize: "30px" }}>{i + 1} </div>
              <div style={{ fontSize: "20px" }}>
                {response.data.Ranking[i].StudentId}{" "}
              </div>
              <div style={{ fontSize: "20px" }}>
                {response.data.Ranking[i].Grades}
              </div>
            </div>
          );
        }
      }
      setRbtmediumranking(tmp);
    });
    await axios({
      method: "POST",
      data: {
        MajorAndType: "RBTHARD",
      },
      withCredentials: true,
      url: process.env.REACT_APP_AXIOS_GRADESRANKINGINFO,
    }).then((response) => {
      let tmp = [];
      for (let i = 0; i < response.data.Ranking.length; i++) {
        if (response.data.Ranking[i].StudentId === sID) {
          setmineRbthardranking(i + 1);
        }
        if (i === 0) {
          tmp[i] = (
            <div className="rankingItem" label={i} key={"RBTRANKINGHARD" + i}>
              <img
                className="rankingImg"
                src="data:image/png;base64,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"
              />
              <div style={{ fontSize: "20px" }}>
                {response.data.Ranking[i].StudentId}{" "}
              </div>
              <div style={{ fontSize: "20px" }}>
                {response.data.Ranking[i].Grades}
              </div>
            </div>
          );
        } else if (i === 1) {
          tmp[i] = (
            <div className="rankingItem" label={i} key={"RBTRANKINGHARD" + i}>
              <img
                className="rankingImg"
                src="data:image/png;base64,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"
              />
              <div style={{ fontSize: "20px" }}>
                {response.data.Ranking[i].StudentId}{" "}
              </div>
              <div style={{ fontSize: "20px" }}>
                {response.data.Ranking[i].Grades}
              </div>
            </div>
          );
        } else if (i === 2) {
          tmp[i] = (
            <div className="rankingItem" label={i} key={"RBTRANKINGHARD" + i}>
              <img
                className="rankingImg"
                src="data:image/png;base64,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"
              />
              <div style={{ fontSize: "20px" }}>
                {response.data.Ranking[i].StudentId}{" "}
              </div>
              <div style={{ fontSize: "20px" }}>
                {response.data.Ranking[i].Grades}
              </div>
            </div>
          );
        } else {
          tmp[i] = (
            <div
              className="rankingItem"
              label={i}
              style={{ display: "flex", flexDirection: "row" }}
              key={"RBTRANKINGHARD" + i}
            >
              <div style={{ fontSize: "30px" }}>{i + 1} </div>
              <div style={{ fontSize: "20px" }}>
                {response.data.Ranking[i].StudentId}{" "}
              </div>
              <div style={{ fontSize: "20px" }}>
                {response.data.Ranking[i].Grades}
              </div>
            </div>
          );
        }
      }
      setRbthardranking(tmp);
    });
    //Google Sheet
    let tmpgooglesheetdataMixed;
    let tmpgooglesheetdataBST;
    let tmpgooglesheetdataAVL;
    let tmpgooglesheetdataRBT;
    Papa.parse(
      "https://docs.google.com/spreadsheets/d/e/2PACX-1vS5yah5_63sKWfdENHdEHxc_R4VDsiF5DnSbU9giVrPY0692wua_vZy92QZdKYaSxuADJ2sQctF1q2r/pub?output=csv",
      {
        download: true,
        header: true,
        complete: (results) => {
          tmpgooglesheetdataMixed = results.data;
          let ans = tmpgooglesheetdataMixed[0];
          let tmpdatasets = [];
          let count = 0;
          if (tmpgooglesheetdataMixed.length > 1) {
            for (let i = 1; i < tmpgooglesheetdataMixed.length; i++) {
              let knowledge = 0;
              let decision = 0;
              let analysis = 0;
              let total = 0;
              if (tmpgooglesheetdataMixed[i].學號 === sID) {
                let user = tmpgooglesheetdataMixed[i];
                let ansValues = Object.values(ans);
                let userValues = Object.values(user);
                for (let i = 5; i < ansValues.length; i++) {
                  if (ansValues[i] === userValues[i]) {
                    if (
                      i > parseInt(googledataMIXEDAnsType[0]) - 1 &&
                      i < parseInt(googledataMIXEDAnsType[1])
                    ) {
                      knowledge += 10;
                    } else if (
                      i > parseInt(googledataMIXEDAnsType[1]) - 1 &&
                      i < parseInt(googledataMIXEDAnsType[2])
                    ) {
                      decision += 10;
                    } else if (
                      i > parseInt(googledataMIXEDAnsType[2]) - 1 &&
                      i < parseInt(googledataMIXEDAnsType[3])
                    ) {
                      analysis += 10;
                    }
                  }
                }
                let tmptotal = 20;
                if (userValues[1].length === 9) {
                  tmptotal += parseInt(userValues[1][0]) * 100;
                  tmptotal += parseInt(userValues[1][1]) * 10;
                  tmptotal += parseInt(userValues[1][2]);
                } else {
                  tmptotal += parseInt(userValues[1][0]) * 10;
                  tmptotal += parseInt(userValues[1][1]);
                }
                total = tmptotal;
                let tmp = {
                  label: "Test " + `${count + 1}`,
                  data: [knowledge, decision, analysis, 20, total],
                  fill: true,
                  backgroundColor: color[count],
                  borderColor: color[count],
                  pointBackgroundColor: color[count],
                  pointBorderColor: "#fff",
                  pointHoverBackgroundColor: "#fff",
                  pointHoverBorderColor: color[count],
                };
                tmpdatasets[count] = tmp;
                count++;
              }
            }
            const radarData = {
              labels: ["知識型", "判斷型", "分析型", "應用型", "總分"],
              datasets: tmpdatasets,
            };
            setRadarDataMixed(radarData);
            const tmpGoogleSheet = {
              MajorAndType: "MIXED",
              Grades: tmpgooglesheetdataMixed,
              AnsType: googledataMIXEDAnsType,
            };
            axios
              .post(
                process.env.REACT_APP_AXIOS_GOOGLESHEETGRADES,
                tmpGoogleSheet
              )
              .then((response) => {});
          }
        },
      }
    );
    Papa.parse(
      "https://docs.google.com/spreadsheets/d/e/2PACX-1vQYGNRHQJDBDO6xom25zo-1t5ZeXE0Ib_N6xJLbpCcIHq5GWKSwPZTerWv8nut_yXP-H6Sw50y0tTm0/pub?output=csv",
      {
        download: true,
        header: true,
        complete: (results) => {
          tmpgooglesheetdataBST = results.data;
          let ans = tmpgooglesheetdataBST[0];
          let tmpdatasets = [];
          let count = 0;
          if (tmpgooglesheetdataBST.length > 1) {
            for (let i = 1; i < tmpgooglesheetdataBST.length; i++) {
              let knowledge = 0;
              let decision = 0;
              let analysis = 0;
              let total = 0;
              if (tmpgooglesheetdataBST[i].學號 === sID) {
                let user = tmpgooglesheetdataBST[i];
                let ansValues = Object.values(ans);
                let userValues = Object.values(user);
                for (let i = 5; i < ansValues.length; i++) {
                  if (ansValues[i] === userValues[i]) {
                    if (
                      i > parseInt(googledataMIXEDAnsType[0]) - 1 &&
                      i < parseInt(googledataMIXEDAnsType[1])
                    ) {
                      knowledge += 10;
                    } else if (
                      i > parseInt(googledataMIXEDAnsType[1]) - 1 &&
                      i < parseInt(googledataMIXEDAnsType[2])
                    ) {
                      decision += 10;
                    } else if (
                      i > parseInt(googledataMIXEDAnsType[2]) - 1 &&
                      i < parseInt(googledataMIXEDAnsType[3])
                    ) {
                      analysis += 10;
                    }
                  }
                }
                let tmptotal = 20;
                if (userValues[1].length === 9) {
                  tmptotal += parseInt(userValues[1][0]) * 100;
                  tmptotal += parseInt(userValues[1][1]) * 10;
                  tmptotal += parseInt(userValues[1][2]);
                } else {
                  tmptotal += parseInt(userValues[1][0]) * 10;
                  tmptotal += parseInt(userValues[1][1]);
                }
                total = tmptotal;
                let tmp = {
                  label: "Test " + `${count + 1}`,
                  data: [knowledge, decision, analysis, 20, total],
                  fill: true,
                  backgroundColor: color[count],
                  borderColor: color[count],
                  pointBackgroundColor: color[count],
                  pointBorderColor: "#fff",
                  pointHoverBackgroundColor: "#fff",
                  pointHoverBorderColor: color[count],
                };
                tmpdatasets[count] = tmp;
                count++;
              }
            }
            const radarData = {
              labels: ["知識型", "判斷型", "分析型", "應用型", "總分"],
              datasets: tmpdatasets,
            };
            setRadarDataBST(radarData);
            const tmpGoogleSheet = {
              MajorAndType: "BST",
              Grades: tmpgooglesheetdataBST,
              AnsType: googledataBSTAnsType,
            };
            axios
              .post(
                process.env.REACT_APP_AXIOS_GOOGLESHEETGRADES,
                tmpGoogleSheet
              )
              .then((response) => {});
          }
        },
      }
    );
    Papa.parse(
      "https://docs.google.com/spreadsheets/d/e/2PACX-1vRCwbyVQb9sclPQ_OOg07K2_i3QHmH5T2dWLVOVg8i6pSjW93P26dBtOuw2J0iOYb8H_z-dUC-P_nJ3/pub?output=csv",
      {
        download: true,
        header: true,
        complete: (results) => {
          tmpgooglesheetdataAVL = results.data;
          let ans = tmpgooglesheetdataAVL[0];
          let tmpdatasets = [];
          let count = 0;
          if (tmpgooglesheetdataAVL.length > 1) {
            for (let i = 1; i < tmpgooglesheetdataAVL.length; i++) {
              let knowledge = 0;
              let decision = 0;
              let analysis = 0;
              let total = 0;
              if (tmpgooglesheetdataAVL[i].學號 === sID) {
                let user = tmpgooglesheetdataAVL[i];
                let ansValues = Object.values(ans);
                let userValues = Object.values(user);
                for (let i = 5; i < ansValues.length; i++) {
                  if (ansValues[i] === userValues[i]) {
                    if (
                      i > parseInt(googledataMIXEDAnsType[0]) - 1 &&
                      i < parseInt(googledataMIXEDAnsType[1])
                    ) {
                      knowledge += 10;
                    } else if (
                      i > parseInt(googledataMIXEDAnsType[1]) - 1 &&
                      i < parseInt(googledataMIXEDAnsType[2])
                    ) {
                      decision += 10;
                    } else if (
                      i > parseInt(googledataMIXEDAnsType[2]) - 1 &&
                      i < parseInt(googledataMIXEDAnsType[3])
                    ) {
                      analysis += 10;
                    }
                  }
                }
                let tmptotal = 20;
                if (userValues[1].length === 9) {
                  tmptotal += parseInt(userValues[1][0]) * 100;
                  tmptotal += parseInt(userValues[1][1]) * 10;
                  tmptotal += parseInt(userValues[1][2]);
                } else {
                  tmptotal += parseInt(userValues[1][0]) * 10;
                  tmptotal += parseInt(userValues[1][1]);
                }
                total = tmptotal;
                let tmp = {
                  label: "Test " + `${count + 1}`,
                  data: [knowledge, decision, analysis, 20, total],
                  fill: true,
                  backgroundColor: color[count],
                  borderColor: color[count],
                  pointBackgroundColor: color[count],
                  pointBorderColor: "#fff",
                  pointHoverBackgroundColor: "#fff",
                  pointHoverBorderColor: color[count],
                };
                tmpdatasets[count] = tmp;
                count++;
              }
            }
            const radarData = {
              labels: ["知識型", "判斷型", "分析型", "應用型", "總分"],
              datasets: tmpdatasets,
            };
            setRadarDataAVL(radarData);
            const tmpGoogleSheet = {
              MajorAndType: "AVL",
              Grades: tmpgooglesheetdataAVL,
              AnsType: googledataAVLAnsType,
            };
            axios
              .post(
                process.env.REACT_APP_AXIOS_GOOGLESHEETGRADES,
                tmpGoogleSheet
              )
              .then((response) => {});
          }
        },
      }
    );
    Papa.parse(
      "https://docs.google.com/spreadsheets/d/e/2PACX-1vRNFLfg530gdTlL_quU5pXIsMeSGE39YgNoBcYuxU49lZSjeUGbHafW2E7q4g0u4cs9lR6jeomIl-eN/pub?output=csv",
      {
        download: true,
        header: true,
        complete: (results) => {
          tmpgooglesheetdataRBT = results.data;
          let ans = tmpgooglesheetdataRBT[0];
          let tmpdatasets = [];
          let count = 0;
          if (tmpgooglesheetdataRBT.length > 1) {
            for (let i = 1; i < tmpgooglesheetdataRBT.length; i++) {
              let knowledge = 0;
              let decision = 0;
              let analysis = 0;
              let total = 0;
              if (tmpgooglesheetdataRBT[i].學號 === sID) {
                let user = tmpgooglesheetdataRBT[i];
                let ansValues = Object.values(ans);
                let ansKeys = Object.keys(ans);
                let userValues = Object.values(user);
                for (let i = 5; i < ansValues.length; i++) {
                  if (ansValues[i] === userValues[i]) {
                    if (
                      i > parseInt(googledataMIXEDAnsType[0]) - 1 &&
                      i < parseInt(googledataMIXEDAnsType[1])
                    ) {
                      knowledge += 10;
                    } else if (
                      i > parseInt(googledataMIXEDAnsType[1]) - 1 &&
                      i < parseInt(googledataMIXEDAnsType[2])
                    ) {
                      decision += 10;
                    } else if (
                      i > parseInt(googledataMIXEDAnsType[2]) - 1 &&
                      i < parseInt(googledataMIXEDAnsType[3])
                    ) {
                      analysis += 10;
                    }
                  }
                }
                let tmptotal = 20;
                if (userValues[1].length === 9) {
                  tmptotal += parseInt(userValues[1][0]) * 100;
                  tmptotal += parseInt(userValues[1][1]) * 10;
                  tmptotal += parseInt(userValues[1][2]);
                } else {
                  tmptotal += parseInt(userValues[1][0]) * 10;
                  tmptotal += parseInt(userValues[1][1]);
                }
                total = tmptotal;
                let tmp = {
                  label: "Test " + `${count + 1}`,
                  data: [knowledge, decision, analysis, 20, total],
                  fill: true,
                  backgroundColor: color[count],
                  borderColor: color[count],
                  pointBackgroundColor: color[count],
                  pointBorderColor: "#fff",
                  pointHoverBackgroundColor: "#fff",
                  pointHoverBorderColor: color[count],
                };
                tmpdatasets[count] = tmp;
                count++;
              }
            }
            const radarData = {
              labels: ["知識型", "判斷型", "分析型", "應用型", "總分"],
              datasets: tmpdatasets,
            };
            setRadarDataRBT(radarData);
            const tmpGoogleSheet = {
              MajorAndType: "RBT",
              Grades: tmpgooglesheetdataRBT,
              AnsType: googledataRBTAnsType,
            };
            axios
              .post(
                process.env.REACT_APP_AXIOS_GOOGLESHEETGRADES,
                tmpGoogleSheet
              )
              .then((response) => {});
          }
        },
      }
    );
  }, [props.StudentId, sID]);
  //line data
  datalinebsteasy = {
    labels,
    datasets: [
      {
        label: "You",
        data: userBSTgradesEasy,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };
  datalinebstmedium = {
    labels,
    datasets: [
      {
        label: "You",
        data: userBSTgradesMedium,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };
  datalinebsthard = {
    labels,
    datasets: [
      {
        label: "You",
        data: userBSTgradesHard,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };
  datalineavleasy = {
    labels,
    datasets: [
      {
        label: "You",
        data: userAVLgradesEasy,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };
  datalineavlmedium = {
    labels,
    datasets: [
      {
        label: "You",
        data: userAVLgradesMedium,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };
  datalineavlhard = {
    labels,
    datasets: [
      {
        label: "You",
        data: userAVLgradesHard,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };
  datalinerbteasy = {
    labels,
    datasets: [
      {
        label: "You",
        data: userRBTgradesEasy,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };
  datalinerbtmedium = {
    labels,
    datasets: [
      {
        label: "You",
        data: userRBTgradesMedium,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };
  datalinerbthard = {
    labels,
    datasets: [
      {
        label: "You",
        data: userRBTgradesHard,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  function UserCard(params) {
    const scrollContainerStyle = { width: "100%", maxHeight: "500px" };
    const [typechecked, setTypechecked] = useState(1);
    const [rendertype, setRendertype] = useState(1);
    if (rendertype === 1) {
      return (
        <Tilt className="gametitle playtitle" options={options}>
          <div className="gradetitle">
            <div className="userCard">
              <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABmJLR0QA/wD/AP+gvaeTAAADVklEQVRoge2ZTUgVURTHfz7Nj0I0JcSigr7ITAzMMqJaVUK7FgVFLapVRYWbaFe0DloVEZSbICLTdpUFpRhuhApDigrCrBDzI7LS1GlxzjRm+Zy59466eD94HN579/zv/8zMnTtzL6RIEQtpMWqvADYCq4B8YBToAVqBJmAkxr6tSQcOAe2Al+TzBtjqsmOXZ6QYqAM26fePQAvQBXTqb0uBauQs/QCuAzeApw59WJEPvEKO9mtgF5MfpARwgb/P0E1gbvw2p6YWMdQG5IVonwDWAKeAbs29E5u7kCxBBu4voNwgfxnQixRT7dBXZI6qiToLjbMEl9iMUa8mDltolKjGWyeODGlVE1UWGunAT2AMw0GfsOjcp1Bjv4XGKDCE3OkyTQRcFOLP0J6lTobGMZNkF4V0ayyy0ChALqlB4KuJgItCPmlcaKGxUuM7UwEXhbzQaDKH+GzR2GIq4KKQNo0bLDS2aWw2FXBRiK9RSTBgo5BJcEYGHPgx5jFyxzqN2dN0GnBGNR469BWZDjVhM0bKVeOlqYCLS6tdY4WFRqVG40JccBA5mu+BGoP8Gs31gAMOfUUmHbiNzMgDRDvLCc3xn57Tnbsz4BliqDRCTpnmdNh27mKM+DzRuD9Czr4JubOCCuTo9gILQrQvAL5ozuYYfRnRgBh7TPB4/z9ygfvatnEafEVmEfCZqV+0VmubfmC5i45djhGQNayuCP324Oj11nUhEO4Nz38Jy3LVaRyFZGv8lqTNoEZnhbimCCnAAxYnaZeHTKBDyLrYrKIMeI4UcS9E+1sEk+H6GH2FphS4DAwTrP0Wh8grJFi1HwGuAeti8jgpGcBu4BFyiXjIkk4tsqAdllzgqub6C9rNwB5gjkO//5ANHCd4WvWQgXsFWGuhWwJcIhhfHvABOAnkWOj+QxqygdM1rqN24AQw32E/ecAxgrHmIfssR3CwlzMPuDtOuJXpWTXfjmwA+f02qBcjspD9Pg+Zhfc6MBiVAwSXXBOGS6oXVaAT2S6bKcrUg4fsdkViJbJ5M4rszs40VYiXYWTHODTnkSPwIAZTpjQins5N/CPZs9YOjfVxODLE32fcOfGPZLe0PqJNbtNJH/KG+YfJCskBvsdux44cZJcrRYoUIfgNHq3EbO8epBkAAAAASUVORK5CYII=" />
              <div
                style={{
                  display: "inline",
                  color: "gray",
                }}
              >
                {UserData.Name}
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  marginLeft: "50px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "180px",
                  }}
                >
                  <h5>BST EASY {minebsteasyranking}名</h5>
                  <h5>BST MEDIUM {minebstmediumranking}名</h5>
                  <h5>BST HARD {minebsthardranking}名</h5>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "180px",
                  }}
                >
                  <h5>AVL EASY {mineavleasyranking}名</h5>
                  <h5>AVL MEDIUM {mineavlmediumranking}名</h5>
                  <h5>AVL HARD {mineavlhardranking}名</h5>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "180px",
                  }}
                >
                  <h5>RBT EASY {minerbteasyranking}名</h5>
                  <h5>RBT MEDIUM {minerbtmediumranking}名</h5>
                  <h5>RBT HARD {minerbthardranking}名</h5>
                </div>
              </div>
            </div>
            <div>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <ToggleButton
                  variant="outline-dark"
                  type="checkbox"
                  checked={typechecked === 1}
                  onClick={() => {
                    setTypechecked(1);
                    setRendertype(1);
                  }}
                >
                  BST
                </ToggleButton>
                <ToggleButton
                  variant="outline-dark"
                  type="checkbox"
                  checked={typechecked === 2}
                  onClick={() => {
                    setTypechecked(2);
                    setRendertype(2);
                  }}
                >
                  AVL
                </ToggleButton>
                <ToggleButton
                  variant="outline-dark"
                  type="checkbox"
                  checked={typechecked === 3}
                  onClick={() => {
                    setTypechecked(3);
                    setRendertype(3);
                  }}
                >
                  RBT
                </ToggleButton>
              </div>
            </div>
            <div className="userCard">
              <div className="record rankingtable">
                <div className="recordContainer">
                  <div
                    className="scrollbar rankingbody mx-auto"
                    style={(scrollContainerStyle, { whiteSpace: "pre-wrap" })}
                  >
                    <div className="title">EASY</div>
                    <div style={{ display: "flex", flexDirection: "row" }}>
                      <div style={{ fontSize: "20px", marginRight: "20px" }}>
                        名次
                      </div>
                      <div style={{ fontSize: "20px", marginRight: "20px" }}>
                        學號
                      </div>
                      <div style={{ fontSize: "20px" }}>成績</div>
                    </div>
                    {bsteasyranking}
                  </div>
                </div>
              </div>
              <div className="record rankingtable">
                <div className="recordContainer">
                  <div
                    className="scrollbar rankingbody mx-auto"
                    style={(scrollContainerStyle, { whiteSpace: "pre-wrap" })}
                  >
                    <div className="title">MEDIUM</div>
                    <div style={{ display: "flex", flexDirection: "row" }}>
                      <div style={{ fontSize: "20px", marginRight: "20px" }}>
                        名次
                      </div>
                      <div style={{ fontSize: "20px", marginRight: "20px" }}>
                        學號
                      </div>
                      <div style={{ fontSize: "20px" }}>成績</div>
                    </div>
                    {bstmediumranking}
                  </div>
                </div>
              </div>
              <div className="record rankingtable">
                <div className="recordContainer">
                  <div
                    className="scrollbar rankingbody mx-auto"
                    style={(scrollContainerStyle, { whiteSpace: "pre-wrap" })}
                  >
                    <div className="title">HARD</div>
                    <div style={{ display: "flex", flexDirection: "row" }}>
                      <div style={{ fontSize: "20px", marginRight: "20px" }}>
                        名次
                      </div>
                      <div style={{ fontSize: "20px", marginRight: "20px" }}>
                        學號
                      </div>
                      <div style={{ fontSize: "20px" }}>成績</div>
                    </div>
                    {bsthardranking}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Tilt>
      );
    }
    if (rendertype === 2) {
      return (
        <Tilt className="gametitle playtitle" options={options}>
          <div className="gradetitle">
            <div className="userCard">
              <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABmJLR0QA/wD/AP+gvaeTAAADVklEQVRoge2ZTUgVURTHfz7Nj0I0JcSigr7ITAzMMqJaVUK7FgVFLapVRYWbaFe0DloVEZSbICLTdpUFpRhuhApDigrCrBDzI7LS1GlxzjRm+Zy59466eD94HN579/zv/8zMnTtzL6RIEQtpMWqvADYCq4B8YBToAVqBJmAkxr6tSQcOAe2Al+TzBtjqsmOXZ6QYqAM26fePQAvQBXTqb0uBauQs/QCuAzeApw59WJEPvEKO9mtgF5MfpARwgb/P0E1gbvw2p6YWMdQG5IVonwDWAKeAbs29E5u7kCxBBu4voNwgfxnQixRT7dBXZI6qiToLjbMEl9iMUa8mDltolKjGWyeODGlVE1UWGunAT2AMw0GfsOjcp1Bjv4XGKDCE3OkyTQRcFOLP0J6lTobGMZNkF4V0ayyy0ChALqlB4KuJgItCPmlcaKGxUuM7UwEXhbzQaDKH+GzR2GIq4KKQNo0bLDS2aWw2FXBRiK9RSTBgo5BJcEYGHPgx5jFyxzqN2dN0GnBGNR469BWZDjVhM0bKVeOlqYCLS6tdY4WFRqVG40JccBA5mu+BGoP8Gs31gAMOfUUmHbiNzMgDRDvLCc3xn57Tnbsz4BliqDRCTpnmdNh27mKM+DzRuD9Czr4JubOCCuTo9gILQrQvAL5ozuYYfRnRgBh7TPB4/z9ygfvatnEafEVmEfCZqV+0VmubfmC5i45djhGQNayuCP324Oj11nUhEO4Nz38Jy3LVaRyFZGv8lqTNoEZnhbimCCnAAxYnaZeHTKBDyLrYrKIMeI4UcS9E+1sEk+H6GH2FphS4DAwTrP0Wh8grJFi1HwGuAeti8jgpGcBu4BFyiXjIkk4tsqAdllzgqub6C9rNwB5gjkO//5ANHCd4WvWQgXsFWGuhWwJcIhhfHvABOAnkWOj+QxqygdM1rqN24AQw32E/ecAxgrHmIfssR3CwlzMPuDtOuJXpWTXfjmwA+f02qBcjspD9Pg+Zhfc6MBiVAwSXXBOGS6oXVaAT2S6bKcrUg4fsdkViJbJ5M4rszs40VYiXYWTHODTnkSPwIAZTpjQins5N/CPZs9YOjfVxODLE32fcOfGPZLe0PqJNbtNJH/KG+YfJCskBvsdux44cZJcrRYoUIfgNHq3EbO8epBkAAAAASUVORK5CYII=" />
              <div
                style={{
                  display: "inline",
                  color: "gray",
                }}
              >
                {UserData.Name}
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  marginLeft: "50px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "180px",
                  }}
                >
                  <h5>BST EASY {minebsteasyranking}名</h5>
                  <h5>BST MEDIUM {minebstmediumranking}名</h5>
                  <h5>BST HARD {minebsthardranking}名</h5>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "180px",
                  }}
                >
                  <h5>AVL EASY {mineavleasyranking}名</h5>
                  <h5>AVL MEDIUM {mineavlmediumranking}名</h5>
                  <h5>AVL HARD {mineavlhardranking}名</h5>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "180px",
                  }}
                >
                  <h5>RBT EASY {minerbteasyranking}名</h5>
                  <h5>RBT MEDIUM {minerbtmediumranking}名</h5>
                  <h5>RBT HARD {minerbthardranking}名</h5>
                </div>
              </div>
            </div>
            <div>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <ToggleButton
                  variant="outline-dark"
                  type="checkbox"
                  checked={typechecked === 1}
                  onClick={() => {
                    setTypechecked(1);
                    setRendertype(1);
                  }}
                >
                  BST
                </ToggleButton>
                <ToggleButton
                  variant="outline-dark"
                  type="checkbox"
                  checked={typechecked === 2}
                  onClick={() => {
                    setTypechecked(2);
                    setRendertype(2);
                  }}
                >
                  AVL
                </ToggleButton>
                <ToggleButton
                  variant="outline-dark"
                  type="checkbox"
                  checked={typechecked === 3}
                  onClick={() => {
                    setTypechecked(3);
                    setRendertype(3);
                  }}
                >
                  RBT
                </ToggleButton>
              </div>
            </div>
            <div className="userCard">
              <div className="record rankingtable">
                <div className="recordContainer">
                  <div
                    className="scrollbar rankingbody mx-auto"
                    style={(scrollContainerStyle, { whiteSpace: "pre-wrap" })}
                  >
                    <div className="title">EASY</div>
                    <div style={{ display: "flex", flexDirection: "row" }}>
                      <div style={{ fontSize: "20px", marginRight: "20px" }}>
                        名次
                      </div>
                      <div style={{ fontSize: "20px", marginRight: "20px" }}>
                        學號
                      </div>
                      <div style={{ fontSize: "20px" }}>成績</div>
                    </div>
                    {avleasyranking}
                  </div>
                </div>
              </div>
              <div className="record rankingtable">
                <div className="recordContainer">
                  <div
                    className="scrollbar rankingbody mx-auto"
                    style={(scrollContainerStyle, { whiteSpace: "pre-wrap" })}
                  >
                    <div className="title">MEDIUM</div>
                    <div style={{ display: "flex", flexDirection: "row" }}>
                      <div style={{ fontSize: "20px", marginRight: "20px" }}>
                        名次
                      </div>
                      <div style={{ fontSize: "20px", marginRight: "20px" }}>
                        學號
                      </div>
                      <div style={{ fontSize: "20px" }}>成績</div>
                    </div>
                    {avlmediumranking}
                  </div>
                </div>
              </div>
              <div className="record rankingtable">
                <div className="recordContainer">
                  <div
                    className="scrollbar rankingbody mx-auto"
                    style={(scrollContainerStyle, { whiteSpace: "pre-wrap" })}
                  >
                    <div className="title">HARD</div>
                    <div style={{ display: "flex", flexDirection: "row" }}>
                      <div style={{ fontSize: "20px", marginRight: "20px" }}>
                        名次
                      </div>
                      <div style={{ fontSize: "20px", marginRight: "20px" }}>
                        學號
                      </div>
                      <div style={{ fontSize: "20px" }}>成績</div>
                    </div>
                    {avlhardranking}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Tilt>
      );
    }
    if (rendertype === 3) {
      return (
        <Tilt className="gametitle playtitle" options={options}>
          <div className="gradetitle">
            <div className="userCard">
              <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABmJLR0QA/wD/AP+gvaeTAAADVklEQVRoge2ZTUgVURTHfz7Nj0I0JcSigr7ITAzMMqJaVUK7FgVFLapVRYWbaFe0DloVEZSbICLTdpUFpRhuhApDigrCrBDzI7LS1GlxzjRm+Zy59466eD94HN579/zv/8zMnTtzL6RIEQtpMWqvADYCq4B8YBToAVqBJmAkxr6tSQcOAe2Al+TzBtjqsmOXZ6QYqAM26fePQAvQBXTqb0uBauQs/QCuAzeApw59WJEPvEKO9mtgF5MfpARwgb/P0E1gbvw2p6YWMdQG5IVonwDWAKeAbs29E5u7kCxBBu4voNwgfxnQixRT7dBXZI6qiToLjbMEl9iMUa8mDltolKjGWyeODGlVE1UWGunAT2AMw0GfsOjcp1Bjv4XGKDCE3OkyTQRcFOLP0J6lTobGMZNkF4V0ayyy0ChALqlB4KuJgItCPmlcaKGxUuM7UwEXhbzQaDKH+GzR2GIq4KKQNo0bLDS2aWw2FXBRiK9RSTBgo5BJcEYGHPgx5jFyxzqN2dN0GnBGNR469BWZDjVhM0bKVeOlqYCLS6tdY4WFRqVG40JccBA5mu+BGoP8Gs31gAMOfUUmHbiNzMgDRDvLCc3xn57Tnbsz4BliqDRCTpnmdNh27mKM+DzRuD9Czr4JubOCCuTo9gILQrQvAL5ozuYYfRnRgBh7TPB4/z9ygfvatnEafEVmEfCZqV+0VmubfmC5i45djhGQNayuCP324Oj11nUhEO4Nz38Jy3LVaRyFZGv8lqTNoEZnhbimCCnAAxYnaZeHTKBDyLrYrKIMeI4UcS9E+1sEk+H6GH2FphS4DAwTrP0Wh8grJFi1HwGuAeti8jgpGcBu4BFyiXjIkk4tsqAdllzgqub6C9rNwB5gjkO//5ANHCd4WvWQgXsFWGuhWwJcIhhfHvABOAnkWOj+QxqygdM1rqN24AQw32E/ecAxgrHmIfssR3CwlzMPuDtOuJXpWTXfjmwA+f02qBcjspD9Pg+Zhfc6MBiVAwSXXBOGS6oXVaAT2S6bKcrUg4fsdkViJbJ5M4rszs40VYiXYWTHODTnkSPwIAZTpjQins5N/CPZs9YOjfVxODLE32fcOfGPZLe0PqJNbtNJH/KG+YfJCskBvsdux44cZJcrRYoUIfgNHq3EbO8epBkAAAAASUVORK5CYII=" />
              <div
                style={{
                  display: "inline",
                  color: "gray",
                }}
              >
                {UserData.Name}
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  marginLeft: "50px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "180px",
                  }}
                >
                  <h5>BST EASY {minebsteasyranking}名</h5>
                  <h5>BST MEDIUM {minebstmediumranking}名</h5>
                  <h5>BST HARD {minebsthardranking}名</h5>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "180px",
                  }}
                >
                  <h5>AVL EASY {mineavleasyranking}名</h5>
                  <h5>AVL MEDIUM {mineavlmediumranking}名</h5>
                  <h5>AVL HARD {mineavlhardranking}名</h5>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "180px",
                  }}
                >
                  <h5>RBT EASY {minerbteasyranking}名</h5>
                  <h5>RBT MEDIUM {minerbtmediumranking}名</h5>
                  <h5>RBT HARD {minerbthardranking}名</h5>
                </div>
              </div>
            </div>
            <div>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <ToggleButton
                  variant="outline-dark"
                  type="checkbox"
                  checked={typechecked === 1}
                  onClick={() => {
                    setTypechecked(1);
                    setRendertype(1);
                  }}
                >
                  BST
                </ToggleButton>
                <ToggleButton
                  variant="outline-dark"
                  type="checkbox"
                  checked={typechecked === 2}
                  onClick={() => {
                    setTypechecked(2);
                    setRendertype(2);
                  }}
                >
                  AVL
                </ToggleButton>
                <ToggleButton
                  variant="outline-dark"
                  type="checkbox"
                  checked={typechecked === 3}
                  onClick={() => {
                    setTypechecked(3);
                    setRendertype(3);
                  }}
                >
                  RBT
                </ToggleButton>
              </div>
            </div>
            <div className="userCard">
              <div className="record rankingtable">
                <div className="recordContainer">
                  <div
                    className="scrollbar rankingbody mx-auto"
                    style={(scrollContainerStyle, { whiteSpace: "pre-wrap" })}
                  >
                    <div className="title">EASY</div>
                    <div style={{ display: "flex", flexDirection: "row" }}>
                      <div style={{ fontSize: "20px", marginRight: "20px" }}>
                        名次
                      </div>
                      <div style={{ fontSize: "20px", marginRight: "20px" }}>
                        學號
                      </div>
                      <div style={{ fontSize: "20px" }}>成績</div>
                    </div>
                    {rbteasyranking}
                  </div>
                </div>
              </div>
              <div className="record rankingtable">
                <div className="recordContainer">
                  <div
                    className="scrollbar rankingbody mx-auto"
                    style={(scrollContainerStyle, { whiteSpace: "pre-wrap" })}
                  >
                    <div className="title">MEDIUM</div>
                    <div style={{ display: "flex", flexDirection: "row" }}>
                      <div style={{ fontSize: "20px", marginRight: "20px" }}>
                        名次
                      </div>
                      <div style={{ fontSize: "20px", marginRight: "20px" }}>
                        學號
                      </div>
                      <div style={{ fontSize: "20px" }}>成績</div>
                    </div>
                    {rbtmediumranking}
                  </div>
                </div>
              </div>
              <div className="record rankingtable">
                <div className="recordContainer">
                  <div
                    className="scrollbar rankingbody mx-auto"
                    style={(scrollContainerStyle, { whiteSpace: "pre-wrap" })}
                  >
                    <div className="title">HARD</div>
                    <div style={{ display: "flex", flexDirection: "row" }}>
                      <div style={{ fontSize: "20px", marginRight: "20px" }}>
                        名次
                      </div>
                      <div style={{ fontSize: "20px", marginRight: "20px" }}>
                        學號
                      </div>
                      <div style={{ fontSize: "20px" }}>成績</div>
                    </div>
                    {rbthardranking}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Tilt>
      );
    }
  }
  function LineChart(params) {
    const scrollContainerStyle = { width: "100%", maxHeight: "500px" };
    const [rendertype, setRendertype] = useState(1);
    const [difficulty, setDifficulty] = useState(1);
    const [checked, setChecked] = useState(1);
    const [typechecked, setTypechecked] = useState(1);
    if (difficulty === 1) {
      if (rendertype === 1) {
        return (
          <Tilt className="gametitle playtitle" options={options}>
            <div
              className="gradetitle"
              style={{ padding: "10px", flexDirection: "row" }}
            >
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <ToggleButton
                    variant="outline-dark"
                    type="checkbox"
                    checked={checked === 1}
                    onClick={() => {
                      setDifficulty(1);
                      setChecked(1);
                    }}
                  >
                    EASY
                  </ToggleButton>
                  <ToggleButton
                    variant="outline-dark"
                    type="checkbox"
                    checked={checked === 2}
                    onClick={() => {
                      setDifficulty(2);
                      setChecked(2);
                    }}
                  >
                    MEDIUM
                  </ToggleButton>
                  <ToggleButton
                    variant="outline-dark"
                    type="checkbox"
                    checked={checked === 3}
                    onClick={() => {
                      setDifficulty(3);
                      setChecked(3);
                    }}
                  >
                    HARD
                  </ToggleButton>
                  <ToggleButton
                    variant="outline-dark"
                    type="checkbox"
                    checked={typechecked === 1}
                    onClick={() => {
                      setRendertype(1);
                      setTypechecked(1);
                    }}
                  >
                    BST
                  </ToggleButton>
                  <ToggleButton
                    variant="outline-dark"
                    type="checkbox"
                    checked={typechecked === 2}
                    onClick={() => {
                      setRendertype(2);
                      setTypechecked(2);
                    }}
                  >
                    AVL
                  </ToggleButton>
                  <ToggleButton
                    variant="outline-dark"
                    type="checkbox"
                    checked={typechecked === 3}
                    onClick={() => {
                      setRendertype(3);
                      setTypechecked(3);
                    }}
                  >
                    RBT
                  </ToggleButton>
                  <div style={{ marginLeft: "20px" }}>
                    Average: {}
                    {Math.floor(
                      caculate(userBSTgradesEasy) / userBSTgradesEasy.length
                    )}
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    width: "600px",
                    height: "500px",
                  }}
                >
                  <Line
                    options={Lineoptions}
                    data={datalinebsteasy}
                    width="400px"
                  />
                </div>
              </div>
              <div className="record rankingtable">
                <div className="recordContainer">
                  <div
                    className="scrollbar linearbody mx-auto"
                    style={(scrollContainerStyle, { whiteSpace: "pre-wrap" })}
                  >
                    <div className="title">EASY</div>
                    <div style={{ display: "flex", flexDuraction: "row" }}>
                      <div style={{ margin: "0 200px 0 0" }}>成績</div>
                      <div>時間</div>
                    </div>
                    {userBSTgradesEasyTable}
                  </div>
                </div>
              </div>
            </div>
          </Tilt>
        );
      }
      if (rendertype === 2) {
        return (
          <Tilt className="gametitle playtitle" options={options}>
            <div
              className="gradetitle"
              style={{ padding: "10px", flexDirection: "row" }}
            >
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <ToggleButton
                    variant="outline-dark"
                    type="checkbox"
                    checked={checked === 1}
                    onClick={() => {
                      setDifficulty(1);
                      setChecked(1);
                    }}
                  >
                    EASY
                  </ToggleButton>
                  <ToggleButton
                    variant="outline-dark"
                    type="checkbox"
                    checked={checked === 2}
                    onClick={() => {
                      setDifficulty(2);
                      setChecked(2);
                    }}
                  >
                    MEDIUM
                  </ToggleButton>
                  <ToggleButton
                    variant="outline-dark"
                    type="checkbox"
                    checked={checked === 3}
                    onClick={() => {
                      setDifficulty(3);
                      setChecked(3);
                    }}
                  >
                    HARD
                  </ToggleButton>
                  <ToggleButton
                    variant="outline-dark"
                    type="checkbox"
                    checked={typechecked === 1}
                    onClick={() => {
                      setRendertype(1);
                      setTypechecked(1);
                    }}
                  >
                    BST
                  </ToggleButton>
                  <ToggleButton
                    variant="outline-dark"
                    type="checkbox"
                    checked={typechecked === 2}
                    onClick={() => {
                      setRendertype(2);
                      setTypechecked(2);
                    }}
                  >
                    AVL
                  </ToggleButton>
                  <ToggleButton
                    variant="outline-dark"
                    type="checkbox"
                    checked={typechecked === 3}
                    onClick={() => {
                      setRendertype(3);
                      setTypechecked(3);
                    }}
                  >
                    RBT
                  </ToggleButton>
                  <div style={{ marginLeft: "20px" }}>
                    Average: {}
                    {Math.floor(
                      caculate(userAVLgradesEasy) / userAVLgradesEasy.length
                    )}
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    width: "600px",
                    height: "500px",
                  }}
                >
                  <Line
                    options={Lineoptions}
                    data={datalineavleasy}
                    width="400px"
                  />
                </div>
              </div>
              <div className="record rankingtable">
                <div className="recordContainer">
                  <div
                    className="scrollbar linearbody mx-auto"
                    style={(scrollContainerStyle, { whiteSpace: "pre-wrap" })}
                  >
                    <div className="title">EASY</div>
                    <div style={{ display: "flex", flexDuraction: "row" }}>
                      <div style={{ margin: "0 200px 0 0" }}>成績</div>
                      <div>時間</div>
                    </div>
                    {userAVLgradesEasyTable}
                  </div>
                </div>
              </div>
            </div>
          </Tilt>
        );
      }
      if (rendertype === 3) {
        return (
          <Tilt className="gametitle playtitle" options={options}>
            <div
              className="gradetitle"
              style={{ padding: "10px", flexDirection: "row" }}
            >
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <ToggleButton
                    variant="outline-dark"
                    type="checkbox"
                    checked={checked === 1}
                    onClick={() => {
                      setDifficulty(1);
                      setChecked(1);
                    }}
                  >
                    EASY
                  </ToggleButton>
                  <ToggleButton
                    variant="outline-dark"
                    type="checkbox"
                    checked={checked === 2}
                    onClick={() => {
                      setDifficulty(2);
                      setChecked(2);
                    }}
                  >
                    MEDIUM
                  </ToggleButton>
                  <ToggleButton
                    variant="outline-dark"
                    type="checkbox"
                    checked={checked === 3}
                    onClick={() => {
                      setDifficulty(3);
                      setChecked(3);
                    }}
                  >
                    HARD
                  </ToggleButton>
                  <ToggleButton
                    variant="outline-dark"
                    type="checkbox"
                    checked={typechecked === 1}
                    onClick={() => {
                      setRendertype(1);
                      setTypechecked(1);
                    }}
                  >
                    BST
                  </ToggleButton>
                  <ToggleButton
                    variant="outline-dark"
                    type="checkbox"
                    checked={typechecked === 2}
                    onClick={() => {
                      setRendertype(2);
                      setTypechecked(2);
                    }}
                  >
                    AVL
                  </ToggleButton>
                  <ToggleButton
                    variant="outline-dark"
                    type="checkbox"
                    checked={typechecked === 3}
                    onClick={() => {
                      setRendertype(3);
                      setTypechecked(3);
                    }}
                  >
                    RBT
                  </ToggleButton>
                  <div style={{ marginLeft: "20px" }}>
                    Average: {}
                    {Math.floor(
                      caculate(userRBTgradesEasy) / userRBTgradesEasy.length
                    )}
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    width: "600px",
                    height: "500px",
                  }}
                >
                  <Line
                    options={Lineoptions}
                    data={datalinerbteasy}
                    width="400px"
                  />
                </div>
              </div>
              <div className="record rankingtable">
                <div className="recordContainer">
                  <div
                    className="scrollbar linearbody mx-auto"
                    style={(scrollContainerStyle, { whiteSpace: "pre-wrap" })}
                  >
                    <div className="title">EASY</div>
                    <div style={{ display: "flex", flexDuraction: "row" }}>
                      <div style={{ margin: "0 200px 0 0" }}>成績</div>
                      <div>時間</div>
                    </div>
                    {userRBTgradesEasyTable}
                  </div>
                </div>
              </div>
            </div>
          </Tilt>
        );
      }
    }
    if (difficulty === 2) {
      if (rendertype === 1) {
        return (
          <Tilt className="gametitle playtitle" options={options}>
            <div
              className="gradetitle"
              style={{ padding: "10px", flexDirection: "row" }}
            >
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <ToggleButton
                    variant="outline-dark"
                    type="checkbox"
                    checked={checked === 1}
                    onClick={() => {
                      setDifficulty(1);
                      setChecked(1);
                    }}
                  >
                    EASY
                  </ToggleButton>
                  <ToggleButton
                    variant="outline-dark"
                    type="checkbox"
                    checked={checked === 2}
                    onClick={() => {
                      setDifficulty(2);
                      setChecked(2);
                    }}
                  >
                    MEDIUM
                  </ToggleButton>
                  <ToggleButton
                    variant="outline-dark"
                    type="checkbox"
                    checked={checked === 3}
                    onClick={() => {
                      setDifficulty(3);
                      setChecked(3);
                    }}
                  >
                    HARD
                  </ToggleButton>
                  <ToggleButton
                    variant="outline-dark"
                    type="checkbox"
                    checked={typechecked === 1}
                    onClick={() => {
                      setRendertype(1);
                      setTypechecked(1);
                    }}
                  >
                    BST
                  </ToggleButton>
                  <ToggleButton
                    variant="outline-dark"
                    type="checkbox"
                    checked={typechecked === 2}
                    onClick={() => {
                      setRendertype(2);
                      setTypechecked(2);
                    }}
                  >
                    AVL
                  </ToggleButton>
                  <ToggleButton
                    variant="outline-dark"
                    type="checkbox"
                    checked={typechecked === 3}
                    onClick={() => {
                      setRendertype(3);
                      setTypechecked(3);
                    }}
                  >
                    RBT
                  </ToggleButton>
                  <div style={{ marginLeft: "20px" }}>
                    Average: {}
                    {Math.floor(
                      caculate(userBSTgradesMedium) / userBSTgradesMedium.length
                    )}
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    width: "600px",
                    height: "500px",
                  }}
                >
                  <Line
                    options={Lineoptions}
                    data={datalinebstmedium}
                    width="400px"
                  />
                </div>
              </div>
              <div className="record rankingtable">
                <div className="recordContainer">
                  <div
                    className="scrollbar linearbody mx-auto"
                    style={(scrollContainerStyle, { whiteSpace: "pre-wrap" })}
                  >
                    <div className="title">MEDIUM</div>
                    <div style={{ display: "flex", flexDuraction: "row" }}>
                      <div style={{ margin: "0 200px 0 0" }}>成績</div>
                      <div>時間</div>
                    </div>
                    {userBSTgradesMediumTable}
                  </div>
                </div>
              </div>
            </div>
          </Tilt>
        );
      }
      if (rendertype === 2) {
        return (
          <Tilt className="gametitle playtitle" options={options}>
            <div
              className="gradetitle"
              style={{ padding: "10px", flexDirection: "row" }}
            >
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <ToggleButton
                    variant="outline-dark"
                    type="checkbox"
                    checked={checked === 1}
                    onClick={() => {
                      setDifficulty(1);
                      setChecked(1);
                    }}
                  >
                    EASY
                  </ToggleButton>
                  <ToggleButton
                    variant="outline-dark"
                    type="checkbox"
                    checked={checked === 2}
                    onClick={() => {
                      setDifficulty(2);
                      setChecked(2);
                    }}
                  >
                    MEDIUM
                  </ToggleButton>
                  <ToggleButton
                    variant="outline-dark"
                    type="checkbox"
                    checked={checked === 3}
                    onClick={() => {
                      setDifficulty(3);
                      setChecked(3);
                    }}
                  >
                    HARD
                  </ToggleButton>
                  <ToggleButton
                    variant="outline-dark"
                    type="checkbox"
                    checked={typechecked === 1}
                    onClick={() => {
                      setRendertype(1);
                      setTypechecked(1);
                    }}
                  >
                    BST
                  </ToggleButton>
                  <ToggleButton
                    variant="outline-dark"
                    type="checkbox"
                    checked={typechecked === 2}
                    onClick={() => {
                      setRendertype(2);
                      setTypechecked(2);
                    }}
                  >
                    AVL
                  </ToggleButton>
                  <ToggleButton
                    variant="outline-dark"
                    type="checkbox"
                    checked={typechecked === 3}
                    onClick={() => {
                      setRendertype(3);
                      setTypechecked(3);
                    }}
                  >
                    RBT
                  </ToggleButton>
                  <div style={{ marginLeft: "20px" }}>
                    Average: {}
                    {Math.floor(
                      caculate(userAVLgradesMedium) / userAVLgradesMedium.length
                    )}
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    width: "600px",
                    height: "500px",
                  }}
                >
                  <Line
                    options={Lineoptions}
                    data={datalineavlmedium}
                    width="400px"
                  />
                  <div
                    style={{ display: "flex", flexDirection: "column" }}
                  ></div>
                </div>
              </div>
              <div className="record rankingtable">
                <div className="recordContainer">
                  <div
                    className="scrollbar linearbody mx-auto"
                    style={(scrollContainerStyle, { whiteSpace: "pre-wrap" })}
                  >
                    <div className="title">MEDIUM</div>
                    <div style={{ display: "flex", flexDuraction: "row" }}>
                      <div style={{ margin: "0 200px 0 0" }}>成績</div>
                      <div>時間</div>
                    </div>
                    {userAVLgradesMediumTable}
                  </div>
                </div>
              </div>
            </div>
          </Tilt>
        );
      }
      if (rendertype === 3) {
        return (
          <Tilt className="gametitle playtitle" options={options}>
            <div
              className="gradetitle"
              style={{ padding: "10px", flexDirection: "row" }}
            >
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <ToggleButton
                    variant="outline-dark"
                    type="checkbox"
                    checked={checked === 1}
                    onClick={() => {
                      setDifficulty(1);
                      setChecked(1);
                    }}
                  >
                    EASY
                  </ToggleButton>
                  <ToggleButton
                    variant="outline-dark"
                    type="checkbox"
                    checked={checked === 2}
                    onClick={() => {
                      setDifficulty(2);
                      setChecked(2);
                    }}
                  >
                    MEDIUM
                  </ToggleButton>
                  <ToggleButton
                    variant="outline-dark"
                    type="checkbox"
                    checked={checked === 3}
                    onClick={() => {
                      setDifficulty(3);
                      setChecked(3);
                    }}
                  >
                    HARD
                  </ToggleButton>
                  <ToggleButton
                    variant="outline-dark"
                    type="checkbox"
                    checked={typechecked === 1}
                    onClick={() => {
                      setRendertype(1);
                      setTypechecked(1);
                    }}
                  >
                    BST
                  </ToggleButton>
                  <ToggleButton
                    variant="outline-dark"
                    type="checkbox"
                    checked={typechecked === 2}
                    onClick={() => {
                      setRendertype(2);
                      setTypechecked(2);
                    }}
                  >
                    AVL
                  </ToggleButton>
                  <ToggleButton
                    variant="outline-dark"
                    type="checkbox"
                    checked={typechecked === 3}
                    onClick={() => {
                      setRendertype(3);
                      setTypechecked(3);
                    }}
                  >
                    RBT
                  </ToggleButton>
                  <div style={{ marginLeft: "20px" }}>
                    Average: {}
                    {Math.floor(
                      caculate(userRBTgradesMedium) / userRBTgradesMedium.length
                    )}
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    width: "600px",
                    height: "500px",
                  }}
                >
                  <Line
                    options={Lineoptions}
                    data={datalinerbtmedium}
                    width="400px"
                  />
                </div>
              </div>
              <div className="record rankingtable">
                <div className="recordContainer">
                  <div
                    className="scrollbar linearbody mx-auto"
                    style={(scrollContainerStyle, { whiteSpace: "pre-wrap" })}
                  >
                    <div className="title">MEDIUM</div>
                    <div style={{ display: "flex", flexDuraction: "row" }}>
                      <div style={{ margin: "0 200px 0 0" }}>成績</div>
                      <div>時間</div>
                    </div>
                    {userRBTgradesMediumTable}
                  </div>
                </div>
              </div>
            </div>
          </Tilt>
        );
      }
    }
    if (difficulty === 3) {
      if (rendertype === 1) {
        return (
          <Tilt className="gametitle playtitle" options={options}>
            <div
              className="gradetitle"
              style={{ padding: "10px", flexDirection: "row" }}
            >
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <ToggleButton
                    variant="outline-dark"
                    type="checkbox"
                    checked={checked === 1}
                    onClick={() => {
                      setDifficulty(1);
                      setChecked(1);
                    }}
                  >
                    EASY
                  </ToggleButton>
                  <ToggleButton
                    variant="outline-dark"
                    type="checkbox"
                    checked={checked === 2}
                    onClick={() => {
                      setDifficulty(2);
                      setChecked(2);
                    }}
                  >
                    MEDIUM
                  </ToggleButton>
                  <ToggleButton
                    variant="outline-dark"
                    type="checkbox"
                    checked={checked === 3}
                    onClick={() => {
                      setDifficulty(3);
                      setChecked(3);
                    }}
                  >
                    HARD
                  </ToggleButton>
                  <ToggleButton
                    variant="outline-dark"
                    type="checkbox"
                    checked={typechecked === 1}
                    onClick={() => {
                      setRendertype(1);
                      setTypechecked(1);
                    }}
                  >
                    BST
                  </ToggleButton>
                  <ToggleButton
                    variant="outline-dark"
                    type="checkbox"
                    checked={typechecked === 2}
                    onClick={() => {
                      setRendertype(2);
                      setTypechecked(2);
                    }}
                  >
                    AVL
                  </ToggleButton>
                  <ToggleButton
                    variant="outline-dark"
                    type="checkbox"
                    checked={typechecked === 3}
                    onClick={() => {
                      setRendertype(3);
                      setTypechecked(3);
                    }}
                  >
                    RBT
                  </ToggleButton>
                  <div style={{ marginLeft: "20px" }}>
                    Average: {}
                    {Math.floor(
                      caculate(userBSTgradesHard) / userBSTgradesHard.length
                    )}
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    width: "600px",
                    height: "500px",
                  }}
                >
                  <Line
                    options={Lineoptions}
                    data={datalinebsthard}
                    width="400px"
                  />
                </div>
              </div>
              <div className="record rankingtable">
                <div className="recordContainer">
                  <div
                    className="scrollbar linearbody mx-auto"
                    style={(scrollContainerStyle, { whiteSpace: "pre-wrap" })}
                  >
                    <div className="title">HARD</div>
                    <div style={{ display: "flex", flexDuraction: "row" }}>
                      <div style={{ margin: "0 200px 0 0" }}>成績</div>
                      <div>時間</div>
                    </div>
                    {userBSTgradesHardTable}
                  </div>
                </div>
              </div>
            </div>
          </Tilt>
        );
      }
      if (rendertype === 2) {
        return (
          <Tilt className="gametitle playtitle" options={options}>
            <div
              className="gradetitle"
              style={{ padding: "10px", flexDirection: "row" }}
            >
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <ToggleButton
                    variant="outline-dark"
                    type="checkbox"
                    checked={checked === 1}
                    onClick={() => {
                      setDifficulty(1);
                      setChecked(1);
                    }}
                  >
                    EASY
                  </ToggleButton>
                  <ToggleButton
                    variant="outline-dark"
                    type="checkbox"
                    checked={checked === 2}
                    onClick={() => {
                      setDifficulty(2);
                      setChecked(2);
                    }}
                  >
                    MEDIUM
                  </ToggleButton>
                  <ToggleButton
                    variant="outline-dark"
                    type="checkbox"
                    checked={checked === 3}
                    onClick={() => {
                      setDifficulty(3);
                      setChecked(3);
                    }}
                  >
                    HARD
                  </ToggleButton>
                  <ToggleButton
                    variant="outline-dark"
                    type="checkbox"
                    checked={typechecked === 1}
                    onClick={() => {
                      setRendertype(1);
                      setTypechecked(1);
                    }}
                  >
                    BST
                  </ToggleButton>
                  <ToggleButton
                    variant="outline-dark"
                    type="checkbox"
                    checked={typechecked === 2}
                    onClick={() => {
                      setRendertype(2);
                      setTypechecked(2);
                    }}
                  >
                    AVL
                  </ToggleButton>
                  <ToggleButton
                    variant="outline-dark"
                    type="checkbox"
                    checked={typechecked === 3}
                    onClick={() => {
                      setRendertype(3);
                      setTypechecked(3);
                    }}
                  >
                    RBT
                  </ToggleButton>
                  <div style={{ marginLeft: "20px" }}>
                    Average: {}
                    {Math.floor(
                      caculate(userAVLgradesHard) / userAVLgradesHard.length
                    )}
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    width: "600px",
                    height: "500px",
                  }}
                >
                  <Line
                    options={Lineoptions}
                    data={datalineavlhard}
                    width="400px"
                  />
                </div>
              </div>
              <div className="record rankingtable">
                <div className="recordContainer">
                  <div
                    className="scrollbar linearbody mx-auto"
                    style={(scrollContainerStyle, { whiteSpace: "pre-wrap" })}
                  >
                    <div className="title">HARD</div>
                    <div style={{ display: "flex", flexDuraction: "row" }}>
                      <div style={{ margin: "0 200px 0 0" }}>成績</div>
                      <div>時間</div>
                    </div>
                    {userAVLgradesHardTable}
                  </div>
                </div>
              </div>
            </div>
          </Tilt>
        );
      }
      if (rendertype === 3) {
        return (
          <Tilt className="gametitle playtitle" options={options}>
            <div
              className="gradetitle"
              style={{ padding: "10px", flexDirection: "row" }}
            >
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <ToggleButton
                    variant="outline-dark"
                    type="checkbox"
                    checked={checked === 1}
                    onClick={() => {
                      setDifficulty(1);
                      setChecked(1);
                    }}
                  >
                    EASY
                  </ToggleButton>
                  <ToggleButton
                    variant="outline-dark"
                    type="checkbox"
                    checked={checked === 2}
                    onClick={() => {
                      setDifficulty(2);
                      setChecked(2);
                    }}
                  >
                    MEDIUM
                  </ToggleButton>
                  <ToggleButton
                    variant="outline-dark"
                    type="checkbox"
                    checked={checked === 3}
                    onClick={() => {
                      setDifficulty(3);
                      setChecked(3);
                    }}
                  >
                    HARD
                  </ToggleButton>
                  <ToggleButton
                    variant="outline-dark"
                    type="checkbox"
                    checked={typechecked === 1}
                    onClick={() => {
                      setRendertype(1);
                      setTypechecked(1);
                    }}
                  >
                    BST
                  </ToggleButton>
                  <ToggleButton
                    variant="outline-dark"
                    type="checkbox"
                    checked={typechecked === 2}
                    onClick={() => {
                      setRendertype(2);
                      setTypechecked(2);
                    }}
                  >
                    AVL
                  </ToggleButton>
                  <ToggleButton
                    variant="outline-dark"
                    type="checkbox"
                    checked={typechecked === 3}
                    onClick={() => {
                      setRendertype(3);
                      setTypechecked(3);
                    }}
                  >
                    RBT
                  </ToggleButton>
                  <div style={{ marginLeft: "20px" }}>
                    Average: {}
                    {Math.floor(
                      caculate(userRBTgradesHard) / userRBTgradesHard.length
                    )}
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    width: "600px",
                    height: "500px",
                  }}
                >
                  <Line
                    options={Lineoptions}
                    data={datalinerbthard}
                    width="400px"
                  />
                </div>
              </div>
              <div className="record rankingtable">
                <div className="recordContainer">
                  <div
                    className="scrollbar linearbody mx-auto"
                    style={(scrollContainerStyle, { whiteSpace: "pre-wrap" })}
                  >
                    <div className="title">HARD</div>
                    <div style={{ display: "flex", flexDuraction: "row" }}>
                      <div style={{ margin: "0 200px 0 0" }}>成績</div>
                      <div>時間</div>
                    </div>
                    {userRBTgradesHardTable}
                  </div>
                </div>
              </div>
            </div>
          </Tilt>
        );
      }
    }
  }
  function RadarChart(params) {
    const [rendertype, setRendertype] = useState(1);
    const [typechecked, setTypechecked] = useState(1);
    if (rendertype === 1) {
      return (
        <Tilt className="polar" options={options}>
          <div
            className="gradetitle polar"
            style={{ padding: "10px", flexDirection: "row" }}
          >
            <Radar data={radarDataBST} width="400px" />
            <div style={{ display: "flex", flexDirection: "column" }}>
              <ToggleButton
                variant="outline-dark"
                type="checkbox"
                checked={typechecked === 1}
                onClick={() => {
                  setRendertype(1);
                  setTypechecked(1);
                }}
              >
                BST
              </ToggleButton>
              <ToggleButton
                variant="outline-dark"
                type="checkbox"
                checked={typechecked === 2}
                onClick={() => {
                  setRendertype(2);
                  setTypechecked(2);
                }}
              >
                AVL
              </ToggleButton>
              <ToggleButton
                variant="outline-dark"
                type="checkbox"
                checked={typechecked === 3}
                onClick={() => {
                  setRendertype(3);
                  setTypechecked(3);
                }}
              >
                RBT
              </ToggleButton>
              <ToggleButton
                variant="outline-dark"
                type="checkbox"
                checked={typechecked === 4}
                onClick={() => {
                  setRendertype(4);
                  setTypechecked(4);
                }}
              >
                MIXED
              </ToggleButton>
            </div>
          </div>
        </Tilt>
      );
    } else if (rendertype === 2) {
      return (
        <Tilt className="polar" options={options}>
          <div
            className="gradetitle polar"
            style={{ padding: "10px", flexDirection: "row" }}
          >
            <Radar data={radarDataAVL} width="400px" />
            <div style={{ display: "flex", flexDirection: "column" }}>
              <ToggleButton
                variant="outline-dark"
                type="checkbox"
                checked={typechecked === 1}
                onClick={() => {
                  setRendertype(1);
                  setTypechecked(1);
                }}
              >
                BST
              </ToggleButton>
              <ToggleButton
                variant="outline-dark"
                type="checkbox"
                checked={typechecked === 2}
                onClick={() => {
                  setRendertype(2);
                  setTypechecked(2);
                }}
              >
                AVL
              </ToggleButton>
              <ToggleButton
                variant="outline-dark"
                type="checkbox"
                checked={typechecked === 3}
                onClick={() => {
                  setRendertype(3);
                  setTypechecked(3);
                }}
              >
                RBT
              </ToggleButton>
              <ToggleButton
                variant="outline-dark"
                type="checkbox"
                checked={typechecked === 4}
                onClick={() => {
                  setRendertype(4);
                  setTypechecked(4);
                }}
              >
                MIXED
              </ToggleButton>
            </div>
          </div>
        </Tilt>
      );
    } else if (rendertype === 3) {
      return (
        <Tilt className="polar" options={options}>
          <div
            className="gradetitle polar"
            style={{ padding: "10px", flexDirection: "row" }}
          >
            <Radar data={radarDataRBT} width="400px" />
            <div style={{ display: "flex", flexDirection: "column" }}>
              <ToggleButton
                variant="outline-dark"
                type="checkbox"
                checked={typechecked === 1}
                onClick={() => {
                  setRendertype(1);
                  setTypechecked(1);
                }}
              >
                BST
              </ToggleButton>
              <ToggleButton
                variant="outline-dark"
                type="checkbox"
                checked={typechecked === 2}
                onClick={() => {
                  setRendertype(2);
                  setTypechecked(2);
                }}
              >
                AVL
              </ToggleButton>
              <ToggleButton
                variant="outline-dark"
                type="checkbox"
                checked={typechecked === 3}
                onClick={() => {
                  setRendertype(3);
                  setTypechecked(3);
                }}
              >
                RBT
              </ToggleButton>
              <ToggleButton
                variant="outline-dark"
                type="checkbox"
                checked={typechecked === 4}
                onClick={() => {
                  setRendertype(4);
                  setTypechecked(4);
                }}
              >
                MIXED
              </ToggleButton>
            </div>
          </div>
        </Tilt>
      );
    } else if (rendertype === 4) {
      return (
        <Tilt className="polar" options={options}>
          <div
            className="gradetitle polar"
            style={{ padding: "10px", flexDirection: "row" }}
          >
            <Radar data={radarDataMixed} width="400px" />
            <div style={{ display: "flex", flexDirection: "column" }}>
              <ToggleButton
                variant="outline-dark"
                type="checkbox"
                checked={typechecked === 1}
                onClick={() => {
                  setRendertype(1);
                  setTypechecked(1);
                }}
              >
                BST
              </ToggleButton>
              <ToggleButton
                variant="outline-dark"
                type="checkbox"
                checked={typechecked === 2}
                onClick={() => {
                  setRendertype(2);
                  setTypechecked(2);
                }}
              >
                AVL
              </ToggleButton>
              <ToggleButton
                variant="outline-dark"
                type="checkbox"
                checked={typechecked === 3}
                onClick={() => {
                  setRendertype(3);
                  setTypechecked(3);
                }}
              >
                RBT
              </ToggleButton>
              <ToggleButton
                variant="outline-dark"
                type="checkbox"
                checked={typechecked === 4}
                onClick={() => {
                  setRendertype(4);
                  setTypechecked(4);
                }}
              >
                MIXED
              </ToggleButton>
            </div>
          </div>
        </Tilt>
      );
    }
  }

  return (
    <div className="A3">
      <div className="Gradecontainer">
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
        <h1
          style={{ display: props.StudentId === undefined ? "flex" : "none" }}
        >
          Grade
        </h1>
        <div>
          <Button
            variant="outline-dark"
            onClick={() => {
              setRenderF(<UserCard />);
            }}
          >
            Game Level
          </Button>
          <Button
            variant="outline-dark"
            onClick={() => {
              setRenderF(<LineChart />);
            }}
          >
            Game Line Chart
          </Button>
          <Button
            variant="outline-dark"
            onClick={() => {
              setRenderF(<RadarChart />);
            }}
          >
            Google Sheet Radar Chart
          </Button>
        </div>
        <div className="chart">{renderF}</div>
      </div>
    </div>
  );
}
