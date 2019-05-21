import React from "react";
import PropTypes from "prop-types";

import { Transition } from "react-transition-group";

export default class Content extends React.PureComponent {
  static propTypes = {
    prefixCls: PropTypes.string,
    imgList: PropTypes.arrayOf(PropTypes.object),
    isAnimate: PropTypes.bool,
    current: PropTypes.number,
    duration: PropTypes.number,
    contentBar: PropTypes.oneOfType([PropTypes.func, PropTypes.oneOf([null])]),
    contentBarWrapStyle: PropTypes.object
  };

  state = {
    contentTransition: {
      entering: { opacity: 1, transform: "translateY(100%)" },
      entered: { opacity: 1, transform: "translateY(0px)" },
      exiting: { opacity: 0, transform: "translateY(0px)" },
      exited: { opacity: 0, transform: "translateY(100%)" }
    }
  };

  renderContentBarNode = () => {
    const { contentBar, imgList, current } = this.props;

    return contentBar(imgList[current].content);
  };

  render() {
    const {
      prefixCls,
      isAnimate,
      contentBar,
      imgList,
      current,
      duration,
      contentBarWrapStyle
    } = this.props;

    const { contentTransition } = this.state;

    return (
      <React.Fragment>
        {imgList[current].content ? (
          <Transition
            in={!isAnimate}
            timeout={{
              appear: 0,
              enter: 0,
              exit: duration
            }}
            appear
          >
            {state => (
              <div
                className={`${prefixCls}-target-content-wrap`}
                style={{ ...contentTransition[state], ...contentBarWrapStyle }}
              >
                {contentBar
                  ? this.renderContentBarNode()
                  : imgList[current].content}
              </div>
            )}
          </Transition>
        ) : null}
      </React.Fragment>
    );
  }
}
