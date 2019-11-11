<template>
    <div>
        <div class="media col-md-6" v-for="(reaction, index) in reactions" :key="index">
            <img class="align-self-start mr-3 img-medium"
                 v-lazy="getImageUrl(reaction.user.profilePicture)" :alt="reaction.user.name">
            <div class="media-body">
                <form v-if="userTag.toLowerCase() === reaction.user.tag.toLowerCase()"
                      @submit.prevent="deleteReaction(messageId, reaction.id, index)">
                    <button class="close text-danger">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </form>
                <p class="font-weight-bold d-inline-block mr-2 mb-0"
                   v-text="reaction.user.name"></p>
                <router-link class="d-inline-block mr-2"
                             :to="'/user/' + reaction.user.tag" v-text="'@' + reaction.user.tag"></router-link>
                <p class="text-muted d-inline-block mb-2 align-top"
                   v-text="getDateFromNow(reaction.created_at)"></p>
                <p class="mb-3" v-text="reaction.content"></p>
                <img v-if="reaction.image !== null" class="d-block img-fluid mb-3"
                     v-lazy="getReactionImageUrl(reaction.image, reaction.user.tag)" alt="Reaction image">
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';
    import {dateTimeHelper} from '@/Helpers/date.helper';
    import {reactionService} from '@/Services/reaction.service';
    import store from '@/store';
    import ErrorHelper from "@/Helpers/error.helper";

    @Component({
        computed: {
            userTag() {
                return store.state.user.tag;
            },
        },
    })
    export default class ReactionMessage extends Vue {
        private response: string = '';

        @Prop({default: () => []})
        private reactions!: [];

        @Prop()
        private messageId!: number;

        public getDateFromNow(date: string): string {
            return dateTimeHelper.getDateFromNow(date);
        }

        public getImageUrl(image: string): string {
            return 'https://localhost/profilePictures/' + image;
        }

        public getReactionImageUrl(image: string, userTag: string): string {
            return 'https://localhost/reactions/' + userTag + '/' + image;
        }

        public async deleteReaction(messageId: number, reactionId: number, index: number): Promise<void> {
            await reactionService.deleteReaction(messageId, reactionId)
                .then((response) => {
                    this.response = response.data.message;
                    this.$props.reactions.splice(index, 1);
                }).catch((error) => {
                    ErrorHelper.returnErrorMessage(error);
                });
        }
    }
</script>
