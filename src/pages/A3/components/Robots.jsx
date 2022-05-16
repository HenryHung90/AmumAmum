import React from "react";

const Robots = () => {
  return (
    <df-messenger
      id="robot"
      intent="WELCOME"
      chat-title="阿姆阿姆"
      agent-id={process.env.REACT_APP_AGENT_ID}
      language-code="zh-tw"
    ></df-messenger>
  );
};

export default Robots;
