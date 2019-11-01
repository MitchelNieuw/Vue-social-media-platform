<template>
    <div>
        <div v-for="(follower, index) in this.$store.state.followers" :key="index">
            <div class="row">
                <div class="col-md-6 mx-auto mb-3">
                    <div class="card bg-dark">
                        <div class="card-body">
                            <div class="" v-if="follower.user.tag.toLowerCase() === tag.toLowerCase()">
                                <img class="img-profile img-small mr-2"
                                     v-lazy="getImageUrl(follower.following.profilePicture)"
                                     :alt="'@'+follower.following.tag">
                                <p class="m-0 d-inline-block mr-2" v-text="follower.following.name"></p>
                                <p class="m-0 d-inline-block text-primary" v-text="'@'+follower.following.tag"></p>
                            </div>
                            <div class="" v-else-if="follower.following.tag.toLowerCase() === tag.toLowerCase()">
                                <img class="img-profile img-small mr-2"
                                     v-lazy="getImageUrl(follower.user.profilePicture)"
                                     :alt="'@'+follower.user.tag">
                                <p class="m-0 d-inline-block mr-2" v-text="follower.user.name"></p>
                                <p class="m-0 d-inline-block text-primary" v-text="'@'+follower.user.tag"></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import store from '@/store';
import app from '../main';

@Component({
    props: {
        tag: {
            type: String,
            default: '',
        },
    },
    async beforeRouteEnter(to, from, next) {
        // @ts-ignore
        app.$Progress.start();
        await store.dispatch('getFollowers', to.params.tag);
        next();
    },
    mounted() {
        // @ts-ignore
        app.$Progress.finish();
    },
})

export default class Followers extends Vue {
    public getImageUrl(image: string): string {
        return 'https://localhost/profilePictures/' + image;
    }
}
</script>
