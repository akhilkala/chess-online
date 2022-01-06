<template>
    <lottie :options="defaultOptions" :height="400" :width="400" />
</template>

<script lang="ts" >
  import { defineComponent } from 'vue';
  //@ts-ignore
  import Lottie from 'vue-lottie';
  import animationData from '../assets/loading.json';
 
  export default defineComponent({
    name: 'Loading',
    components: {
      'lottie': Lottie
    },
    data() {
      return {
        defaultOptions: {animationData},
      }
    },
  })
</script>