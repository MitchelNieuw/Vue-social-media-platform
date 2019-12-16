import Vue from 'vue';
import VueRouter, {Route} from 'vue-router';
import store from '@/store/index';

const Home = () => import('@/views/Home.vue');
const Login = () => import('@/views/Login.vue');
const UserProfile = () => import('@/views/UserProfile.vue');
const Register = () => import('@/views/Register.vue');
const Notifications = () => import('@/views/Notifications.vue');
const Followers = () => import('@/views/Followers.vue');
const Following = () => import('@/views/Following.vue');
const DisplayUser = () => import('@/views/DisplayUser.vue');
const Dashboard = () => import('@/views/Dashboard.vue');

Vue.use(VueRouter);

const routes = [
    {path: '/', name: 'home', component: Home,},
    {path: '/login', name: 'login', component: Login,},
    {path: '/register', name: 'register', component: Register,},
    {path: '/dashboard', name: 'dashboard', component: Dashboard,},
    {path: '/user/profile', name: 'userProfile', component: UserProfile,},
    {path: '/user/notifications', name: 'notifications', component: Notifications},
    {path: '/user/profile/message/:id', name: 'authUserMessage', props: true, component: UserProfile,},
    {path: '/user/:tag', name: 'displayUser', props: true, component: DisplayUser,},
    {path: '/user/:tag/followers', name: 'followers', props: true, component: Followers},
    {path: '/user/:tag/following', name: 'following', props: true, component: Following},
    {path: '/user/:tag/message/:id', name: 'userMessage', props: true, component: DisplayUser,},
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
});

router.beforeEach((to: Route, from: Route, next) => {
    if (to.fullPath === '/user/profile'
        || to.fullPath === '/dashboard'
        || to.fullPath === '/user/notifications'
        || to.fullPath === '/user/:tag'
    ) {
        if (!store.getters.isLoggedIn) {
            next({path: '/login'});
        }
    }
    if (store.getters.isLoggedIn) {
        if (to.fullPath === '/login' || to.fullPath === '/register') {
            next({path: '/user/profile'});
        }
        if (to.fullPath == '/user/' + store.state.user.tag.replace('@', '')) {
            next({path: '/user/profile',});
        }
        next();
    }
    if (to.fullPath === '/user/' + to.params.tag && to.params.tag.toLowerCase() === store.state.user.tag) {
        next({path: '/user/profile',});
    }
    if (to.fullPath === '/user/' + to.params.tag + '/message/' + to.params.id) {
        if (to.params.tag.toLowerCase() === store.state.user.tag.toLowerCase()) {
            next({path: '/user/profile/message/' + to.params.id,});
        }
        next();
    }
    next();
});

export default router
