import React from "react";

const Robot = (
  <div>
    <script src="https://www.gstatic.com/dialogflow-console/fast/messenger/bootstrap.js?v=1"></script>
    <df-messenger
      intent="WELCOME"
      chat-title="StudyRobor-TS"
      agent-id="b6c4d629-c91b-4bdb-9db8-22789f79ef30"
      language-code="zh-tw"
    ></df-messenger>
  </div>
);

const A3 = () => {
  return Robot;
};

export default A3;
