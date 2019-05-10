import React from "react";

export default class TargetContainre extends React.Component {
  shouldComponentUpdate(nextProps) {
    const { isAnimate, current, nextIndex } = this.props;

    if (current !== nextProps.nextIndex && nextProps.isAnimate) {
      return true;
    }
    return false;
  }

  render() {
    const {
      prefixCls,
      imgList,
      current,
      nextIndex,
      isAnimate,
      handleAnimate
    } = this.props;

    const el = isAnimate ? imgList[nextIndex] : imgList[current];

    if (isAnimate) {
      setTimeout(() => {
        handleAnimate(nextIndex, false);
      }, 1000);
    }

    return (
      <div className={`${prefixCls}-target-item`}>
        {/* 图片 */}
        <img className={`${prefixCls}-target-item-img`} src={el.img} alt="" />

        {/* 图片底部内容 */}
        <div className={`${prefixCls}-target-item-content`}>{el.content}</div>
      </div>
    );
  }
}
