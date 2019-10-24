<template>
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header text-white bg-primary">
                    <p class="m-1 font-weight-bold">Login</p>
                </div>
                <div class="card-body">
                    <form class="col-md-8 mx-auto" @submit.prevent="login()">
                        <div class="alert alert-dismissible alert-danger mx-auto" v-if="this.$store.state.response">
                            <button type="button" class="close" data-dismiss="alert">&times;</button>
                            <p v-text="this.$store.state.response"></p>
                        </div>
                        <div class="form-group">
                            <label for="email">E-mail</label>
                            <input id="email" type="email" class="form-control" name="email"
                                   required autocomplete="email" autofocus v-model="email">
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
import { authenticationService } from '@/Services/authentication.service';

@Component
export default class Login extends Vue {
    protected email: string = '';
    protected password: string = '';

    public async login() {
        this.$store.state.response = '';
        await authenticationService.login(this.email, this.password);
        if (this.$store.state.response === '') {
            this.$store.commit('update_is_authenticated');
            this.$store.commit('update_user');
            await this.$store.dispatch('getMessages');
            await this.$store.dispatch('getNotifications');
            return this.$router.push({name: 'userProfile'});
        }
    }

    beforeDestroy() {
        this.$store.state.response = '';
    }
}
</script>
