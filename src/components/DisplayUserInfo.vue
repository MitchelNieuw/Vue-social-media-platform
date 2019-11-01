<template>
    <div class="col-md-3">
        <div v-if="this.$store.state.displayUser !== undefined">
            <img class="img-profile mr-3"
                 v-lazy="getImageUrl(this.$store.state.displayUser.profilePicture)" alt="profile picture">
            <div class="d-inline-block align-middle">
                <p class="m-1 h5" v-text="this.$store.state.displayUser.name"></p>
                <p class="m-1 text-primary" v-text="'@'+this.$store.state.displayUser.tag"></p>
            </div>
            <div class="mt-3" v-if="this.$store.state.displayUser.followerCount !== undefined
                           && this.$store.state.displayUser.followingCount !== undefined">
                <router-link :to="'/user/' + this.$store.state.displayUser.tag + '/following'"
                             class="d-inline-block m-0 mr-3"
                             v-text="'Following ' + this.$store.state.displayUser.followingCount">
                </router-link>
                <router-link :to="'/user/' + this.$store.state.displayUser.tag + '/followers'"
                             class="d-inline-block m-0"
                             v-text="'Followers ' + this.$store.state.displayUser.followerCount">
                </router-link>
                <div class="btn-group my-1">
                    <form @submit.prevent="follow()" v-if="this.$store.state.displayUser.possibleFollow"
                          class="mt-2 float-right">
                        <button class="btn btn-outline-primary mr-3" type="submit">
                            Follow
                        </button>
                    </form>
                    <form @submit.prevent="unFollow()" v-if="this.$store.state.displayUser.possibleUnFollow"
                          class="mt-2 float-right">
                        <button class="btn btn-primary mr-3" type="submit">
                            Unfollow
                        </button>
                    </form>
                    <form @submit.prevent="ban()" v-if="this.$store.state.displayUser.possibleBan" class="mt-2 float-right">
                        <button class="btn btn-outline-danger mr-3" type="submit">
                            Ban
                        </button>
                    </form>
                    <form @submit.prevent="unBan()" v-if="this.$store.state.displayUser.possibleUnBan" class="mt-2 float-right">
                        <button class="btn btn-danger mr-3" type="submit">
                            Unban
                        </button>
                    </form>
                    <form @submit.prevent="turnOnNotifications()" v-if="this.$store.state.displayUser.possibleTurnOnNotifications"
                          class="mt-2 float-right">
                        <button class="btn btn-outline-info mr-3">
                            <i class="far fa-bell"></i>
                        </button>
                    </form>
                    <form @submit.prevent="turnOffNotifications()" v-if="this.$store.state.displayUser.possibleTurnOffNotifications"
                          class="mt-2 float-right">
                        <button class="btn btn-info mr-3">
                            <i class="far fa-bell-slash"></i>
                        </button>
                    </form>
                </div>
            </div>
            <p class="m-0" v-text="'Since ' + filterDate(this.$store.state.displayUser.createdAt)"></p>
        </div>
    </div>
</template>

<style scoped lang="css">
    @import '~@fortawesome/fontawesome-free/css/all.min.css';
</style>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { dateTimeHelper } from '@/Helpers/dateTime.helper';
import { userService } from '@/Services/user.service';
import store from '@/store';

@Component({
    data() {
        return {
            banned: false,
            following: false,
            notifications: false,
        };
    },
    methods: {
        filterDate(date: string) {
            return dateTimeHelper.filterDate(date);
        },
    },
})
export default class DisplayUserInfo extends Vue {
    private displayUserTag: string = store.state.displayUser.tag;

    public getImageUrl(image: string): string {
        return 'https://localhost/profilePictures/' + image;
    }

    public async follow() {
        await userService.follow(this.displayUserTag);
    }

    public async unFollow() {
        await userService.unFollow(this.displayUserTag);
    }

    public async ban() {
        await userService.ban(this.displayUserTag);
    }

    public async unBan() {
        await userService.unBan(this.displayUserTag);
    }

    public async turnOnNotifications() {
        await userService.turnOnNotifications(this.displayUserTag);
    }

    public async turnOffNotifications() {
        await userService.turnOffNotifications(this.displayUserTag);
    }
}
</script>
