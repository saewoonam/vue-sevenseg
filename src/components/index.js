import Vue from "vue";
import VSevenseg from "./VSevenseg.vue";

const Components = {
  VSevenseg
};

Object.keys(Components).forEach(name => {
  Vue.component(name, Components[name]);
});

export default Components;
