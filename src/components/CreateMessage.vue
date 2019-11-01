<template>
    <div class="col-md-6 align-self-center">
        <div class="align-self-center">
            <form @submit.prevent="storeMessage()" enctype="multipart/form-data">
                <div class="form-group">
                    <label for="file">Add image</label>
                    <input type="file" ref="file" class="form-control-file" id="file" @change="handleFileUpload()">
                </div>
                <div class="form-group">
                    <label for="content" class="font-weight-normal">Message</label>
                    <textarea name="content" class="form-control bg-dark text-white border-dark" id="content"
                              v-model="content"></textarea>
                </div>
                <button class="btn btn-outline-primary float-right" type="submit">Place</button>
            </form>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { messageService } from '@/Services/message.service';

@Component({})
export default class CreateMessage extends Vue {
    protected content: string = '';
    private file = '';

    public handleFileUpload() {
        // @ts-ignore
        this.file = this.$refs.file.files[0];
    }

    public async storeMessage() {
        let formData = new FormData();
        if (this.file !== '') {
            formData.append('image', this.file);
        }
        formData.append('content', this.content);
        await messageService.storeMessage(formData);
        await this.$store.dispatch('getMessages');
        this.content = '';
        this.file = '';
        // @ts-ignore
        this.$refs.file.value = '';
    }
}
</script>
