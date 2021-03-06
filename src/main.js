import Vue from 'vue';
import {
  MdButton, MdField, MdProgress, MdMenu, MdList, MdCard,
} from 'vue-material/dist/components';
import Login from '@/views/Login.vue';
import Main from '@/views/Main.vue';
import NotFound from '@/views/NotFound.vue';

import 'vue-material/dist/vue-material.min.css';
import 'vue-material/dist/theme/default.css';

Vue.use(MdButton);
Vue.use(MdField);
Vue.use(MdProgress);
Vue.use(MdMenu);
Vue.use(MdList);
Vue.use(MdCard);

Vue.config.productionTip = false;

const routes = {
  '/': Login,
  '/main': Main,
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
