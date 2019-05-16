import React from "react";
import ReactDOM from "react-dom";
import Camera from "../index.js";
import "../assets/index.less";

function App() {
  const imgList = [
    {
      thumb: "../assets/images/slides/thumbs/bridge.jpg",
      img: "../assets/images/slides/bridge.jpg",
      content:
        "这是一大段中文，发现中文竟然可以自动换行这是一大段中文，发现中文竟然可以自动换行这是一大段中文，发现中文竟然可以自动换行这是一大段中文，发现中文竟然可以自动换行"
    },
    {
      thumb: "../assets/images/slides/thumbs/sea.jpg",
      img: "../assets/images/slides/sea.jpg",
      content:
        "2222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222"
    }
  ];
  return <Camera imgList={imgList} />;
}

ReactDOM.render(<App />, document.getElementById("__react-content"));
