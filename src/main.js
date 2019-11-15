import Vue from 'vue';
import { MdButton } from 'vue-material/dist/components';
import Login from '@/views/Login.vue';
import NotFound from '@/views/NotFound.vue';

import 'vue-material/dist/vue-material.min.css';
import 'vue-material/dist/theme/default.css';

Vue.use(MdButton);

const routes = {
  '/': Login,
};

// eslint-disable-next-line
const app = new Vue({
  el: '#app',
  data: {
    currentRoute: window.location.pathname,
  },
  computed: {
    ViewComponent() {
      return routes[this.currentRoute] || NotFound;
    },
  },
  render(h) { return h(this.ViewComponent); },
});
