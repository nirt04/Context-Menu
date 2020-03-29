<script>
import { eventBus } from "../main";
export default {
  created() {
    this.contextItemsCloned = JSON.parse(JSON.stringify(this.contextItems));
  },

  /* eslint-disable */
  render: function(createElement) {
    let contextItems = [];

    const renderRecursive = (items, parentId) => {
      let res = items.map(e => {
        const extendedLeft = createElement("i", {
          class: "fas fa-caret-left",
          style: {
            color: "#737373"
          }
        });
        const extendedRight = createElement("i", {
          class: "fas fa-caret-right",
          style: {
            color: "#737373"
          }
        });
        const icon = createElement("i", {
          style: {
            color: "#737373",
            marginLeft: this.$attrs.rtl ? "5px" : "unset",
            marginRight: !this.$attrs.rtl ? "5px" : "unset"
          },
          class: e.icon
        });

        const textEl = createElement(
          "span",
          {
            style: {
              display: "inline-block",
              paddingLeft: this.$attrs.rtl && e.items ? "50px" : "unset",
              paddingRight: !this.$attrs.rtl && e.items ? "50px" : "unset"
            }
          },
          e.text
        );
        const textWithIcon = createElement(
          "span",
          {
            style: {
              // paddingLeft: this.$attrs.rtl && e.items ? "50px" : "unset",
              // paddingRight: !this.$attrs.rtl && e.items ? "50px" : "unset"
            }
          },
          this.$attrs.rtl ? [textEl, icon] : [icon, textEl]
        );
        const iconTextCompute = () => {
          if (e.icon) {
            debugger;

            return this.$attrs.rtl
              ? createElement("span", {}, [textEl, icon])
              : createElement("span", {}, [icon, textEl]);
          } else return [textEl];
        };
        const contentElements = () => {
          if (e.items && this.$attrs.rtl)
            return [extendedLeft, iconTextCompute()];
          else if (e.items && !this.$attrs.rtl)
            return [iconTextCompute(), extendedRight];
          else return [iconTextCompute()];
        };
        const p = createElement(
          "span",
          {
            style: {
              textAlign: this.$attrs.rtl ? "end" : "start",
              display: e.items || e.icon ? "flex" : "block",
              alignItems: "center",
              justifyContent: e.items
                ? "space-between"
                : this.$attrs.rtl
                ? "flex-end"
                : "flex-start",
              padding: "10px 0 ",
              paddingLeft: !e.items && this.$attrs.rtl ? "50px" : "5px",
              paddingRight: !e.items && !this.$attrs.rtl ? "50px" : "5px",
              background: `${
                this.findContextItemById(parentId) &&
                (this.findContextItemById(parentId).selectedOption === e.id ||
                  this.findContextItemById(parentId).selectedOptionEcho ===
                    e.id)
                  ? "orange"
                  : "white"
              }`
            },
            class: `${e.id || ""} ${this.$attrs.target}-context`,
            on: {
              mouseover: () => {
                // BUG DOESNT ALLWAYS TRIGGER

                this.onOptionHover(e.id, parentId);
              }
            }
          },

          contentElements()
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
                    // width: "150%",
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
      contextItemsCloned: null,
      contextItems: {
        id: "root",
        selectedOption: null,
        selectedOptionEcho: null,
        items: [
          { text: "aaaaa", id: "root-child-1" },
          { text: "aaaaa", id: "root-child-2" },
          {
            selectedOption: null,
            selectedOptionEcho: null,
            id: "parent1",
            icon: "fas fa-archway",
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
                  {
                    id: "parent2-child-1",
                    text: "itemc",
                    icon: "fas fa-archway"
                  },
                  {
                    id: "parent2-child-2",
                    text: "itemc",
                    icon: "fas fa-archway"
                  },
                  { id: "parent2-child-3", text: "itemc" }
                ]
              }
            ]
          },
          {
            text: "super-long-word-aaaaaaaaaaaaaa",
            id: "root-child-3",
            icon: "fab fa-adversal"
          },
          { text: "aaaaa", id: "root-child-4", icon: "fas fa-archway" },
          { text: "aaaaa", id: "root-child-5", icon: "fas fa-archway" },
          { text: "aaaaa", id: "root-child-6", icon: "fas fa-archway" }
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
      const resetNestedSelection = context => {
        // TO DO
        // return;

        if (context.selectedOption !== undefined) {
          context.selectedOption = null;
          context.selectedOptionEcho = null;
        }
        if (context.items) {
          context.items.forEach(e => {
            // if (e.items) {
            resetNestedSelection(e);
            // }
          });
        }
      };

      const parent = this.findContextItemById(parentId);
      const curSelected =
        this.findContextItemById(parent.selectedOption) || null;
      if (parent.selectedOptionEcho !== undefined) {
        parent.selectedOptionEcho = optionId;
      }

      if (!parent.selectedOption || (curSelected && !curSelected.items)) {
        resetNestedSelection(parent);

        return (parent.selectedOption = optionId);
      } else {
        setTimeout(() => {
          if (parent.selectedOptionEcho === optionId) {
            // resetNestedSelection(parent);
            parent.selectedOption = optionId;
          }
        }, 200);
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

      this.contextItems = JSON.parse(JSON.stringify(this.contextItemsCloned));
    },

    onContextClick(e) {
      eventBus.$emit("windowContextMenu", this.$attrs.target);
      const contextEl = document.querySelector(
        `.${this.$attrs.target}-context.context-app--main-container`
      );
      this.contextPosition.screenY = e.clientY;
      this.contextPosition.screenX = e.clientX -  (this.$attrs.rtl ? contextEl.getBoundingClientRect().width : 0);

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
      // this.
      if (!e.target || !e.target.classList.contains(this.$attrs.target))
        this.colapseExpanded();
    });
    window.legalContext = this;

    eventBus.$on("windowContextMenu", target => {
      //
      // return;
      if (target !== this.$attrs.target) this.colapseExpanded();
    });
  }
};
</script>

<style lang="scss" scoped>
span {
  cursor: pointer;
  font-size: 16px;
  font-family: Roboto, RobotoDraft, Helvetica, Arial, sans-serif;
}
.context-child-lgl {
  > span:first-child {
    border-top-left-radius: 5px;
    // border-top-right-radius: 5px;
    span {
      border-top-left-radius: 5px;
      border-top-right-radius: 5px;
    }
  }
  > span:last-child {
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    > span {
      border-bottom-left-radius: 5px;
      border-bottom-right-radius: 5px;
    }
  }
  position: fixed;
  border-radius: 5px;
  box-shadow: 0 8px 10px 0 rgba(0, 0, 0, 0.24);
  background: white;
}
.context-app--main-container {
  > span:first-child {
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    > span {
      border-top-left-radius: 5px;
      border-top-right-radius: 5px;
    }
  }
  > span:last-child {
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    > span {
      border-bottom-left-radius: 5px;
      border-bottom-right-radius: 5px;
    }
  }
  border-radius: 5px;
  box-shadow: 0 8px 10px 0 rgba(0, 0, 0, 0.24);
  position: fixed;
  // padding: 10px;
  background: white;
  color: black;
  span {
    // text-align: end;
    // padding: 5px;
    // padding-left: 50px;
    display: block;
  }
}
</style>
