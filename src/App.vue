<template>
  <div id="app">
    <v-sevenseg value=1.234567></v-sevenseg>
    <br />
    <br />
    Use string value and slant
    <v-sevenseg value=".34" slant=10></v-sevenseg>
    <br />
    change width<v-sevenseg width=500 digits=7 value=".abcdef" slant=10></v-sevenseg>
    <br />
    Change height <v-sevenseg height=80 digits=7 value="-_.34" slant=10></v-sevenseg>
    <br />
    change colors  <v-sevenseg color-on="green" color-off="rgb(0, 25, 0)" height=80 digits=7 value=".34" slant=10></v-sevenseg>
    <br />
    change background color  <v-sevenseg color-back="red" color-on="green" color-off="rgb(255, 50, 0)" height=80 digits=7 value=".34" slant=10></v-sevenseg>
    <br />
    change background color  <v-sevenseg color-back="transparent" color-on="green" color-off="rgb(255, 240, 255)" height=80 digits=7 value=".34" slant=10></v-sevenseg>
    <br />
    resize  <v-sevenseg color-back="transparent" color-on="green" color-off="rgb(255, 240, 255)" resize=true height=80 digits=7 value=".34" slant=10></v-sevenseg>
  </div>
</template>

<script>
import VSevenseg from "./components/VSevenseg.vue";
import MyDigit from "./components/Digit.vue";

export default {
  name: "app",
  components: {
    VSevenseg,
    MyDigit
  }
};
</script>

<style>
#app { 
  display: inline-block
}
</style>
