<template>
<div class="room-page">
    <main>
      <h1>Room</h1>
      <lottie :options="defaultOptions" :height="200" :width="200" />
      <h2>Waiting for player</h2>
      <h3>Room ID <span>{{$route.params.id}}</span></h3>
      <h3>Game Link <span>{{getGameLink()}}</span></h3>
    </main>
</div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import socket from "@/utils/socket"
  //@ts-ignore
  import Lottie from 'vue-lottie';
  import animationData from '../assets/waiting.json';
  
  export default defineComponent({
    name: 'Room',
    components: {
      'lottie': Lottie
    },
    data() {
      return {
        defaultOptions: { animationData },
      }
    },
    mounted() {
      socket.once("start-game", ()=>{
        this.$router.replace(`/game/${this.$route.params.id}`)
      })
    },
    methods: {
      getGameLink() {
        return process.env.VUE_APP_CLIENT_URI + "#/room/" + this.$route.params.id
      }
    },
  });
</script>

<style scoped lang="scss">

  .room-page{
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  main {
    width: 40%;
    height: 35rem;
    background-color: #fff;
    box-shadow: 1px 1px 25px #0001;
    padding: 2rem;
    border-radius: 6px;
  }

  h1{
    text-align: center;
    font-size: 2.5rem;
    color:#47a7f5;
    margin-bottom: 2rem;
  }

  h2{
    font-weight: 400;
    text-align: center;
    margin-top: 2rem;
  }

  h3{
    font-weight: 400;
    text-align: center;
    margin: 1.25rem 0;

    span {
      font-weight: bold;
      color:#47a7f5;
    }
  }

</style>
