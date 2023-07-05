<template>
  <div>
    <MenuBar @appName="app" v-if="sMenuBar" id="menuBar"/>
    <div class="bar flex row no-wrap">
      <div @click="showMenuBar()" class="btnInicar flex row q-pa-sm items-center">
        <img class="logo" src="../assets/logo_vini.png" alt="logo">
      </div>

      <div style="flex: 1; z-index: 0" class="flex row flex-center q-gutter-x-sm">
        <div v-for="app in apps" v-if="showAppinBar" @click="colocarEmEvidencia(app.nome, app.index, app.minimazeWindow)" class="logoDiv flex row items-center">
          <q-img class="logoApp" :class="{shake: isShake}" :src="getImgUrl(app.icon)" alt="logo"/>
          <q-tooltip>
            {{app.nome}}
          </q-tooltip>
        </div>
      </div>

      <div style=" z-index: 0" class="barOptions flex row q-pa-sm items-center no-wrap">
        <q-img v-for="item in icones" class="icones" @click="app(item.nome, item.img, sMenuBar = true)" alt="logo" :src="getImgUrl(item.img)">
          <q-tooltip class="bg-white text-black" :offset="[10, 10]">{{ item.tooltip }}</q-tooltip>
        </q-img>
        <p class="hora no-margin">{{ hora }}
          <q-tooltip >
            <div class="flex column q-gutter-y-sm">
              <q-date
                v-model="data"
                readonly
                color="purple"
                landscape
                dark
              />
              <q-separator color="white"  />
              <q-time
                v-model="time"
                readonly
                color="purple"
                landscape
                dark
              />
            </div>
          </q-tooltip>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import {defineComponent, ref} from 'vue'
import MenuBar from "components/MenuBar.vue";

export default defineComponent({
  name: 'Bar',
  components:{
    MenuBar
  },
  watch:{
    apps(val){
      this.isShake = true;
      setTimeout( timeout =>{
        this.isShake = false;
      }, 2000)

    }
  },
  props: {
    showAppinBar: {
      type: Boolean,
      required: true
    },

    nomePrograma: {
      type: String,
      required: true
    },

    iconPrograma: {
      type: String,
      required: true
    },
    apps: {
      required: true
    }
  },
  methods:{
    setTime(){
      const currentdate = new Date();
      let time;
      if(currentdate.getHours().toString().length === 1 && currentdate.getMinutes().toString().length === 1) {
        time = currentdate.getDate() + "/" + + (currentdate.getMonth()+1)  + "/" + currentdate.getFullYear() +'  '+'0'+currentdate.getHours()+ ":" +'0'+ currentdate.getMinutes() ;
        this.time = '0' + currentdate.getHours()+ ":" +'0'+ currentdate.getMinutes();
      }
      else if (currentdate.getHours().toString().length === 1){
        time = currentdate.getDate() + "/" + + (currentdate.getMonth()+1)  + "/" + currentdate.getFullYear() +'  '+'0'+currentdate.getHours()+ ":" + currentdate.getMinutes() ;
        this.time = '0' + currentdate.getHours()+ ":" + currentdate.getMinutes();
      }
      else if(currentdate.getMinutes().toString().length === 1) {
        time = currentdate.getDate() + "/" + + (currentdate.getMonth()+1)  + "/" + currentdate.getFullYear() +'  '+currentdate.getHours()+ ":" + '0'+currentdate.getMinutes() ;
        this.time = currentdate.getHours()+ ":" +'0'+ currentdate.getMinutes();
      }
      else{
        time = currentdate.getDate() + "/" + + (currentdate.getMonth()+1)  + "/" + currentdate.getFullYear() +'  '+currentdate.getHours()+ ":" + currentdate.getMinutes() ;
        this.time = currentdate.getHours()+ ":" + currentdate.getMinutes();
      }

      this.hora = time;
      this.data =  currentdate.getFullYear() + "/" +'0'+ (currentdate.getMonth()+1)  + "/" + '0' + currentdate.getDate()

      setTimeout(this.setTime, 1000);
    },

    getImgUrl(pic) {
      return require('../assets/'+pic)
    },

    showMenuBar(){
      this.sMenuBar ? this.sMenuBar = false: this.sMenuBar = true;
    },

    colocarEmEvidencia(app, index, minimaze){
      this.$emit('evidencia', index)
    },

    app(nome, icon, id){
      this.$emit('appBar', nome, icon, id)
      this.showMenuBar()
    }

  },
  setup(){
    const hora = ref('');
    const icones = ref([{img: 'msn.png', nome: 'MSN', tooltip: '0 mensagens novas no MSN'}, {img: 'defender.png', nome: 'Windows Defender', tooltip: 'O Windows Defender esta desativado'}, {img: 'net.png', nome: 'Redes', tooltip: 'Conexão de rede estavel'}, {img: 'Barra/Som/som_max.png', nome:'Som do sistema', tooltip: 'Som do sistema' }]);
    const sMenuBar = ref(false);
    const isShake = ref(false);
    const time = ref("");
    const data = ref("");
    return{
      hora: hora,
      icones: icones,
      sMenuBar: sMenuBar,
      isShake: isShake,
      time: time,
      data: data
    }
  },
  mounted() {
    this.setTime();
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

.bar{
  width: 100%;
}
.logo{
  width: 32px;
  height: 32px;
}

.logoApp{
  width: 38px;
  cursor: pointer;
  height: 38px;
  transform: scale(1);
}
.logoApp :hover{

}
.logoDiv :hover{
  animation: backInUp 1s ease-in-out;
}
.shake {
  animation: shake 0.5s infinite;
}

@keyframes backInUp {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1); /* Adjust this value to control the scale increase */
  }
  100% {
    transform: scale(1);
  }
}

@keyframes shake {
  0% { transform: translate(0, 0); }
  25% { transform: translate(-2px, -2px); }
  50% { transform: translate(2px, 2px); }
  75% { transform: translate(-2px, 2px); }
  100% { transform: translate(2px, -2px); }
}


.btnInicar{
  cursor: pointer;
  margin-left: 10px;
  margin-bottom: 2px;
  background-color: #2b2d30;
  border-radius: 24px;
  box-shadow: -1px 0 10px 1px purple;
}


.appsBar{
  cursor: pointer;
  border-radius: 12px;
  display: flex;
  padding: 5px;
  justify-content: center;
  margin: 5px 5px 5px 5px;
  background-color:  var(--main-color);
}

.barOptions{
  border-left: black solid 1px;
  background-color: #2b2d30;
  margin-bottom: 2px;
  margin-right: 5px;
  border-radius: 12px;
  color: white;
  box-shadow: -1px 0 10px 1px purple;
}
.hora{
  font-size: 15px;
  cursor: pointer;
}
.icones{
  width: 20px;
  height: 20px;
  margin-left: 2px;
  margin-right: 8px;
  filter: drop-shadow(-0.1mm 0.3mm 0.2mm  white);
}
</style>
