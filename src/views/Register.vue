<template>
    <div class="card bg-dark">
        <div class="card-header">
            <p class="m-1 font-weight-bold">Register</p>
        </div>
        <div class="card-body">
            <form class="col-md-8 mx-auto" @submit.prevent="register()" enctype="multipart/form-data">
                <div v-if="this.$store.state.errorResponse !== ''" class="mx-auto alert alert-dismissible alert-danger">
                    <button type="button" class="close" data-dismiss="alert">&times;</button>
                    <p v-text="this.$store.state.errorResponse"></p>
                </div>
                <div class="form-group">
                    <input type="file" class="form-control-file" ref="file" name="file" @change="handleFileUpload()">
                </div>
                <div class="form-group">
                    <label for="name">Name</label>
                    <input id="name" type="text" class="form-control" name="name"
                           required autocomplete="name" autofocus v-model="name">
                </div>
                <div class="form-group">
                    <label for="tag">Tag</label>
                    <input id="tag" type="text" class="form-control" name="tag" required v-model="tag">
                </div>
                <div class="form-group">
                    <label for="email">E-mail</label>
                    <input id="email" type="email" class="form-control" name="email"
                           required autocomplete="email" v-model="email">
                </div>
                <div class="form-group">
                    <label for="password">Password</label>
                    <input id="password" type="password" class="form-control" name="password"
                           required autocomplete="password" v-model="password">
                </div>
                <div class="form-group float-right">
                    <button type="submit" class="btn btn-primary">Register</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { authenticationService } from '@/Services/authentication.service';
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
    },
})
export default class Register extends Vue {
    private name: string = '';
    private tag: string = '';
    private file = '';
    private email: string = '';
    private password: string = '';

    public handleFileUpload() {
        // @ts-ignore
        this.file = this.$refs.file.files[0];
    }

    public async register() {
        const formData = new FormData();
        formData.append('profilePicture', this.file);
        formData.append('name', this.name);
        formData.append('tag', this.tag);
        formData.append('email', this.email);
        formData.append('password', this.password);
        await authenticationService.register(formData);
        await this.$store.commit('update_is_authenticated');
        await this.$store.commit('update_user');
        await this.$store.dispatch('getMessages');
        await this.$store.dispatch('getNotifications');
        return this.$router.push({ name: 'userProfile' });
    }
}
</script>
