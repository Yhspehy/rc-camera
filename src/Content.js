import React from "react";
import PropTypes from "prop-types";

import { Transition } from "react-transition-group";

export default class Content extends React.PureComponent {
  static propTypes = {
    prefixCls: PropTypes.string,
    imgList: PropTypes.arrayOf(PropTypes.object),
    isAnimate: PropTypes.bool,
    current: PropTypes.number,
    contentBar: PropTypes.oneOfType([PropTypes.func, PropTypes.oneOf([null])]),
    contentBarWrapStyle: PropTypes.object
  };

  state = {
    contentTransition: {
      entering: { opacity: 1, transform: "translateY(0px)" },
      entered: { opacity: 1, transform: "translateY(0px)" },
      exiting: { opacity: 0, transform: "translateY(0px)" },
      exited: { opacity: 0, transform: "translateY(100%)" }
    }
  };
  render() {
    const {
      prefixCls,
      isAnimate,
      contentBar,
      imgList,
      current,
      contentBarWrapStyle
    } = this.props;

    const { contentTransition } = this.state;

    const contentBarNode = contentBar
      ? contentBar(imgList[current].content)
      : null;

    return (
      <Transition in={!isAnimate} timeout={0}>
        {state => (
          <div
            className={`${prefixCls}-target-item-content-wrap`}
            style={{ ...contentTransition[state], ...contentBarWrapStyle }}
          >
            {contentBar ? contentBarNode : imgList[current].content}
          </div>
        )}
      </Transition>
    );
  }
}
