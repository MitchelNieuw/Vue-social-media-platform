<template>
    <div class="col-md-6 mb-5 card bg-dark border-white">
        <div class="card-body">
            <form @submit.prevent="storeReaction()" enctype="multipart/form-data">
                <div class="form-group">
                    <input type="file" ref="file" class="form-control-file" id="file" @change="handleFileUpload()">
                </div>
                <div class="form-group">
                    <label for="content" class="font-weight-normal">Message</label>
                    <textarea name="content" class="form-control bg-dark text-white border-bottom"
                              id="content" v-model="content"></textarea>
                </div>
                <div class="form-group text-right">
                    <button class="btn btn-outline-primary" type="submit">Place</button>
                </div>
            </form>
        </div>
    </div>
</template>

<style scoped lang="scss">
    @import '../../node_modules/@fortawesome/fontawesome-free/css/all.min.css';
</style>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { reactionService } from '@/Services/reaction.service';

@Component({
    props: {
        messageId: {
            type: Number,
            default: 0,
        },
        messageIndex: {
            required: true,
            type: Number,
        },
    },
})
export default class UserCreateReactions extends Vue {
    private file = '';
    protected content: string = '';

    public handleFileUpload() {
        // @ts-ignore
        this.file = this.$refs.file.files[0];
    }

    public async storeReaction() {
        let formData = new FormData();
        if (this.file !== '') {
            formData.append('image', this.file);
        }
        formData.append('content', this.content);
        await reactionService.storeReaction(formData, this.$props.messageId, this.$props.messageIndex, true);
        this.file = '';
        this.content = '';
        // @ts-ignore
        this.$refs.file.value = '';
    }
}
</script>
