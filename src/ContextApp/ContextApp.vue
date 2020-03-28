<script>
import { eventBus } from "../main";
export default {
  /* eslint-disable */
  render: function(createElement) {
    let contextItems = [];

    const renderRecursive = (items, parentId) => {
      let res = items.map(e => {
        const p = createElement(
          "span",
          {
            style: {
              // padding: 0,
              background: `${
                this.findContextItemById(parentId) &&
                this.findContextItemById(parentId).selectedOption === e.id
                  ? "orange"
                  : "white"
              }`
            },
            class: `${e.id || ""} ${this.$attrs.target}-context`,
            on: {
              mouseover: () => {
                this.onOptionHover(e.id, parentId);
              }
            }
          },

          `${e.items && this.$attrs.rtl ? "<" : ""} ${e.text} ${e.items && !this.$attrs.rtl ? ">" : ""}`
        );
        if (e.items) {
          // if items we want to listen hover and visable true his childs accordins to his fixed pos

          // childs visablity is computed that checking visable childs class var and check if his class is included
          return createElement(
            "span",
            {
              on: {
                mouseover: () => {
                  this.onOptionHover(e.id, parentId);
                  this.onContextExpend(e.id);
                }
              },
              style: {
                padding: 0,
                background: `${
                  this.findContextItemById(parentId) &&
                  this.findContextItemById(parentId).selectedOption === e.id
                    ? "orange"
                    : "white"
                }`
              },
              class: `${e.id || ""} ${this.$attrs.target}-context`
            },
            [
              p,
              createElement(
                "div",
                {
                  // on: { onmouseover : this.onContextClick, click: this.onContextClick },
                  class: `${e.id}-childs context-child-lgl ${this.$attrs.target}-context`,
                  style: {
                    display: `${
                      this.findContextItemById(parentId) &&
                      this.findContextItemById(parentId).selectedOption === e.id
                        ? "block"
                        : `none`
                    }`
                  }
                },
                renderRecursive(e.items, e.id)
              )
            ]
          );
        } else return p;
      });

      return res;
    };

    contextItems = renderRecursive(
      this.contextItems.items,
      this.contextItems.id
    );

    // TODO Visablity hidden every inner class unless he's targeted by the hover class track var

    // const contextItems = this.contextItems.map(e =>
    //   createElement("div", e.text)
    // );

    return createElement(
      "div",
      {
        on: {
          blur: () => {
            this.isContextVisable = false;
            this.colapseExpanded();
            // this.onOptionHover(e.id, parentId);
          }
        },
        style: {
          left: `${this.contextPosition.screenX}px`,
          top: `${this.contextPosition.screenY}px`,
          visibility: `${this.isContextVisable ? "visible" : "hidden"}`
        },
        class: `context-app--main-container ${this.$attrs.target}-context`
      },
      contextItems
    );
  },
  computed: {
    // rtlLeftPostion() {
    //   // return this.data
    // }
  },
  watch: {
    // isContextVisable(newValue, oldValue) {
    //   if (!newValue) {
    //     const allChilds = document.querySelectorAll(
    //       `.${this.$attrs.target}-context.context-child-lgl`
    //     );
    //     allChilds.forEach(e => (e.style.display = "none"));
    //   }
    // }
  },
  data() {
    return {
      visableChilds: [],
      contextPosition: {
        screenY: 0,
        screenX: 0
      },
      contextItems: {
        id: "root",
        selectedOption: null,
        selectedOptionEcho: null,
        items: [
          {
            selectedOption: null,
            selectedOptionEcho: null,
            id: "parent1",
            text: "parent1",
            items: [
              { id: "parent1-child-1", text: "itemb" },
              { id: "parent1-child-2", text: "itemb" },
              { id: "parent1-child-3", text: "itemb" },
              {
                selectedOption: null,
                selectedOptionEcho: null,
                id: "parent2",
                text: "parent2",
                items: [
                  { id: "parent2-child-1", text: "itemb" },
                  { id: "parent2-child-2", text: "itemb" },
                  { id: "parent2-child-3", text: "itemb" }
                ]
              }
            ]
          },
          { text: "aaaaa", id: "root-child-1" },
          { text: "aaaaa", id: "root-child-2" },
          { text: "aaaaa", id: "root-child-3" },
          { text: "aaaaa", id: "root-child-4" },
          { text: "aaaaa", id: "root-child-5" },
          { text: "aaaaa", id: "root-child-6" }
        ]
      },
      isContextVisable: false
    };
  },
  methods: {
    setElementPosition(el, parentEl, id, rtl, final) {
      const contextContainerEl = document.querySelector(
        `.${this.$attrs.target}-context.${id}`
      );
      const parentBound = parentEl.getBoundingClientRect();
      if (!rtl)
        el.style.left = `${parentBound.x + contextContainerEl.clientWidth}px`;
      else el.style.left = `${parentBound.x - el.clientWidth}px`;

      // el.style.left = `${parentBound.x - contextContainerEl.clientWidth}px`;
      el.style.top = `${parentBound.y}px`;
      if (this.isElementOverflowScreen(el) && !final) {
        this.setElementPosition(el, parentEl, id, !rtl, "final");
      }
    },

    findContextItemById(id) {
      // let item = false;
      if (id === "root") return this.contextItems;
      const recursiveSearch = items => {
        let item = null;
        for (let i = 0; i < items.length; i++) {
          if (items[i].id === id) {
            item = items[i];
          } else if (items[i].items) {
            item = recursiveSearch(items[i].items);
          }
          if (item) break;
        }
        return item;
      };

      return recursiveSearch(this.contextItems.items);
      // return item;
    },
    onOptionHover(optionId, parentId) {
      // const res =
      const parent = this.findContextItemById(parentId);
      parent.selectedOptionEcho = optionId;
      if (!parent.selectedOption) parent.selectedOption = optionId;
      else {
        // setTimeout(() => {
        // if (parent.selectedOptionEcho === optionId) {
        parent.selectedOption = optionId;
        // }
        // }, 60);
      }

      // this.contextItems

      // we need to recursive search the parent id, and set new selected option
    },
    isElementOverflowScreen(el) {
      const rect = el.getBoundingClientRect();

      return (
        rect.x < 0 || rect.y < 0
        // ||
        // rect.x + rect.width < 0 ||
        // rect.y + rect.height < 0 ||
        // rect.x > window.innerWidth ||
        // rect.y > window.innerHeight
      );
    },
    onContextExpend(id) {
      const parentEl = document.querySelector(
        `.${this.$attrs.target}-context.${id}`
      );
      const el = document.querySelector(
        `.${this.$attrs.target}-context.${id}-childs`
      );

      this.setElementPosition(el, parentEl, id, this.$attrs.rtl);
      // el.style.display = "block";

      // el.style.left = `${parentEl.bound.x + contextContainerEl.clientWidth}px`;
      // el.style.top = `${parentEl.bound.y}px`;
      // el.style.display = "block";
      // el.postion;
    },
    /* eslint-disable */
    colapseExpanded() {
      this.isContextVisable = false;
      const allChilds = document.querySelectorAll(
        `.${this.$attrs.target}-context.context-child-lgl`
      );
      allChilds.forEach(e => (e.style.display = "none"));
    },

    onContextClick(e) {
      eventBus.$emit("windowContextMenu", this.$attrs.target);
      const contextEl = document.querySelector(
        `.${this.$attrs.target}-context.context-app--main-container`
      );
      this.contextPosition.screenY = e.clientY;
      this.contextPosition.screenX =
        e.clientX - contextEl.getBoundingClientRect().width;

      // TODO CHECK IF ROOT CONTAINER IS in valid position

      this.isContextVisable = !this.isContextVisable;
      if (!this.isContextVisable) {
        this.colapseExpanded();
      }
    }
  },
  mounted() {
    const elContextTarget = document.querySelector(`.${this.$attrs.target}`);
    const that = this;
    elContextTarget.addEventListener("contextmenu", e => {
      e.preventDefault();
      this.onContextClick(e);
      console.log("Context clicked over", elContextTarget);
    });
    window.addEventListener("click", e => {
      // this.debugger;
      if (!e.target || !e.target.classList.contains(this.$attrs.target))
        this.colapseExpanded();
    });
    window.legalContext = this;

    eventBus.$on("windowContextMenu", target => {
      // debugger;
      // return;
      if (target !== this.$attrs.target) this.colapseExpanded();
    });
  }
};
</script>

<style lang="scss" scoped>
.context-child-lgl {
  position: fixed;
  box-shadow: 0 8px 10px 0 rgba(0, 0, 0, 0.24);
  background: white;
}
.context-app--main-container {
  box-shadow: 0 8px 10px 0 rgba(0, 0, 0, 0.24);
  position: fixed;
  // padding: 10px;
  background: white;
  color: black;
  span {
    padding: 5px;
    display: block;
  }
}
</style>
