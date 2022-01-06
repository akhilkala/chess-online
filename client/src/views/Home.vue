<template>
  <div class="home-page">
    <h1 class="header">
    Chess Online
    </h1>
    <main>
    <div class="card">
    <template v-if="!creating" >
      <h2>Create Room</h2>
      <div class="image">
        <img :src="pawn" alt="">
      </div>
      <button :disabled="joining" @click="handleCreate" class="btn create">Create</button>
    </template>
    <div v-else class="loading">
    <loading  />
    </div>
    </div>
     <div class="card">
    <template v-if="!joining" >
      <h2>Join Room</h2>
      <input v-model="roomID" type="text" placeholder="Enter Room ID" >
      <button :disabled="creating" @click="handleJoin" class="btn">Join</button>
        </template>
    <div v-else class="loading">
    <loading />
    </div>
    </div>
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Loading from "@/components/Loading.vue"
import socket from "@/utils/socket"
//@ts-ignore
import pawn from "@/assets/pawn.jpg"

export default defineComponent({
  name: 'Home',
  components:{
     'loading': Loading
  },
  data() {
    return {
      creating:false,
      joining:false,
      roomID:"",
      pawn
    }
  },
  methods: {
    handleJoin() {
      this.joining = true
      socket.emit("join-room", this.roomID);
      socket.once("start-game", ()=>{
        this.$router.replace(`/game/${this.roomID}`)
      })
    },
    handleCreate() {
      this.creating = true
      socket.emit("create-room");
      socket.once("room-created", (roomID: string) => {
          this.$router.replace(`/room/${roomID}`)
      });
    }
  },
});
</script>

<style scoped lang="scss" >

.header{
  text-align: center;
  color:#47a7f5;
  height: 15vh;
  font-size: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

main{
  height: 85vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.card{
  background-color: #fff;
  width: 21rem;
  height: 21rem;
  margin: 2rem;
  box-shadow: 1px 1px 15px #0001;
  border-radius: 5px;
  padding: 1.5rem 2.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .image{
    img{
      width: 100%;
      transform: translateY(-2rem);
      opacity: .75;
    }
  }

  input{
    font-size: 1.25rem;
    padding-bottom: .25rem;
    border-bottom: 1px solid #0003;
  }

  input.error{
    border-bottom: 1px solid orangered;
  }

   h2 {
      text-align: center;
      z-index: 2;
  }

  .loading{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  button.create{
      z-index: 2;
      transform: translateY(-4.1rem);
  }

}

</style>










