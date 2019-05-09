import React from "react";
import Animate from "rc-animate";
import PropTypes from "prop-types";
import classNames from "classnames";

class Camera extends React.Component {
  static propTypes = {
    prefixCls: PropTypes.string,
    imgList: PropTypes.arrayOf(PropTypes.object),
    current: PropTypes.number
  };

  static defaultProps = {
    prefixCls: "rc-camera",
    imgList: [],
    current: 0
  };

  constructor(props) {
    super(props);

    let current = props.current;
    if ("index" in props) {
      current = props.current;
    }

    this.state = {
      current
    };
  }

  render() {
    const { imgList, prefixCls } = this.props;
    const { current } = this.state;
    return (
      <div className={`${prefixCls}-container`}>
        div
        {/* 图片容器 */}
        <div className={`${prefixCls}-target`}>
          {imgList.map((el, idx) => (
            <div
              className={classNames(`${prefixCls}-target-item`, {
                [`${prefixCls}-current`]: idx === current
              })}
              key={idx}
            >
              {/* 图片 */}
              <img className={`${prefixCls}-target-img`} src={el.img} />

              {/* 图片底部内容 */}
              <div>{el.content}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
export default Camera;
