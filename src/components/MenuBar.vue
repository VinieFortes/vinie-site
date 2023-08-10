<template>
  <q-card class="menuBar flex column justify-start items-start">
    <q-card-section style="cursor: pointer" class="q-pa-sm">
      <div @click="runApp('Usuario', 'Apps/user.png')" class="cardUser flex row flex-center">
        <q-avatar size="64px" round>
          <img class="user" :src="getImgUrl(dadosUser.img)" alt="logo">
        </q-avatar>
        <p class="userName">{{ dadosUser.nome }}</p>
      </div>
    </q-card-section>
    <q-card-section id="apps" class="no-padding flex row">
      <div id="appsWhite" class="q-pa-sm">
        <div v-for="item in apps" @click="runApp(item.nome, item.img, item.id)" style="cursor: pointer" class="app flex row items-center q-gutter-x-sm q-pa-sm">
          <q-img  width="32px" :src="getImgUrl(item.img)"></q-img>
          <span class="appName">{{item.nome}}</span>
        </div>
        <q-separator class="q-mb-sm"/>
        <div style="cursor: pointer" class="flex row items-center justify-end">
          <span class="appName">Todos os Programas</span>
          <q-icon color="green-10" size="md" name="arrow_right"></q-icon>
        </div>
      </div>

      <div id="appsBlue" class="q-pa-sm">
        <div v-for="item in appsPasta" @click="runApp(item.nome, item.img, item.id)" style="cursor: pointer" class="app flex row items-center q-gutter-x-sm q-pa-sm">
          <q-img  width="32px" :src="getImgUrl(item.img)"></q-img>
          <span class="appNameSystem">{{item.nome}}</span>
        </div>
        <q-separator class="q-mb-md"></q-separator>
        <div v-for="item in appsSystem" @click="runApp(item.nome, item.img, item.id)" style="cursor: pointer" class="app flex row items-center q-gutter-x-sm q-pa-sm">
          <q-img  width="32px" :src="getImgUrl(item.img)"></q-img>
          <span class="appNameSystem">{{item.nome}}</span>
        </div>
      </div>
    </q-card-section>
    <q-card-section style="width: 100%" class="flex justify-end items-center">
      <div class="flex row q-gutter-x-md">
        <div class="flex row flex-center">
          <q-btn @click="$router.push('/login')" rounded text-color="black" color="yellow-14" size="8px" icon="vpn_key"></q-btn>
          <q-tooltip>Fazer Logoff</q-tooltip>
        </div>
        <div class="flex row flex-center">
          <q-btn @click="$router.push('/shutdown')" round text-color="black" class="offBtn" color="red" size="12px" icon="power_settings_new"></q-btn>
          <q-tooltip>
            Desligar
          </q-tooltip>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import {defineComponent, ref} from 'vue'
import Lixeira from "src/apps/Lixeira.vue";

export default defineComponent({
  components:{
    Lixeira
  },
  name: 'MenuBar',
  methods:{
    getImgUrl(pic) {
      return require('../assets/'+pic)
    },

    runApp(nome, img, id){
      this.$emit('appName', nome, img, id)
    }
  },
  setup(){
    const apps = ref([{img: 'Apps/busaojf.png', nome: 'Busão JF', id: 'BusaoJF'}, {img: 'Apps/busaoRecife.png', nome: 'Busão Recife', id: 'BusaoRefice'}, {img: 'Apps/penaltyCup.png', nome: 'Penalty Cup', id: 'PenaltyCup'}, {img: 'Apps/busaoRibeiraoPreto.png', nome: 'Busão Ribeirão Preto', id: 'BusaoRibeiraoPreto'}, {img: 'Apps/conversorImg.png', nome: 'Conversor de Imagens', id: 'ConvertImg'}, {img: 'wordpad.png', nome: 'WordPad'}, {img: 'paint.png', nome: 'Paint'}]);
    const appsPasta = ref([{img: 'pasta.png', nome: 'Meus Documentos', id: 'meus_documentos'}, {img: 'pasta.png', nome: 'Minhas Imagens'}, {img: 'pasta.png', nome: 'Minhas Musicas'}]);
    const appsSystem = ref([{img: 'Apps/conf.png', nome: 'Configurações', id: 'configuracoes'}, {img: 'net.png', nome: 'Redes'}, {img: 'panel.png', nome: 'Painel de Controle'}]);
    const dadosUser = ref({img: 'dog.jpg', nome: ''});

    return{
      apps: apps,
      appsPasta: appsPasta,
      appsSystem: appsSystem,
      dadosUser: dadosUser
    }
  },
  mounted() {
    const dadosUser = window.localStorage.getItem('User')
    this.dadosUser = JSON.parse(dadosUser)
  }
})
</script>

<style scoped>

.menuBar{
  background-color: var(--main-color);
  border-radius: 16px;
  width: 20%;
  margin-left: 10px;
  margin-bottom: 10px;
  box-shadow: -1px 0 10px 1px purple;
}

@media (max-width: 2000px) {
  .menuBar {
    width: 30%;
  }
}

@media (max-width: 1400px) {
  .menuBar {
    width: 40%;
  }
}
@media (max-width: 1200px) {
  .menuBar {
    width: 50%;
  }
}

@media (max-width: 600px) {
  .menuBar {
    width: 60%;
  }
}

@media (max-width: 400px) {
  .menuBar {
    width: 100%;
  }
}

.user{
  box-shadow: -1px 0 10px 1px purple;
}
.userName{
  color: white;
  font-weight: bold;
  padding: 10px;
  margin-top: 10px;
  font-size: 24px;
  letter-spacing: 5px;
  font-family: Dirt, "serif";
  text-shadow: purple -3px 3px;
}
#apps{
  border-radius: 0;
  width: 100%;
}
#appsWhite{
  background-color: white;
  width: 50%;
}
#appsBlue{
  background-color: #b995c8;
  flex: 1 auto;
}
.app:hover {
  background-color: #f63ee4;
}
.appName{
  font-size: 16px;
  font-weight: bold;
}
.appNameSystem{
  font-size: 16px;
  font-weight: bold;
  color: white;
  text-shadow: purple -1px 1px;
}
</style>
