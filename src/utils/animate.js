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
      prev.start = {
        top: 0
      };
      prev.final = {
        top: -height
      };
      next.start = {
        top: height
      };
      next.final = {
        top: 0
      };
      break;

    case "scrollRight":
      prev.start = {
        left: 0
      };
      prev.final = {
        left: width
      };
      next.start = {
        left: -width
      };
      next.final = {
        left: 0
      };
      break;

    case "scrollBottom":
      prev.start = {
        top: 0
      };
      prev.final = {
        top: height
      };
      next.start = {
        top: -height
      };
      next.final = {
        top: 0
      };
      break;

    case "scrollLeft":
      prev.start = {
        left: 0
      };
      prev.final = {
        left: -width
      };
      next.start = {
        left: width
      };
      next.final = {
        left: 0
      };
      break;

    case "rotateYLeft":
      prev.start = {
        transformOrigin: "left center",
        transform: "rotateY(-90deg)"
      };
      prev.final = {
        transformOrigin: "left center"
      };
      next.start = {
        transformOrigin: "right center"
      };
      next.final = {
        transformOrigin: "right center",
        transform: "rotateY(90deg)"
      };
      break;

    case "rotateYRight":
      prev.start = {
        left: 0
      };
      prev.final = {
        left: -width
      };
      next.start = {
        left: width
      };
      next.final = {
        left: 0
      };
      break;

    default:
  }

  return {
    prev,
    next
  };
}

export function getTransformStyle(type, width, height) {
  const container = {
    entering: {
      transform: "rotateY(-90deg)"
    },
    entered: {}
  };

  let prev = { transform: `rotateY(90deg) translateZ(${width / 2}px)` };

  let next = { transform: `translateZ(${width / 2}px)` };

  switch (type) {
    case "rotateYLeft":
      break;

    case "rotateYRight":
      container.entering = { transform: "rotateY(90deg)" };
      prev = { transform: `rotateY(-90deg) translateZ(${width / 2}px)` };
      break;

    case "rotateXTop":
      container.entering = { transform: "rotateX(-90deg)" };
      prev = { transform: `rotateX(90deg)  translateZ(${height / 2}px)` };
      next = { transform: `translateZ(${height / 2}px)` };
      break;

    case "rotateXBottom":
      container.entering = { transform: "rotateX(90deg)" };
      prev = { transform: `rotateX(-90deg)  translateZ(${height / 2}px)` };
      next = { transform: `translateZ(${height / 2}px)` };
      break;

    default:
  }

  return {
    container,
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
      rows = 8;
      cols = 1;
      break;

    case "blindCurtainBottomLeft":
    case "blindCurtainBottomRight":
    case "blindCurtainSliceBottom":
      rows = 8;
      cols = 1;
      reverse = true;
      break;

    case "mosaic":
      rows = 4;
      cols = 5;
      break;

    case "stampede":
    case "mosaicRandom":
    case "mosaicSpiral":
      rows = 4;
      cols = 5;
      special = true;
      break;

    case "topLeftBottomRight":
    case "bottomRightTopLeft":
    case "bottomLeftTopRight":
    case "topRightBottomLeft":
      rows = 4;
      cols = 5;
      break;

    case "mosaicReverse":
      rows = 4;
      cols = 5;
      reverse = true;
      break;

    case "mosaicSpiralReverse":
      rows = 4;
      cols = 5;
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
      delay = 20;
      break;

    case "mosaic":
      delay = 50;
      fn = function style(el) {
        return {
          entering: { width: 0, height: 0 },
          entered: { width: el.width, height: el.height },
          delay: delay * el.index
        };
      };
      break;

    case "mosaicReverse":
      delay = 50;
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
          delay: delay * (el.rows * el.cols - el.index - 1)
        };
      };
      break;

    case "mosaicRandom":
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
          delay: 0
        };
      };
      break;

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

    case "topLeftBottomRight":
      fn = function style(el) {
        return {
          entering: { width: 0, height: 0 },
          entered: { width: el.width, height: el.height },
          delay: 200 * (el.row + el.col - 2)
        };
      };
      break;

    case "bottomRightTopLeft":
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
          delay: 200 * (el.rows + el.cols - el.row - el.col + 2)
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
          delay: 200 * (el.col + el.cols - el.row - 2)
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
          delay: 200 * (el.row + el.cols - el.col - 2)
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
          delay: 10 * idx
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

    default:
  }

  return {
    blocks,
    easing
  };
}
