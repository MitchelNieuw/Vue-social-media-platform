<template>
    <div>
        <div class="row">
            <DisplayUserInfo></DisplayUserInfo>
            <div class="col-md-6">
                <div v-if="this.$store.state.errorResponse !== ''" class="mx-auto alert alert-dismissible alert-danger">
                    <button type="button" class="close" data-dismiss="alert">&times;</button>
                    <p v-text="this.$store.state.errorResponse"></p>
                </div>
                <div v-if="this.$store.state.response !== ''" class="mx-auto alert alert-dismissible alert-success">
                    <button type="button" class="close" data-dismiss="alert">&times;</button>
                    <p v-text="this.$store.state.response"></p>
                </div>
                <DisplayUserMessages :id="this.$props.id"></DisplayUserMessages>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import app from '../main';
import store from '@/store';
import DisplayUserInfo from '@/components/DisplayUserInfo.vue';
import DisplayUserMessages from '@/components/DisplayUserMessages.vue';

@Component({
    components: {
        DisplayUserInfo,
        DisplayUserMessages,
    },
    props: ['tag', 'id'],
    async beforeRouteEnter(to, from, next) {
        // @ts-ignore
        app.$Progress.start();
        await store.dispatch('displayUser', to.params.tag).then(() => {
            if (to.fullPath === '/user/' + store.state.displayUser.tag.toLowerCase() + '/message/' + to.params.id) {
                next({ path: '/user/profile/message/' + to.params.id, });
            }
            if (to.params.tag.toLowerCase() !== store.state.displayUser.tag.toLowerCase()) {
                next({ path: '/user/profile', });
            }
            if (to.params.tag.toLowerCase() === store.state.displayUser.tag.toLowerCase()) {
                store.dispatch('getFollowers', to.params.tag);
                store.dispatch('getFollowing', to.params.tag);
                next();
            }
        });
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
export default class DisplayUser extends Vue {
}
</script>
