<template>
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card bg-dark">
                <div class="card-header">
                    <p class="m-1 font-weight-bold">Login</p>
                </div>
                <div class="card-body">
                    <div v-if="this.$store.state.errorResponse !== ''" class="mx-auto alert alert-dismissible alert-danger">
                        <button type="button" class="close" data-dismiss="alert">&times;</button>
                        <p v-text="this.$store.state.errorResponse"></p>
                    </div>
                    <form class="col-md-8 mx-auto" @submit.prevent="login()">
                        <div class="alert alert-dismissible alert-danger mx-auto" v-if="this.$store.state.response">
                            <button type="button" class="close" data-dismiss="alert">&times;</button>
                            <p v-text="this.$store.state.response"></p>
                        </div>
                        <div class="form-group">
                            <label for="email">E-mail</label>
                            <input id="email" type="email" class="form-control" name="email"
                                   required autofocus autocomplete="email" v-model="email">
                        </div>
                        <div class="form-group">
                            <label for="password">Password</label>
                            <input id="password" type="password" class="form-control" name="password"
                                   required autocomplete="password" v-model="password">
                        </div>
                        <div class="form-group float-right">
                            <button type="submit" class="btn btn-primary">Login</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import app from '../main';

@Component({
    async beforeRouteEnter(to, from, next) {
        // @ts-ignore
        app.$Progress.start();
        next();
    },
    mounted() {
        // @ts-ignore
        app.$Progress.finish();
    },
    beforeDestroy() {
        this.$store.state.errorResponse = '';
    }
})
export default class Login extends Vue {
    protected email: string = '';
    protected password: string = '';

    public async login() {
        this.$store.state.response = '';
        await this.$store.dispatch('login', { email: this.email, password: this.password });
        if (this.$store.state.errorResponse === '') {
            await this.$store.dispatch('getMessages');
            await this.$store.dispatch('getNotifications');
            let tag = this.$store.state.user.tag.replace('@', '');
            await this.$store.dispatch('getFollowers', tag);
            await this.$store.dispatch('getFollowing', tag);
            return this.$router.push({ name: 'userProfile', });
        }
    }
}
</script>
