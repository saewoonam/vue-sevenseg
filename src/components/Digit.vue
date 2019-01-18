<template>
  <div>
    <svg
      viewBox="0 0 60 80"
      :style="styleComputed"
      :value="value"
      :dp="dp"
      :slant="slant"
    >
      <circle :style="dpStyle" cx="55" cy="75" r="5" />
      <polyline
        v-for="(hv, index) in hv_segments"
        :key="index"
        :transform="transform(index)"
        :style="onOff(index)"
        :points="hv ? hline : vline"
      />
      <path
        id="backcursor"
        :class="back"
        :style="'stroke: ' + colorOn"
        d="M 55 0 L 55 80"
      />
      <path
        id="frontcursor"
        :class="front"
        :style="'stroke: ' + colorOn"
        d="M 0 0 L 0 80"
      />
    </svg>
  </div>
</template>
<script>
export default {
  components: {},
  props: {
    value: {
      type: [String, Number],
      default: 0
    },
    dp: {
      type: Boolean,
      default: true
    },
    colorBack: {
      type: String,
      default: "Black"
    },
    colorOn: {
      type: String,
      default: "Red"
    },
    colorOff: {
      type: String,
      default: "rgb(0, 50, 0)"
    },
    slant: {
      type: Number,
      default: 0
    },
    front: {
      type: String,
      default: "off"
    },
    back: {
      type: String,
      default: "off"
    }
  },
  data() {
    return {
      hline: "11 0, 37 0, 42 5, 37 10, 11 10, 6 5",
      vline: "0 11, 5 6, 10 11, 10 34, 5 39, 0 39",
      // http://en.wikipedia.org/wiki/Seven-segment_display
      c_aNumberSegments: [
        0x3f,
        0x06,
        0x5b,
        0x4f,
        0x66,
        0x6d,
        0x7d,
        0x07,
        0x7f,
        0x6f
      ],
      hv_segments: [1, 0, 0, 1, 0, 0, 1],
      transform_list: [
        "translate(3, 0)",
        "translate(51, 0) scale(-1, 1)",
        "translate(51, 80) scale(-1, -1)",
        "translate(3, 70)",
        "translate(3, 80) scale(1, -1)",
        "translate(3, 0)",
        "translate(3, 35)"
      ]
    };
  },
  computed: {
    styleComputed: function() {
      var style = "height: 100%; fill: " + this.colorOff + ";"; // background-color: " + this.colorBack + ";";
      // style += " stroke: " + this.colorOn + ";"
      // console.log(style);
      if (parseFloat(this.slant) != 0) {
        style =
          style + "transform: skewX(" + -parseFloat(this.slant) + "deg); ";
      }
      return style;
    },
    computedValue: function() {
      var isnum = /^\d+$/.test(this.value);
      if (isnum) {
        return parseInt(this.value);
      } else {
        return this.value;
      }
    },
    dpStyle: function() {
      if (this.dp) {
        return "fill: " + this.colorOn + ";";
      } else {
        return "";
      }
    }
  },
  methods: {
    onOff: function(segmentNumber) {
      var pattern = 0;
      // Need to check if '-' sign first
      if (typeof this.computedValue == "string") {
        if (this.computedValue == "-") {
          pattern = 0x40;
        } else if (this.computedValue == " ") {
          pattern = 0;
        } else if (this.computedValue == "") {
          pattern = 0;
        }
      } else if (typeof this.computedValue == "number") {
        pattern = this.c_aNumberSegments[this.computedValue];
      }
      if (pattern & (1 << segmentNumber)) {
        return "fill: " + this.colorOn + ";";
      } else {
        return "";
      }
    },
    transform: function(index) {
      var transform = this.transform_list[index];
      return transform;
    }
  }
};
</script>
<style scoped>
.off {
  stroke-opacity: 0;
}
.on {
  stroke-opacity: 1;
}
@keyframes blink {
  0% {
    stroke-opacity: 1;
  }
  25% {
    stroke-opacity: 0;
  }
  75% {
    stroke-opacity: 1;
  }
}

.blink {
  animation: blink 0.35s infinite;
}
</style>
