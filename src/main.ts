import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import 'bootstrap';
import '@/assets/scss/app.scss';
// @ts-ignore
import VueProgressBar from 'vue-progressbar';

Vue.config.productionTip = false;

Vue.use(VueProgressBar, {
    color: '#ffffff',
    failedColor: '#c83b42',
    thickness: '4px',
    transition: {
        speed: '0.4s',
        opacity: '0.6s',
        termination: 300
    },
    autoRevert: true,
    location: 'top',
    inverse: false
});

export default new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app');
