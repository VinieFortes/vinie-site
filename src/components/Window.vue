<template>
  <div style="min-width: 400px" class="one">
    <div class="mydivheader">
      <div class="menuBar flex row justify-between q-gutter-x-lg items-center">
        <div class="q-gutter-x-sm">
          <q-img  width="22px" :src="getImgUrl(iconPrograma)"></q-img>
          <span>{{ nomePrograma }}</span>
        </div>
        <div class="btns q-gutter-x-sm">
          <q-btn class="sizeBtn" rounded size="7px" icon="maximize" @click="maximize(nomePrograma)"></q-btn>
          <q-btn class="closeBtn" round size="10px" icon="close" @click="close(nomePrograma)"></q-btn>
        </div>
      </div>
    </div>
    <div class="headerMenu flex row justify-between no-wrap q-pb-sm">
      <q-btn-group flat>
        <q-btn size="sm" text-color="white" label="Arquivo" icon="article" />
        <q-btn size="sm" text-color="white" label="Editar" icon="edit" />
        <q-btn size="sm" text-color="white" label="Visualizar" icon="visibility" />
        <q-btn size="sm" text-color="white" label="Favorito" icon="star" />
        <q-btn size="sm" text-color="white" label="Ferramentas" icon="construction" />
        <q-btn size="sm" text-color="white" label="Ajuda" icon="help" />
      </q-btn-group>
    </div>
    <div class="navBar q-pa-sm flex row justify-start items-center q-gutter-x-sm">
      <div class="q-gutter-x-sm">
        <q-btn size="sm" round color="purple" icon="arrow_back"></q-btn>
        <span style="color: white">Voltar</span>
      </div>
      <q-space/>
      <div>
        <q-breadcrumbs active-color="purple" class="text-white" separator-color="purple">
          <q-breadcrumbs-el  label="C:" />
          <q-breadcrumbs-el label="Meus Programas" />
          <q-breadcrumbs-el :label="nomePrograma" />
        </q-breadcrumbs>
      </div>
    </div>
    <Lixeira v-if="idPrograma === 'lixeira'"/>
    <JogoTerror v-if="idPrograma === 'meu_computador'"/>
    <Personalizar @setWallpaper="dadosPersonalizacao" v-if="idPrograma === 'personalizar'"/>
    <usuario v-if="nomePrograma === 'Usuario'"/>
    <busao-j-f v-if="idPrograma === 'BusaoJF'"/>
    <busao-recife v-if="idPrograma === 'BusaoRecife'"/>
    <penalty-cup v-if="idPrograma === 'PenaltyCup'"/>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import Lixeira from "src/apps/Lixeira.vue";
import JogoTerror from "src/apps/JogoTerror.vue";
import Personalizar from "src/apps/Personalizar.vue";
import Usuario from "src/apps/Usuario.vue";
import BusaoJF from "src/apps/BusaoJF.vue";
import BusaoRecife from "src/apps/BusaoRecife.vue";
import PenaltyCup from "src/apps/PenaltyCup.vue";

export default defineComponent({
  components:{
    JogoTerror,
    Lixeira,
    Personalizar,
    Usuario,
    BusaoJF,
    BusaoRecife,
    PenaltyCup
  },
  name: 'Window',
  props: {
    nomePrograma: {
      type: String,
      required: true
    },

    iconPrograma: {
      type: String,
      required: true
    },

    idPrograma: {
      type: String,
      required: true
    },

    indexPrograma: {
      required: true
    }
  },
  methods:{
    getImgUrl(pic) {
      return require('../assets/'+pic)
    },
    close(app){
      this.$emit('close', app, this.indexPrograma)
    },
    maximize(app){
      this.$emit('maximize', app, this.indexPrograma)
    },
    dadosPersonalizacao(){
      this.$emit('dadosFromWall')
    },
    dragElement(elmnt) {
      let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
      if (document.getElementsByClassName("mydivheader")) {
        elmnt.onmousedown = dragMouseDown;
      } else {
        elmnt.onmousedown = dragMouseDown;
      }

      function dragMouseDown(e) {
        e = e || window.event;
        pos3 = parseInt(e.clientX);
        pos4 = parseInt(e.clientY);
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
        return false;
      }

      function elementDrag(e) {
        e = e || window.event;
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;

        // Calcular a nova posição da div
        pos1 = pos3 - parseInt(e.clientX);
        pos2 = pos4 - parseInt(e.clientY);
        pos3 = parseInt(e.clientX);
        pos4 = parseInt(e.clientY);

        // Limitar a posição da div para que ela não saia da tela
        const parent = elmnt.parentNode;
        const newTop = parent.offsetTop - pos2;
        const newLeft = parent.offsetLeft - pos1;
        const newRight = newLeft + parent.offsetWidth;
        const newBottom = newTop + parent.offsetHeight;

        if (newLeft >= 0 && newRight <= screenWidth) {
          parent.style.left = newLeft + "px";
        }

        if (newTop >= 0 && newBottom <= screenHeight) {
          parent.style.top = newTop + "px";
        }
      }

      function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
      }
    }
  },
  mounted() {
    const draggableElements = document.getElementsByClassName("mydivheader");
    for(let i = 0; i < draggableElements.length; i++){
      this.dragElement(draggableElements[i]);
    }
  }
})
</script>

<style scoped>

.one {
  position: absolute;
  z-index: 9;
  background-color: #5b5b5b;
  text-align: center;
  overflow: auto;
  border: var(--main-color) solid 5px;
  border-radius: 12px 12px 12px 12px;
  box-shadow: -1px 0 10px 1px purple;
}
.mydivheader {
  padding: 5px;
  cursor: move;
  z-index: 10;
  background-color: var(--main-color);
  color: #fff;
}

.sizeBtn{
  background-color: #4c7ef3;
}

.closeBtn{
  background-color: #d30001;
  color: white;
}

.headerMenu{
  background-color: var(--main-color);
}
.navBar{
  box-shadow: -1px 0 2px 1px #444444;
  background-color: var(--main-color);
}
</style>
