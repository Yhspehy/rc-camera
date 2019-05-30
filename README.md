# rc-camera

---

React Camera Component.

Base on [Camera](https://github.com/pixedelic/Camera).


[![NPM version][npm-image]][npm-url]
[![node version][node-image]][node-url]
[![npm download][download-image]][download-url]

[npm-image]: http://img.shields.io/npm/v/rc-camera.svg?style=flat-square
[npm-url]: http://npmjs.org/package/rc-camera
[node-image]: https://img.shields.io/badge/node.js-%3E=_0.10-green.svg?style=flat-square
[node-url]: http://nodejs.org/download/
[download-image]: https://img.shields.io/npm/dm/rc-camera.svg?style=flat-square
[download-url]: https://npmjs.org/package/rc-camera


## Feature

- support ie8,ie8+,chrome,firefox,safari(basic usage)

- support edge,chrome,firefox,safari,opera(some transform animations)



## install

[![rc-camera](https://nodei.co/npm/rc-camera.png)](https://npmjs.org/package/rc-camera)


## Usage

```jsx
import Camera from "rc-camera";
import "rc-camera/assets/index.css"

const imgList = [{ img: "", content: "" }];

ReactDOM.render(<Camera imgList={imgList} />, mountNode);
```

## API

### props

<table class="table table-bordered table-striped">
    <thead>
      <tr>
        <th style="width: 100px;">name</th>
        <th style="width: 100px;">type</th>
        <th style="width: 100px;">default</th>
        <th>description</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>width</td>
        <td>String</td>
        <td>100%</td>
        <td>Camera container width</td>
      </tr>
      <tr>
        <td>aspectRatio</td>
        <td>Number</td>
        <td>0.5</td>
        <td>The ratio of height / width. You can fit width and height. </td>
      </tr>
      <tr>
        <td>prefixCls</td>
        <td>String</td>
        <td>rc-camera</td>
        <td>PrefixCls of css </td>
      </tr>
      <tr>  
        <td>imgList</td>
        <td>Array</td>
        <td>[{}]</td>
        <td>Set imgs of Camera. </td>
      </tr>
      <tr>
        <td>current</td>
        <td>Number</td>
        <td>0</td>
        <td>Set the current img of Camera.</td>
      </tr>
      <tr>
        <td>slideOn</td>
        <td>String</td>
        <td>random</td>
        <td>The slide target of the animation: random prev next.</td>
      </tr>
      <tr>
        <td>animateType</td>
        <td>String</td>
        <td>random</td>
        <td>The animation type.</tde
      </tr>
     <tr>
        <td>duration</>
        <td>Number</td>
        <td>1000</td>
        <td>Animation duration(ms).</td>
      </tr>
      <tr>
        <td>easing</td>
        <td>String</td>
        <td>cubic-bezier(0.77, 0, 0.175, 1)</td>
        <td>Animation easing.</td>
      </tr>
      <tr>
        <td>contentBar</td>
        <td>(content) => React.ReactNode</td>
        <td></td>
        <td>ContentBar of Camera. You will get each img content when sliding.</td>
      </tr>
      <tr>
        <td>contentBarWrapStyle</td>
        <td>Obejct</td>
        <td>{}</td>
        <td>ContentBarWrap style. You can change wrapper background.</td>
      </tr>
      <tr>
        <td>prevBtn</td>
        <td>ReactNode</td>
        <td></td>
        <td>The prev Button of Camera.</td>
      </tr>
      <tr>
        <td>nextBtn</td>
        <td>ReactNode</td>
        <td></td>
        <td>The next Button of Camera.</td>
      </tr>
      <tr>
        <td>pagination</td>
        <td>Boolean</td>
        <td>true</td>
        <td>Pagination of Camera.</td>
      </tr>
      <tr>
        <td>autoPlay</td>
        <td>Boolean</td>
        <td>false</td>
        <td>Whether to auto play the Camera.</td>
      </tr>
      <tr>
        <td>autoPlayTime</td>
        <td>Number</td>
        <td>5000</td>
        <td>The interval time of autoPlay</td>
      </tr>
      <tr>
        <td>showThumbnail</td>
        <td>Boolean</td>
        <td>true</td>
        <td>Whether to show thumbnail when hover the pagination. </td>
      </tr>
      <tr>
        <td>onChange</td>
        <td>Function(current, nextIndex, isAuto)</td>
        <td></td>
        <td>Callback executed when slide to next img. </td>
      </tr>
      <tr>
        <td>onAnimationOver</td>
        <td>Function(current)</td>
        <td></td>
        <td>Callback executed when the animation is over. </td>
      </tr>
    </tbody>
</table>

## Development

```
npm install
npm start
```

## Example

http://localhost:8007/examples/default.html

online example: https://yhspehy.github.io/rc-camera/examples/

## License

rc-camera is released under the MIT license.
