import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

export default class ButtonContainer extends React.PureComponent {
  static propTypes = {
    prefixCls: PropTypes.string,
    imgCount: PropTypes.number,
    current: PropTypes.number,
    handleClick: PropTypes.func,
    isHover: PropTypes.bool
  };

  click = type => {
    const { imgCount, current, handleClick } = this.props;
    let i = 0;
    if (type === "prev") {
      i = current === 0 ? imgCount - 1 : current - 1;
    } else {
      i = current === imgCount - 1 ? 0 : current + 1;
    }
    handleClick(i);
  };

  render() {
    const { prefixCls, isHover } = this.props;
    return (
      <div
        className={classNames(`${prefixCls}-button-container`, {
          [`${prefixCls}-hidden`]: !isHover,
          [`${prefixCls}-show`]: isHover
        })}
      >
        <button
          className={`${prefixCls}-button`}
          onClick={() => this.click("prev")}
        >
          上一页
        </button>
        <button
          className={`${prefixCls}-button`}
          onClick={() => this.click("next")}
        >
          下一页
        </button>
      </div>
    );
  }
}
