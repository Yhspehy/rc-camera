import React from "react";
import PropTypes from "prop-types";

import TargetContainer from "./TargetContainer";
import ButtonContainer from "./ButtonContainer";
import Pagination from "./Pagination";
import animateTypeList, { CSS3Animation } from "./utils/config";

let autoPlayTimeOut;

const animationList = [...animateTypeList, ...CSS3Animation];

const animationNum = animationList.length;

class Camera extends React.PureComponent {
  static propTypes = {
    width: PropTypes.string,
    aspectRatio: PropTypes.number,
    prefixCls: PropTypes.string,
    imgList: PropTypes.arrayOf(PropTypes.object),
    current: PropTypes.number,
    slideOn: PropTypes.string,
    animateType: PropTypes.string,
    duration: PropTypes.number,
    easing: PropTypes.string,
    contentBar: PropTypes.func,
    contentBarWrapStyle: PropTypes.object,
    prevBtn: PropTypes.node,
    nextBtn: PropTypes.node,
    pagination: PropTypes.bool,
    autoPlay: PropTypes.bool,
    autoPlayTime: PropTypes.number,
    showThumbnail: PropTypes.bool,
    onChange: PropTypes.func,
    onAnimationOver: PropTypes.func
  };

  static defaultProps = {
    width: "100%",
    aspectRatio: 0.5,
    prefixCls: "rc-camera",
    imgList: [],
    current: 0,
    slideOn: "random",
    animateType: "random",
    duration: 1000,
    easing: "cubic-bezier(0.77, 0, 0.175, 1)",
    contentBarWrapStyle: {},
    pagination: true,
    autoPlay: false,
    autoPlayTime: 5000,
    showThumbnail: true
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
    this.setAutoPlay();
  }

  getHeight = async () => {
    const { aspectRatio } = this.props;
    this.setState({
      height: this.cameraRef.current.clientWidth * aspectRatio
    });
  };

  getAnimateType = () => {
    const { animateType } = this.props;
    if (animateType === "random") {
      const randomIndex = Math.floor(Math.random() * animationNum);
      const _animateType = animationList[randomIndex];
      this.setState({
        animateType: _animateType
      });
    }
  };

  getSlideOn = () => {
    const { animateType } = this.props;

    if (animateType === "random") {
      this.setState({
        slideOn: Math.random() > 0.7 ? "prev" : "next"
      });
    }
  };

  setAutoPlay = () => {
    const { current } = this.state;
    const { autoPlay, imgList, autoPlayTime } = this.props;
    if (autoPlay) {
      autoPlayTimeOut = setTimeout(() => {
        const i = current === imgList.length - 1 ? 0 : current + 1;
        this.handleClick(i, true);
      }, autoPlayTime);
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

  // Each action to next img(include click and autoPlay)
  handleClick = (next, isAuto = false) => {
    const { isAnimate, current } = this.state;
    const { onChange } = this.props;
    if (isAnimate) {
      return;
    }
    if (!isAuto && autoPlayTimeOut) {
      clearTimeout(autoPlayTimeOut);
    }
    if (onChange) {
      onChange(current, next, isAuto);
    }
    this.getAnimateType();
    this.getSlideOn();
    this.setState({
      nextIndex: next,
      isAnimate: true
    });
  };

  // handle animation when it's over
  handleAnimate = (current, isAnimate) => {
    const { onAnimationOver } = this.props;
    this.setState(
      {
        current,
        isAnimate: !!isAnimate
      },
      () => {
        if (onAnimationOver) {
          onAnimationOver(current);
        }
        this.setAutoPlay();
      }
    );
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
      pagination,
      showThumbnail
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
                  showThumbnail={showThumbnail}
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
