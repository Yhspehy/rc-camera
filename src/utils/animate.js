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

  switch (type) {
    case "curtainTopLeft":
      rows = 1;
      cols = 12;
      reverse = false;
      break;

    case "curtainTopRight":
      rows = 1;
      cols = 12;
      reverse = true;
      break;

    case "curtainBottomLeft":
      rows = 1;
      cols = 12;
      reverse = false;
      break;

    case "curtainBottomRight":
      rows = 1;
      cols = 12;
      reverse = true;
      break;

    case "curtainSliceLeft":
      rows = 1;
      cols = 12;
      reverse = false;
      break;

    case "curtainSliceRight":
      rows = 1;
      cols = 12;
      reverse = true;
      break;

    case "blindCurtainTopLeft":
      rows = 12;
      cols = 1;
      reverse = false;
      break;

    case "blindCurtainBottomLeft":
      rows = 12;
      cols = 1;
      reverse = true;
      break;

    case "blindCurtainTopRight":
      rows = 12;
      cols = 1;
      reverse = false;
      break;

    case "blindCurtainBottomRight":
      rows = 12;
      cols = 1;
      reverse = true;
      break;

    case "blindCurtainSliceTop":
      rows = 12;
      cols = 1;
      reverse = false;
      break;

    case "blindCurtainSliceBottom":
      rows = 12;
      cols = 1;
      reverse = true;
      break;

    case "stampede":
      rows = 4;
      cols = 6;
      reverse = false;
      break;

    case "mosaic":
      rows = 4;
      cols = 6;
      reverse = false;
      break;

    default:
  }

  return {
    rows,
    cols,
    reverse
  };
}

export function getTransitionStyles(type) {
  let fn = null;
  let delay = 100;

  switch (type) {
    case "curtainTopLeft":
      fn = function style(el) {
        return {
          entering: { marginTop: -el.containerHeight },
          entered: { marginTop: 0 }
        };
      };
      break;

    case "curtainTopRight":
      fn = function style(el) {
        return {
          entering: { marginTop: -el.containerHeight },
          entered: { marginTop: 0 }
        };
      };
      break;
    case "curtainBottomLeft":
      fn = function style(el) {
        return {
          entering: { marginTop: el.containerHeight },
          entered: { marginTop: 0 }
        };
      };
      break;

    case "curtainBottomRight":
      fn = function style(el) {
        return {
          entering: { marginTop: el.containerHeight },
          entered: { marginTop: 0 }
        };
      };
      break;
    case "curtainSliceLeft":
      fn = function style(el) {
        return {
          entering: {
            marginTop:
              el.index % 2 === 0 ? -el.containerHeight : el.containerHeight
          },
          entered: { margintop: 0 }
        };
      };
      break;

    case "curtainSliceRight":
      fn = function style(el) {
        return {
          entering: {
            marginTop:
              el.index % 2 === 0 ? -el.containerHeight : el.containerHeight
          },
          entered: { margintop: 0 }
        };
      };
      break;

    case "blindCurtainTopLeft":
      fn = function style(el) {
        return {
          entering: { marginLeft: -el.containerWidth },
          entered: { marginLeft: 0 }
        };
      };
      break;

    case "blindCurtainBottomLeft":
      fn = function style(el) {
        return {
          entering: { marginLeft: -el.containerWidth },
          entered: { marginLeft: 0 }
        };
      };
      break;

    case "blindCurtainTopRight":
      fn = function style(el) {
        return {
          entering: { marginLeft: el.containerWidth },
          entered: { marginLeft: 0 }
        };
      };
      break;

    case "blindCurtainBottomRight":
      fn = function style(el) {
        return {
          entering: { marginLeft: el.containerWidth },
          entered: { marginLeft: 0 }
        };
      };
      break;

    case "blindCurtainSliceTop":
      fn = function style(el) {
        return {
          entering: {
            marginLeft:
              el.index % 2 === 0 ? -el.containerWidth : el.containerWidth
          },
          entered: { marginLeft: 0 }
        };
      };
      break;

    case "blindCurtainSliceBottom":
      fn = function style(el) {
        return {
          entering: {
            marginLeft:
              el.index % 2 === 0 ? -el.containerWidth : el.containerWidth
          },
          entered: { marginLeft: 0 }
        };
      };
      break;

    case "stampede":
      delay = 0;
      break;

    case "mosaic":
      delay = 50;
      fn = function style(el) {
        return {
          entering: { width: 0, height: 0 },
          entered: { width: el.width, height: el.height }
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
