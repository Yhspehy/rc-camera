import React from "react";
import ReactDOM from "react-dom";
import Camera from "../index.js";
import "../assets/index.less";
class App extends React.Component {
  render() {
    const imgList = [
      {
        thumb: "../assets/images/slides/thumbs/bridge.jpg",
        img: "../assets/images/slides/bridge.jpg",
        content: "1111"
      },
      {
        thumb: "../assets/images/slides/thumbs/sea.jpg",
        img: "../assets/images/slides/sea.jpg",
        content: "2222"
      }
    ];
    return <Camera imgList={imgList} />;
  }
}

ReactDOM.render(<App />, document.getElementById("__react-content"));
