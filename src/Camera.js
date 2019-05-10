import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Motion, spring } from "react-motion";

import TargetContainer from "./TargetContainer";
import ButtonContainer from "./ButtonContainer";

class Camera extends React.Component {
  static propTypes = {
    width: PropTypes.string,
    aspectRadio: PropTypes.number,
    prefixCls: PropTypes.string,
    imgList: PropTypes.arrayOf(PropTypes.object),
    current: PropTypes.number
  };

  static defaultProps = {
    width: "100%",
    aspectRadio: 0.5,
    prefixCls: "rc-camera",
    imgList: [],
    current: 0
  };

  constructor(props) {
    super(props);

    let current = props.current;
    if ("index" in props) {
      current = props.current;
    }

    if (current + 1 > props.imgList.length) {
      console.warn("current大于imgList长度，将默认显示第一张图片");
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
    this.setState({
      height: this.cameraRef.current.clientWidth * this.props.aspectRadio
    });
  }

  mouseEnter = e => {
    this.setState({
      isHover: true
    });
  };

  mouseLeave = e => {
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
    const { imgList, prefixCls, width } = this.props;
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
                  imgList={imgList}
                  current={current}
                  nextIndex={nextIndex}
                  isAnimate={isAnimate}
                  handleAnimate={this.handleAnimate}
                />
              ) : (
                <div> 初始化中....</div>
              )}
            </div>

            <Motion style={{ opacity: spring(isHover ? 1 : 0) }}>
              {({ opacity }) => (
                <div className={`${prefixCls}-button-wrap`}>
                  {opacity ? (
                    <ButtonContainer
                      prefixCls={prefixCls}
                      imgCount={imgList.length}
                      current={current}
                      handleClick={this.handleClick}
                      style={{ opacity }}
                    />
                  ) : null}
                </div>
              )}
            </Motion>
          </div>
          {/* <ButtonContainer
            prefixCls={prefixCls}
            imgCount={imgList.length}
            current={current}
            handleClick={this.handleClick}
          /> */}
        </div>
      </div>
    );
  }
}
export default Camera;
