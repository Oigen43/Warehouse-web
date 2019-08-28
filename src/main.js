import Vue from 'vue';
import App from './app';
import router from './router';
import store from './store';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import { LayoutPlugin, NavPlugin, ListGroupPlugin, TablePlugin, FormInputPlugin } from 'bootstrap-vue';

Vue.use(LayoutPlugin);
Vue.use(NavPlugin);
Vue.use(ListGroupPlugin);
Vue.use(TablePlugin);
Vue.use(FormInputPlugin);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
