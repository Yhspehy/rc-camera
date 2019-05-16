import shuffle from "./shuffle";

export default function getScrollStyle(type, width, height) {
  const prev = {
    start: 0,
    final: 0
  };
  const next = {
    start: 0,
    final: 0
  };

  switch (type) {
    case "scrollTop":
      prev.start = 0;
      prev.final = -height;
      next.start = height;
      next.final = 0;
      break;

    case "scrollRight":
      prev.start = 0;
      prev.final = width;
      next.start = -width;
      next.final = 0;
      break;

    case "scrollBottom":
      prev.start = 0;
      prev.final = height;
      next.start = -height;
      next.final = 0;
      break;

    case "scrollLeft":
      prev.start = 0;
      prev.final = -width;
      next.start = width;
      next.final = 0;
      break;

    default:
  }

  return {
    prev,
    next
  };
}

export function getAnimateFormat(type) {
  let rows = 1;
  let cols = 12;
  let reverse = false;
  let special = false;

  switch (type) {
    case "simpleFade":
      rows = 1;
      cols = 1;
      break;

    case "curtainTopLeft":
    case "curtainBottomLeft":
    case "curtainSliceLeft":
      break;

    case "curtainTopRight":
    case "curtainBottomRight":
    case "curtainSliceRight":
      reverse = true;
      break;

    case "blindCurtainTopLeft":
    case "blindCurtainTopRight":
    case "blindCurtainSliceTop":
      rows = 12;
      cols = 1;
      break;

    case "blindCurtainBottomLeft":
    case "blindCurtainBottomRight":
    case "blindCurtainSliceBottom":
      rows = 12;
      cols = 1;
      reverse = true;
      break;

    case "mosaic":
      rows = 4;
      cols = 6;
      break;

    case "stampede":
    case "mosaicRandom":
    case "mosaicSpiral":
    case "topLeftBottomRight":
    case "bottomRightTopLeft":
    case "bottomLeftTopRight":
    case "topRightBottomLeft":
      rows = 4;
      cols = 6;
      special = true;
      break;

    case "mosaicReverse":
      rows = 4;
      cols = 6;
      reverse = true;
      break;

    case "mosaicSpiralReverse":
      rows = 4;
      cols = 6;
      special = true;
      reverse = true;
      break;
    default:
  }

  return {
    rows,
    cols,
    reverse,
    special
  };
}

export function getTransitionStyles(type) {
  let fn = null;
  let delay = 100;

  switch (type) {
    case "simpleFade":
      fn = function style() {
        return {
          entering: { opacity: 0 },
          entered: { opacity: 1 },
          delay: 0
        };
      };
      break;

    case "curtainTopLeft":
    case "curtainTopRight":
      fn = function style(el) {
        return {
          entering: { marginTop: -el.containerHeight },
          entered: { marginTop: 0 },
          delay: el.reverse
            ? delay * (el.rows * el.cols - el.index - 1)
            : delay * el.index
        };
      };
      break;

    case "curtainBottomLeft":
    case "curtainBottomRight":
      fn = function style(el) {
        return {
          entering: { marginTop: el.containerHeight },
          entered: { marginTop: 0 },
          delay: el.reverse
            ? delay * (el.rows * el.cols - el.index - 1)
            : delay * el.index
        };
      };
      break;

    case "curtainSliceLeft":
    case "curtainSliceRight":
      fn = function style(el) {
        return {
          entering: {
            marginTop:
              el.index % 2 === 0 ? -el.containerHeight : el.containerHeight
          },
          entered: { margintop: 0 },
          delay: el.reverse
            ? delay * (el.rows * el.cols - el.index - 1)
            : delay * el.index
        };
      };
      break;

    case "blindCurtainTopLeft":
    case "blindCurtainBottomLeft":
      fn = function style(el) {
        return {
          entering: { marginLeft: -el.containerWidth },
          entered: { marginLeft: 0 },
          delay: el.reverse
            ? delay * (el.rows * el.cols - el.index - 1)
            : delay * el.index
        };
      };
      break;

    case "blindCurtainTopRight":
    case "blindCurtainBottomRight":
      fn = function style(el) {
        return {
          entering: { marginLeft: el.containerWidth },
          entered: { marginLeft: 0 },
          delay: el.reverse
            ? delay * (el.rows * el.cols - el.index - 1)
            : delay * el.index
        };
      };
      break;

    case "blindCurtainSliceTop":
    case "blindCurtainSliceBottom":
      fn = function style(el) {
        return {
          entering: {
            marginLeft:
              el.index % 2 === 0 ? -el.containerWidth : el.containerWidth
          },
          entered: { marginLeft: 0 },
          delay: el.reverse
            ? delay * (el.rows * el.cols - el.index - 1)
            : delay * el.index
        };
      };
      break;

    case "stampede":
      delay = 0;
      break;

    case "mosaic":
    case "topLeftBottomRight":
      delay = type === "mosaic" ? 50 : 100;
      fn = function style(el) {
        return {
          entering: { width: 0, height: 0 },
          entered: { width: el.width, height: el.height },
          delay: el.reverse
            ? delay * (el.rows * el.cols - el.index - 1)
            : delay * el.index
        };
      };
      break;

    case "mosaicReverse":
    case "bottomRightTopLeft":
      delay = type === "mosaicReverse" ? 50 : 100;
      fn = function style(el) {
        return {
          entering: {
            width: 0,
            height: 0,
            marginTop: el.height,
            marginLeft: el.width
          },
          entered: {
            width: el.width,
            height: el.height,
            marginTop: 0,
            marginLeft: 0
          },
          delay: el.reverse
            ? delay * (el.rows * el.cols - el.index - 1)
            : delay * el.index
        };
      };
      break;

    case "mosaicRandom":
    case "mosaicSpiral":
    case "mosaicSpiralReverse":
      delay = 50;
      fn = function style(el) {
        return {
          entering: {
            width: 0,
            height: 0,
            marginTop: el.height * 0.5,
            marginLeft: el.width * 0.5
          },
          entered: {
            width: el.width,
            height: el.height,
            marginTop: 0,
            marginLeft: 0
          },
          delay: el.reverse
            ? delay * (el.rows * el.cols - el.index - 1)
            : delay * el.index
        };
      };
      break;

    case "bottomLeftTopRight":
      fn = function style(el) {
        return {
          entering: {
            width: 0,
            height: 0,
            marginTop: el.height,
            marginLeft: -el.width
          },
          entered: {
            width: el.width,
            height: el.height,
            marginTop: 0,
            marginLeft: 0
          },
          delay: el.reverse
            ? delay * (el.rows * el.cols - el.index - 1)
            : delay * el.index
        };
      };
      break;

    case "topRightBottomLeft":
      fn = function style(el) {
        return {
          entering: {
            width: 0,
            height: 0,
            marginTop: -el.height,
            marginLeft: el.width
          },
          entered: {
            width: el.width,
            height: el.height,
            marginTop: 0,
            marginLeft: 0
          },
          delay: el.reverse
            ? delay * (el.rows * el.cols - el.index - 1)
            : delay * el.index
        };
      };
      break;

    default:
  }

  return {
    delay,
    transitonStyleFn: fn
  };
}

