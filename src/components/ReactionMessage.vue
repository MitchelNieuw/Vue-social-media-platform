<template>
    <div>
        <div class="media col-md-6" v-for="(reaction, index) in this.sortedReactions" :key="index">
            <img class="align-self-start mr-3 img-medium"
                 :src="'http://127.0.0.1:8000/' + reaction.user.profilePicture" :alt="reaction.user.name">
            <div class="media-body">
                <form v-if="userTag.toLowerCase() === reaction.user.tag.toLowerCase()"
                      @submit.prevent="deleteReaction(messageId, reaction.id, index)">
                    <button class="close text-danger">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </form>
                <p class="font-weight-bold d-inline-block mr-2 mb-0" v-text="reaction.user.name"/>
                <router-link class="d-inline-block mr-2"
                             :to="'/user/' + reaction.user.tag" v-text="'@' + reaction.user.tag"/>
                <p class="text-muted d-inline-block mb-2 align-top" v-text="getDateFromNow(reaction.created_at)"/>
                <p class="mb-3" v-text="reaction.content"/>
                <img v-if="reaction.image !== null" class="d-block img-fluid mb-3"
                     :src="'http://127.0.0.1:8000/reactions/' + reaction.user.tag + '/' + reaction.image"
                     alt="Reaction image">
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';
    import {dateTimeHelper} from '@/_core/helpers/date.helper';
    import {reactionService} from '@/_core/services/reaction.service';
    import store from '@/store';
    import ErrorHelper from '@/_core/helpers/error.helper';
    import {IReaction} from '@/_core/contracts/reaction.contract';

    @Component({
        computed: {
            userTag() {
                return store.state.user.tag;
            },
            sortedReactions() {
                this.$props.reactions.sort((a: IReaction, b: IReaction) => {
                    return Date.parse(b.created_at) - Date.parse(a.created_at);
                });
                return this.$props.reactions;
            }
        },
    })
    export default class ReactionMessage extends Vue {
        private response: string = '';

        @Prop({default: () => []})
        private reactions!: Array<IReaction>;

        @Prop()
        private messageId!: number;

        public getDateFromNow(date: string): string {
            return dateTimeHelper.getDateFromNow(date);
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
