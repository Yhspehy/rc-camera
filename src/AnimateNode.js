import React from "react";

import PropTypes from "prop-types";

import { Transition, TransitionGroup } from "react-transition-group";

import {
  getAnimateFormat,
  getTransitionStyles,
  specialAnimate
} from "./utils/animate";

export default class AnimateNode extends React.PureComponent {
  static propTypes = {
    prefixCls: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number,
    imgList: PropTypes.arrayOf(PropTypes.object),
    current: PropTypes.number,
    nextIndex: PropTypes.number,
    isAnimate: PropTypes.bool,
    slideOn: PropTypes.string,
    animateType: PropTypes.string,
    duration: PropTypes.number,
    easing: PropTypes.string,
    animateOver: PropTypes.func
  };

  state = {
    slideOnTransitionHook: {
      prev: {
        entering: "entered",
        entered: "entering",
        exiting: "exiting",
        exited: "exited"
      },
      next: {
        entering: "entering",
        entered: "entered",
        exiting: "exiting",
        exited: "exited"
      }
    }
  };

  render() {
    const {
      prefixCls,
      width,
      height,
      imgList,
      current,
      nextIndex,
      slideOn,
      animateType,
      duration,
      easing,
      animateOver
    } = this.props;

    const { slideOnTransitionHook } = this.state;

    const imgBg =
      slideOn === "next" ? imgList[nextIndex].img : imgList[current].img;
    const { rows, cols, reverse, special } = getAnimateFormat(animateType);
    const blockNum = rows * cols;
    let blocks = [];

    // 计算取整中少计入的宽度
    const leftScrap = width - Math.floor(width / cols) * cols;
    // 计算取整中少计入的高度
    const topScrap = height - Math.floor(height / rows) * rows;
    let addLeft = 0;
    let addTop = 0;
    let topWidth = 0;
    let leftWidth = 0;
    let finalEasing = easing;
    // 过渡style计算函数
    const { delay, transitonStyleFn } = getTransitionStyles(animateType);

    for (let i = 0; i < blockNum; i++) {
      if (i % cols < leftScrap) {
        addLeft = 1;
      } else {
        addLeft = 0;
      }
      if (i % cols === 0) {
        leftWidth = 0;
      }
      if (Math.floor(i / cols) < topScrap) {
        addTop = 1;
      } else {
        addTop = 0;
      }

      const elWidth = Math.floor(width / cols) + addLeft;
      const elHeight = Math.floor(height / rows) + addTop;

      const baseElObj = {
        containerWidth: width,
        containerHeight: height,
        index: i,
        rows,
        cols,
        reverse,
        width: elWidth,
        height: elHeight,
        top: topWidth,
        left: leftWidth
      };

      blocks.push({
        ...baseElObj,
        ...{
          transitionStyles: transitonStyleFn && transitonStyleFn(baseElObj)
        }
      });

      leftWidth += Math.floor(width / cols) + addLeft;
      if (i % cols === cols - 1) {
        topWidth += Math.floor(height / rows) + addTop;
      }
    }

    if (special) {
      const specialObj = specialAnimate(animateType, blocks);
      blocks = specialObj.blocks;
      finalEasing = specialObj.easing;
    }

    // 触发动画结束事件
    animateOver(blockNum * delay);

    return (
      <div className={`${prefixCls}-target-img-container`}>
        <TransitionGroup component={null}>
          {blocks.map((el, idx) => (
            <Transition key={idx} appear in timeout={el.transitionStyles.delay}>
              {state => (
                <div
                  style={{
                    ...{
                      position: "absolute",
                      top: el.top,
                      left: el.left,
                      width: el.width,
                      height: el.height,
                      zIndex: 1001,
                      transition: `all ${duration}ms ${finalEasing}`,
                      background: `${-el.left}px ${-el.top}px / ${width}px ${height}px  no-repeat url(${imgBg})`
                    },
                    ...el.transitionStyles[
                      slideOnTransitionHook[slideOn][state]
                    ]
                  }}
                />
              )}
            </Transition>
          ))}
        </TransitionGroup>

        {slideOn === "prev" ? (
          <img
            className={`${prefixCls}-target-img`}
            style={{
              width,
              height
            }}
            src={imgList[nextIndex].img}
            alt="default img"
          />
        ) : null}
      </div>
    );
  }
}
