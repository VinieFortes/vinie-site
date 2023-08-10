<template>
    <q-card>
      <q-card-section class="flex row justify-center q-gutter-x-xl items-center">
        <q-img style="height: 90px; max-width: 90px" :src="getImgUrl('Apps/conversorImg.png')"/>
        <span style="font-size: 42px; font-weight: bold">Conversor de Imagens</span>
      </q-card-section>
        <q-card-section class="flex justify-center">
            <q-file
                v-model="file"
                label="Escolha um arquivo de Imagem"
                filled
                accept="image/*"
                clearable
                style="max-width: 500px; flex: 1"
            >
              <template v-slot:prepend>
                <q-icon name="attach_file" />
              </template>
            </q-file>
        </q-card-section>
        <q-separator />
        <div class="q-gutter-sm">
          <q-radio v-model="typeImg" val="png" label=".PNG" color="teal" />
          <q-radio v-model="typeImg" val="jpg" label=".JPG" color="orange" />
          <q-radio v-model="typeImg" val="jpeg" label=".JPEG" color="red" />
          <q-radio v-model="typeImg" val="ico" label=".ICO" color="cyan" />
        </div>
        <q-btn color="green" :disable="!file" :icon="typeImg === 'png' ? 'mdi-file-png-box' : (typeImg === 'jpg' ? 'mdi-file-jpg-box' : (typeImg === 'jpeg' ? 'mdi-file-image-outline' : 'http'))" :label="`Converter para .${typeImg}`" @click="convertImage(typeImg)" />
        <q-separator class="q-mt-md" v-if="convertedImgUrl"/>
        <q-card-section class="q-gutter-sm" v-if="convertedImgUrl">
          <q-linear-progress :value="progress" class="q-mt-md" />
            <q-btn v-if="downloadLinkVisible" color="positive" :href="convertedImgUrl" label="Baixar Imagem Convertida" :download="`converted.${typeImg}`"></q-btn>
        </q-card-section>
    </q-card>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
    name: 'ConversorImg',
    methods: {
      getImgUrl(pic) {
        return require('../assets/' + pic)
      },
      convertImage(type) {
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
                        this.progress = 0.5;
                        setTimeout(() => {
                          this.downloadLinkVisible = true;
                          this.progress = 1;
                        }, 3000);
                    }, 'image/' + type, 0.9);
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
            typeImg: ref('png'),
            progress: ref(0)
        };
    },
});
</script>

<style scoped>
</style>
