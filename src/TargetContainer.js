import React from "react";
import PropTypes from "prop-types";

import { Motion, spring } from "react-motion";
import { getScrollStyle } from "./utils/animate";

export default class TargetContainre extends React.PureComponent {
  static propTypes = {
    prefixCls: PropTypes.string,
    width: PropTypes.number,
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
      width,
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

    const defaultImg = (
      <img className={`${prefixCls}-target-item-img`} src={el.img} alt="" />
    );

    // 触发点击之后
    if (isAnimate) {
      setTimeout(() => {
        handleAnimate(nextIndex, false);
      }, 1000);

      if (slideOn === "next") {
        if (
          animateType === "scrollTop" ||
          animateType === "scrollRight" ||
          animateType === "scrollBottom" ||
          animateType === "scrollLeft"
        ) {
          const scrollStyle = getScrollStyle(animateType, width, height);
          const type = animateType.match(/scroll(.*)$/)[1].toLocaleLowerCase();
          const posType = type === "top" || type === "bottom" ? "top" : "left";
          animateContainer = (
            <div className={`${prefixCls}-target-item-img-container`}>
              {/* prev img */}
              <Motion
                defaultStyle={{ [posType]: scrollStyle.prev.start }}
                style={{ [posType]: spring(scrollStyle.prev.final) }}
              >
                {pos => (
                  <img
                    className={`${prefixCls}-target-item-img`}
                    src={imgList[current].img}
                    style={pos}
                    alt="prev img"
                  />
                )}
              </Motion>

              {/* next img */}
              <Motion
                defaultStyle={{ [posType]: scrollStyle.next.start }}
                style={{ [posType]: spring(scrollStyle.next.final) }}
              >
                {pos => (
                  <img
                    className={`${prefixCls}-target-item-img`}
                    src={imgList[nextIndex].img}
                    style={pos}
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
        {defaultImg}
        {animateContainer}

        {/* 图片底部内容 */}
        <div className={`${prefixCls}-target-item-content`}>{el.content}</div>
      </div>
    );
  }
}
