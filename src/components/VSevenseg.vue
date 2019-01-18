<template>
  <div
    :id="id"
    ref="digits"
    :style="style"
    :class="{ resize: resize }"
    tabindex="0"
  >
    <div :style="totalWidth">
      <div
        v-for="(color, index) in colors"
        :id="index"
        :key="index"
        :value="color.digit"
        :style="
          'display: inline-block; height: 100%; width: ' +
            100 / colors.length +
            '%;'
        "
        :class="{ blink: color.blink }"
      >
        <my-digit
          :value="color.digit"
          :dp="dp + padding == index"
          :color-on="color.on"
          :color-off="colorOff"
          :front="color.front"
          :back="color.back"
          :slant="slant"
        />
      </div>
    </div>
  </div>
</template>
<script>
import MyDigit from "./Digit.vue";

export default {
  components: {
    MyDigit
  },
  props: {
    id: {
      type: String,
      default: "id-placeholder"
    },
    value: {
      type: [String, Number],
      default: "0.6789"
    },
    digits: {
      type: Number,
      default: 4
    },
    width: {
      type: Number,
      default: 400
    },
    height: {
      type: Number,
      default: 100
    },
    colorBack: {
      type: String,
      default: "Black"
    },
    colorHigh: {
      type: String,
      default: "Green"
    },
    colorOn: {
      type: String,
      default: "Red"
    },
    colorOff: {
      type: String,
      default: "rgb(50, 0, 0)"
    },
    slant: {
      type: Number,
      default: 0
    },
    resize: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      digits_orig: ["1", "2", "", "4", "5"],
      readonly: false,
      mult: 1,
      cursorPosition: 0, // this.digits,
      high: false,
      line: ""
    };
  },
  computed: {
    colors: function() {
      var colors = this.digitsArray.map(element => {
        return {
          digit: element,
          on: this.colorOn,
          off: this.colorOff,
          blink: this.high,
          back: "off",
          front: "off"
        };
      });
      return colors;
    },
    style: function() {
      var str = "display: inline-block; padding: 0.5em";
      str += "; width: " + "calc(" + this.width + "px - 1em)";
      str += "; height: " + "calc(" + this.height + "px - 1em)";
      str += "; background-color: " + this.colorBack;
      str += ";";
      return str;
    },
    raw: function() {
      // var isnum = /^-?\d*\.?\d*$/.test(this.value);
      var str;
      str = this.value.toString();
      if (str.startsWith(".")) str = "0" + str;
      if (str.startsWith("-.")) str = str.replace("-", "-0");
      str = str.split("");
      return str;
    },
    digitsArray: function() {
      var temp = this.raw.slice(0);
      if (this.dp >= 0) {
        temp.splice(this.dp + 1, 1);
      }
      while (this.digits > 0 && temp.length < this.digits) {
        temp.unshift(" ");
      }
      if (this.digits > 0) {
        temp = temp.slice(0, this.digits);
      }
      return temp;
    },
    padding: function() {
      var padding = this.digits - this.raw.length;
      if (this.dp >= 0) padding += 1;
      return padding < 0 ? 0 : padding;
    },
    dp: function() {
      var dpLocation = this.raw.indexOf(".") - 1;
      if (dpLocation < 0) dpLocation = NaN;
      return dpLocation;
    },
    /*
    Firefox does not work like Chrome and Safari on right-justifying
    elements... So we need to specify widths for all elements
    */
    totalWidth: function() {
      var w = (((this.height - 16) * 6) / 8) * this.digits;
      var wMsg = "float: right; width: " + w + ";";
      return wMsg;
    },
    numericValue: function() {
      return this.toPrecision(Number(this.value), this.precision);
    }
  },
  mounted() {
    // this.$el.addEventListener("resize", this.handleResize);
  },
  destroyed() {
    // this.$el.removeEventListener("resize", this.handleResize);
  },
  methods: {
    // handleResize(event) {
    //   console.log("resize", event);
    // },
    /**
     * Function convert value to number
     * @param val
     * @returns {number | Number}
     */
    toNumber(val) {
      let num = parseFloat(val);
      if (isNaN(val) || !isFinite(val)) {
        num = 0;
      }
      return num;
    },
    /**
     * Function to return fixed decimal precision of input val
     * @param val
     * @param precision
     * @returns {number | Number}
     */
    toPrecision(val) {
      return this.precision !== undefined
        ? parseFloat(val.toFixed(this.precision))
        : val;
    }
  }
};
</script>
<style scoped>
.partial {
  fill-opacity: 0.2;
}
@keyframes blink {
  0% {
    opacity: 1;
  }
  25% {
    opacity: 0;
  }
  75% {
    opacity: 1;
  }
}

.blink {
  animation: blink 0.35s infinite;
}
.resize {
  resize: both;
  overflow: auto;
}
</style>
