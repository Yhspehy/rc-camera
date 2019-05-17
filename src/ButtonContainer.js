import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import getMainColor from "./utils/getMainColor";

export default class ButtonContainer extends React.PureComponent {
  static propTypes = {
    prefixCls: PropTypes.string,
    height: PropTypes.number,
    width: PropTypes.number,
    imgList: PropTypes.array,
    current: PropTypes.number,
    handleClick: PropTypes.func,
    isHover: PropTypes.bool,
    prevBtn: PropTypes.oneOfType([PropTypes.node, PropTypes.oneOf([null])]),
    nextBtn: PropTypes.oneOfType([PropTypes.node, PropTypes.oneOf([null])])
  };

  state = {
    prevBtnColor: "grey",
    nextBtnColor: "grey"
  };

  componentDidMount() {
    this._getMainColor(this.props.current);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.current !== this.props.current) {
      this._getMainColor(this.props.current);
    }
  }

  click = type => {
    const { imgList, current, handleClick } = this.props;
    let i = 0;
    if (type === "prev") {
      i = current === 0 ? imgList.length - 1 : current - 1;
    } else {
      i = current === imgList.length - 1 ? 0 : current + 1;
    }
    handleClick(i);
  };

  _getMainColor = async i => {
    const { imgList, height, width, prevBtn, nextBtn } = this.props;

    const prevPromise = prevBtn
      ? null
      : getMainColor(
          imgList[i].img,
          20,
          (height - 40) / 2,
          40,
          40,
          width,
          height
        );

    const nextPromise = nextBtn
      ? null
      : getMainColor(
          imgList[i].img,
          width - 20,
          (height - 40) / 2,
          40,
          40,
          width,
          height
        );

    Promise.all([prevPromise, nextPromise]).then(
      ([allPrevBtnColor, allNextBtnColor]) => {
        if (allPrevBtnColor) {
          const mainColor = allPrevBtnColor[0].color.split(",");

          this.setState({
            prevBtnColor: `rgb(${[
              255 - mainColor[0],
              255 - mainColor[1],
              255 - mainColor[2]
            ]})`
          });
        }

        if (allNextBtnColor) {
          const mainColor = allNextBtnColor[0].color.split(",");

          this.setState({
            nextBtnColor: `rgb(${[
              255 - mainColor[0],
              255 - mainColor[1],
              255 - mainColor[2]
            ]})`
          });
        }
      }
    );
  };

  renderPrevBtn = () => {
    const { prefixCls, prevBtn } = this.props;

    return (
      <div className={`${prefixCls}-button-wrap`}>
        {prevBtn ? (
          <div
            className={`${prefixCls}-button`}
            onClick={() => this.click("prev")}
          >
            {prevBtn}
          </div>
        ) : (
          <svg
            onClick={() => this.click("prev")}
            data-icon="angle-left"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 256 512"
            className={`${prefixCls}-button`}
          >
            <path
              fill={this.state.prevBtnColor}
              d="M31.7 239l136-136c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9L127.9 256l96.4 96.4c9.4 9.4 9.4 24.6 0 33.9L201.7 409c-9.4 9.4-24.6 9.4-33.9 0l-136-136c-9.5-9.4-9.5-24.6-.1-34z"
            />
          </svg>
        )}
      </div>
    );
  };

  renderNextBtn = () => {
    const { prefixCls, nextBtn } = this.props;
    return (
      <div className={`${prefixCls}-button-wrap`}>
        {nextBtn ? (
          <div
            className={`${prefixCls}-button`}
            onClick={() => this.click("prev")}
          >
            {nextBtn}
          </div>
        ) : (
          <svg
            onClick={() => this.click("next")}
            data-icon="angle-right"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 256 512"
            className={`${prefixCls}-button`}
          >
            <path
              fill={this.state.nextBtnColor}
              d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34z"
            />
          </svg>
        )}
      </div>
    );
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
        {this.renderPrevBtn()}
        {this.renderNextBtn()}
      </div>
    );
  }
}
