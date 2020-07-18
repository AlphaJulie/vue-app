import Vue from 'vue'
import App from './App.vue'

import VueRouter from 'vue-router';

import routes from './router/router';

import JwPagination from 'jw-vue-pagination';
Vue.component('jw-pagination', JwPagination);


Vue.config.productionTip = false;

Vue.use(VueRouter);

const router = new VueRouter({routes});

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');


