import React from "react";

import PropTypes from "prop-types";

import { Transition } from "react-transition-group";

import { getTransformStyle } from "./utils/animate";

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

    const scrollStyle = getTransformStyle(animateType, width, height);

    animateOver();

    return (
      <Transition appear in timeout={0}>
        {state => (
          <div
            className={`${prefixCls}-target-stage`}
            style={{
              ...scrollStyle.container[state],
              transformStyle: "preserve-3d",
              transition: `all  ${duration}ms ${easing}`
            }}
          >
            <img
              className={`${prefixCls}-target-img`}
              src={imgList[current].img}
              style={{
                width,
                height,
                ...scrollStyle.prev
              }}
              alt="prev img"
            />

            <img
              className={`${prefixCls}-target-img`}
              src={imgList[nextIndex].img}
              style={{
                width,
                height,
                ...scrollStyle.next
              }}
              alt="next img"
            />
          </div>
        )}
      </Transition>
    );
  }
}
