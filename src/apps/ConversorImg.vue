<template>
    <q-card>
        <q-card-section class="flex row justify-around items-center">
            <q-file
                    v-model="file"
                    label="Pick one file"
                    filled
                    accept="image/*"
                    clearable
                    style="max-width: 300px"
            />
        </q-card-section>
        <q-separator />
        <q-btn label="Convert to JPEG" @click="convertImage" />
        <q-card-section class="q-gutter-x-sm">
            <img v-if="convertedImgUrl" :src="convertedImgUrl" alt="Converted Image" />
            <a
                    v-if="downloadLinkVisible"
                    :href="convertedImgUrl"
                    download="converted.jpg"
            >
                Download Converted Image
            </a>
        </q-card-section>
    </q-card>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
    name: 'ConversorImg',
    methods: {
        convertImage() {
            if (!this.file) return;

            const reader = new FileReader();

            reader.onload = (event) => {
                const imgDataUrl = event.target.result;
                const img = new Image();
                img.src = imgDataUrl;

                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');
                    canvas.width = img.width;
                    canvas.height = img.height;
                    ctx.drawImage(img, 0, 0);

                    canvas.toBlob((blob) => {
                        this.convertedImgUrl = URL.createObjectURL(blob);
                        this.downloadLinkVisible = true;
                    }, 'image/jpeg', 0.9);
                };
            };

            reader.readAsDataURL(this.file);
        },
    },
    beforeMount() {
        document.title = 'Vinie.Net - Busão JF';
    },
    setup() {
        return {
            file: ref(null),
            convertedImgUrl: ref(null),
            downloadLinkVisible: ref(false),
        };
    },
});
</script>

<style scoped>
</style>
