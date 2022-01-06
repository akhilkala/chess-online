<template>
<error-boundary>
  <router-view/>
</error-boundary>
</template>

<script lang="ts" >
  import { defineComponent } from 'vue';
  import ErrorBoundary from "@/components/ErrorBoundary.vue"

export default defineComponent({
  components:{
    "error-boundary": ErrorBoundary
  }
})

</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Catamaran&display=swap');

$body-bg: #f2f4f7;
$text-color: #020205;
$font-family: "Catamaran";

html {
    scroll-behavior: smooth;
  }
  
  :root {

    @media (max-width: 75em) {
        //1200px
        font-size: 14px;
      }
  

    @media (max-width: 56.25em) {
        //900px
        font-size: 12px;
          }

          @media (max-width: 47.5em) {
            //760px
            font-size: 10px;
          }
  

          @media (min-width: 131.25em) {
            //2100px
            font-size: 18px;
          }
  

  }

  *,
  *::after,
  *::before {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  div,aside,main,section,input,textarea,button{
    font-family: $font-family, sans-serif, serif;

}
  
  body {
    background-color: $body-bg;
    color: $text-color;
    overflow-x: hidden;
  }
  
  a {
    &:link,
    &:visited {
      color: inherit;
      text-decoration: none;
    }
  }
  
  ul {
    list-style: none;
  }
  
  textarea {
    resize: none;
  }
  
  input,
  textarea {
    border: none;
    &:focus {
      outline: none;
    }
  }

button {
  border: none;
  cursor: pointer;
  background-position: center;
  transition: background 0.8s;
  border-radius: 2px;
  padding: .5rem 2rem;
  font-size: 1.25rem;
  text-transform: uppercase;
  color: white;
  background-color: #2196f3;
  box-shadow: 0 0 4px #999;

  &:active {
  background-color: #6eb9f7;
  background-size: 100%;
  transition: background 0s;
}

&:hover {
  background: #47a7f5 radial-gradient(circle, transparent 1%, #47a7f5 1%) center/15000%;
}

&:focus {
      outline: none;
}
}
</style>
