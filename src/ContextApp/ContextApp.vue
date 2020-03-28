<script>
export default {
  /* eslint-disable */
  render: function(createElement) {
    let contextItems = [];

    const renderRecursive = items => {
      let res = items.map(e => {
        const p = createElement(
          "span",
          {
            class: `${e.id || ""} ${this.$attrs.target}-context`,
            on: {
              click: () => {
                this.onOptionHover(e.id);
              }
            }
          },

          e.text
        );
        if (e.items) {
          // if items we want to listen hover and visable true his childs accordins to his fixed pos

          // childs visablity is computed that checking visable childs class var and check if his class is included
          return createElement(
            "span",
            {
              on: {
                mouseover: () => {
                  this.onContextExpend(e.id);
                }
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
                    display: `none`
                  }
                },
                renderRecursive(e.items)
              )
            ]
          );
        } else return p;
      });

      return res;
    };

    contextItems = renderRecursive(this.contextItems.items);

    // TODO Visablity hidden every inner class unless he's targeted by the hover class track var

    // const contextItems = this.contextItems.map(e =>
    //   createElement("div", e.text)
    // );

    return createElement(
      "div",
      {
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
    isContextVisable(newValue, oldValue) {
      if (!newValue) {
        const allChilds = document.querySelectorAll(
          `.${this.$attrs.target}-context.context-child-lgl`
        );
        allChilds.forEach(e => (e.style.display = "none"));
      }
    }
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
        items: [
          {
            selectedOption: null,
            id: "parent1",
            text: "parent1",
            items: [
              { id: "parent1-child-1", text: "itemb" },
              { id: "parent1-child-2", text: "itemb" },
              { id: "parent1-child-3", text: "itemb" },
              {
                selectedOption: null,
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
    findParentById(id) {
      // let item = false;
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
    onOptionHover(parentId, id) {
      const res = this.findParentById("parent2-child-3");
      // this.contextItems
      debugger;
      // we need to recursive search the parent id, and set new selected option
    },
    onContextExpend(id) {
      const parentEl = {
        el: document.querySelector(`.${this.$attrs.target}-context.${id}`),
        bound: document
          .querySelector(`.${this.$attrs.target}-context.${id}`)
          .getBoundingClientRect()
      };
      const contextContainerEl = document.querySelector(
        `.${this.$attrs.target}-context.${id}`
      );
      const el = document.querySelector(
        `.${this.$attrs.target}-context.${id}-childs`
      );

      // el.style.display = "block";

      el.style.left = `${parentEl.bound.x + contextContainerEl.clientWidth}px`;
      el.style.top = `${parentEl.bound.y}px`;
      el.style.display = "block";
      // el.postion;
    },
    /* eslint-disable */

    onContextClick(e) {
      const contextEl = document.querySelector(
        `.${this.$attrs.target}-context.context-app--main-container`
      );
      this.contextPosition.screenY = e.clientY;
      this.contextPosition.screenX =
        e.clientX - contextEl.getBoundingClientRect().width;

      this.isContextVisable = !this.isContextVisable;
    }
  },
  mounted() {
    const elContextTarget = document.querySelector(`.${this.$attrs.target}`);

    elContextTarget.addEventListener("contextmenu", e => {
      e.preventDefault();
      this.onContextClick(e);
      console.log("Context clicked over", elContextTarget);
    });
  }
};
</script>

<style lang="scss" scoped>
.context-child-lgl {
  position: fixed;
  background: blue;
}
.context-app--main-container {
  position: fixed;
  // padding: 10px;
  background: blue;
  color: white;
  span {
    padding: 0 5px;
    display: block;
  }
}
</style>
