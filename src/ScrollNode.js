import React from "react";

import PropTypes from "prop-types";

import { Transition, TransitionGroup } from "react-transition-group";

import getScrollStyle from "./utils/animate";

export default class AnimateNode extends React.PureComponent {
  static propTypes = {
    prefixCls: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number,
    imgList: PropTypes.arrayOf(PropTypes.object),
    current: PropTypes.number,
    nextIndex: PropTypes.number,
    animateType: PropTypes.string,
    duration: PropTypes.number,
    easing: PropTypes.string,
    animateOver: PropTypes.func
  };

  render() {
    const {
      prefixCls,
      width,
      height,
      imgList,
      current,
      nextIndex,
      animateType,
      duration,
      easing,
      animateOver
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

    animateOver();

    return (
      <TransitionGroup className={`${prefixCls}-target-img-container`}>
        <Transition appear in timeout={0}>
          {state => (
            <img
              className={`${prefixCls}-target-img`}
              src={imgList[current].img}
              style={{
                ...transitionPrevStyles[state],
                ...{
                  width,
                  height,
                  transition: `all  ${duration}ms ${easing}`
                }
              }}
              alt="prev img"
            />
          )}
        </Transition>

        <Transition appear in timeout={0}>
          {state => (
            <img
              className={`${prefixCls}-target-img`}
              src={imgList[nextIndex].img}
              style={{
                ...transitionNextStyles[state],
                ...{
                  width,
                  height,
                  transition: `all  ${duration}ms ${easing}`
                }
              }}
              alt="prev img"
            />
          )}
        </Transition>
      </TransitionGroup>
    );
  }
}
