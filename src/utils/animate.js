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
    case "curtainSliceLeft":
      rows = 1;
      cols = 12;
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
