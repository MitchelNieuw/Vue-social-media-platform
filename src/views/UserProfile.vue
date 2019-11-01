<template>
    <div>
        <div class="row">
            <div v-if="this.$store.state.errorResponse !== ''" class="mx-auto alert alert-dismissible alert-danger">
                <button type="button" class="close" data-dismiss="alert">&times;</button>
                <p v-text="this.$store.state.errorResponse"></p>
            </div>
            <div v-if="this.$store.state.response !== ''" class="mx-auto alert alert-dismissible alert-success">
                <button type="button" class="close" data-dismiss="alert">&times;</button>
                <p v-text="this.$store.state.response"></p>
            </div>
        </div>
        <div class="row">
            <UserInfo></UserInfo>
            <CreateMessage></CreateMessage>
        </div>
        <div class="row">
            <div class="col-md-3"></div>
            <UserMessages :id="this.$props.id"></UserMessages>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import CreateMessage from '@/components/CreateMessage.vue';
import UserMessages from '@/components/UserMessages.vue';
import UserInfo from '@/components/UserInfo.vue';
import store from '@/store';
import app from '../main';

@Component({
    components: {
        CreateMessage,
        UserMessages,
        UserInfo,
    },
    props: ['tag', 'id'],
    async beforeRouteEnter(to, from, next) {
        // @ts-ignore
        app.$Progress.start();
        await store.dispatch('getMessages');
        await store.dispatch('getFollowers', store.state.user.tag.replace('@', ''));
        await store.dispatch('getFollowing', store.state.user.tag.replace('@', ''));
        next();
    },
    mounted() {
        // @ts-ignore
        app.$Progress.finish();
    },
    beforeDestroy() {
        this.$store.state.errorResponse = '';
        this.$store.state.response = '';
    },
})
export default class UserProfile extends Vue {
}
</script>
