import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

export default class Pagination extends React.PureComponent {
  static propTypes = {
    prefixCls: PropTypes.string,
    imgList: PropTypes.array,
    current: PropTypes.number,
    handleClick: PropTypes.func,
    nextIndex: PropTypes.number
  };

  render() {
    const { prefixCls, imgList, current, handleClick, nextIndex } = this.props;

    const index = current === nextIndex ? current : nextIndex;
    return (
      <div className={`${prefixCls}-pagination`}>
        {imgList.map((e, idx) => (
          <div
            className={classNames(`${prefixCls}-pagination-item`, {
              [`${prefixCls}-pagination-current`]: idx === index
            })}
            key={idx}
            onClick={() => handleClick(idx)}
          />
        ))}
      </div>
    );
  }
}
