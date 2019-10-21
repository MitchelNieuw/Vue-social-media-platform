<template>
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header text-white bg-primary">
                    <p class="m-1 font-weight-bold">Login</p>
                </div>
                <div class="card-body">
                    <form class="col-md-8 mx-auto" @submit.prevent="login()">
                        <div class="form-group">
                            <label for="email">E-mail</label>
                            <input id="email" type="email" class="form-control"
                                   name="email" required autocomplete="email" autofocus v-model="email">
                        </div>
                        <div class="form-group">
                            <label for="password">Password</label>
                            <input id="password" type="password" class="form-control"
                                   name="password" required autocomplete="current-password" v-model="password">
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
import { AuthService } from '@/Services/authentication.service';

@Component
export default class Login extends Vue {
    protected email: string = '';
    protected password: string = '';

    public async login() {
        await AuthService.login(this.email, this.password);
        await this.$router.push({ name: 'userProfile' });
    }
}
</script>
