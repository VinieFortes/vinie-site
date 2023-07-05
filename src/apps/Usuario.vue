<template>
  <div class="flex column text-white">
    <span style="align-self: start; font-weight: bold" class="q-pa-sm">Foto do Usuario</span>
    <q-separator dark/>
    <div class="flex q-pa-sm row q-gutter-x-md">
      <q-img width="256px" height="142px" :src="getImgUrl(dadosuser.img)">
        <div class="bg-blue absolute-bottom-right text-subtitle1">
          Atual
        </div>
      </q-img>
      <q-separator vertical dark/>
      <div class="imgs">
        <q-img v-for="profilePic in profilesPics" style="cursor: pointer" @click="selectPic(profilePic)" width="82px" height="82px" :src="getImgUrl(profilePic)"></q-img>
      </div>
    </div>
    <span style="align-self: start; font-weight: bold" class="q-pa-sm">Nome do Usuario</span>
    <q-separator dark/>
    <div class=" flex row q-pa-md q-gutter-sm">
      <q-input dark style="flex: 1" standout v-model="dadosuser.nome"/>
      <q-btn color="green" rounded @click="setNome" label="salvar"></q-btn>
    </div>
  </div>
</template>

<script>
import {defineComponent, ref} from 'vue'
import {useQuasar} from "quasar";

export default defineComponent({
  name: 'Personalizar',
  methods:{
    selectPic(pic){
      this.dadosuser.img = pic
      window.localStorage.setItem('User', JSON.stringify(this.dadosuser))
    },
    setNome(){
      window.localStorage.setItem('User', JSON.stringify(this.dadosuser))
      this.q.dialog({
        message: 'Alteração feita com sucesso !' })
    },
    getImgUrl(pic) {
      return require('../assets/'+pic)
    }
  },
  mounted() {
    const dadosUser = window.localStorage.getItem('User')
    this.dadosuser = JSON.parse(dadosUser)
  },
  setup(){
    const q = useQuasar();
    const dadosUser = ref({img: 'dog.jpg', nome: ''});
    const profilesPics = ref(['dog.jpg', 'carro.jpg', 'bola.jpg', 'frog.jpg', 'girassol.webp', 'horse.jpg', 'pato.jpeg', 'tucano.jpg', 'violao.jpg']);
    return{
      q: q,
      dadosuser: dadosUser,
      profilesPics: profilesPics
    }
  }

})
</script>

<style scoped>
.imgs{
  display: grid;
  grid-template-columns: repeat(7, 1fr);
}
</style>
