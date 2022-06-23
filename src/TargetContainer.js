import React from "react";
import PropTypes from "prop-types";

import ScrollNode from "./ScrollNode";
import TransformNode from "./TransformNode";
import AnimateNode from "./AnimateNode";
import Content from "./Content";

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
    animateType: PropTypes.string,
    duration: PropTypes.number,
    easing: PropTypes.string,
    contentBar: PropTypes.oneOfType([PropTypes.func, PropTypes.oneOf([null])]),
    contentBarWrapStyle: PropTypes.object
  };

  animateOver = (delay = 0) => {
    const { nextIndex, duration, handleAnimate } = this.props;
    setTimeout(() => {
      handleAnimate(nextIndex, false);
    }, duration + delay);
  };

  render() {
    const {
      prefixCls,
      height,
      width,
      imgList,
      current,
      duration,
      easing,
      isAnimate,
      slideOn,
      nextIndex,
      animateType,
      contentBar,
      contentBarWrapStyle
    } = this.props;

    let animateContainer = null;

    // 触发点击之后
    if (isAnimate) {
      if (
        animateType === "scrollTop" ||
        animateType === "scrollRight" ||
        animateType === "scrollBottom" ||
        animateType === "scrollLeft"
      ) {
        animateContainer = (
          <ScrollNode
            prefixCls={prefixCls}
            width={width}
            height={height}
            imgList={imgList}
            current={current}
            nextIndex={nextIndex}
            isAnimate={isAnimate}
            animateOver={this.animateOver}
            slideOn={slideOn}
            animateType={animateType}
            duration={duration}
            easing={easing}
          />
        );
      } else if (
        animateType === "rotateYLeft" ||
        animateType === "rotateYRight" ||
        animateType === "rotateXTop" ||
        animateType === "rotateXBottom"
      ) {
        animateContainer = (
          <TransformNode
            prefixCls={prefixCls}
            width={width}
            height={height}
            imgList={imgList}
            current={current}
            nextIndex={nextIndex}
            isAnimate={isAnimate}
            animateOver={this.animateOver}
            slideOn={slideOn}
            animateType={animateType}
            duration={duration}
            easing={easing}
          />
        );
      } else {
        animateContainer = (
          <AnimateNode
            prefixCls={prefixCls}
            width={width}
            height={height}
            imgList={imgList}
            current={current}
            nextIndex={nextIndex}
            isAnimate={isAnimate}
            animateOver={this.animateOver}
            slideOn={slideOn}
            animateType={animateType}
            duration={duration}
            easing={easing}
          />
        );
      }
    }

    return (
      <div className={`${prefixCls}-target`}>
        {imgList.map((el, idx) => (
          <img
            key={idx}
            className={`${prefixCls}-target-img`}
            style={{
              width,
              height,
              display: idx === current ? "block" : "none"
            }}
            src={el.img}
            alt="default img"
          />
        ))}

        {animateContainer}

        <Content
          prefixCls={prefixCls}
          imgList={imgList}
          isAnimate={isAnimate}
          contentBar={contentBar}
          current={current}
          duration={duration}
          contentBarWrapStyle={contentBarWrapStyle}
        />
      </div>
    );
  }
}
