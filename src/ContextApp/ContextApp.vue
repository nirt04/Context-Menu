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
          {},
          this.$attrs.rtl ? [textEl, icon] : [icon, textEl]
        );
        const iconTextCompute = () => {
          if (e.icon) {
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
        if (e.seperator) {
          return createElement("hr", {
            style: {
              opacity: "0.35"
            }
          });
        }
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
                  class: `${e.id}-childs context-child-lgl context-child-lgl-${
                    this.$attrs.rtl ? "rtl" : "ltr"
                  } ${this.$attrs.target}-context`,
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

    //  Visablity hidden every inner class unless he's targeted by the hover class track var

    return createElement(
      "div",
      {
        on: {
          blur: () => {
            this.isContextVisable = false;
            this.colapseExpanded();
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
  data() {
    return {
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
          { seperator: true, id: "root-child-sep-1" },
          {
            selectedOption: null,
            selectedOptionEcho: null,
            id: "parent1",
            icon: "fas fa-archway",
            text: "parent1",
            items: [
              { id: "parent1-child-1", text: "itemb" },
              { seperator: true, id: "parent1-child-sep" },
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
          { seperator: true, id: "root-child-sep-2" },
          {
            text: "super-long-word-aaaaaaaaaaaaaa",
            id: "root-child-3",
            icon: "fab fa-adversal"
          },
          { text: "aaaaa", id: "root-child-4", icon: "fas fa-archway" },
          { text: "aaaaa", id: "root-child-5", icon: "fas fa-archway" },
          { seperator: true, id: "root-child-sep-3" },
          { text: "aaaaa", id: "root-child-6", icon: "fas fa-archway" }
        ]
      },
      isContextVisable: false
    };
  },
  methods: {
    setElementPosition(el, parentEl, id, rtl, final) {

      const contextContainerEl = document.querySelector( `.${this.$attrs.target}-context.${id}` );
      const parentBound = parentEl.getBoundingClientRect();
      if (!rtl) el.style.left = `${parentBound.x + contextContainerEl.clientWidth}px`;
      else el.style.left = `${parentBound.x - el.clientWidth}px`;
      el.style.top = `${parentBound.y - 5}px`;
      if (this.isElementOverflowScreenY(el)) el.style.top = `${window.innerHeight - el.clientHeight - 5 || 1}px`;
      if (this.isElementOverflowScreenX(el) && !final) {
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
    },
    onOptionHover(optionId, parentId) {
      const resetNestedSelection = context => {
        if (context.selectedOption !== undefined) {
          context.selectedOption = null;
          context.selectedOptionEcho = null;
        }
        if (context.items) {
          context.items.forEach(e => {
            resetNestedSelection(e);
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

      //  recursive search the parent id, and set new selected option
    },
    isElementOverflowScreenX(el) {
      const rect = el.getBoundingClientRect();
      return rect.x < 0 || rect.y < 0;
    },
    isElementOverflowScreenY(el, rect) {
      if (!rect) rect = el.getBoundingClientRect();
      return rect.y + rect.height > window.innerHeight;
    },
    onContextExpend(id) {
      const parentEl = document.querySelector(
        `.${this.$attrs.target}-context.${id}`
      );
      const el = document.querySelector(
        `.${this.$attrs.target}-context.${id}-childs`
      );

      this.setElementPosition(el, parentEl, id, this.$attrs.rtl);
    },
    /* eslint-disable */
    colapseExpanded() {
      this.isContextVisable = false;
      const allChilds = document.querySelectorAll(
        `.${this.$attrs.target}-context.context-child-lgl-${
          this.$attrs.rtl ? "rtl" : "ltr"
        }`
      );
      allChilds.forEach(e => (e.style.display = "none"));

      this.contextItems = JSON.parse(JSON.stringify(this.contextItemsCloned));
    },
    onWindowContextClick(e) {
      if (!e.target || !e.target.classList.contains(this.$attrs.target))
        this.colapseExpanded();
    },

    onContextClick(e) {
      eventBus.$emit("windowContextMenu", this.$attrs.target);
      const contextEl = document.querySelector(
        `.${this.$attrs.target}-context.context-app--main-container`
      );

      this.contextPosition.screenY = e.clientY;
      this.contextPosition.screenX =
        e.clientX -
        (this.$attrs.rtl ? contextEl.getBoundingClientRect().width : 0);
      if (
        this.isElementOverflowScreenY(null, {
          y: e.clientY,
          height: contextEl.clientHeight
        })
      )
        this.contextPosition.screenY =
          window.innerHeight - contextEl.clientHeight - 5 || 1;
      // CHECK IF ROOT CONTAINER IS in valid position

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
      this.isContextVisable = false;
      this.colapseExpanded();
      this.onContextClick(e);
      console.log("Context clicked over", elContextTarget);
    });
    elContextTarget.addEventListener("click", e => {
      this.colapseExpanded();
    });
    window.addEventListener("click", e => {
      if (!e.target || !e.target.classList.contains(this.$attrs.target))
        this.colapseExpanded();
    });
    window.oncontextmenu = event => {
      eventBus.$emit("onGlobalWindowContext", event);
    };

    eventBus.$on("onGlobalWindowContext", event => {
      if (!event.target || !event.target.classList.contains(this.$attrs.target))
        this.colapseExpanded();
    });
  }
};
</script>

<style lang="scss" scoped>
hr {
  margin: 5px;
}
span {
  cursor: pointer;
  font-size: 16px;
  font-family: Roboto, RobotoDraft, Helvetica, Arial, sans-serif;
}
.context-child-lgl {
  > span:first-child {
    margin-top: 5px;
  }
  > span:last-child {
    margin-bottom: 5px;
  }
  position: fixed;
  border-radius: 5px;
  box-shadow: 0 8px 10px 0 rgba(0, 0, 0, 0.24);
  background: white;
}
.context-child-lgl-rtl {
  border-top-right-radius: 0px !important;
}
.context-child-lgl-ltr {
  border-top-left-radius: 0px !important;
}
.context-app--main-container {
  > span:first-child {
    margin-top: 5px;
  }
  > span:last-child {
    margin-bottom: 5px;
  }
  border-radius: 5px;
  box-shadow: 0 8px 10px 0 rgba(0, 0, 0, 0.24);
  position: fixed;
  background: white;
  color: black;
  span {
    display: block;
  }
}
</style>
