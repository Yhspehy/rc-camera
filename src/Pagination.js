import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Transition } from "react-transition-group";

export default class Pagination extends React.PureComponent {
  static propTypes = {
    prefixCls: PropTypes.string,
    imgList: PropTypes.array,
    current: PropTypes.number,
    handleClick: PropTypes.func,
    nextIndex: PropTypes.number,
    showThumbnail: PropTypes.bool
  };

  state = {
    i: -1
  };

  setI = (i = -1) => {
    this.setState({
      i
    });
  };

  render() {
    const {
      prefixCls,
      imgList,
      current,
      handleClick,
      nextIndex,
      showThumbnail
    } = this.props;

    const i = this.state.i;

    const index = current === nextIndex ? current : nextIndex;

    const transitionStyles = {
      entering: { opacity: 0, display: "block" },
      entered: { opacity: 1, display: "block" },
      exiting: { opacity: 0, display: "block" },
      exited: { opacity: 0, display: "none" }
    };

    return (
      <div className={`${prefixCls}-pagination`}>
        {imgList.map((el, idx) => (
          <div
            className={classNames(`${prefixCls}-pagination-item`, {
              [`${prefixCls}-pagination-current`]: idx === index
            })}
            key={idx}
            onClick={() => handleClick(idx)}
            onMouseEnter={() => this.setI(idx)}
            onMouseLeave={this.setI}
          >
            {showThumbnail ? (
              <Transition
                in={idx === i}
                timeout={{
                  appear: 200,
                  enter: 0,
                  exit: 200
                }}
                appear
              >
                {state => (
                  <img
                    src={el.thumb}
                    className={`${prefixCls}-pagination-thumbnail`}
                    style={transitionStyles[state]}
                    alt="thumbnail img"
                  />
                )}
              </Transition>
            ) : null}
          </div>
        ))}
      </div>
    );
  }
}
