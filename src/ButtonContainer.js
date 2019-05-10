import React from "react";

export default class ButtonContainer extends React.PureComponent {
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
    const { prefixCls, current, style } = this.props;
    return (
      <div className={`${prefixCls}-button-container`} style={style}>
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
