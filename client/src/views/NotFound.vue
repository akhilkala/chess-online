<template>
<div class="not-found">
    <lottie :options="defaultOptions" :height="400" :width="400" />
    <h1>PAGE NOT FOUND</h1>
    <button @click="handleClick">Go Home</button>
</div>
</template>

<script lang="ts" >
  import { defineComponent } from 'vue';
  //@ts-ignore
  import Lottie from 'vue-lottie';
  import animationData from '../assets/404.json';
 
  export default defineComponent({
    name: 'NotFound',
    components: {
      'lottie': Lottie
    },
    data() {
      return {
        defaultOptions: {animationData, loop:false},
      }
    },
    methods: {
        handleClick() {
            this.$router.replace("/")
        }
    },
  })
</script>

<style lang="scss" scoped>
.not-found{
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    h1{
        font-size: 2.5rem;
        transform: translateY(-4rem);
        opacity: .7;
    }
}
</style>