<template>
  <div
    :style="{
      left: `${contextPosition.screenX}px`,
      top: `${contextPosition.screenY}px`,
      visibility: `${isContextVisable ? 'visible' : 'hidden'}`
    }"
    class="context-app--main-container"
  >
    <!-- v-show="isContextVisable" -->
    <div v-for="(item, i) in contextItems" :key="i">
      {{ item.text }}
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    // rtlLeftPostion() {
    //   // return this.data
    // }
  },
  data() {
    return {
      contextPosition: {
        screenY: 0,
        screenX: 0
      },
      contextItems: [
        {
          text: "aaaaa",
          items: [
            { text: "itemb" },
            { text: "itemb" },
            { text: "itemb" },
            { text: "itemb" }
          ]
        },
        { text: "aaaaa" },
        { text: "aaaaa" },
        { text: "aaaaa" },
        { text: "aaaaa" },
        { text: "aaaaa" },
        { text: "aaaaa" },
        { text: "aaaaa" },
        { text: "aaaaa" }
      ],
      isContextVisable: false
    };
  },
  methods: {
    /* eslint-disable */

    onContextClick(e) {
      debugger;
      const contextEl = document.querySelector(".context-app--main-container");
      this.contextPosition.screenY = e.clientY;
      this.contextPosition.screenX =
        e.clientX - contextEl.getBoundingClientRect().width;

      this.isContextVisable = !this.isContextVisable;
    }
  },
  mounted() {
    const elContextTarget = document.querySelector(this.$attrs.target);

    elContextTarget.addEventListener("contextmenu", e => {
      e.preventDefault();
      this.onContextClick(e);
      console.log("Context clicked over", elContextTarget);
    });
  }
};
</script>

<style lang="scss" scoped>
.context-app--main-container {
  position: fixed;
  background: blue;
  color: white;
}
</style>
