<template>
  <q-card>
    <q-card-section class="flex row justify-around items-center">
      <q-img style="height: 90px; max-width: 90px" :src="getImgUrl('Apps/penaltyCup.png')"/>
      <span style="font-size: 42px; font-weight: bold">Penalty Cup</span>
      <q-btn @click="baixar" color="primary" icon="download" label="Baixe na PlayStore"/>
    </q-card-section>
    <q-separator/>
    <q-card-section style="text-align: justify">
      <span>
        {{descricao}}
      </span>
    </q-card-section>
    <q-separator/>
    <q-scroll-area style="height: 300px; max-width: 2500px;">
      <q-card-section  class="q-gutter-x-sm flex row">
        <q-img style="height: 300px; max-width: 500px" :src="getImgUrl('Apps/penalty_cup/print1.webp')"/>
        <q-img style="height: 300px; max-width: 500px" :src="getImgUrl('Apps/penalty_cup/print2.webp')"/>
        <q-img style="height: 300px; max-width: 500px" :src="getImgUrl('Apps/penalty_cup/print3.webp')"/>
        <q-img style="height: 300px; max-width: 500px" :src="getImgUrl('Apps/penalty_cup/print4.webp')"/>
        <q-img style="height: 300px; max-width: 500px" :src="getImgUrl('Apps/penalty_cup/print5.webp')"/>
      </q-card-section>
    </q-scroll-area>
  </q-card>
</template>

<script>
import {defineComponent, ref} from 'vue'

export default defineComponent({
  name: 'PenaltyCup',
  methods: {
    baixar(){
      window.open('https://play.google.com/store/apps/details?id=com.Vini.PenaltyCup','_blank');
    },
    getImgUrl(pic) {
      return require('../assets/' + pic)
    }
  },
  beforeMount() {
    document.title = 'Vinie.Net - Penalty Cup';
  },
  setup(){
    return{
      slide:  ref(1),
      descricao: 'Bem-vindo ao Penalty Cup, o jogo de pênaltis para celular que traz toda a emoção da Copa do Mundo para o seu dispositivo móvel! ' +
        'Prepare-se para uma experiência única e imersiva com gráficos 3D realistas que farão você se sentir como se estivesse no estádio.\n'
    }
  }
})
</script>

<style scoped>
</style>
