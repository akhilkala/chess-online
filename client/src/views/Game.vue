<template>
  <div class="board-page">
  <div class="header">
  </div>
    <main>
    <div id="board" style="width: 550px"></div>
    <aside>
      <div class="top">
        <h1>Chat</h1>
      </div>
      <div class="messages">
        <div v-for="message in messages" :key="message.text" :class="{message,you: message.player == 'You'}">
          <div class="name">{{message.player === "You" ? "You" : message.player }}</div>
          <h4>{{message.text}}</h4>
      </div>
      </div>
      <div class="bottom">
      <input v-model="message" placeholder="Type Here" type="text">
    <button @click="handleSendMessage" >Send</button>
      </div>
    </aside>
    </main>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  //@ts-ignore
  import Chessboard from "chessboardjs-vue";
  import * as ChessJS from "chess.js"
  import socket from '@/utils/socket';

  export default defineComponent({
    name: 'Board',
    data(): any {
      return {
        position: "start",
        message:"",
        messages:[],
        chess: null,
        status:{ 
          moveColor: "White",
          checkmate: false,
          check:false,
          draw:false
        }
      }
    },
    methods: {
      handleExit() {
        socket.emit("quit", this.$route.params.id)
        socket.close()
      },
      handleSendMessage() {
        if (!this.message) return
        this.messages.push({ player: "You",text: this.message})
        socket.emit("send-message", this.$route.params.id, this.message)
        this.message = ""
      },
      makeChessBoard(pos: string) {
        const onDragStart = (source: string, piece: string, position: object, orientation: string) => {
          if (this.game.game_over()) return false
          if ((this.game.turn() === 'w' && piece.search(/^b/) !== -1) ||
              (this.game.turn() === 'b' && piece.search(/^w/) !== -1)) {
            return false
          }
        }
        const onDrop = (source: string, target: string) => {
          const move = this.game.move({
            from: source,
            to: target,
            promotion: 'q'
          })
          if (move === null) return 'snapback'
          this.updateStatus()
        }
        Chessboard('board', {
          draggable: true,
          position: pos,
          onDragStart,
          onDrop,
          onSnapEnd: () => {
            this.makeChessBoard(this.game.fen())
          },
          onChange: (_:object,newPos:object) => {   
              const fen = Chessboard.objToFen(newPos)    
              this.position = fen
              socket.emit("move", this.$route.params.id, fen )
          }
        })
      },
      makeGameInstance(fen?: string){
        const Chess = typeof ChessJS === "function" ? ChessJS : ChessJS.Chess;
        if(!fen) this.game = new Chess();
        else this.game = new Chess(fen);
      },
      updateStatus() {
        this.status.moveColor = this.game.turn() === 'b' ? 'Black' : 'White'
        this.status.checkmate = this.game.in_checkmate()
        this.status.draw = this.game.in_draw()  
        this.status.check = this.game.in_check()
      }
    },
    created (){    
      window.addEventListener('beforeunload', this.handleExit)
      this.makeGameInstance()
    },
    mounted(){
      this.makeChessBoard(this.position)
      socket.on("message", (payload: { message: string, by: string }) => {
          if (payload.by === socket.id) return
          this.messages.push({ player: "Opponent",text: payload.message
        })
      })
      socket.on("moved", (payload: { fen: string, by: string }) => {
          this.position = payload.fen
      })
    },
    unmounted (){
      this.handleExit()
    },
    watch: {
      position: function (newPos: string, _: string) {
         this.makeChessBoard(newPos)  
         this.game.load(newPos)
      }
    },
  });
</script>

<style scoped lang="scss">

.board-page{
  min-height:100vh;
}

.header{
  min-height: 20vh;
}

main{
  display:flex;
  justify-content: center;
  min-height: 70vh;

  aside{
    background-color: #fff;
    min-width: 400px;
    margin-left: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    height: 543px;

    .top{
      width: 100%;
      text-align: center;
      padding-top: .25rem;
      font-size: 1.25rem;
      border-bottom: 1px solid #0002;
      opacity: .7;
    }

    .messages{
      flex: 1;
      overflow: auto;
      display: flex;
      flex-direction: column;
      padding: .5rem;

      .message{
        background-color: #f4f4f4;
        margin: .5rem;
        width: max-content;
        min-width: 6rem;
        max-width: 20rem;
        padding: .25rem 1rem .25rem .5rem;

        &.you{
          align-self: flex-end;
        }
      }
    }

    .bottom{
      display: flex;
      border-top: 1px solid #0002;

      button{
        width: max-content;
      }

      input{
        font-size: 1.25rem;
        padding: .5rem;
        flex: 1;
      }
    }
  }
}
</style>
