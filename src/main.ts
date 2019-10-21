import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import VueCookies from "vue-cookies-ts"
import 'bootstrap';
import '@/assets/scss/app.scss';

Vue.config.productionTip = false;
Vue.use(VueCookies);


new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
