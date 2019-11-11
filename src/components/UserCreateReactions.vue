<template>
    <div class="col-md-6 mb-5 bg-dark">
        <form @submit.prevent="storeReaction()" enctype="multipart/form-data">
            <div class="form-group">
                <label for="content" class="font-weight-normal">Reaction</label>
                <input type="file" ref="file" class="form-control-file mb-1" id="file" @change="handleFileUpload()">
                <textarea name="content" class="form-control bg-dark text-white"
                          id="content" v-model="content"></textarea>
            </div>
            <div class="form-group text-right">
                <button class="btn btn-outline-primary" type="submit">Place</button>
            </div>
        </form>
    </div>
</template>

<style scoped lang="scss">
    @import '../../node_modules/@fortawesome/fontawesome-free/css/all.min.css';
</style>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';
    import {reactionService} from '@/Services/reaction.service';
    import ErrorHelper from '@/Helpers/error.helper';

    @Component
    export default class UserCreateReactions extends Vue {
        private file = '';
        protected content: string = '';

        @Prop({default: 0})
        private messageId!: number;

        @Prop({required: true})
        private messageIndex!: number;

        public handleFileUpload(): void {
            // @ts-ignore
            this.file = this.$refs.file.files[0];
        }

        public async storeReaction(): Promise<void> {
            let formData = new FormData();
            if (this.file !== '') {
                formData.append('image', this.file);
            }
            formData.append('content', this.content);
            await reactionService.storeReaction(formData, this.$props.messageId)
                .then((response) => {
                    this.file = '';
                    this.content = '';
                    // @ts-ignore
                    this.$refs.file.value = '';
                    this.$parent.$parent.$props.reactions.unshift(response.data.data);
                }).catch((error) => {
                    ErrorHelper.returnErrorMessage(error);
                });
        }
    }
</script>