export function specialAnimate(type, blocks) {
  let easing = "cubic-bezier(0.77, 0, 0.175, 1)";
  const rows = blocks[0].rows;
  const cols = blocks[0].cols;
  switch (type) {
    case "stampede": {
      const shuffleArr = shuffle([...Array(blocks.length).keys()]);
      blocks.forEach((el, idx) => {
        el.transitionStyles = {
          entering: {
            width: 0,
            height: 0,
            marginTop: blocks[shuffleArr[idx]].top - el.top,
            marginLeft: blocks[shuffleArr[idx]].left - el.left
          },
          entered: {
            width: el.width,
            height: el.height,
            marginTop: 0,
            marginLeft: 0
          },
          delay: 0
        };
      });
      easing = "ease-in-out";
      break;
    }

    case "mosaicRandom": {
      const shuffleArr = shuffle([...Array(blocks.length).keys()]);
      blocks.forEach((el, idx) => {
        el.transitionStyles.delay = 50 * shuffleArr[idx];
      });
      break;
    }

    case "mosaicSpiral": {
      const rows2 = rows / 2;
      let x;
      let y;
      let z;
      let n = 0;
      for (z = 0; z < rows2; z++) {
        y = z;
        for (x = z; x < cols - z - 1; x++) {
          blocks[y * cols + x].transitionStyles.delay = 50 * n;
          n++;
        }
        x = cols - z - 1;
        for (y = z; y < rows - z - 1; y++) {
          blocks[y * cols + x].transitionStyles.delay = 50 * n;
          n++;
        }
        y = rows - z - 1;
        for (x = cols - z - 1; x > z; x--) {
          blocks[y * cols + x].transitionStyles.delay = 50 * n;
          n++;
        }
        x = z;
        for (y = rows - z - 1; y > z; y--) {
          blocks[y * cols + x].transitionStyles.delay = 50 * n;
          n++;
        }
      }
      break;
    }

    case "mosaicSpiralReverse": {
      const rows2 = rows / 2;
      let x;
      let y;
      let z;
      let n = blocks.length - 1;
      for (z = 0; z < rows2; z++) {
        y = z;
        for (x = z; x < cols - z - 1; x++) {
          blocks[y * cols + x].transitionStyles.delay = 50 * n;
          n--;
        }
        x = cols - z - 1;
        for (y = z; y < rows - z - 1; y++) {
          blocks[y * cols + x].transitionStyles.delay = 50 * n;
          n--;
        }
        y = rows - z - 1;
        for (x = cols - z - 1; x > z; x--) {
          blocks[y * cols + x].transitionStyles.delay = 50 * n;
          n--;
        }
        x = z;
        for (y = rows - z - 1; y > z; y--) {
          blocks[y * cols + x].transitionStyles.delay = 50 * n;
          n--;
        }
      }
      break;
    }

    case "topLeftBottomRight": {
      const arr = [];

      for (let y = 0; y < rows; y++)
        for (let x = 0; x < cols; x++) {
          arr.push(x + y);
        }

      blocks.forEach((el, idx) => {
        el.transitionStyles.delay = 200 * arr[idx];
      });
      break;
    }

    case "bottomRightTopLeft": {
      const arr = [];

      for (let y = 0; y < rows; y++)
        for (let x = 0; x < cols; x++) {
          arr.push(cols + rows - x - y);
        }

      blocks.forEach((el, idx) => {
        el.transitionStyles.delay = 200 * arr[idx];
      });
      break;
    }

    case "bottomLeftTopRight": {
      const arr = [];

      for (let y = 0; y < rows; y++)
        for (let x = 0; x < cols; x++) {
          arr.push(x + cols - y);
        }

      blocks.forEach((el, idx) => {
        el.transitionStyles.delay = 200 * arr[idx];
      });
      break;
    }

    case "topRightBottomLeft": {
      const arr = [];

      for (let y = 0; y < rows; y++)
        for (let x = 0; x < cols; x++) {
          arr.push(y + cols - x);
        }

      blocks.forEach((el, idx) => {
        el.transitionStyles.delay = 200 * arr[idx];
      });
      break;
    }

    default:
  }

  return {
    blocks,
    easing
  };
}
