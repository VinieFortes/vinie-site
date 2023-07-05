<template>
  <q-layout>
    <q-page-container>
      <router-view/>
    </q-page-container>
  </q-layout>
</template>

<script>
import {defineComponent, ref} from 'vue'

export default defineComponent({
  name: 'App',
  beforeMount() {
    document.title = 'Vinie.Net - Desktop';
    if(!window.localStorage.getItem('User')){
      window.localStorage.setItem('User', JSON.stringify(this.dadosUser))
    }

  },
  setup(){
    const dadosUser = ref({img: 'dog.jpg', nome: 'Visitante'});
    return{
      dadosUser: dadosUser
    }
  }
})
</script>

<style>
@font-face {
  font-family: 'Dirt';
  src: url('./fonts/Dirtchunk-0W0AR.otf');
}
:root {
  --main-color: #343434;
}
</style>
