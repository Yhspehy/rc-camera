import React from "react";

import PropTypes from "prop-types";

import { Motion, spring } from "react-motion";

export default class TargetContainre extends React.PureComponent {
  static propTypes = {
    prefixCls: PropTypes.string,
    height: PropTypes.number,
    imgList: PropTypes.arrayOf(PropTypes.object),
    current: PropTypes.number,
    nextIndex: PropTypes.number,
    isAnimate: PropTypes.bool,
    handleAnimate: PropTypes.func,
    slideOn: PropTypes.string,
    animateType: PropTypes.string
  };

  // shouldComponentUpdate(nextProps) {
  //   const { isAnimate, current, nextIndex } = this.props;

  //   if (current !== nextProps.nextIndex && nextProps.isAnimate) {
  //     return true;
  //   }
  //   return false;
  // }

  render() {
    const {
      prefixCls,
      height,
      imgList,
      current,
      nextIndex,
      isAnimate,
      handleAnimate,
      slideOn,
      animateType
    } = this.props;

    const el = isAnimate ? imgList[nextIndex] : imgList[current];

    let animateContainer = null;

    let animateDiv = (
      <img className={`${prefixCls}-target-item-img`} src={el.img} alt="" />
    );

    // 触发点击之后
    if (isAnimate) {
      setTimeout(() => {
        handleAnimate(nextIndex, false);
      }, 1000);

      animateDiv = (
        <img className={`${prefixCls}-target-item-img`} src={el.img} alt="" />
      );

      if (slideOn === "next") {
        if (animateType === "scrollTop") {
          animateContainer = (
            <div className={`${prefixCls}-target-item-img-container`}>
              {/* prev img */}
              <Motion
                defaultStyle={{ top: 0 }}
                style={{ top: spring(-height) }}
              >
                {({ top }) => (
                  <img
                    className={`${prefixCls}-target-item-img`}
                    src={imgList[current].img}
                    style={{ top }}
                    alt="prev img"
                  />
                )}
              </Motion>

              {/* next img */}
              <Motion defaultStyle={{ top: height }} style={{ top: spring(0) }}>
                {({ top }) => (
                  <img
                    className={`${prefixCls}-target-item-img`}
                    src={imgList[nextIndex].img}
                    style={{ top }}
                    alt="next img"
                  />
                )}
              </Motion>
            </div>
          );
        }
      }
    }

    return (
      <div className={`${prefixCls}-target-item`}>
        {/* 图片 */}
        {animateDiv}
        {animateContainer}

        {/* 图片底部内容 */}
        <div className={`${prefixCls}-target-item-content`}>{el.content}</div>
      </div>
    );
  }
}
