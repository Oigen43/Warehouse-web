import Vue from 'vue';
import App from './app';
import router from './router';
import store from './store';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import { LayoutPlugin, NavPlugin, ListGroupPlugin } from 'bootstrap-vue';

Vue.use(LayoutPlugin);
Vue.use(NavPlugin);
Vue.use(ListGroupPlugin);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
