<template>
  <q-card>
    <q-card-section class="flex row justify-around items-center">
      <q-img style="height: 90px; max-width: 90px" :src="getImgUrl('Apps/busaojf.png')"/>
      <span style="font-size: 42px; font-weight: bold">Busão JF</span>
      <q-btn @click="baixar" color="primary" icon="download" label="Baixe na PlayStore"/>
    </q-card-section>
    <q-separator/>
    <q-card-section style="text-align: justify">
      <span>
        {{descricao}}
      </span>
    </q-card-section>
    <q-separator/>
    <q-card-section  class="q-gutter-x-sm">
      <q-img style="height: 300px; max-width: 150px" :src="getImgUrl('Apps/busao_jf/print1.jpg')"/>
      <q-img style="height: 300px; max-width: 150px" :src="getImgUrl('Apps/busao_jf/print2.jpg')"/>
      <q-img style="height: 300px; max-width: 150px" :src="getImgUrl('Apps/busao_jf/print3.jpg')"/>
      <q-img style="height: 300px; max-width: 150px" :src="getImgUrl('Apps/busao_jf/print4.jpg')"/>
      <q-img style="height: 300px; max-width: 150px" :src="getImgUrl('Apps/busao_jf/print5.jpg')"/>

    </q-card-section>
  </q-card>

</template>

<script>
import {defineComponent, ref} from 'vue'

export default defineComponent({
  name: 'BusaoJF',
  methods: {
    baixar(){
      window.open('https://play.google.com/store/apps/details?id=com.vinie4app.busaojf','_blank');
    },
    getImgUrl(pic) {
      return require('../assets/' + pic)
    }
  },
  beforeMount() {
    document.title = 'Vinie.Net - Busão JF';
  },
  setup(){
    return{
      slide:  ref(1),
      descricao: 'Procurando um app simples, leve para ver o horário da sua linha de ônibus em Juiz de Fora ? Conheça o Busão JF com horários atualizados, permite que o usuário salve uma lista com suas linhas favoritas e possui uma ferramenta de busca que facilita que encontre sua linha mais rapidamente ! Totalmente gratuito e não precisa de internet para ver os horários !'
    }
  }
})
</script>

<style scoped>
</style>
