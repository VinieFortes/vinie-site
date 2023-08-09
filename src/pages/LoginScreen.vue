<template>
  <q-page class="backgroud flex flex-center">
    <div class="second_back flex flex-center column q-pa-md">
      <div class="flex text-center column q-mb-md" >
        <img class="xplogo" src="../assets/logo_vini.png" alt="logo">
        <p class="startTitle">Para iniciar, selecione o usuário</p>
      </div>
      <div class="flex column">
        <div @click="gotoHome" class="cardUser flex row flex-center">
          <q-avatar size="64px" round>
            <img class="user" :src="getImgUrl(dadosUser.img)" alt="user">
          </q-avatar>
          <p class="userName">{{ dadosUser.nome }}</p>
        </div>
      </div>
    </div>
    <div class="flex row flex-center" style="position: absolute; bottom: 35px; left: 50px">
      <q-btn @click="$router.push('/shutdown')" round text-color="black" class="offBtn" color="red" size="12px" icon="power_settings_new"></q-btn>
      <p class="q-pl-sm q-mt-md" style="color: white; font-weight: bold">Desligar</p>
    </div>
  </q-page>
</template>

<script>
import {defineComponent} from 'vue'

export default defineComponent({
  name: 'LoginScreen',
  methods:{
    gotoHome(){
      this.$router.push('/')
    },
    getImgUrl(pic) {
      return require('../assets/'+pic)
    }
  },
  beforeMount() {
    document.title = 'Vinie.Net - Login';
  },
  mounted() {
    const dadosUser = window.localStorage.getItem('User')
    if(dadosUser){
      this.dadosUser = JSON.parse(dadosUser)
    }

  },
  data(){
    const dadosUser = {img: 'dog.jpg', nome: ''}
    return{
      dadosUser: dadosUser
    }
  }
})
</script>

<style scoped>

*{
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.backgroud{
  background-color: #7846e2;
}
.second_back{
  background-color: #343434;
  width: 100%;
  position: absolute;
  height: 70%;
  border-top: purple solid;
  border-bottom: purple solid;
}
.startTitle{
  color: white;
  padding-top: 12px;
  font-size: 22px;
  text-align: end;
  font-weight: bold;
}
.xplogo{
  width: 162px;
  align-self: center;
}
.user{
  box-shadow: -1px 0 10px 1px purple;
}
.userName{
  color: white;
  padding: 10px;
  margin-top: 10px;
  font-size: 18px;
}
.cardUser{
  cursor: pointer;
}
</style>
