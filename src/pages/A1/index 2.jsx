import React from "react";
import A1_Header from "./components/Header";
import A1_Home from "./components/Home";
function A1(params) {
  return (
    <div className="A1">
      <A1_Header />
      <div className="container">
        <A1_Home />
      </div>
    </div>
  );
}

export default A1;
