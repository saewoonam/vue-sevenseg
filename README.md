# vue-sevenseg

## A Seven Segment Display Component for Vue.js based on sevenSeg.js

## Project setup (hope this works)
```
npm install --save vue-seven-segment-display
```

### Compile to web component
```
yarn build
```

### Based on code and instructions from

[Sevenseg.js](https://github.com/BrandonLWhite/sevenSeg.js).
[https://github.com/z0h4n/vue-seven-segment-display]

### Usage

Sample.vue

```
<v-sevenseg value=".34" color-back="transparent" color-on="green" color-off="rgb(255, 240, 255)" height=80 digits=7 slant=10></v-sevenseg>
```

`value` or `:value`
- Any Number between 0-9 in String format. Default is "8"
- Use `:value={myValue}` to bind `value` prop to `myValue`

`color-on`
- String. Default is `Red`.
- Color when a segment is on

`:color-off`
- String. Default is `rgb(50, 0, 0)`
- Color when a segment is off
  
`color-back`
- String. Default is `Black`
- Color for the box/background of the display

`height`
- Number. Default is `100`
- Height in pixels of a box the includes the display.

`width`
- Number. Default is `400`
- Width in pixels of a box the includes the display.

`digits`
- Number. Default is `4`
- Number of digits in the display

`slant`
- Number. Default is 0
- Degrees slant of the digits in the display
