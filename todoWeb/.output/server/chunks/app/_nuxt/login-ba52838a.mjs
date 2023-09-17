import { b as buildAssetsURL } from '../../handlers/renderer.mjs';
import { s as stdin_default } from './index-2235ec22.mjs';
import { s as stdin_default$1 } from './index-dd6c6bba.mjs';
import { h as http, s as stdin_default$2 } from './index-fbf4af6f.mjs';
import { useSSRContext, ref, mergeProps, withCtx, unref, isRef, createVNode, createTextVNode } from 'vue';
import { u as useRouter } from '../server.mjs';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderComponent } from 'vue/server-renderer';
import { _ as _export_sfc } from './_plugin-vue_export-helper-cc2b3d55.mjs';
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
import './index-f2c1900a.mjs';
import 'axios';
import 'vue-router';

function showNotify(options) {
  {
    return;
  }
}
const _imports_0 = "" + buildAssetsURL("login.121d00d9.png");
const _sfc_main = {
  __name: "login",
  __ssrInlineRender: true,
  setup(__props) {
    const username = ref("");
    const password = ref("");
    const router = useRouter();
    const toList = async () => {
      http.post("/login", { username: username.value, password: password.value }).then((res) => {
        let token = res.token;
        if (res && res.error === 0) {
          try {
            localStorage.setItem("uuid", res.data.uuid);
            localStorage.setItem("token", token);
            showNotify({ type: "success", message: "\u767B\u5F55\u6210\u529F", duration: 600 });
            router.push("list");
          } catch (e) {
          }
        } else {
          showNotify({ type: "warning", message: res.msg, duration: 600 });
        }
      });
    };
    const toRegister = () => {
      router.push("register");
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_van_cell_group = stdin_default;
      const _component_van_field = stdin_default$1;
      const _component_van_button = stdin_default$2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "container" }, _attrs))} data-v-b3b07684><header data-v-b3b07684><img${ssrRenderAttr("src", _imports_0)} data-v-b3b07684></header><h2 data-v-b3b07684>\u767B\u5F55 Login</h2>`);
      _push(ssrRenderComponent(_component_van_cell_group, { inset: "" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_van_field, {
              modelValue: unref(username),
              "onUpdate:modelValue": ($event) => isRef(username) ? username.value = $event : null,
              "left-icon": "contact",
              placeholder: "\u8BF7\u8F93\u5165\u7528\u6237\u540D"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_van_field, {
              type: "password",
              modelValue: unref(password),
              "onUpdate:modelValue": ($event) => isRef(password) ? password.value = $event : null,
              "left-icon": "apps-o",
              placeholder: "\u8BF7\u8F93\u5165\u5BC6\u7801"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_van_field, {
                modelValue: unref(username),
                "onUpdate:modelValue": ($event) => isRef(username) ? username.value = $event : null,
                "left-icon": "contact",
                placeholder: "\u8BF7\u8F93\u5165\u7528\u6237\u540D"
              }, null, 8, ["modelValue", "onUpdate:modelValue"]),
              createVNode(_component_van_field, {
                type: "password",
                modelValue: unref(password),
                "onUpdate:modelValue": ($event) => isRef(password) ? password.value = $event : null,
                "left-icon": "apps-o",
                placeholder: "\u8BF7\u8F93\u5165\u5BC6\u7801"
              }, null, 8, ["modelValue", "onUpdate:modelValue"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="btnBox" data-v-b3b07684>`);
      _push(ssrRenderComponent(_component_van_button, {
        type: "primary",
        block: "",
        onClick: toList
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`\u767B\u5F55`);
          } else {
            return [
              createTextVNode("\u767B\u5F55")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_van_button, {
        type: "primary",
        block: "",
        onClick: toRegister,
        style: { "margin-top": "20px" },
        plain: "",
        hairline: ""
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`\u6CE8\u518C`);
          } else {
            return [
              createTextVNode("\u6CE8\u518C")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/login.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const login = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-b3b07684"]]);

export { login as default };
//# sourceMappingURL=login-ba52838a.mjs.map
