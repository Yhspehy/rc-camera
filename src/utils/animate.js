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

    default:
  }

  return style;
}
