<template>
  <div id="app">
    <!-- <div class="div-1" id="div-1">
      LTR
    </div> -->
    <div class="div-2" id="div-2">
      RTL
    </div>
    <ContextApp :target="'div-1'" />
    <ContextApp :rtl="true" :target="'div-2'" />
  </div>
</template>

<script>
/* eslint-disable */
import ContextApp from "./ContextApp/ContextApp.vue";
// import HelloWorld from './components/HelloWorld.vue'
import { eventBus } from "./main";
export default {
  mounted() {
    // window.oncontextmenu = e => {
    //   // TODO Event Bus
    //   eventBus.$emit("windowContextMenu", e);
    //   //
    // };
  },
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
