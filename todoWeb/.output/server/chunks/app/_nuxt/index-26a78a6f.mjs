import { b as buildAssetsURL } from '../../handlers/renderer.mjs';
import { h as http, s as stdin_default } from './index-fbf4af6f.mjs';
import { useSSRContext, mergeProps, withCtx, createTextVNode } from 'vue';
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
import 'axios';
import 'vue-router';

const _imports_0 = "" + buildAssetsURL("bs.0eb30c39.svg");
const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const router = useRouter();
    const toLogin = () => {
      let token = localStorage.getItem("token");
      http.post("/auth/check", { token }).then((res) => {
        console.log(res);
        if (res.decoded.error === 0) {
          router.push("list");
        } else {
          router.push("login");
        }
      }).catch((err) => {
        router.push("login");
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_van_button = stdin_default;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "container" }, _attrs))} data-v-754bb201><img${ssrRenderAttr("src", _imports_0)} data-v-754bb201><h1 data-v-754bb201>\u6B22\u8FCE\u4F7F\u7528L-ToDo</h1><p data-v-754bb201>\u4EBA\u751F\u4E4B\u8D25,\u975E\u50B2\u5373\u60F0,\u4E8C\u8005\u5FC5\u5C45\u5176\u4E00.\u52E4\u5219\u767E\u5F0A\u7686\u9664.</p><p data-v-754bb201>\u96C6\u4E2D\u8BB0\u5F55\u60A8\u9700\u8981\u5B8C\u6210\u7684\u6240\u6709\u4E8B\u9879</p><div class="btnBox" data-v-754bb201>`);
      _push(ssrRenderComponent(_component_van_button, {
        type: "primary",
        onClick: toLogin
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`\u5F00\u59CB\u4F7F\u7528`);
          } else {
            return [
              createTextVNode("\u5F00\u59CB\u4F7F\u7528")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-754bb201"]]);

export { index as default };
//# sourceMappingURL=index-26a78a6f.mjs.map
