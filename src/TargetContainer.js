import React from "react";
import PropTypes from "prop-types";

import { Transition, TransitionGroup } from "react-transition-group";
import getScrollStyle, { getAnimateFormat } from "./utils/animate";

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

  animateOver = () => {
    setTimeout(() => {
      this.props.handleAnimate(this.props.nextIndex, false);
    }, 1200);
  };

  /**
   * render ScrollTop、ScrollBottom、ScrollLeft、ScrollRight Node
   */
  renderScrollNode = () => {
    const {
      prefixCls,
      width,
      height,
      imgList,
      current,
      nextIndex,
      animateType
    } = this.props;

    const scrollStyle = getScrollStyle(animateType, width, height);
    const type = animateType.match(/scroll(.*)$/)[1].toLocaleLowerCase();
    const posType = type === "top" || type === "bottom" ? "top" : "left";

    const transitionPrevStyles = {
      entering: { [posType]: scrollStyle.prev.start },
      entered: { [posType]: scrollStyle.prev.final }
    };

    const transitionNextStyles = {
      entering: { [posType]: scrollStyle.next.start },
      entered: { [posType]: scrollStyle.next.final }
    };

    this.animateOver();

    return (
      <TransitionGroup className={`${prefixCls}-target-item-img-container`}>
        <Transition appear in timeout={0}>
          {state => (
            <img
              className={`${prefixCls}-target-item-img`}
              src={imgList[current].img}
              style={{
                ...transitionPrevStyles[state],
                ...{
                  width,
                  height,
                  transition: `all 1s ease-in-out`
                }
              }}
              alt="prev img"
            />
          )}
        </Transition>

        <Transition appear in timeout={0}>
          {state => (
            <img
              className={`${prefixCls}-target-item-img`}
              src={imgList[nextIndex].img}
              style={{
                ...transitionNextStyles[state],
                ...{
                  width,
                  height,
                  transition: `all 1s ease-in-out`
                }
              }}
              alt="prev img"
            />
          )}
        </Transition>
      </TransitionGroup>
    );
  };

  /**
   * render Animate Node
   */
  renderAnimateNode = () => {
    const {
      width,
      height,
      imgList,
      current,
      nextIndex,
      slideOn,
      animateType
    } = this.props;

    const imgBg =
      slideOn === "next" ? imgList[nextIndex].img : imgList[current].img;
    const { rows, cols, reverse } = getAnimateFormat(animateType);
    const blockNum = rows * cols;
    const blocks = [];

    // 计算取整中少计入的宽度
    const leftScrap = width - Math.floor(width / cols) * cols;
    // 计算取整中少计入的高度
    const topScrap = height - Math.floor(height / rows) * rows;
    let addLeft = 0;
    let addTop = 0;
    let topWidth = 0;
    let leftWidth = 0;

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

      blocks.push({
        index: i,
        rows,
        cols,
        reverse,
        reverseIndex: 0,
        width: Math.floor(width / cols) + addLeft + 1,
        height: Math.floor(height / rows) + addTop + 1,
        top: topWidth,
        left: leftWidth,
        transitionStyles: {
          entering: { marginTop: i % 2 === 0 ? -height : height },
          entered: { marginTop: 0 }
        }
      });

      leftWidth += Math.floor(width / cols) + addLeft;
      if (i % cols === cols - 1) {
        topWidth += Math.floor(height / rows) + addTop;
      }
    }

    this.animateOver();

    return (
      <TransitionGroup>
        {blocks.map((el, idx) => (
          <Transition key={idx} appear in timeout={0}>
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
                    transition: `all 1s ease-in-out`,
                    background: `${-el.left}px ${-el.top}px / ${width}px ${height}px  no-repeat url(${imgBg})`
                  },
                  ...el.transitionStyles[state]
                }}
              />
            )}
          </Transition>
        ))}
      </TransitionGroup>
    );
  };

  render() {
    const {
      prefixCls,
      height,
      width,
      imgList,
      current,
      isAnimate,
      slideOn,
      animateType
    } = this.props;

    let animateContainer = null;

    // 触发点击之后
    if (isAnimate) {
      if (slideOn === "next") {
        if (
          animateType === "scrollTop" ||
          animateType === "scrollRight" ||
          animateType === "scrollBottom" ||
          animateType === "scrollLeft"
        ) {
          animateContainer = this.renderScrollNode();
        } else {
          animateContainer = this.renderAnimateNode();
        }
      }
    }

    return (
      <div className={`${prefixCls}-target-item`}>
        {/* 默认图片 */}
        {imgList.map((el, idx) => (
          <img
            key={idx}
            className={`${prefixCls}-target-item-img`}
            style={{
              width,
              height,
              display: idx === current ? "block" : "none"
            }}
            src={el.img}
            alt="default img"
          />
        ))}

        {/* 动画容器 */}
        {animateContainer}

        {/* 图片底部内容 */}
        <div className={`${prefixCls}-target-item-content`}>
          {imgList[current].content}
        </div>
      </div>
    );
  }
}
