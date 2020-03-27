<template>
  <div id="app">
    <div id="div-1">
      div 1
    </div>
    <div id="div-2">
      div 2
    </div>
    <ContextApp :target="'#div-2'" />
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  </div>
</template>

<script>
import ContextApp from "./ContextApp/ContextApp.vue";
// import HelloWorld from './components/HelloWorld.vue'

export default {
  name: "App",
  components: {
    ContextApp
    // HelloWorld, ContextApp
  }
};
</script>

<style lang="scss">
#app {
  display: flex;
  justify-content: space-around;
  #div-1 {
    width: 300px;
    height: 300px;
    background: green;
  }
  #div-2 {
    width: 300px;
    height: 300px;
    position: relative;
    background: red;
  }
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
