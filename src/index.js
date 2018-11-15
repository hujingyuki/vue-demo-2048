/** @format */

//import 'element-ui/lib/theme-chalk/index.css';

import Vue from 'vue';
import App from './App';

// 导入插件
import plugin from '@/plugins';
import router from '@/router';
import store from '@/store';


Vue.config.productionTip = false;

Vue.use(plugin);

new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
});
