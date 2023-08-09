<template>
  <q-page class="wallpaper flex column" id="home">
    <div style="height: 93%; width: 100%; position: absolute" class="drag icones  flex column">
      <div id="grid" class="q-pa-sm">
        <div v-for="item in icons" @contextmenu.native="rightClick(item.nome)" :id="item.nome" v-on:dblclick="checkDbclick(item.nome, item.img, item.id)"  class="Icon flex column flex-center">
          <q-img  :width="iconSizeVar" :src="getImgUrl(item.img)"></q-img>
          <span class="texticon text-white">{{ item.nome }}</span>
          <q-menu
            touch-position
            context-menu
          >
            <q-list dense style="min-width: 100px">
              <q-item @click="renomearApp(item.nome, item.img)" clickable v-close-popup>
                <q-item-section>Renomear</q-item-section>
              </q-item>
              <q-item @click="removeApp(item.nome)" clickable v-close-popup>
                <q-item-section>Excluir</q-item-section>
              </q-item>
              <q-separator />
              <q-item clickable>
                <q-item-section>Propriedades</q-item-section>
              </q-item>
            </q-list>

          </q-menu>
        </div>
      </div>
    </div>
    <Bar @appBar="openWindow" @evidencia="putEvidenciaApp"  :apps="appsRunning" :show-appin-bar="showAppBar" :icon-programa="iconPrograma"  :nome-programa="nomePrograma"  class="bar"></Bar>
    <q-menu
      dark
      touch-position
      context-menu
    >
      <q-list dense dark style="min-width: 100px">
        <q-item clickable>
          <q-item-section>Visualizar</q-item-section>
          <q-item-section side>
            <q-icon name="keyboard_arrow_right" />
          </q-item-section>
          <q-menu dark anchor="top end" self="top start">
            <q-list>
              <q-item
                dense
                dark
                clickable
              >
                <q-item-section @click="iconSize('sm')" >Icones Pequenos</q-item-section>
              </q-item>
              <q-item
                dense
                dark
                clickable
              >
                <q-item-section @click="iconSize('md')">Icones Medios</q-item-section>
              </q-item>
              <q-item
                dense
                dark
                clickable
              >
                <q-item-section  @click="iconSize('lg')" >Icones Grandes</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-item>
        <q-item dark clickable>
          <q-item-section>Ordenar por</q-item-section>
          <q-item-section side>
            <q-icon name="keyboard_arrow_right" />
          </q-item-section>
          <q-menu dark anchor="top end" self="top start">
            <q-list>
              <q-item
                dense
                dark
                clickable
              >
                <q-item-section @click="ordemIcons('alf')">Alfabetica</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-item>
        <q-separator />
        <q-item clickable>
          <q-item-section>Novo</q-item-section>
          <q-item-section side>
            <q-icon name="keyboard_arrow_right" />
          </q-item-section>

          <q-menu dark anchor="top end" self="top start">
            <q-list>
              <q-item
                dense
                clickable
              >
                <q-item-section @click="newFile('pasta')" >Pasta Vazia</q-item-section>
              </q-item>
              <q-item
                dense
                clickable
              >
                <q-item-section @click="newFile('file')">Arquivo</q-item-section>
              </q-item>
            </q-list>
          </q-menu>

        </q-item>
        <q-separator />
        <q-item @click="menuClick('Personalizar', 'personalizar')" clickable v-close-popup>
          <q-item-section>Personalizar</q-item-section>
        </q-item>
      </q-list>

    </q-menu>
    <window v-for="(window, index) in appsRunning" :id="window.nome" v-if="showWindow" @click="clickOnWindow(window)"  @close="closeWindow" @maximize="maximizeWindow" @dadosFromWall="dadosPersonalizar" :nome-programa="window.nome" :icon-programa="window.icon" :id-programa="window.id" :index-programa="index" class="window"/>
    <vue-selecto
      :selectableTargets="['.Icon']"
      :hitRate="10"
      :selectByClick="true"
      :continueSelect="true"
      @selectEnd="onSelectEnd"
      dragContainer=".drag"
    />
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue'
import VueSelecto from "vue3-selecto";
import Window from "components/Window.vue";
import Bar from "components/Bar.vue";
import {EventBus} from "quasar";
const bus = new EventBus()
export default defineComponent({
  name: 'MainLayout',

  components: {
    VueSelecto, Window, Bar
  },
  watch: {
    $route:{
      deep: true,
      immediate: true,
      handler(value){
        switch (value.path){
          case "/terror":
            this.openWindow("Meu Computador", "computer.png", "meu_computador")
            break;
          case '/busaojf':
            this.openWindow("Busão JF", "Apps/busaojf.png", "BusaoJF")
            break
          case '/busaorecife':
            this.openWindow("Busão Recife", "Apps/busaoRecife.png", "BusaoRecife")
            break
          case '/penaltycup':
            this.openWindow("Penalty Cup", "Apps/penaltyCup.png", "PenaltyCup")
            break
        }
      }
    },
  },

  mounted() {
    document.addEventListener("contextmenu", function (e){
      e.preventDefault();
    }, false);
    const wallpaper = document.getElementById('home');
    if(!window.localStorage.getItem('Site')){
      this.dadosWindows = {wallpaper: 'wallpapers/wall1.png', color: '#343434'}
      window.localStorage.setItem('Site', JSON.stringify(this.dadosWindows))
      wallpaper.style.backgroundImage = 'url(' + this.getImgUrl('wallpapers/wall1.png') + ')';
      const dados = window.localStorage.getItem('Site')
      const dadosObjs = JSON.parse(dados)
      this.dadosWindows = {wallpaper: 'wallpapers/wall1.png', color: dadosObjs.color}
      document.body.style.setProperty('--main-color',this.dadosWindows.color)
    }else {
      this.setWallpaper();
    }
  },

  methods:{
    putEvidenciaApp(app){
      setTimeout(() => {
        if (this.appsRunning.length > 1) {
          const windows = document.getElementsByClassName("window");
          const maxZIndex = Array.prototype.reduce.call(windows, function (max, el) {
            const zIndex = parseFloat(getComputedStyle(el).zIndex);
            return zIndex > max ? zIndex : max;
          }, 0);

          Array.prototype.forEach.call(windows, function (el, index) {
            if (app === index + 1) {
              el.style.zIndex = maxZIndex + 1;
            }
          });
        }
      }, 0.1);
    },
    clickOnWindow(win) {
      setTimeout(() => {
        if (this.appsRunning.length > 1) {
          const windows = document.getElementsByClassName("window");
          const maxZIndex = Array.prototype.reduce.call(windows, function (max, el) {
            const zIndex = parseFloat(getComputedStyle(el).zIndex);
            return zIndex > max ? zIndex : max;
          }, 0);

          Array.prototype.forEach.call(windows, function (el, index) {
            if (win.index === index + 1) {
              el.style.zIndex = maxZIndex + 1;
            }
          });
        }
      }, 0.1);
    },
    dadosPersonalizar(){
      this.setWallpaper()
      if(window.localStorage.getItem('Site')){
        const dados = window.localStorage.getItem('Site')
        const dadosObjs = JSON.parse(dados)
        document.body.style.setProperty('--main-color',dadosObjs.color)
      }
    },
    onSelectEnd(e){
      Array.prototype.forEach.call(e.selected, function(el) {
        if(el.style.backgroundColor === 'rgb(118, 54, 215)'){
          el.style.backgroundColor = null
          el.style.opacity = null
        }else {
          el.style.backgroundColor = 'rgb(118, 54, 215)'
          el.style.opacity = '0.7'
        }
        e.currentTarget.selectedTargets = []
      })
    },
    maximizeWindow(app, index, minimaze){
      const window = document.getElementsByClassName("window");
      Array.prototype.forEach.call(window, function(el) {
        if(el.id === app) {
          if (el.style.height === '100%' && el.style.width === '100%') {
            el.style.top = '20%'
            el.style.left = '25%'
            el.style.width = '50%'
            el.style.height = '50%'
          } else {
            el.style.top = '0'
            el.style.left = '0'
            el.style.width = '100%'
            el.style.height = '100%'
          }
        }
      })
    },
    closeWindow(app, index){
      this.appsRunning = this.appsRunning.filter((item, indexAppR) => {
        return indexAppR !== index
      });
      this.showWindow(false)
    },
    showWindow(show){
      return show;
    },
    newFile(args){
      args === 'pasta' ? this.icones.push({img: 'pasta.png', nome: 'Pasta vazia', id: 'pasta'}) : (args === 'file' ? this.icones.push({img: 'file.png', nome: 'Novo arquivo', id: 'arquivo'}) : null )
    },
    iconSize(size){
      size === 'sm' ? this.iconSizeVar = '36px' : (size === 'md' ? this.iconSizeVar = '56px' : this.iconSizeVar = '72px')
    },
    ordemIcons(ordem){
      ordem === 'alf' ? this.icones.sort(function(a, b){
        if(a.nome < b.nome) { return -1; }
        if(a.nome > b.nome) { return 1; }
        return 0;
      }) : null
    },
    renomearApp(nome, icon){
      this.nomePrograma = nome;
      this.iconPrograma = icon;
      this.showModal = true
    },
    removeApp(nome){
      this.icones = this.icones.filter((item) => {
        return item.nome !== nome
      });
    },
    menuClick(nome, id){
      switch (nome){
        case "Personalizar":
          this.showWindow(true);
          this.appsRunning.push({nome: nome, icon: 'Apps/Personalizar.png', id: id, index: this.appIndex, minimazeWindow: false});
          this.iconPrograma = 'Apps/Personalizar.png';
          this.nomePrograma = nome;
          this.idPrograma = id;
          this.showAppBar = true
          setTimeout(()=>{
            if(this.appsRunning.length > 1) {
              const windows = document.getElementsByClassName("window");
              Array.prototype.forEach.call(windows, function(el, index, array) {
                if(index === array.length - 1){
                  const currentTopValue = parseFloat(getComputedStyle(el).top);
                  const currentLeftValue = parseFloat(getComputedStyle(el).left);
                  const newTop = currentTopValue + index*20;
                  const newLeft = currentLeftValue + index*20;
                  el.style.top = `${newTop}px`;
                  el.style.left = `${newLeft}px`;
                  el.style.zIndex = index
                }
              })
            }
          }, 0.1)
          break;
        case "Usuario":
          this.appsRunning.push({nome: nome, icon: 'Apps/user.png', id: id, index: this.appIndex, minimazeWindow: false});
          this.iconPrograma = 'Apps/user.png';
          this.showWindow(true);
          this.nomePrograma = nome;
          this.idPrograma = id;
          this.showAppBar = true
          setTimeout(()=>{
            if(this.appsRunning.length > 1) {
              const windows = document.getElementsByClassName("window");
              Array.prototype.forEach.call(windows, function(el, index, array) {
                if(index === array.length - 1){
                  const currentTopValue = parseFloat(getComputedStyle(el).top);
                  const currentLeftValue = parseFloat(getComputedStyle(el).left);
                  const newTop = currentTopValue + index*20;
                  const newLeft = currentLeftValue + index*20;
                  el.style.top = `${newTop}px`;
                  el.style.left = `${newLeft}px`;
                  el.style.zIndex = index
                }
              })
            }
          }, 0.1)
          break;
        default:
          this.appsRunning.push({nome: nome, icon: 'computer.png', id: id, index: this.appIndex, minimazeWindow: false})
          this.showWindow(true)
          this.nomePrograma = nome
          this.idPrograma = id
          this.iconPrograma = 'computer.png'
          this.showAppBar = true
          setTimeout(()=>{
            if(this.appsRunning.length > 1) {
              const windows = document.getElementsByClassName("window");
              Array.prototype.forEach.call(windows, function(el, index, array) {
                if(index === array.length - 1){
                  const currentTopValue = parseFloat(getComputedStyle(el).top);
                  const currentLeftValue = parseFloat(getComputedStyle(el).left);
                  const newTop = currentTopValue + index*20;
                  const newLeft = currentLeftValue + index*20;
                  el.style.top = `${newTop}px`;
                  el.style.left = `${newLeft}px`;
                  el.style.zIndex = index
                }
              })
            }
          }, 0.1)
          break;
      }
    },
    getImgUrl(pic) {
      return require('../assets/'+pic)
    },
    setWallpaper(){
      const wallpaper = document.getElementById('home');
      const dados = window.localStorage.getItem('Site')
      const dadosObj = JSON.parse(dados)
      wallpaper.style.backgroundImage = 'url(' + this.getImgUrl(`${dadosObj.wallpaper}`) + ')';
    },
    openWindow(nome, icon, id){
      this.appIndex++
      this.showWindow(true)
      this.appsRunning.push({nome: nome, icon: icon, id: id, index: this.appIndex, minimazeWindow: false})
      this.nomePrograma = nome
      this.iconPrograma = icon
      this.idPrograma = id;
      this.showAppBar = true

      setTimeout(()=>{
        if(this.appsRunning.length > 1) {
          const windows = document.getElementsByClassName("window");
          Array.prototype.forEach.call(windows, function(el, index, array) {
            if(index === array.length - 1){
              const currentTopValue = parseFloat(getComputedStyle(el).top);
              const currentLeftValue = parseFloat(getComputedStyle(el).left);
              const newTop = currentTopValue + index*20;
              const newLeft = currentLeftValue + index*20;
              el.style.top = `${newTop}px`;
              el.style.left = `${newLeft}px`;
              el.style.zIndex = index
            }
          })
        }
      }, 0.1)
    },
    rightClick(nome){
      const els = document.getElementsByClassName("Icon");
      Array.prototype.forEach.call(els, function(el) {
        if(el.id === nome && el.style.backgroundColor === 'rgb(118, 54, 215)'){
          el.style.backgroundColor = null
          el.style.opacity = null
        }else if (el.id === nome && el.style.backgroundColor !== 'rgb(118, 54, 215)') {
          el.style.backgroundColor = 'rgb(118, 54, 215)'
          el.style.opacity = '0.7'
        }
      })
    },
    checkDbclick(nome, icon, id){
      const els = document.getElementsByClassName("Icon");
      let eltoOpen = ''
      Array.prototype.forEach.call(els, function(el) {
        if(nome === el.id){
          eltoOpen = nome
        }
      });
      this.openWindow(eltoOpen, icon, id)
    }
  },

  setup () {
    const nomePrograma = ref('');
    const iconPrograma = ref('');
    const idPrograma = ref('');
    const icons = ref([{img:'lixeira.png', nome: 'Lixeira', id: 'lixeira'}, {img: 'computer.png', nome: 'Meu Computador', id: 'meu_computador'}, {img: 'Apps/penaltyCup.png', nome: 'Penalty Cup', id: 'PenaltyCup'}, {img: 'Apps/busaojf.png', nome: 'Busão JF', id: 'BusaoJF'},  {img: 'Apps/busaoRecife.png', nome: 'Busão Recife', id: 'BusaoRecife'},  {img: 'Apps/busaoRibeiraoPreto.png', nome: 'Busão Ribeirão Preto', id: 'BusaoRibeiraoPreto'}])
    const showModal = ref(false);
    const iconSizeVar = ref('52px');
    const appsRunning = ref([]);
    const appIndex = ref(0);
    const menuBarIsShow = ref(false);

    return{
      nomePrograma: nomePrograma,
      iconPrograma: iconPrograma,
      idPrograma: idPrograma,
      icons: icons,
      showModal: showModal,
      iconSizeVar: iconSizeVar,
      appsRunning: appsRunning,
      appIndex: appIndex,
      menuBarIsShow: menuBarIsShow
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

#home{
  background-size: cover;
  overflow: hidden;
}


#grid{
  display: grid;
  grid-auto-flow: column;
  grid-template-rows: repeat(6, auto);
  max-height: 100vh;
  overflow: hidden;
  align-items: start;
  width: fit-content;
}

.bar{
  position: absolute;
  bottom: 0;
}
.texticon{
  font-size: 12px;
  text-shadow: 1px 0 0 #000, -1px 0 0 #000, 0 1px 0 #000, 0 -1px 0 #000, 1px 1px #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000;
}
.Icon{
  flex: 1 auto;
  min-width: 100px;
  max-width: 150px;
  margin-top: 25px;
}
.window{
  position: absolute;
  top: 20%;
  left: 25%;
  resize: both;
  z-index: 0;
}
</style>
