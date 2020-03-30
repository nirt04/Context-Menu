<template>
  <div id="legal-context-app">
    <div class="div-1" id="div-1">
      LTR
    </div>
    <div class="div-2" id="div-2">
      RTL
    </div>
    <ContextApp :items="contextItems" :target="'div-1'" />
    <ContextApp :rtl="true" :items="contextItems" :target="'div-2'" />
  </div>
</template>

<script>
/* eslint-disable */
import ContextApp from "./ContextApp/ContextApp.vue";
import { eventBus } from "./main";
export default {
  data() {
    return {
      contextItems: [
        { text: "aaaaa" },
        { text: "aaaaa" },
        { seperator: true },
        {
          icon: "fas fa-archway",
          text: "parent1",
          items: [
            { text: "itemb" },
            { seperator: true },
            { text: "itemb" },
            { text: "itemb" },
            {
              text: "parent2",
              items: [
                {
                  text: "itemc",
                  icon: "fas fa-archway"
                },
                {
                  text: "itemc",
                  icon: "fas fa-archway"
                },
                { text: "itemc" }
              ]
            }
          ]
        },
        { seperator: true },
        { text: "super-long-word-aaaaaaaaaaaaaa", icon: "fab fa-adversal" },
        { text: "aaaaa", icon: "fas fa-archway" },
        { text: "aaaaa", icon: "fas fa-archway" },
        { seperator: true },
        { text: "aaaaa", icon: "fas fa-archway" }
      ]
    };
  },
  name: "App",
  components: {
    ContextApp
  }
};
</script>

<style lang="scss">
body {
  background: rgb(230, 230, 230);
  margin: 0;
}
#legal-context-app {
  display: flex;
  justify-content: space-around;
  #div-1 {
    width: 300px;
    height: 100vh;
    background: green;
  }
  #div-2 {
    width: 300px;
    height: 100vh;
    background: red;
  }
}

#legal-context-app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  // margin-top: 60px;
}
</style>
