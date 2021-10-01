<template>
    <div class="">
        <div class="">
            <p class="h1">Welcome</p>
        </div>
        <div class="col-md-6" v-if="this.$store.getters.isLoggedIn">
            <div class="form-group">
                <label for="search">Search for people</label>
                <div class="input-group">
                    <input id="search" type="text" placeholder="Search" v-model.lazy="search" class="form-control">
                    <div class="input-group-append">
                        <button class="btn-primary" type="button">Search</button>
                    </div>
                </div>
            </div>
            <transition-group v-if="users.length > 0 && search" appear name="fade" tag="ul" class="list-group">
                <li class="list-group-item bg-dark" v-for="user in users.slice(0,10)" :key="user.id">
                    <router-link :to="'/user/' + user.tag">
                        <img :src="'http://127.0.0.1:8000/' + user.profilePicture" :alt="user.name"
                             class="img-small d-inline-block mr-2">
                        <p v-text="user.name" class="text-white d-inline-block mr-2" />
                        <p v-text="'@' + user.tag" class="d-inline-block" />
                    </router-link>
                </li>
            </transition-group>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Vue, Watch} from 'vue-property-decorator';
    import app from '../main';
    import {IUser} from '@/_core/contracts/user.contract';
    import store from '@/store';
    import axios from 'axios';

    @Component({
        beforeRouteEnter(to, from, next) {
            // @ts-ignore
            app.$Progress.start();
            next();
        },
    })
    export default class Home extends Vue {
        public search: string = '';
        public users: Array<IUser> = [];

        @Watch('search')
        handler() {
            if (this.search.length < 30 && this.search.length >= 3) {
                this.searchUsers();
            }
        }

        public searchUsers() {
            const formData = new FormData();
            formData.append('tag', this.search);
            axios.post('https://localhost/api/v1/search', formData, {
                headers: {
                    Authorization: 'Bearer ' + store.getters.jwtToken,
                    Accept: 'application/json'
                }
            }).then((response) => {
                this.users = response.data.data;
            }).catch((error) => {
                console.log(error.response);
            });
        }

        async mounted() {
            // @ts-ignore
            await app.$Progress.finish();
        }
    }
</script>
