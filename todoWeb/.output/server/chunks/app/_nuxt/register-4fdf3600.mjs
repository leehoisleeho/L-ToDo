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

const _imports_0 = "" + buildAssetsURL("registerBg.a8cd1b31.png");
const _sfc_main = {
  __name: "register",
  __ssrInlineRender: true,
  setup(__props) {
    const username = ref("");
    const password = ref("");
    const router = useRouter();
    const submit = async () => {
      if (!checkPassword()) {
        if (username.value && password.value) {
          http.post("/user/create", {
            username: username.value,
            password: password.value
          }).then((res) => {
            if (res.error === 0) {
              router.push("login");
            }
          }).catch((err) => {
            console.log(err);
          });
        } else if (username.value === "")
          ;
        else if (password.value === "")
          ;
      }
    };
    const usernameIsError = ref(false);
    const userNamePlaceholder = ref("\u8BF7\u8F93\u5165\u7528\u6237\u540D");
    const inputFocus = () => {
      usernameIsError.value = false;
      userNamePlaceholder.value = "\u8BF7\u8F93\u5165\u7528\u6237\u540D";
    };
    const checkUserName = async () => {
      if (username.value) {
        let res = await http.post(`/user/check/${username.value}`, {
          username: username.value,
          password: password.value
        });
        if (res == 1) {
          username.value = "";
          usernameIsError.value = true;
          userNamePlaceholder.value = "\u7528\u6237\u540D\u5DF2\u5B58\u5728\uFF0C\u8BF7\u91CD\u65B0\u8F93\u5165";
        } else {
          usernameIsError.value = false;
          userNamePlaceholder.value = "\u8BF7\u8F93\u5165\u7528\u6237\u540D";
        }
      }
    };
    const password_2 = ref("");
    const checkPassword = () => {
      if (password.value !== password_2.value) {
        password.value = "";
        password_2.value = "";
        return false;
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_van_cell_group = stdin_default;
      const _component_van_field = stdin_default$1;
      const _component_van_button = stdin_default$2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "container" }, _attrs))} data-v-cfbcf0aa><header data-v-cfbcf0aa><img${ssrRenderAttr("src", _imports_0)} data-v-cfbcf0aa></header><h2 data-v-cfbcf0aa>\u6CE8\u518C Register</h2>`);
      _push(ssrRenderComponent(_component_van_cell_group, { inset: "" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_van_field, {
              onBlur: checkUserName,
              onFocus: inputFocus,
              modelValue: unref(username),
              "onUpdate:modelValue": ($event) => isRef(username) ? username.value = $event : null,
              placeholder: unref(userNamePlaceholder),
              error: unref(usernameIsError)
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_van_field, {
              type: "password",
              modelValue: unref(password),
              "onUpdate:modelValue": ($event) => isRef(password) ? password.value = $event : null,
              placeholder: "\u8BF7\u8F93\u5165\u5BC6\u7801"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_van_field, {
              type: "password",
              modelValue: unref(password_2),
              "onUpdate:modelValue": ($event) => isRef(password_2) ? password_2.value = $event : null,
              placeholder: "\u8BF7\u786E\u8BA4\u5BC6\u7801"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_van_field, {
                onBlur: checkUserName,
                onFocus: inputFocus,
                modelValue: unref(username),
                "onUpdate:modelValue": ($event) => isRef(username) ? username.value = $event : null,
                placeholder: unref(userNamePlaceholder),
                error: unref(usernameIsError)
              }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder", "error"]),
              createVNode(_component_van_field, {
                type: "password",
                modelValue: unref(password),
                "onUpdate:modelValue": ($event) => isRef(password) ? password.value = $event : null,
                placeholder: "\u8BF7\u8F93\u5165\u5BC6\u7801"
              }, null, 8, ["modelValue", "onUpdate:modelValue"]),
              createVNode(_component_van_field, {
                type: "password",
                modelValue: unref(password_2),
                "onUpdate:modelValue": ($event) => isRef(password_2) ? password_2.value = $event : null,
                placeholder: "\u8BF7\u786E\u8BA4\u5BC6\u7801"
              }, null, 8, ["modelValue", "onUpdate:modelValue"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="btnBox" data-v-cfbcf0aa>`);
      _push(ssrRenderComponent(_component_van_button, {
        type: "primary",
        block: "",
        plain: "",
        hairline: "",
        onClick: submit
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/register.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const register = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-cfbcf0aa"]]);

export { register as default };
//# sourceMappingURL=register-4fdf3600.mjs.map
