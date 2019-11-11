<template>
    <div>
        <div v-for="(follower, index) in this.followers" :key="index">
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
    import {Component, Prop, Vue} from 'vue-property-decorator';
    import app from '../main';
    import {followService} from '@/Services/follow.service';
    import ErrorHelper from '@/Helpers/error.helper';
    import router from '@/router';

    @Component({
        async beforeRouteEnter(to, from, next) {
            // @ts-ignore
            app.$Progress.start();
            await followService.getFollowers(to.params.tag)
                .then((response) => {
                    next(vm => {
                        // @ts-ignore
                        vm.setFollowers(response.data.followers);
                    });
                }).catch((error) => {
                    console.log(ErrorHelper.returnErrorMessage(error));
                    router.go(-1);
                });
            next();
        },
    })

    export default class Followers extends Vue {
        protected followers: [] = [];

        @Prop({
            required: true,
            default: ''
        })
        private tag!: string;

        public getImageUrl(image: string): string {
            return 'https://localhost/profilePictures/' + image;
        }

        public setFollowers(followers: []) {
            this.followers = followers;
        }

        mounted() {
            // @ts-ignore
            app.$Progress.finish();
        }
    }
</script>
