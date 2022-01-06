<template>
    <slot v-if="!error" />
    <div v-else class="error-boundary" >
        <lottie :options="defaultOptions" :height="300" :width="300" />
        <h1>Something Went Wrong</h1>
        <button @click="handleClick" >Go Home</button>
    </div>
</template>

<script lang="ts" >
  import { defineComponent } from 'vue';
  //@ts-ignore
  import Lottie from 'vue-lottie';
  import animationData from '../assets/error.json';

  export default defineComponent({
    name:"Error Boundary",
    components: {
      'lottie': Lottie
    },
    data() {
        return {
            error: false,
            defaultOptions: {animationData,loop:false},
         }
    },
    methods: {
        handleClick() {
            this.error = false
            this.$router.replace("/")
        }
    },
    errorCaptured (err, vm, info) {
        this.error = true
    },
  })

</script>

<style lang="scss" scoped>
.error-boundary{
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    h1{
        font-size: 2.5rem;
        margin-top: 1rem;
        opacity: .7;
    }

    button{
        margin-top: 1rem;
    }
}
</style>