export default function getScrollStyle(type, width, height) {
  const style = {
    prev: {
      start: 0,
      final: 0
    },
    next: {
      start: 0,
      final: 0
    }
  };

  switch (type) {
    case "scrollTop":
      style.prev.start = 0;
      style.prev.final = -height;
      style.next.start = height;
      style.next.final = 0;
      break;

    case "scrollRight":
      style.prev.start = 0;
      style.prev.final = width;
      style.next.start = -width;
      style.next.final = 0;
      break;

    case "scrollBottom":
      style.prev.start = 0;
      style.prev.final = height;
      style.next.start = -height;
      style.next.final = 0;
      break;

    case "scrollLeft":
      style.prev.start = 0;
      style.prev.final = -width;
      style.next.start = width;
      style.next.final = 0;
      break;

    default:
  }

  return style;
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

    default:
  }

  return {
    rows,
    cols,
    reverse
  };
}

export function getTransitionStyles(type, index, width, height) {
  const style = {
    entering: null,
    entered: null
  };

  switch (type) {
    case "curtainTopLeft":
      style.entering = { marginTop: -height };
      style.entered = { marginTop: 0 };
      break;

    case "curtainTopRight":
      style.entering = { marginTop: -height };
      style.entered = { marginTop: 0 };
      break;
    case "curtainBottomLeft":
      style.entering = { marginTop: height };
      style.entered = { marginTop: 0 };
      break;

    case "curtainBottomRight":
      style.entering = { marginTop: height };
      style.entered = { marginTop: 0 };
      break;
    case "curtainSliceLeft":
      style.entering = { marginTop: index % 2 === 0 ? -height : height };
      style.entered = { marginTop: 0 };
      break;

    case "curtainSliceRight":
      style.entering = { marginTop: index % 2 === 0 ? -height : height };
      style.entered = { marginTop: 0 };
      break;

    case "blindCurtainTopLeft":
      style.entering = { marginLeft: -width };
      style.entered = { marginLeft: 0 };
      break;

    case "blindCurtainBottomLeft":
      style.entering = { marginLeft: -width };
      style.entered = { marginLeft: 0 };
      break;

    case "blindCurtainTopRight":
      style.entering = { marginLeft: width };
      style.entered = { marginLeft: 0 };
      break;

    case "blindCurtainBottomRight":
      style.entering = { marginLeft: width };
      style.entered = { marginLeft: 0 };
      break;

    case "blindCurtainSliceTop":
      style.entering = { marginLeft: index % 2 === 0 ? -width : width };
      style.entered = { marginLeft: 0 };
      break;

    case "blindCurtainSliceBottom":
      style.entering = { marginLeft: index % 2 === 0 ? -width : width };
      style.entered = { marginLeft: 0 };
      break;

    case "stampede":
      break;

    default:
  }

  return style;
}
