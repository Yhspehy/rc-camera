import React from "react";
import ReactDOM from "react-dom";
import Camera from "rc-camera";
import "rc-camera/assets/index.less";

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
      img: "../assets/images/slides/sea.jpg"
    },
    {
      thumb: "../assets/images/slides/thumbs/leaf.jpg",
      img: "../assets/images/slides/leaf.jpg",
      content:
        "这是一大段中文，发现中文竟然可以自动换行这是一大段中文，发现中文竟然可以自动换行这是一大段中文，发现中文竟然可以自动换行这是一大段中文，发现中文竟然可以自动换行"
    },
    {
      thumb: "../assets/images/slides/thumbs/road.jpg",
      img: "../assets/images/slides/road.jpg",
      content:
        "这是一大段中文，发现中文竟然可以自动换行这是一大段中文，发现中文竟然可以自动换行这是一大段中文，发现中文竟然可以自动换行这是一大段中文，发现中文竟然可以自动换行"
    },
    {
      thumb: "../assets/images/slides/thumbs/tree.jpg",
      img: "../assets/images/slides/tree.jpg",
      content:
        "这是一大段中文，发现中文竟然可以自动换行这是一大段中文，发现中文竟然可以自动换行这是一大段中文，发现中文竟然可以自动换行这是一大段中文，发现中文竟然可以自动换行"
    },
    {
      thumb: "../assets/images/slides/thumbs/shelter.jpg",
      img: "../assets/images/slides/shelter.jpg",
      content:
        "这是一大段中文，发现中文竟然可以自动换行这是一大段中文，发现中文竟然可以自动换行这是一大段中文，发现中文竟然可以自动换行这是一大段中文，发现中文竟然可以自动换行"
    }
  ];
  return <Camera imgList={imgList} />;
}

ReactDOM.render(<App />, document.getElementById("__react-content"));
