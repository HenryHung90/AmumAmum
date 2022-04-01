const express = require("express");
const router = express.Router();
//引入Schema
const SignUpTemplateCopy = require("../models/SignUpModels");
const MarkUserTemplateCopy = require("../models/MarkUserModels");

/////////////寫入資料庫///////////////////
router.post(process.env.ROUTER_SIGNUP, async (req, res) => {
  /////////////Schema///////////////////
  const SignedUpUser = new SignUpTemplateCopy({
    Name: req.body.Name,
    StudentId: req.body.StudentId,
    Password: req.body.Password,
    Email: req.body.Email,
    Access: req.body.Access,
  });
  ////////////////////////////////
  SignedUpUser.save()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
});
/////////////紀錄行為/////////////////
router.post(process.env.ROUTER_USERINPUT, async (req, res) => {
  ///////////Schema////////////////
  const MarkedUpUser = new MarkUserTemplateCopy({
    StudentId: req.body.StudentId,
    Mark: req.body.Mark,
  });
  ////////////////////////////////
  MarkedUpUser.save()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
});
/////////////讀取///////////////////
router.get(process.env.ROUTER_READ, async (req, res) => {
  ////////////////////////////////
  SignUpTemplateCopy.find({}, (err, result) => {
    if (err) {
      res.send(err);
    }
    res.send(result);
  });
  ////////////////////////////////
});
/////////////登入///////////////////
router.post(process.env.ROUTER_LOGIN, async (req, res) => {
  SignUpTemplateCopy.find(
    {
      StudentId: req.body.StudentId,
    },
    (err, result) => {
      if (err) {
        res.send(err);
      }
      res.send(result);
    }
  );
});
/////////////Dialogflow///////////////////
router.post(process.env.ROUTER_DIALOGFLOW, (req, res, next) => {
  console.log("使用者提問：", req.body.queryResult.queryText);
  console.log("回覆：", req.body.queryResult.fulfillmentText);
  console.log("使用Intents：", req.body.queryResult.intent.displayName);
  //Socket回傳給首頁////////////////////////////////
  //存入資料庫/////////////////////////////////////
});
module.exports = router;
