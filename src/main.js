import Vue from 'vue';
import Login from '@/views/Login.vue';
import NotFound from '@/views/NotFound.vue';

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
