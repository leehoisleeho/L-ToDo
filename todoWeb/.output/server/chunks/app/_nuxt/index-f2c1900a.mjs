import { getCurrentInstance } from 'vue';
import { e as extend } from './index-fbf4af6f.mjs';

function useExpose(apis) {
  const instance = getCurrentInstance();
  if (instance) {
    extend(instance.proxy, apis);
  }
}

export { useExpose as u };
//# sourceMappingURL=index-f2c1900a.mjs.map
