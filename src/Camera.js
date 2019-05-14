import React from "react";
import PropTypes from "prop-types";

import TargetContainer from "./TargetContainer";
import ButtonContainer from "./ButtonContainer";

import animateTypeList from "./utils/config";

class Camera extends React.Component {
  static propTypes = {
    width: PropTypes.string,
    aspectRadio: PropTypes.number,
    prefixCls: PropTypes.string,
    imgList: PropTypes.arrayOf(PropTypes.object),
    current: PropTypes.number,
    slideOn: PropTypes.string,
    animateType: PropTypes.string,
    duration: PropTypes.number,
    easing: PropTypes.string
  };

  static defaultProps = {
    width: "100%",
    aspectRadio: 0.5,
    prefixCls: "rc-camera",
    imgList: [],
    current: 0,
    slideOn: "next",
    animateType: "curtainBottomLeft",
    duration: 1000,
    easing: "cubic-bezier(0.77, 0, 0.175, 1)"
  };

  constructor(props) {
    super(props);

    let current = props.current;

    if (current + 1 > props.imgList.length) {
      // console.warn("current大于imgList长度，将默认显示第一张图片");
      current = 0;
    }

    const animateType =
      props.animateType === "random" ? "scrollTop" : props.animateType;

    this.cameraRef = React.createRef();

    this.state = {
      current,
      nextIndex: 0,
      isAnimate: false,
      height: 0,
      isHover: false,
      animateType
    };
  }

  componentDidMount() {
    this.getHeight();
  }

  getHeight = () => {
    this.setState({
      height: this.cameraRef.current.clientWidth * this.props.aspectRadio
    });
  };

  getAnimateType = () => {
    if (this.props.animateType === "random") {
      const length = animateTypeList.length;
      const randomIndex = Math.floor(Math.random() * length);
      const animateType = animateTypeList[randomIndex];
      this.setState({
        animateType
      });
    }
  };

  mouseEnter = () => {
    this.setState({
      isHover: true
    });
  };

  mouseLeave = () => {
    this.setState({
      isHover: false
    });
  };

  // 按钮点击事件
  handleClick = next => {
    const { isAnimate } = this.state;
    if (isAnimate) {
      return;
    }
    this.getAnimateType();
    this.setState({
      nextIndex: next,
      isAnimate: true
    });
  };

  // 动画执行完毕
  handleAnimate = (c, a) => {
    this.setState({
      current: c,
      isAnimate: !!a
    });
  };

  render() {
    const { imgList, prefixCls, width, slideOn, duration, easing } = this.props;
    const {
      current,
      height,
      isHover,
      nextIndex,
      isAnimate,
      animateType
    } = this.state;

    return (
      <div className={prefixCls}>
        <div className={`${prefixCls}-container`}>
          {/* 图片容器 */}
          <div
            onMouseEnter={this.mouseEnter}
            onMouseLeave={this.mouseLeave}
            className={`${prefixCls}-target`}
            ref={this.cameraRef}
            style={{
              width,
              height
            }}
          >
            <div>
              {height > 0 ? (
                <TargetContainer
                  prefixCls={prefixCls}
                  width={this.cameraRef.current.clientWidth}
                  height={height}
                  imgList={imgList}
                  current={current}
                  nextIndex={nextIndex}
                  isAnimate={isAnimate}
                  handleAnimate={this.handleAnimate}
                  slideOn={slideOn}
                  animateType={animateType}
                  duration={duration}
                  easing={easing}
                />
              ) : (
                <div> 初始化中....</div>
              )}
            </div>

            <ButtonContainer
              prefixCls={prefixCls}
              imgCount={imgList.length}
              current={current}
              handleClick={this.handleClick}
              isHover={isHover}
            />
          </div>
        </div>
      </div>
    );
  }
}
export default Camera;
