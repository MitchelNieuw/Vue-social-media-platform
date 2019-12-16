<template>
    <transition appear name="fade" mode="out-in">
        <div class="col-md-6 align-self-center">
            <div class="align-self-center">
                <form @submit.prevent="storeMessage()" enctype="multipart/form-data">
                    <div class="form-group">
                        <label for="content" class="font-weight-normal">Message</label>
                        <input type="file" ref="file" class="form-control-file mb-2"
                               id="file" @change="handleFileUpload()">
                        <textarea name="content" class="form-control bg-dark text-white"
                                  id="content" v-model="content"/>
                    </div>
                    <button class="btn btn-outline-primary float-right" type="submit">Place</button>
                </form>
            </div>
        </div>
    </transition>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import {messageService} from '@/_core/services/message.service';
    import ErrorHelper from '@/_core/helpers/error.helper';

    @Component
    export default class CreateMessage extends Vue {
        protected content: string = '';
        private file = '';

        public handleFileUpload(): void {
            // @ts-ignore
            this.file = this.$refs.file.files[0];
        }

        public async storeMessage(): Promise<void> {
            let formData = new FormData();
            if (this.file !== '') {
                formData.append('image', this.file);
            }
            formData.append('content', this.content);
            await messageService.storeMessage(formData)
                .then((response) => {
                    this.$parent.$data.messages.unshift(response.data.data);
                    this.content = '';
                    this.file = '';
                    // @ts-ignore
                    this.$refs.file.value = '';
                }).catch((error) => {
                    ErrorHelper.returnErrorMessage(error);
                });
        }
    }
</script>
