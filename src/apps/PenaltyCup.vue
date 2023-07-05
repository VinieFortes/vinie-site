<template>
  <iframe
    src="/PenaltyCup/index.html"
    width="1000"
    height="670"
    frameborder="0"
  ></iframe>
</template>

<script>
import {defineComponent, ref} from 'vue'

export default defineComponent({
  name: 'PenaltyCup',
  mounted() {
    const iframe = document.createElement('iframe');
    iframe.onload = function() { alert('myframe is loaded'); }; // before setting 'src'
    iframe.src = '...';
    document.body.appendChild(iframe); // add it to wherever you need it in the document
  }

})
</script>

<style scoped>
</style>
