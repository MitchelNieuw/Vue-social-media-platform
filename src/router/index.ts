import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store/index';
const Home = () => import('@/views/Home.vue');
const Login = () => import('@/views/Login.vue');
const UserProfile = () => import('@/views/UserProfile.vue');
const Register = () => import('@/views/Register.vue');
const Notifications = () => import('@/views/Notifications.vue');

Vue.use(VueRouter);

const routes = [
  { path: '/', name: 'home', component: Home, },
  { path: '/login', name: 'login', component: Login, },
  { path: '/register', name: 'register', component: Register, },
  { path: '/user/profile', name: 'userProfile', component: UserProfile, },
  { path: '/user/notifications', name: 'notifications', component: Notifications },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.fullPath === '/user/profile' || to.fullPath === '/dashboard' || to.fullPath === '/user/notifications') {
    if (store.state.isAuthenticated !== 'true') {
      next('/login');
    }
  }
  if (to.fullPath === '/login' || to.fullPath === '/register') {
    if (store.state.isAuthenticated === 'true') {
      next('/user/profile');
    }
  }
  next();
});

export default router
