const express = require("express");
const app = express();
const mongoose = require("mongoose");

const dotenv = require("dotenv");
dotenv.config();

//跨來源資源共用（Cross-Origin Resource Sharing，簡稱 CORS）機制提供了網頁伺服器跨網域的存取控制，增加跨網域資料傳輸的安全性
const cors = require("cors");

//WebSocket
// const io = require("socket.io")(server);
// const io = require("socket.io")
// io = socket(server)

const RoutesUrls = require("./routes/routes");

mongoose.connect(process.env.MONGODB_ACCESS_TOKEN, () =>
  console.log("Connected to MongoDB")
);

//開啟socket監聽
// io.on("connection", (socket) => {
//   console.log("Socket connected");
//   //監聽透過connection連進的事件
//   //getMessage 是可自定義的名稱
//   socket.on("getMessage", (message) => {
//     //回傳message給Client
//     //emit 為回覆訊息的function -> 只會回覆對應的function
//     socket.emit("getMessage", message);
//   });
// });

//使用Router
app.use(express.json());
app.use(cors());
app.use(process.env.ROUTER_MAIN, RoutesUrls);

app.listen(4000, () => console.log("Server is running at port 4000"));
