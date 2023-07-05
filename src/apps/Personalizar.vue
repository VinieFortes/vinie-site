<template>
  <div class="flex column text-white">
    <span style="align-self: start; font-weight: bold" class="q-pa-sm">Papel de Parede</span>
    <q-separator dark/>
    <div class="flex q-pa-sm row q-gutter-x-md">
      <q-img width="256px" height="142px" :src="getImgUrl(dadosObj.wallpaper)">
        <div class="bg-blue absolute-bottom-right text-subtitle1">
          Atual
        </div>
      </q-img>
      <q-separator vertical dark/>
      <div class="flex row q-gutter-x-sm">
        <q-img v-for="wallpaper in wallpapers" style="cursor: pointer" @click="selectWallpaper(wallpaper)" width="82px" height="82px" :src="getImgUrl(wallpaper)"></q-img>
      </div>
    </div>
    <span style="align-self: start; font-weight: bold" class="q-pa-sm">Temas do Sistema</span>
    <q-separator dark/>
    <div class="flex row q-gutter-x-md q-pa-md">
      <div v-for="color in colorsOptions" @click="selectTheme(color)" :style="{width: '50px', height: '50px', backgroundColor: color, cursor: 'pointer', borderRadius: '12px'}" class="colors"></div>
    </div>
  </div>
</template>

<script>
import {defineComponent, ref} from 'vue'

export default defineComponent({
  name: 'Personalizar',
  methods:{
    getImgUrl(pic) {
      return require('../assets/'+pic)
    },
    selectWallpaper(wall){
      this.dadosObj.wallpaper = wall
      window.localStorage.setItem('Site', JSON.stringify(this.dadosObj))
      this.$emit('setWallpaper')
    },
    selectTheme(color){
      this.dadosObj.color = color
      window.localStorage.setItem('Site', JSON.stringify(this.dadosObj))
      this.$emit('setWallpaper')
    }
  },
  beforeMount() {
    const dados = window.localStorage.getItem('Site');
    this.dadosObj = JSON.parse(dados);
  },
  setup(){
    const dadosObj = ref({wallpaper: null, color: null});
    const wallpapers = ref(['wallpapers/wall1.png', 'wallpaper2.jpg', 'wallpaper3.jpg', 'wallpaper4.jpg']);
    const colorsOptions = ref(['#343434','#0054e4', '#66cc00', '#cc0000', '#ff009e', '#ffb002', '#604099']);
    return{
      dadosObj: dadosObj,
      wallpapers: wallpapers,
      colorsOptions: colorsOptions
    }
  }

})
</script>

<style scoped>
</style>
