import React from "react";
import PropTypes from "prop-types";

import TargetContainer from "./TargetContainer";
import ButtonContainer from "./ButtonContainer";
import Pagination from "./Pagination";
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
    easing: PropTypes.string,
    contentBar: PropTypes.oneOfType([PropTypes.func, PropTypes.oneOf([null])]),
    contentBarWrapStyle: PropTypes.object,
    prevBtn: PropTypes.oneOfType([PropTypes.node, PropTypes.oneOf([null])]),
    nextBtn: PropTypes.oneOfType([PropTypes.node, PropTypes.oneOf([null])]),
    pagination: PropTypes.bool
  };

  static defaultProps = {
    width: "100%",
    aspectRadio: 0.5,
    prefixCls: "rc-camera",
    imgList: [],
    current: 0,
    slideOn: "random",
    animateType: "curtainTopLeft",
    duration: 1000,
    easing: "cubic-bezier(0.77, 0, 0.175, 1)",
    /**
     * 自定义contentBar
     * 默认会传入当前的内容
     *
     * @param {content} 当前的内容
     *
     * @example
     *
     * content => (
     *  <div style={{ color: "red" }}>{content}</div>
     * )
     */
    contentBar: content => <div style={{ color: "red" }}>{content}</div>,
    contentBarWrapStyle: {},
    prevBtn: null,
    nextBtn: null,
    pagination: true
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

    const slideOn = props.slideOn === "random" ? "next" : props.slideOn;
    this.cameraRef = React.createRef();

    this.state = {
      current,
      nextIndex: 0,
      isAnimate: false,
      height: 0,
      isHover: false,
      animateType,
      slideOn
    };
  }

  componentDidMount() {
    this.getHeight();
  }

  getHeight = async () => {
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

  getSlideOn = () => {
    if (this.props.animateType === "random") {
      this.setState({
        slideOn: Math.random() > 0.5 ? "prev" : "next"
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
    this.getSlideOn();
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
    const {
      imgList,
      prefixCls,
      width,
      duration,
      easing,
      contentBar,
      contentBarWrapStyle,
      prevBtn,
      nextBtn,
      pagination
    } = this.props;
    const {
      current,
      height,
      isHover,
      nextIndex,
      isAnimate,
      animateType,
      slideOn
    } = this.state;

    return (
      <div className={prefixCls}>
        <div
          className={`${prefixCls}-container`}
          onMouseEnter={this.mouseEnter}
          onMouseLeave={this.mouseLeave}
          ref={this.cameraRef}
          style={{
            width,
            height
          }}
        >
          {height > 0 ? (
            <React.Fragment>
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
                contentBar={contentBar}
                contentBarWrapStyle={contentBarWrapStyle}
              />

              <ButtonContainer
                width={this.cameraRef.current.clientWidth}
                height={height}
                prefixCls={prefixCls}
                imgList={imgList}
                current={current}
                handleClick={this.handleClick}
                isHover={isHover}
                prevBtn={prevBtn}
                nextBtn={nextBtn}
              />

              {pagination && (
                <Pagination
                  prefixCls={prefixCls}
                  imgList={imgList}
                  current={current}
                  nextIndex={nextIndex}
                  handleClick={this.handleClick}
                />
              )}
            </React.Fragment>
          ) : null}
        </div>
      </div>
    );
  }
}
export default Camera;
