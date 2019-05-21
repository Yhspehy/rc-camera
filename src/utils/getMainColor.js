/**
 * Copy from rgbaster.js(https://github.com/briangonzalez/rgbaster.js/blob/master/src/helpers.ts)
 *
 * 修改了部分内容，新增了对图片部分内容颜色对获取
 *
 * @param {*} src
 * @param {*} xStart
 * @param {*} yStart
 * @param {*} width
 * @param {*} height
 */

/* eslint-env browser */
/** for new Image() */

function getContext(width, height) {
  const canvas = document.createElement("canvas");
  canvas.setAttribute("width", width);
  canvas.setAttribute("height", height);
  return canvas.getContext("2d");
}

function getColorCount(data) {
  const countMap = {};

  for (let i = 0; i < data.length; i += 4) {
    const alpha = data[i + 3];
    if (alpha !== 0) {
      const rgbComponents = Array.from(data.subarray(i, i + 3));

      if (rgbComponents.indexOf(undefined) === -1) {
        const color: string =
          alpha && alpha !== 255
            ? `${[...rgbComponents, alpha].join(",")})`
            : rgbComponents.join(",");

        if (countMap[color]) {
          countMap[color].count++;
        } else {
          countMap[color] = { color, count: 1 };
        }
      }
    }
  }

  const counts = Object.values(countMap);
  return counts.sort((a: any, b: any) => b.count - a.count);
}

export default function getMainColor(
  src,
  xStart = 0,
  yStart = 0,
  width = 0,
  height = 0,
  imgWidth,
  imgHeight
) {
  if (width === 0 || height === 0) {
    return null;
  }
  const img = new Image();

  return new Promise((resolve, reject) => {
    img.onload = function draw() {
      const imgXRadio = img.width / imgWidth;
      const imgYRadio = img.height / imgHeight;
      const context = getContext(width * imgXRadio, height * imgXRadio);
      context.drawImage(
        img,
        Math.floor(xStart * imgXRadio),
        Math.floor(yStart * imgYRadio),
        Math.floor(width * imgXRadio),
        Math.floor(height * imgYRadio),
        0,
        0,
        Math.floor(width * imgXRadio),
        Math.floor(height * imgYRadio)
      );

      const { data } = context.getImageData(
        0,
        0,
        width * imgXRadio,
        width * imgXRadio
      );
      const count = getColorCount(data);
      resolve(count);
    };

    const errorHandler = () =>
      reject(new Error("An error occurred attempting to load image"));

    img.onerror = errorHandler;
    img.onabort = errorHandler;
    img.src = src;
  });
}
