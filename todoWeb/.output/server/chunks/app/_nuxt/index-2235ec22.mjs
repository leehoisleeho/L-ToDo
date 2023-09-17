import { defineComponent, createVNode, Fragment, mergeProps } from 'vue';
import { c as createNamespace, t as truthProp, d as BORDER_TOP_BOTTOM } from './index-fbf4af6f.mjs';

const [name, bem] = createNamespace("cell-group");
const cellGroupProps = {
  title: String,
  inset: Boolean,
  border: truthProp
};
var stdin_default = /* @__PURE__ */ defineComponent({
  name,
  inheritAttrs: false,
  props: cellGroupProps,
  setup(props, {
    slots,
    attrs
  }) {
    const renderGroup = () => {
      var _a;
      return createVNode("div", mergeProps({
        "class": [bem({
          inset: props.inset
        }), {
          [BORDER_TOP_BOTTOM]: props.border && !props.inset
        }]
      }, attrs), [(_a = slots.default) == null ? void 0 : _a.call(slots)]);
    };
    const renderTitle = () => createVNode("div", {
      "class": bem("title", {
        inset: props.inset
      })
    }, [slots.title ? slots.title() : props.title]);
    return () => {
      if (props.title || slots.title) {
        return createVNode(Fragment, null, [renderTitle(), renderGroup()]);
      }
      return renderGroup();
    };
  }
});

export { stdin_default as s };
//# sourceMappingURL=index-2235ec22.mjs.map
