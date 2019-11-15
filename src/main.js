import Vue from 'vue';
import Login from '@/components/Login.vue';
import NotFound from '@/components/NotFound.vue';

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
