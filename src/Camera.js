import React from "react";
import PropTypes from "prop-types";

import TargetContainer from "./TargetContainer";
import ButtonContainer from "./ButtonContainer";

class Camera extends React.Component {
  static propTypes = {
    width: PropTypes.string,
    aspectRadio: PropTypes.number,
    prefixCls: PropTypes.string,
    imgList: PropTypes.arrayOf(PropTypes.object),
    current: PropTypes.number,
    slideOn: PropTypes.string,
    animateType: PropTypes.string
  };

  static defaultProps = {
    width: "100%",
    aspectRadio: 0.5,
    prefixCls: "rc-camera",
    imgList: [],
    current: 0,
    slideOn: "next",
    animateType: "scrollTop"
  };

  constructor(props) {
    super(props);

    let current = props.current;
    if ("index" in props) {
      current = props.current;
    }

    if (current + 1 > props.imgList.length) {
      // console.warn("current大于imgList长度，将默认显示第一张图片");
      current = 0;
    }

    this.cameraRef = React.createRef();

    this.state = {
      current,
      nextIndex: 0,
      isAnimate: false,
      height: 0,
      isHover: false
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

  handleClick = next => {
    const { isAnimate } = this.state;
    if (isAnimate) {
      return;
    }
    this.setState({
      nextIndex: next,
      isAnimate: true
    });
  };

  handleAnimate = (c, a) => {
    this.setState({
      current: c,
      isAnimate: !!a
    });
  };

  render() {
    const { imgList, prefixCls, width, slideOn, animateType } = this.props;
    const { current, height, isHover, nextIndex, isAnimate } = this.state;

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
                  height={height}
                  imgList={imgList}
                  current={current}
                  nextIndex={nextIndex}
                  isAnimate={isAnimate}
                  handleAnimate={this.handleAnimate}
                  slideOn={slideOn}
                  animateType={animateType}
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
