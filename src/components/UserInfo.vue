<template>
    <div class="col-md-3">
        <div v-if="this.$store.getters.isLoggedIn">
            <img class="img-profile mr-3"
                 v-lazy="getImageUrl(this.$store.state.user.profilePicture)" alt="profile picture">
            <div class="d-inline-block align-middle">
                <p class="h4 mb-0" v-text="this.$store.state.user.name"/>
                <p class="h5 font-weight-normal text-primary mb-0" v-text="'@' + this.$store.state.user.tag"/>
            </div>
            <div class="mt-3">
                <div v-if="this.$store.state.user.followerCount !== undefined
                           && this.$store.state.user.followingCount !== undefined">
                    <router-link :to="'/user/'+this.$store.state.user.tag.replace('@', '')+'/following'"
                                 class="d-inline-block m-0 mr-3"
                                 v-text="'Following ' + this.$store.state.user.followingCount">
                    </router-link>
                    <router-link :to="'/user/'+this.$store.state.user.tag.replace('@', '')+'/followers'"
                                 class="d-inline-block m-0"
                                 v-text="'Followers ' + this.$store.state.user.followerCount">
                    </router-link>
                </div>
                <p v-text="'Since ' + filterDate(this.$store.getters.userCreatedAt)"/>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import {dateTimeHelper} from '@/_core/helpers/date.helper';

    @Component
    export default class UserInfo extends Vue {
        public getImageUrl(image: string): string {
            return 'https://localhost/profilePictures/' + image;
        }

        public filterDate(date: string): string {
            return dateTimeHelper.filterDate(date);
        }
    }
</script>
