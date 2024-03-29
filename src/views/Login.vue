<template>
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card bg-dark">
                <div class="card-header">
                    <p class="m-1 font-weight-bold">Login</p>
                </div>
                <div class="card-body">
                    <div v-if="this.errorResponse !== ''" class="mx-auto alert alert-dismissible alert-danger">
                        <button type="button" class="close" data-dismiss="alert">&times;</button>
                        <p v-text="this.errorResponse"/>
                    </div>
                    <form class="col-md-8 mx-auto" @submit.prevent="login()">
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
    import {Component, Vue} from 'vue-property-decorator';
    import store from '@/store';
    import {authenticationService} from '@/_core/services/authentication.service';
    import ErrorHelper from '@/_core/helpers/error.helper';
    import app from '../main';

    @Component({
        beforeRouteEnter(to, from, next) {
            // @ts-ignore
            app.$Progress.finish();
            next();
        }
    })
    export default class Login extends Vue {
        protected email: string = '';
        protected password: string = '';
        protected errorResponse: string = '';

        public async login() {
            this.errorResponse = '';
            await authenticationService.login(this.email, this.password)
                .then((response) => {
                    Login.setUserLocalStorageData(response);
                }).catch((error) => {
                    console.log(error.response);
                    this.errorResponse = ErrorHelper.returnErrorMessage(error);
                });
            if (this.errorResponse === '') {
                await store.commit('update_user');
                await store.commit('update_is_authenticated');
                return await this.$router.push({name: 'userProfile'});
            }
        }

        private static setUserLocalStorageData(response: any) {
            localStorage.setItem('user', JSON.stringify(response.data.data));
            localStorage.setItem('isAuthenticated', 'true');
        }

        async mounted() {
            // @ts-ignore
            await app.$Progress.finish();
        }

        beforeDestroy() {
            this.errorResponse = '';
        }
    }
</script>
