import { s as stdin_default } from './index-dd6c6bba.mjs';
import { t as timeConversion, _ as _imports_0, s as stdin_default$7, a as stdin_default$5, b as stdin_default$1 } from './util-03c95e3f.mjs';
import { h as http, s as stdin_default$2 } from './index-fbf4af6f.mjs';
import { useSSRContext, defineComponent, ref, unref, isRef, withCtx, createVNode, createTextVNode } from 'vue';
import { u as useRouter } from '../server.mjs';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderComponent, ssrRenderStyle } from 'vue/server-renderer';
import { _ as _export_sfc } from './_plugin-vue_export-helper-cc2b3d55.mjs';
import './index-f2c1900a.mjs';
import '../../handlers/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import '../../nitro/node-server.mjs';
import 'node:http';
import 'node:https';
import 'node:zlib';
import 'node:stream';
import 'node:buffer';
import 'node:util';
import 'node:url';
import 'node:net';
import 'node:fs';
import 'node:path';
import 'fs';
import 'path';
import 'devalue';
import '@unhead/ssr';
import 'unhead';
import '@unhead/shared';
import './index-cb3b05b3.mjs';
import 'axios';
import 'vue-router';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "create",
  __ssrInlineRender: true,
  setup(__props) {
    const router = useRouter();
    const groupChecked = ref([]);
    const showCalendar = ref(false);
    const onConfirm = (e) => {
      time.value = timeConversion(e);
      showCalendar.value = false;
    };
    const time = ref("\u9ED8\u8BA4\u9009\u62E9\u5F53\u524D\u65E5\u671F");
    time.value = timeConversion(/* @__PURE__ */ new Date());
    const title = ref("");
    const content = ref("");
    const urgentState = ref(0);
    const starState = ref(0);
    const getChecked = () => {
      groupChecked.value.forEach((item) => {
        if (item === "urgent") {
          urgentState.value = 1;
        } else if (item === "star") {
          starState.value = 1;
        }
      });
    };
    const submit = async () => {
      getChecked();
      if (title.value) {
        const data = {
          uuid: localStorage.getItem("uuid"),
          title: title.value,
          content: content.value ? content.value : "\u65E0\u63CF\u8FF0",
          time: time.value,
          urgentState: urgentState.value,
          starState: starState.value
        };
        http.post("/todolist/create", data).then((res) => {
          if (res.error === 0) {
            router.push("list");
          }
        });
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_van_field = stdin_default;
      const _component_van_checkbox_group = stdin_default$7;
      const _component_van_checkbox = stdin_default$5;
      const _component_van_calendar = stdin_default$1;
      const _component_van_button = stdin_default$2;
      _push(`<div${ssrRenderAttrs(_attrs)} data-v-8203e916><div class="header" data-v-8203e916><img${ssrRenderAttr("src", _imports_0)} alt="" data-v-8203e916></div>`);
      _push(ssrRenderComponent(_component_van_field, {
        type: "text",
        modelValue: unref(title),
        "onUpdate:modelValue": ($event) => isRef(title) ? title.value = $event : null,
        autosize: "",
        placeholder: "\u8BF7\u8F93\u5165\u6807\u9898"
      }, null, _parent));
      _push(ssrRenderComponent(_component_van_field, {
        rows: "5",
        autosize: "",
        type: "textarea",
        placeholder: "\u8BF7\u8F93\u5165\u8BE6\u60C5",
        modelValue: unref(content),
        "onUpdate:modelValue": ($event) => isRef(content) ? content.value = $event : null
      }, null, _parent));
      _push(ssrRenderComponent(_component_van_field, { name: "checkboxGroup" }, {
        input: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_van_checkbox_group, {
              modelValue: unref(groupChecked),
              "onUpdate:modelValue": ($event) => isRef(groupChecked) ? groupChecked.value = $event : null,
              direction: "horizontal"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_van_checkbox, {
                    name: "urgent",
                    "checked-color": "#e94235",
                    "icon-size": "20px"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<span class="state" style="${ssrRenderStyle({ "background": "#ea4335" })}" data-v-8203e916${_scopeId3}>\u7D27\u6025</span>`);
                      } else {
                        return [
                          createVNode("span", {
                            class: "state",
                            style: { "background": "#ea4335" }
                          }, "\u7D27\u6025")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_van_checkbox, {
                    name: "star",
                    "checked-color": "#fabb22",
                    "icon-size": "20px"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<span class="state" style="${ssrRenderStyle({ "background": "#fbbc23" })}" data-v-8203e916${_scopeId3}>\u661F\u6807</span>`);
                      } else {
                        return [
                          createVNode("span", {
                            class: "state",
                            style: { "background": "#fbbc23" }
                          }, "\u661F\u6807")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_van_checkbox, {
                      name: "urgent",
                      "checked-color": "#e94235",
                      "icon-size": "20px"
                    }, {
                      default: withCtx(() => [
                        createVNode("span", {
                          class: "state",
                          style: { "background": "#ea4335" }
                        }, "\u7D27\u6025")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_van_checkbox, {
                      name: "star",
                      "checked-color": "#fabb22",
                      "icon-size": "20px"
                    }, {
                      default: withCtx(() => [
                        createVNode("span", {
                          class: "state",
                          style: { "background": "#fbbc23" }
                        }, "\u661F\u6807")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_van_checkbox_group, {
                modelValue: unref(groupChecked),
                "onUpdate:modelValue": ($event) => isRef(groupChecked) ? groupChecked.value = $event : null,
                direction: "horizontal"
              }, {
                default: withCtx(() => [
                  createVNode(_component_van_checkbox, {
                    name: "urgent",
                    "checked-color": "#e94235",
                    "icon-size": "20px"
                  }, {
                    default: withCtx(() => [
                      createVNode("span", {
                        class: "state",
                        style: { "background": "#ea4335" }
                      }, "\u7D27\u6025")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_van_checkbox, {
                    name: "star",
                    "checked-color": "#fabb22",
                    "icon-size": "20px"
                  }, {
                    default: withCtx(() => [
                      createVNode("span", {
                        class: "state",
                        style: { "background": "#fbbc23" }
                      }, "\u661F\u6807")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["modelValue", "onUpdate:modelValue"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_van_field, {
        modelValue: unref(time),
        "onUpdate:modelValue": ($event) => isRef(time) ? time.value = $event : null,
        "is-link": "",
        readonly: "",
        name: "calendar",
        placeholder: "\u70B9\u51FB\u9009\u62E9\u65E5\u671F",
        onClick: ($event) => showCalendar.value = true
      }, null, _parent));
      _push(ssrRenderComponent(_component_van_calendar, {
        show: unref(showCalendar),
        "onUpdate:show": ($event) => isRef(showCalendar) ? showCalendar.value = $event : null,
        onConfirm
      }, null, _parent));
      _push(`<div class="btnBox" data-v-8203e916>`);
      _push(ssrRenderComponent(_component_van_button, {
        type: "primary",
        block: "",
        onClick: submit
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`\u65B0\u5EFA\u4E8B\u4EF6`);
          } else {
            return [
              createTextVNode("\u65B0\u5EFA\u4E8B\u4EF6")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/create.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const create = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-8203e916"]]);

export { create as default };
//# sourceMappingURL=create-6a4a4065.mjs.map
