import { b as buildAssetsURL } from '../../handlers/renderer.mjs';
import { useSSRContext, defineComponent, ref, mergeProps, unref, isRef, withCtx, createVNode, createTextVNode, watch, Fragment, nextTick } from 'vue';
import { c as createNamespace, s as stdin_default$1, p as pick, h as http, m as makeStringProp, a as makeArrayProp, n as numericProp, t as truthProp, u as unknownProp, B as BORDER_RIGHT, e as extend, I as Icon, b as BORDER_BOTTOM } from './index-fbf4af6f.mjs';
import { P as Popup } from './index-cb3b05b3.mjs';
import { u as useRouter } from '../server.mjs';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderComponent, ssrRenderClass, ssrRenderList, ssrRenderStyle, ssrInterpolate } from 'vue/server-renderer';
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
import './index-f2c1900a.mjs';
import 'vue-router';

const useSyncPropRef = (getProp, setProp) => {
  const propRef = ref(getProp());
  watch(getProp, (value) => {
    if (value !== propRef.value) {
      propRef.value = value;
    }
  });
  watch(propRef, (value) => {
    if (value !== getProp()) {
      setProp(value);
    }
  });
  return propRef;
};
function getWindow(node) {
  if (node == null) {
    return window;
  }
  if (node.toString() !== "[object Window]") {
    var ownerDocument = node.ownerDocument;
    return ownerDocument ? ownerDocument.defaultView || window : window;
  }
  return node;
}
function isElement(node) {
  var OwnElement = getWindow(node).Element;
  return node instanceof OwnElement || node instanceof Element;
}
function isHTMLElement(node) {
  var OwnElement = getWindow(node).HTMLElement;
  return node instanceof OwnElement || node instanceof HTMLElement;
}
function isShadowRoot(node) {
  if (typeof ShadowRoot === "undefined") {
    return false;
  }
  var OwnElement = getWindow(node).ShadowRoot;
  return node instanceof OwnElement || node instanceof ShadowRoot;
}
var round = Math.round;
function getUAString() {
  var uaData = navigator.userAgentData;
  if (uaData != null && uaData.brands) {
    return uaData.brands.map(function(item) {
      return item.brand + "/" + item.version;
    }).join(" ");
  }
  return navigator.userAgent;
}
function isLayoutViewport() {
  return !/^((?!chrome|android).)*safari/i.test(getUAString());
}
function getBoundingClientRect(element, includeScale, isFixedStrategy) {
  if (includeScale === void 0) {
    includeScale = false;
  }
  if (isFixedStrategy === void 0) {
    isFixedStrategy = false;
  }
  var clientRect = element.getBoundingClientRect();
  var scaleX = 1;
  var scaleY = 1;
  if (includeScale && isHTMLElement(element)) {
    scaleX = element.offsetWidth > 0 ? round(clientRect.width) / element.offsetWidth || 1 : 1;
    scaleY = element.offsetHeight > 0 ? round(clientRect.height) / element.offsetHeight || 1 : 1;
  }
  var _ref = isElement(element) ? getWindow(element) : window, visualViewport = _ref.visualViewport;
  var addVisualOffsets = !isLayoutViewport() && isFixedStrategy;
  var x = (clientRect.left + (addVisualOffsets && visualViewport ? visualViewport.offsetLeft : 0)) / scaleX;
  var y = (clientRect.top + (addVisualOffsets && visualViewport ? visualViewport.offsetTop : 0)) / scaleY;
  var width = clientRect.width / scaleX;
  var height = clientRect.height / scaleY;
  return {
    width,
    height,
    top: y,
    right: x + width,
    bottom: y + height,
    left: x,
    x,
    y
  };
}
function getWindowScroll(node) {
  var win = getWindow(node);
  var scrollLeft = win.pageXOffset;
  var scrollTop = win.pageYOffset;
  return {
    scrollLeft,
    scrollTop
  };
}
function getHTMLElementScroll(element) {
  return {
    scrollLeft: element.scrollLeft,
    scrollTop: element.scrollTop
  };
}
function getNodeScroll(node) {
  if (node === getWindow(node) || !isHTMLElement(node)) {
    return getWindowScroll(node);
  } else {
    return getHTMLElementScroll(node);
  }
}
function getNodeName(element) {
  return element ? (element.nodeName || "").toLowerCase() : null;
}
function getDocumentElement(element) {
  return ((isElement(element) ? element.ownerDocument : element.document) || window.document).documentElement;
}
function getWindowScrollBarX(element) {
  return getBoundingClientRect(getDocumentElement(element)).left + getWindowScroll(element).scrollLeft;
}
function getComputedStyle(element) {
  return getWindow(element).getComputedStyle(element);
}
function isScrollParent(element) {
  var _getComputedStyle = getComputedStyle(element), overflow = _getComputedStyle.overflow, overflowX = _getComputedStyle.overflowX, overflowY = _getComputedStyle.overflowY;
  return /auto|scroll|overlay|hidden/.test(overflow + overflowY + overflowX);
}
function isElementScaled(element) {
  var rect = element.getBoundingClientRect();
  var scaleX = round(rect.width) / element.offsetWidth || 1;
  var scaleY = round(rect.height) / element.offsetHeight || 1;
  return scaleX !== 1 || scaleY !== 1;
}
function getCompositeRect(elementOrVirtualElement, offsetParent, isFixed) {
  if (isFixed === void 0) {
    isFixed = false;
  }
  var isOffsetParentAnElement = isHTMLElement(offsetParent);
  var offsetParentIsScaled = isHTMLElement(offsetParent) && isElementScaled(offsetParent);
  var documentElement = getDocumentElement(offsetParent);
  var rect = getBoundingClientRect(elementOrVirtualElement, offsetParentIsScaled, isFixed);
  var scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  var offsets = {
    x: 0,
    y: 0
  };
  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
    if (getNodeName(offsetParent) !== "body" || isScrollParent(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }
    if (isHTMLElement(offsetParent)) {
      offsets = getBoundingClientRect(offsetParent, true);
      offsets.x += offsetParent.clientLeft;
      offsets.y += offsetParent.clientTop;
    } else if (documentElement) {
      offsets.x = getWindowScrollBarX(documentElement);
    }
  }
  return {
    x: rect.left + scroll.scrollLeft - offsets.x,
    y: rect.top + scroll.scrollTop - offsets.y,
    width: rect.width,
    height: rect.height
  };
}
function getLayoutRect(element) {
  var clientRect = getBoundingClientRect(element);
  var width = element.offsetWidth;
  var height = element.offsetHeight;
  if (Math.abs(clientRect.width - width) <= 1) {
    width = clientRect.width;
  }
  if (Math.abs(clientRect.height - height) <= 1) {
    height = clientRect.height;
  }
  return {
    x: element.offsetLeft,
    y: element.offsetTop,
    width,
    height
  };
}
function getParentNode(element) {
  if (getNodeName(element) === "html") {
    return element;
  }
  return element.assignedSlot || element.parentNode || (isShadowRoot(element) ? element.host : null) || getDocumentElement(element);
}
function getScrollParent(node) {
  if (["html", "body", "#document"].indexOf(getNodeName(node)) >= 0) {
    return node.ownerDocument.body;
  }
  if (isHTMLElement(node) && isScrollParent(node)) {
    return node;
  }
  return getScrollParent(getParentNode(node));
}
function listScrollParents(element, list2) {
  var _element$ownerDocumen;
  if (list2 === void 0) {
    list2 = [];
  }
  var scrollParent = getScrollParent(element);
  var isBody = scrollParent === ((_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body);
  var win = getWindow(scrollParent);
  var target = isBody ? [win].concat(win.visualViewport || [], isScrollParent(scrollParent) ? scrollParent : []) : scrollParent;
  var updatedList = list2.concat(target);
  return isBody ? updatedList : updatedList.concat(listScrollParents(getParentNode(target)));
}
function isTableElement(element) {
  return ["table", "td", "th"].indexOf(getNodeName(element)) >= 0;
}
function getTrueOffsetParent(element) {
  if (!isHTMLElement(element) || getComputedStyle(element).position === "fixed") {
    return null;
  }
  return element.offsetParent;
}
function getContainingBlock(element) {
  var isFirefox = /firefox/i.test(getUAString());
  var isIE = /Trident/i.test(getUAString());
  if (isIE && isHTMLElement(element)) {
    var elementCss = getComputedStyle(element);
    if (elementCss.position === "fixed") {
      return null;
    }
  }
  var currentNode = getParentNode(element);
  if (isShadowRoot(currentNode)) {
    currentNode = currentNode.host;
  }
  while (isHTMLElement(currentNode) && ["html", "body"].indexOf(getNodeName(currentNode)) < 0) {
    var css = getComputedStyle(currentNode);
    if (css.transform !== "none" || css.perspective !== "none" || css.contain === "paint" || ["transform", "perspective"].indexOf(css.willChange) !== -1 || isFirefox && css.willChange === "filter" || isFirefox && css.filter && css.filter !== "none") {
      return currentNode;
    } else {
      currentNode = currentNode.parentNode;
    }
  }
  return null;
}
function getOffsetParent(element) {
  var window2 = getWindow(element);
  var offsetParent = getTrueOffsetParent(element);
  while (offsetParent && isTableElement(offsetParent) && getComputedStyle(offsetParent).position === "static") {
    offsetParent = getTrueOffsetParent(offsetParent);
  }
  if (offsetParent && (getNodeName(offsetParent) === "html" || getNodeName(offsetParent) === "body" && getComputedStyle(offsetParent).position === "static")) {
    return window2;
  }
  return offsetParent || getContainingBlock(element) || window2;
}
var top = "top";
var bottom = "bottom";
var right = "right";
var left = "left";
var auto = "auto";
var basePlacements = [top, bottom, right, left];
var start = "start";
var end = "end";
var placements = /* @__PURE__ */ [].concat(basePlacements, [auto]).reduce(function(acc, placement) {
  return acc.concat([placement, placement + "-" + start, placement + "-" + end]);
}, []);
var beforeRead = "beforeRead";
var read = "read";
var afterRead = "afterRead";
var beforeMain = "beforeMain";
var main = "main";
var afterMain = "afterMain";
var beforeWrite = "beforeWrite";
var write = "write";
var afterWrite = "afterWrite";
var modifierPhases = [beforeRead, read, afterRead, beforeMain, main, afterMain, beforeWrite, write, afterWrite];
function order(modifiers) {
  var map = /* @__PURE__ */ new Map();
  var visited = /* @__PURE__ */ new Set();
  var result = [];
  modifiers.forEach(function(modifier) {
    map.set(modifier.name, modifier);
  });
  function sort(modifier) {
    visited.add(modifier.name);
    var requires = [].concat(modifier.requires || [], modifier.requiresIfExists || []);
    requires.forEach(function(dep) {
      if (!visited.has(dep)) {
        var depModifier = map.get(dep);
        if (depModifier) {
          sort(depModifier);
        }
      }
    });
    result.push(modifier);
  }
  modifiers.forEach(function(modifier) {
    if (!visited.has(modifier.name)) {
      sort(modifier);
    }
  });
  return result;
}
function orderModifiers(modifiers) {
  var orderedModifiers = order(modifiers);
  return modifierPhases.reduce(function(acc, phase) {
    return acc.concat(orderedModifiers.filter(function(modifier) {
      return modifier.phase === phase;
    }));
  }, []);
}
function debounce(fn2) {
  var pending;
  return function() {
    if (!pending) {
      pending = new Promise(function(resolve) {
        Promise.resolve().then(function() {
          pending = void 0;
          resolve(fn2());
        });
      });
    }
    return pending;
  };
}
function format(str) {
  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }
  return [].concat(args).reduce(function(p, c) {
    return p.replace(/%s/, c);
  }, str);
}
var INVALID_MODIFIER_ERROR = 'Popper: modifier "%s" provided an invalid %s property, expected %s but got %s';
var MISSING_DEPENDENCY_ERROR = 'Popper: modifier "%s" requires "%s", but "%s" modifier is not available';
var VALID_PROPERTIES = ["name", "enabled", "phase", "fn", "effect", "requires", "options"];
function validateModifiers(modifiers) {
  modifiers.forEach(function(modifier) {
    [].concat(Object.keys(modifier), VALID_PROPERTIES).filter(function(value, index2, self) {
      return self.indexOf(value) === index2;
    }).forEach(function(key) {
      switch (key) {
        case "name":
          if (typeof modifier.name !== "string") {
            console.error(format(INVALID_MODIFIER_ERROR, String(modifier.name), '"name"', '"string"', '"' + String(modifier.name) + '"'));
          }
          break;
        case "enabled":
          if (typeof modifier.enabled !== "boolean") {
            console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"enabled"', '"boolean"', '"' + String(modifier.enabled) + '"'));
          }
          break;
        case "phase":
          if (modifierPhases.indexOf(modifier.phase) < 0) {
            console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"phase"', "either " + modifierPhases.join(", "), '"' + String(modifier.phase) + '"'));
          }
          break;
        case "fn":
          if (typeof modifier.fn !== "function") {
            console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"fn"', '"function"', '"' + String(modifier.fn) + '"'));
          }
          break;
        case "effect":
          if (modifier.effect != null && typeof modifier.effect !== "function") {
            console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"effect"', '"function"', '"' + String(modifier.fn) + '"'));
          }
          break;
        case "requires":
          if (modifier.requires != null && !Array.isArray(modifier.requires)) {
            console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"requires"', '"array"', '"' + String(modifier.requires) + '"'));
          }
          break;
        case "requiresIfExists":
          if (!Array.isArray(modifier.requiresIfExists)) {
            console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"requiresIfExists"', '"array"', '"' + String(modifier.requiresIfExists) + '"'));
          }
          break;
        case "options":
        case "data":
          break;
        default:
          console.error('PopperJS: an invalid property has been provided to the "' + modifier.name + '" modifier, valid properties are ' + VALID_PROPERTIES.map(function(s) {
            return '"' + s + '"';
          }).join(", ") + '; but "' + key + '" was provided.');
      }
      modifier.requires && modifier.requires.forEach(function(requirement) {
        if (modifiers.find(function(mod) {
          return mod.name === requirement;
        }) == null) {
          console.error(format(MISSING_DEPENDENCY_ERROR, String(modifier.name), requirement, requirement));
        }
      });
    });
  });
}
function uniqueBy(arr, fn2) {
  var identifiers = /* @__PURE__ */ new Set();
  return arr.filter(function(item) {
    var identifier = fn2(item);
    if (!identifiers.has(identifier)) {
      identifiers.add(identifier);
      return true;
    }
  });
}
function getBasePlacement(placement) {
  return placement.split("-")[0];
}
function mergeByName(modifiers) {
  var merged = modifiers.reduce(function(merged2, current) {
    var existing = merged2[current.name];
    merged2[current.name] = existing ? Object.assign({}, existing, current, {
      options: Object.assign({}, existing.options, current.options),
      data: Object.assign({}, existing.data, current.data)
    }) : current;
    return merged2;
  }, {});
  return Object.keys(merged).map(function(key) {
    return merged[key];
  });
}
function getVariation(placement) {
  return placement.split("-")[1];
}
function getMainAxisFromPlacement(placement) {
  return ["top", "bottom"].indexOf(placement) >= 0 ? "x" : "y";
}
function computeOffsets(_ref) {
  var reference = _ref.reference, element = _ref.element, placement = _ref.placement;
  var basePlacement = placement ? getBasePlacement(placement) : null;
  var variation = placement ? getVariation(placement) : null;
  var commonX = reference.x + reference.width / 2 - element.width / 2;
  var commonY = reference.y + reference.height / 2 - element.height / 2;
  var offsets;
  switch (basePlacement) {
    case top:
      offsets = {
        x: commonX,
        y: reference.y - element.height
      };
      break;
    case bottom:
      offsets = {
        x: commonX,
        y: reference.y + reference.height
      };
      break;
    case right:
      offsets = {
        x: reference.x + reference.width,
        y: commonY
      };
      break;
    case left:
      offsets = {
        x: reference.x - element.width,
        y: commonY
      };
      break;
    default:
      offsets = {
        x: reference.x,
        y: reference.y
      };
  }
  var mainAxis = basePlacement ? getMainAxisFromPlacement(basePlacement) : null;
  if (mainAxis != null) {
    var len = mainAxis === "y" ? "height" : "width";
    switch (variation) {
      case start:
        offsets[mainAxis] = offsets[mainAxis] - (reference[len] / 2 - element[len] / 2);
        break;
      case end:
        offsets[mainAxis] = offsets[mainAxis] + (reference[len] / 2 - element[len] / 2);
        break;
    }
  }
  return offsets;
}
var INVALID_ELEMENT_ERROR = "Popper: Invalid reference or popper argument provided. They must be either a DOM element or virtual element.";
var INFINITE_LOOP_ERROR = "Popper: An infinite loop in the modifiers cycle has been detected! The cycle has been interrupted to prevent a browser crash.";
var DEFAULT_OPTIONS = {
  placement: "bottom",
  modifiers: [],
  strategy: "absolute"
};
function areValidElements() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  return !args.some(function(element) {
    return !(element && typeof element.getBoundingClientRect === "function");
  });
}
function popperGenerator(generatorOptions) {
  if (generatorOptions === void 0) {
    generatorOptions = {};
  }
  var _generatorOptions = generatorOptions, _generatorOptions$def = _generatorOptions.defaultModifiers, defaultModifiers2 = _generatorOptions$def === void 0 ? [] : _generatorOptions$def, _generatorOptions$def2 = _generatorOptions.defaultOptions, defaultOptions = _generatorOptions$def2 === void 0 ? DEFAULT_OPTIONS : _generatorOptions$def2;
  return function createPopper2(reference, popper, options) {
    if (options === void 0) {
      options = defaultOptions;
    }
    var state = {
      placement: "bottom",
      orderedModifiers: [],
      options: Object.assign({}, DEFAULT_OPTIONS, defaultOptions),
      modifiersData: {},
      elements: {
        reference,
        popper
      },
      attributes: {},
      styles: {}
    };
    var effectCleanupFns = [];
    var isDestroyed = false;
    var instance = {
      state,
      setOptions: function setOptions(setOptionsAction) {
        var options2 = typeof setOptionsAction === "function" ? setOptionsAction(state.options) : setOptionsAction;
        cleanupModifierEffects();
        state.options = Object.assign({}, defaultOptions, state.options, options2);
        state.scrollParents = {
          reference: isElement(reference) ? listScrollParents(reference) : reference.contextElement ? listScrollParents(reference.contextElement) : [],
          popper: listScrollParents(popper)
        };
        var orderedModifiers = orderModifiers(mergeByName([].concat(defaultModifiers2, state.options.modifiers)));
        state.orderedModifiers = orderedModifiers.filter(function(m) {
          return m.enabled;
        });
        {
          var modifiers = uniqueBy([].concat(orderedModifiers, state.options.modifiers), function(_ref) {
            var name2 = _ref.name;
            return name2;
          });
          validateModifiers(modifiers);
          if (getBasePlacement(state.options.placement) === auto) {
            var flipModifier = state.orderedModifiers.find(function(_ref2) {
              var name2 = _ref2.name;
              return name2 === "flip";
            });
            if (!flipModifier) {
              console.error(['Popper: "auto" placements require the "flip" modifier be', "present and enabled to work."].join(" "));
            }
          }
          var _getComputedStyle = getComputedStyle(popper), marginTop = _getComputedStyle.marginTop, marginRight = _getComputedStyle.marginRight, marginBottom = _getComputedStyle.marginBottom, marginLeft = _getComputedStyle.marginLeft;
          if ([marginTop, marginRight, marginBottom, marginLeft].some(function(margin) {
            return parseFloat(margin);
          })) {
            console.warn(['Popper: CSS "margin" styles cannot be used to apply padding', "between the popper and its reference element or boundary.", "To replicate margin, use the `offset` modifier, as well as", "the `padding` option in the `preventOverflow` and `flip`", "modifiers."].join(" "));
          }
        }
        runModifierEffects();
        return instance.update();
      },
      forceUpdate: function forceUpdate() {
        if (isDestroyed) {
          return;
        }
        var _state$elements = state.elements, reference2 = _state$elements.reference, popper2 = _state$elements.popper;
        if (!areValidElements(reference2, popper2)) {
          {
            console.error(INVALID_ELEMENT_ERROR);
          }
          return;
        }
        state.rects = {
          reference: getCompositeRect(reference2, getOffsetParent(popper2), state.options.strategy === "fixed"),
          popper: getLayoutRect(popper2)
        };
        state.reset = false;
        state.placement = state.options.placement;
        state.orderedModifiers.forEach(function(modifier) {
          return state.modifiersData[modifier.name] = Object.assign({}, modifier.data);
        });
        var __debug_loops__ = 0;
        for (var index2 = 0; index2 < state.orderedModifiers.length; index2++) {
          {
            __debug_loops__ += 1;
            if (__debug_loops__ > 100) {
              console.error(INFINITE_LOOP_ERROR);
              break;
            }
          }
          if (state.reset === true) {
            state.reset = false;
            index2 = -1;
            continue;
          }
          var _state$orderedModifie = state.orderedModifiers[index2], fn2 = _state$orderedModifie.fn, _state$orderedModifie2 = _state$orderedModifie.options, _options = _state$orderedModifie2 === void 0 ? {} : _state$orderedModifie2, name2 = _state$orderedModifie.name;
          if (typeof fn2 === "function") {
            state = fn2({
              state,
              options: _options,
              name: name2,
              instance
            }) || state;
          }
        }
      },
      update: debounce(function() {
        return new Promise(function(resolve) {
          instance.forceUpdate();
          resolve(state);
        });
      }),
      destroy: function destroy() {
        cleanupModifierEffects();
        isDestroyed = true;
      }
    };
    if (!areValidElements(reference, popper)) {
      {
        console.error(INVALID_ELEMENT_ERROR);
      }
      return instance;
    }
    instance.setOptions(options).then(function(state2) {
      if (!isDestroyed && options.onFirstUpdate) {
        options.onFirstUpdate(state2);
      }
    });
    function runModifierEffects() {
      state.orderedModifiers.forEach(function(_ref3) {
        var name2 = _ref3.name, _ref3$options = _ref3.options, options2 = _ref3$options === void 0 ? {} : _ref3$options, effect3 = _ref3.effect;
        if (typeof effect3 === "function") {
          var cleanupFn = effect3({
            state,
            name: name2,
            instance,
            options: options2
          });
          var noopFn = function noopFn2() {
          };
          effectCleanupFns.push(cleanupFn || noopFn);
        }
      });
    }
    function cleanupModifierEffects() {
      effectCleanupFns.forEach(function(fn2) {
        return fn2();
      });
      effectCleanupFns = [];
    }
    return instance;
  };
}
var passive = {
  passive: true
};
function effect(_ref) {
  var state = _ref.state, instance = _ref.instance, options = _ref.options;
  var _options$scroll = options.scroll, scroll = _options$scroll === void 0 ? true : _options$scroll, _options$resize = options.resize, resize = _options$resize === void 0 ? true : _options$resize;
  var window2 = getWindow(state.elements.popper);
  var scrollParents = [].concat(state.scrollParents.reference, state.scrollParents.popper);
  if (scroll) {
    scrollParents.forEach(function(scrollParent) {
      scrollParent.addEventListener("scroll", instance.update, passive);
    });
  }
  if (resize) {
    window2.addEventListener("resize", instance.update, passive);
  }
  return function() {
    if (scroll) {
      scrollParents.forEach(function(scrollParent) {
        scrollParent.removeEventListener("scroll", instance.update, passive);
      });
    }
    if (resize) {
      window2.removeEventListener("resize", instance.update, passive);
    }
  };
}
var eventListeners_default = {
  name: "eventListeners",
  enabled: true,
  phase: "write",
  fn: function fn() {
  },
  effect,
  data: {}
};
function popperOffsets(_ref) {
  var state = _ref.state, name2 = _ref.name;
  state.modifiersData[name2] = computeOffsets({
    reference: state.rects.reference,
    element: state.rects.popper,
    strategy: "absolute",
    placement: state.placement
  });
}
var popperOffsets_default = {
  name: "popperOffsets",
  enabled: true,
  phase: "read",
  fn: popperOffsets,
  data: {}
};
var unsetSides = {
  top: "auto",
  right: "auto",
  bottom: "auto",
  left: "auto"
};
function roundOffsetsByDPR(_ref) {
  var x = _ref.x, y = _ref.y;
  var win = window;
  var dpr = win.devicePixelRatio || 1;
  return {
    x: round(x * dpr) / dpr || 0,
    y: round(y * dpr) / dpr || 0
  };
}
function mapToStyles(_ref2) {
  var _Object$assign2;
  var popper = _ref2.popper, popperRect = _ref2.popperRect, placement = _ref2.placement, variation = _ref2.variation, offsets = _ref2.offsets, position = _ref2.position, gpuAcceleration = _ref2.gpuAcceleration, adaptive = _ref2.adaptive, roundOffsets = _ref2.roundOffsets, isFixed = _ref2.isFixed;
  var _offsets$x = offsets.x, x = _offsets$x === void 0 ? 0 : _offsets$x, _offsets$y = offsets.y, y = _offsets$y === void 0 ? 0 : _offsets$y;
  var _ref3 = typeof roundOffsets === "function" ? roundOffsets({
    x,
    y
  }) : {
    x,
    y
  };
  x = _ref3.x;
  y = _ref3.y;
  var hasX = offsets.hasOwnProperty("x");
  var hasY = offsets.hasOwnProperty("y");
  var sideX = left;
  var sideY = top;
  var win = window;
  if (adaptive) {
    var offsetParent = getOffsetParent(popper);
    var heightProp = "clientHeight";
    var widthProp = "clientWidth";
    if (offsetParent === getWindow(popper)) {
      offsetParent = getDocumentElement(popper);
      if (getComputedStyle(offsetParent).position !== "static" && position === "absolute") {
        heightProp = "scrollHeight";
        widthProp = "scrollWidth";
      }
    }
    offsetParent = offsetParent;
    if (placement === top || (placement === left || placement === right) && variation === end) {
      sideY = bottom;
      var offsetY = isFixed && offsetParent === win && win.visualViewport ? win.visualViewport.height : offsetParent[heightProp];
      y -= offsetY - popperRect.height;
      y *= gpuAcceleration ? 1 : -1;
    }
    if (placement === left || (placement === top || placement === bottom) && variation === end) {
      sideX = right;
      var offsetX = isFixed && offsetParent === win && win.visualViewport ? win.visualViewport.width : offsetParent[widthProp];
      x -= offsetX - popperRect.width;
      x *= gpuAcceleration ? 1 : -1;
    }
  }
  var commonStyles = Object.assign({
    position
  }, adaptive && unsetSides);
  var _ref4 = roundOffsets === true ? roundOffsetsByDPR({
    x,
    y
  }) : {
    x,
    y
  };
  x = _ref4.x;
  y = _ref4.y;
  if (gpuAcceleration) {
    var _Object$assign;
    return Object.assign({}, commonStyles, (_Object$assign = {}, _Object$assign[sideY] = hasY ? "0" : "", _Object$assign[sideX] = hasX ? "0" : "", _Object$assign.transform = (win.devicePixelRatio || 1) <= 1 ? "translate(" + x + "px, " + y + "px)" : "translate3d(" + x + "px, " + y + "px, 0)", _Object$assign));
  }
  return Object.assign({}, commonStyles, (_Object$assign2 = {}, _Object$assign2[sideY] = hasY ? y + "px" : "", _Object$assign2[sideX] = hasX ? x + "px" : "", _Object$assign2.transform = "", _Object$assign2));
}
function computeStyles(_ref5) {
  var state = _ref5.state, options = _ref5.options;
  var _options$gpuAccelerat = options.gpuAcceleration, gpuAcceleration = _options$gpuAccelerat === void 0 ? true : _options$gpuAccelerat, _options$adaptive = options.adaptive, adaptive = _options$adaptive === void 0 ? true : _options$adaptive, _options$roundOffsets = options.roundOffsets, roundOffsets = _options$roundOffsets === void 0 ? true : _options$roundOffsets;
  {
    var transitionProperty = getComputedStyle(state.elements.popper).transitionProperty || "";
    if (adaptive && ["transform", "top", "right", "bottom", "left"].some(function(property) {
      return transitionProperty.indexOf(property) >= 0;
    })) {
      console.warn(["Popper: Detected CSS transitions on at least one of the following", 'CSS properties: "transform", "top", "right", "bottom", "left".', "\n\n", 'Disable the "computeStyles" modifier\'s `adaptive` option to allow', "for smooth transitions, or remove these properties from the CSS", "transition declaration on the popper element if only transitioning", "opacity or background-color for example.", "\n\n", "We recommend using the popper element as a wrapper around an inner", "element that can have any CSS property transitioned for animations."].join(" "));
    }
  }
  var commonStyles = {
    placement: getBasePlacement(state.placement),
    variation: getVariation(state.placement),
    popper: state.elements.popper,
    popperRect: state.rects.popper,
    gpuAcceleration,
    isFixed: state.options.strategy === "fixed"
  };
  if (state.modifiersData.popperOffsets != null) {
    state.styles.popper = Object.assign({}, state.styles.popper, mapToStyles(Object.assign({}, commonStyles, {
      offsets: state.modifiersData.popperOffsets,
      position: state.options.strategy,
      adaptive,
      roundOffsets
    })));
  }
  if (state.modifiersData.arrow != null) {
    state.styles.arrow = Object.assign({}, state.styles.arrow, mapToStyles(Object.assign({}, commonStyles, {
      offsets: state.modifiersData.arrow,
      position: "absolute",
      adaptive: false,
      roundOffsets
    })));
  }
  state.attributes.popper = Object.assign({}, state.attributes.popper, {
    "data-popper-placement": state.placement
  });
}
var computeStyles_default = {
  name: "computeStyles",
  enabled: true,
  phase: "beforeWrite",
  fn: computeStyles,
  data: {}
};
function applyStyles(_ref) {
  var state = _ref.state;
  Object.keys(state.elements).forEach(function(name2) {
    var style = state.styles[name2] || {};
    var attributes = state.attributes[name2] || {};
    var element = state.elements[name2];
    if (!isHTMLElement(element) || !getNodeName(element)) {
      return;
    }
    Object.assign(element.style, style);
    Object.keys(attributes).forEach(function(name22) {
      var value = attributes[name22];
      if (value === false) {
        element.removeAttribute(name22);
      } else {
        element.setAttribute(name22, value === true ? "" : value);
      }
    });
  });
}
function effect2(_ref2) {
  var state = _ref2.state;
  var initialStyles = {
    popper: {
      position: state.options.strategy,
      left: "0",
      top: "0",
      margin: "0"
    },
    arrow: {
      position: "absolute"
    },
    reference: {}
  };
  Object.assign(state.elements.popper.style, initialStyles.popper);
  state.styles = initialStyles;
  if (state.elements.arrow) {
    Object.assign(state.elements.arrow.style, initialStyles.arrow);
  }
  return function() {
    Object.keys(state.elements).forEach(function(name2) {
      var element = state.elements[name2];
      var attributes = state.attributes[name2] || {};
      var styleProperties = Object.keys(state.styles.hasOwnProperty(name2) ? state.styles[name2] : initialStyles[name2]);
      var style = styleProperties.reduce(function(style2, property) {
        style2[property] = "";
        return style2;
      }, {});
      if (!isHTMLElement(element) || !getNodeName(element)) {
        return;
      }
      Object.assign(element.style, style);
      Object.keys(attributes).forEach(function(attribute) {
        element.removeAttribute(attribute);
      });
    });
  };
}
var applyStyles_default = {
  name: "applyStyles",
  enabled: true,
  phase: "write",
  fn: applyStyles,
  effect: effect2,
  requires: ["computeStyles"]
};
var defaultModifiers = [eventListeners_default, popperOffsets_default, computeStyles_default, applyStyles_default];
var createPopper = /* @__PURE__ */ popperGenerator({
  defaultModifiers
});
function distanceAndSkiddingToXY(placement, rects, offset2) {
  var basePlacement = getBasePlacement(placement);
  var invertDistance = [left, top].indexOf(basePlacement) >= 0 ? -1 : 1;
  var _ref = typeof offset2 === "function" ? offset2(Object.assign({}, rects, {
    placement
  })) : offset2, skidding = _ref[0], distance = _ref[1];
  skidding = skidding || 0;
  distance = (distance || 0) * invertDistance;
  return [left, right].indexOf(basePlacement) >= 0 ? {
    x: distance,
    y: skidding
  } : {
    x: skidding,
    y: distance
  };
}
function offset(_ref2) {
  var state = _ref2.state, options = _ref2.options, name2 = _ref2.name;
  var _options$offset = options.offset, offset2 = _options$offset === void 0 ? [0, 0] : _options$offset;
  var data = placements.reduce(function(acc, placement) {
    acc[placement] = distanceAndSkiddingToXY(placement, state.rects, offset2);
    return acc;
  }, {});
  var _data$state$placement = data[state.placement], x = _data$state$placement.x, y = _data$state$placement.y;
  if (state.modifiersData.popperOffsets != null) {
    state.modifiersData.popperOffsets.x += x;
    state.modifiersData.popperOffsets.y += y;
  }
  state.modifiersData[name2] = data;
}
var offset_default = {
  name: "offset",
  enabled: true,
  phase: "main",
  requires: ["popperOffsets"],
  fn: offset
};
const [name, bem] = createNamespace("popover");
const popupProps = ["overlay", "duration", "teleport", "overlayStyle", "overlayClass", "closeOnClickOverlay"];
const popoverProps = {
  show: Boolean,
  theme: makeStringProp("light"),
  overlay: Boolean,
  actions: makeArrayProp(),
  actionsDirection: makeStringProp("vertical"),
  trigger: makeStringProp("click"),
  duration: numericProp,
  showArrow: truthProp,
  placement: makeStringProp("bottom"),
  iconPrefix: String,
  overlayClass: unknownProp,
  overlayStyle: Object,
  closeOnClickAction: truthProp,
  closeOnClickOverlay: truthProp,
  closeOnClickOutside: truthProp,
  offset: {
    type: Array,
    default: () => [0, 8]
  },
  teleport: {
    type: [String, Object],
    default: "body"
  }
};
var stdin_default = /* @__PURE__ */ defineComponent({
  name,
  props: popoverProps,
  emits: ["select", "touchstart", "update:show"],
  setup(props, {
    emit,
    slots,
    attrs
  }) {
    let popper;
    ref();
    const wrapperRef = ref();
    const popoverRef = ref();
    const show = useSyncPropRef(() => props.show, (value) => emit("update:show", value));
    const getPopoverOptions = () => ({
      placement: props.placement,
      modifiers: [{
        name: "computeStyles",
        options: {
          adaptive: false,
          gpuAcceleration: false
        }
      }, extend({}, offset_default, {
        options: {
          offset: props.offset
        }
      })]
    });
    const createPopperInstance = () => {
      if (wrapperRef.value && popoverRef.value) {
        return createPopper(wrapperRef.value, popoverRef.value.popupRef.value, getPopoverOptions());
      }
      return null;
    };
    const updateLocation = () => {
      nextTick(() => {
        if (!show.value) {
          return;
        }
        if (!popper) {
          popper = createPopperInstance();
        } else {
          popper.setOptions(getPopoverOptions());
        }
      });
    };
    const updateShow = (value) => {
      show.value = value;
    };
    const onClickWrapper = () => {
      if (props.trigger === "click") {
        show.value = !show.value;
      }
    };
    const onClickAction = (action, index2) => {
      if (action.disabled) {
        return;
      }
      emit("select", action, index2);
      if (props.closeOnClickAction) {
        show.value = false;
      }
    };
    const renderActionContent = (action, index2) => {
      if (slots.action) {
        return slots.action({
          action,
          index: index2
        });
      }
      return [action.icon && createVNode(Icon, {
        "name": action.icon,
        "classPrefix": props.iconPrefix,
        "class": bem("action-icon")
      }, null), createVNode("div", {
        "class": [bem("action-text"), {
          [BORDER_BOTTOM]: props.actionsDirection === "vertical"
        }]
      }, [action.text])];
    };
    const renderAction = (action, index2) => {
      const {
        icon,
        color,
        disabled,
        className
      } = action;
      return createVNode("div", {
        "role": "menuitem",
        "class": [bem("action", {
          disabled,
          "with-icon": icon
        }), {
          [BORDER_RIGHT]: props.actionsDirection === "horizontal"
        }, className],
        "style": {
          color
        },
        "tabindex": disabled ? void 0 : 0,
        "aria-disabled": disabled || void 0,
        "onClick": () => onClickAction(action, index2)
      }, [renderActionContent(action, index2)]);
    };
    watch(() => [show.value, props.offset, props.placement], updateLocation);
    return () => {
      var _a;
      return createVNode(Fragment, null, [createVNode("span", {
        "ref": wrapperRef,
        "class": bem("wrapper"),
        "onClick": onClickWrapper
      }, [(_a = slots.reference) == null ? void 0 : _a.call(slots)]), createVNode(Popup, mergeProps({
        "ref": popoverRef,
        "show": show.value,
        "class": bem([props.theme]),
        "position": "",
        "transition": "van-popover-zoom",
        "lockScroll": false,
        "onUpdate:show": updateShow
      }, attrs, pick(props, popupProps)), {
        default: () => [props.showArrow && createVNode("div", {
          "class": bem("arrow")
        }, null), createVNode("div", {
          "role": "menu",
          "class": bem("content", props.actionsDirection)
        }, [slots.default ? slots.default() : props.actions.map(renderAction)])]
      })]);
    };
  }
});
const _imports_0 = "" + buildAssetsURL("logo.25c115d5.png");
const _imports_1 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAAAXNSR0IArs4c6QAABJlJREFUeF7tnWtyozAQBsXJsj5ZNifb5GTaEgUpO34sbaNZGJqq/JsQ0fpoBCaeoRxwq7X+KqW0n7dSyteE4HMYhs+j4RiOcsDTpL9PE//osFsIPo4ShkMEoNb6u5TSJp9sLQTt91Jv6QNQa/2z4Ky/N8ntsnDKnIDUAXjyzP8536lDkDYAK03+HIZT1jVB5gDUNdU9DENKVikPauWzP7UFDMByTaRcC2QNwCsr/0PdEWQNwKrX/zkRGdcB6QIwPfFrBuixpbsbMAAsJgaA8Yqv1gCMuQZgvDQA4xVfrQEYcw3AeGkAxiu+WgMw5hqA8dIAjFd8tQZgzDUA46UBGK/4ag3AmGsAxksDMF7x1RqAMdcAjJcGYLziqzUAY64BGC8NwHjFV2sAxlwDMF4agPGKr9YAjLkGYLw0AOMVX60BGHMNwHhpAMYrvloDMOYagPHSAIxXfLUGYMw1AOOlARiv+GoNwJhrAMZLAzBe8dUagDHXAIyXBmC84qs1AGOuARgvDcB4xVdrAMZcAzBeGoDxiq/WAIy5BmC8NADjFV+tARhzDcB4aQDGK75aAzDmGoDx0gCMV3y1BmDMkQEmuOwvxFe3XkC0O8jSUX6UUjbfV4h8tf3DAJz12WmAGli3/RBoQR0bYj1qfXMzAJ01uh+EuUZ6swfSVQBe7LGTC1m+o7kKwUUAnPx8M37jiC76HnwHoFOXjUMQ3eFBfptgDIDX/B1O4etDHp9pzAHo0WHj9SG6h54ExkvBHIAuHTZ6jt59v06gdUAZ1P/rIHe8h1MLwDN9dXd8zA79jMCHATh2Hj5bAFwAHjcEGuC4cz8e+RiA9iFPrzZrB+e7+cP3NnDzU9RxgONt4PQk0HVAR9Ab3fX4ONhHwRudnd7Dmk9+PwzqTXqb+7/8MGgeo7eE25ytlUd18U7ArRdCfDK4MvEN7e7xCyFnJjAEG5q1FYbS3g9sk3/1Quu/XgptQWjbmy+FrjANcbuYJ7q9xdxeCr37JrOvhbNJ8R9DGK/46s5PNg1A/JSyv2gAGC90CWC7/j/VBoBxNwCMl5cAxiu+WgMw5hqA8dIAjFd8tQZgzDUA46UBGK/4ag3AmGsAxksDMF7x1RqAMdcAjJcGYLziqzUAY64BGC8NwHjFV2sAxlwDMF4agPGKr9YAjLkGYLw0AOMVX60BGHMNwHhpAMYrvloDMOYagPHSAIxXfLUGYMw1AOOlARiv+GoNwJhrAMZLAzBe8dUagDHXAIyXBmC84qs1AGOuARgvDcB4xVdrAMZcAzBeGoDxiq/WAIy5BmC8NADjFV+tARhzDcB4aQDGK75aAzDmGoDx0gCMV3y1BmDMNQDjpQEYr/hqDcCYpzNAO/xaa5dGmPN37DPE267OGoAeHVAuum5ve1qXj84ALGd19VXry391u5VZA9CjE5oB2G6Or0e29jog4/W/UUtpgGkhuKYFUp79qQMwhWCNxWDayU8fgBVCkHLlf37BTHsJOD/IWuszPZBSn/kzn0ME4GxN8L6g99HdBkt7WgQvHethAvDDCG2B2H7a1hpifZVSmu7vNldaCnRvdX8BrgV+TLLcisgAAAAASUVORK5CYII=";
const _imports_2 = "" + buildAssetsURL("empty.ab25a4a1.png");
const _imports_3 = "" + buildAssetsURL("doneBg.44561b7c.png");
const _imports_4 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAAAXNSR0IArs4c6QAAByRJREFUeF7tndtS4zAMhpv2jehwDTwZy5MB10x5I5odd2s2hLaS7F8+yOJmd8hJ0v9Zkp2QTBv/GToC09Deu/MbB2BwCBwAB2DwCAzuvmcAB2DwCAzu/hAZ4OPj4zHqvN1uv/9/Tfvj8fgWtt3f35/+tfxjCoAodBB5mqaHINw8z6TglMDTNL3N8/we9gtwWAKjewCC6Lvd7hklNgXDYvuLBSC6BCCKjhjdAsGpXV/2+/0faqfWtncDQKOiX9LzlBl6gaF5ADoS/iIMrYPQLACdC7+Godny0BwAxoRvHoSmADgcDqGJOnX0Vn/ilLKV0tAEAGHUb7fbV6uiX/GribJQHYDPz8/XxqZzpTmsCkI1AIzXeilE1SCoAsAItV5KwGazqQJBcQBc/NtoHI/Hp5L3GooC4PWelxdKQlAMABefJ/7yZlOJqaI6AN7siYVfHqDeF6gDcDgc5qwQ+MGqEKgC4GkfQ69mT6AGgIuPET+eRQsCFQB8qocVXxMCOAAuvo744azhRtLd3d0T8gpQAFx8pDRXzwVtCtEAeMdfhAHcsjEMAB/9ZZRH9wMQAFz8suIj+wEUAJ76yzMQrpjdD2QD4KO/jvLxqvv9PkvDrINd/LriI0pBLgCe+uszEP5eMfkZgmQAfPQ3oPzZhJwFohwAfPS3w0ByFkgCwEd/mvJhpIYj45+an2v4A+Kp6NQskAqAj34hA1SdRgwq6hqXTBYDgDBUGLuud5eMzNzYSq4Vg+oA6OIlXqjJfY5CmgVSAPD0z4NGLH48beZjdKLrigDITVG8uJnYSyTC2uOcLCAtA1IAfPTTfGaJH06f+8eykjLABsBHP6084uYMAgBJFnAAWLqydsoe+fEquRkgnId7k4gNQE5dYoWv751g4ocwILIttwywAcjsTPuW97b1UPGbBABBpFEC4OKfAchutrl9ACsDOAAX8dUSH/aeJE4fwALA6/8vAFTERzR/S0s5fQALAK//PwDoQvxgsQOAbzy6Ef/sOmkvmQHQaQmvSbEzksFMsUQzvpxGkATAG8CTrN2JH4x2AFKG5O9juhQ/ukHNBMgMMPgMoGvxOUvCDsD1LNG9+A5AegkwIT5nKugZwFjNX7tDrQWQAAy2CGRm5EcQmgYgvjs/fqdv8U2/Gt8MMCc+pARoZIAg/NfX18utd+IWXn8wKT4EAIVpIDvYhSBg2yPpKTVX+CR2ZJcANADUwsTaOeVAmha/xQyQFHAlCJJsoUafkq3UZa9ubyYDcNalb3kJDuwQ4re2EJQddBAE2XZcAhVkW/JIv3YgVXI56wCoR5Qggc8MNMSGwn1KFhTZAGQG/Nt4qhZJvEy0aTjxOWWXzACJwf6lJ8cYRQiGE/8cS9JvEoBwIsRiEBqAYBcTTjIIEvDivsxrp5waeQzpezEAOHPSFM8JIcgAKFwz5ZQqx3DKLgsA5GIQ1ZSkRuKCjUOLz5kChn1YACDTnUYpiNAsIBhe/GYB4DYnqZkgwKrx4UXkIEj1TXgcaxCwMgCqEVw5wDJQ6LTK7h2KH+LAii8bAGQfsFCJZaSKqsyTdio+/v0AioFoFgJFn5n4pe0m6bPYGUCpDEQPm4OgV/GlPZYIAKUy0BwEnYvPTv/saWDB1a/qmaB38bnNX9RUlAGUy0D1TGBAfHb3nwyAchmoBoER8UXpX1wCwgEFA1WsHBT0Ka2t5x8ljpm4BARbCmUBcTrjx+n/nobEF4/+pAxQOAuoQmBJfGnzl9wDxAMLZgEVCIyJnzT6kzNAhSwAhcCa+KmjPwuAwr0AbHZgUPzk0Z8NQKF1gXVvJ+50Cy5kpfShucckxwMFAOqxcUkgxE5bHPk5qT+7CVyqVbghFJcDo+KzXgRJjaqkdYD1SSsH+Go2CHbtdrtnxHf5qEBW2C7OgpdshABw7gVqlIJvn+JHGeMvjIp+ck9yv58CEwZApVkB5Z/J7cgnq6EAVJoVmBT5hlOQ1A9tApfGVu4HrMMAFR8yDbwU8UKvdrEuNmz941ag4CUgXswhwPGJbPrWVqkB0MLMACdBvTNpiq9WApbh8kyQBw+y41ddB7jlpkMgh4DzLkX5WX8foVoCPBOkSaSd9pdWFQPAewIeDCXFL9IDrN32cnATBPg8n8KuaAZYGlPpDiIVj5rbi4tfJQN4X/CTsVLN3jWyq2UAXzA6RaDKqK/WBPpU8V8Eao/6JgEIRhl/gCPGvfqobxYAy2WhpVHfPACWQGhV+Bjj6k0gZ94V1g6maXro6TGv1oXvCoBo7Plhk8fNZlPjo1Ikq72I3k0JYMwawi5VYYiiB0M03k9IUpe5QxclgPJxkRnUgYhPH1NfPaNsbmW7CQDWwQxAhN/F7xCm9A9R6Hme3+N3DXsc4RRoJgGgnF72FPH/FsXlxGFoADgBsr6PA2BdYcI/B8ABGDwCg7vvGcABGDwCg7vvGWBwAP4C6s6uvTwZ0LQAAAAASUVORK5CYII=";
const _imports_5 = "data:image/png;base64,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";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "list",
  __ssrInlineRender: true,
  setup(__props) {
    const router = useRouter();
    const list2 = ref([]);
    const isEmpty = ref(false);
    const getList = async () => {
      isEmpty.value = false;
      let url = "/todolist/find/" + localStorage.getItem("uuid");
      let res = await http.get(url);
      let arr = res.data.reverse();
      if (n.value === 0) {
        list2.value = arr.filter((item) => {
          return item.starState === 1 && item.done === 0;
        });
      } else if (n.value === 1) {
        list2.value = arr.filter((item) => {
          return item.urgentState === 1 && item.done === 0;
        });
      } else if (n.value === 2) {
        list2.value = arr;
      } else if (n.value === 3) {
        list2.value = arr.filter((item) => {
          return item.done === 0;
        });
      } else if (n.value === 4) {
        list2.value = arr.filter((item) => {
          return item.done === 1;
        });
      }
      if (list2.value.length === 0)
        isEmpty.value = true;
    };
    const n = ref(3);
    const newDate = (e) => {
      let newTime = /* @__PURE__ */ new Date();
      let n2 = new Date(e);
      return Math.floor((n2 - newTime) / (1e3 * 60 * 60 * 24)) + 1;
    };
    const del = async (id) => {
      let url = "/todolist/delete/" + id;
      http.remove(url).then((res) => {
        getList();
      });
    };
    const delDone = () => {
      list2.value.forEach((item) => {
        del(item.id);
      });
    };
    const showPopover = ref(false);
    const actions = [
      { text: "\u9000\u51FA" }
    ];
    const select = (e) => {
      if (e.text === "\u9000\u51FA") {
        router.push("/");
        localStorage.clear();
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_van_popover = stdin_default;
      const _component_van_button = stdin_default$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "container" }, _attrs))} data-v-f912dce5><div class="header" data-v-f912dce5><img${ssrRenderAttr("src", _imports_0)} alt="" data-v-f912dce5>`);
      _push(ssrRenderComponent(_component_van_popover, {
        show: unref(showPopover),
        "onUpdate:show": ($event) => isRef(showPopover) ? showPopover.value = $event : null,
        actions,
        onSelect: select
      }, {
        reference: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h1 data-v-f912dce5${_scopeId}><span data-v-f912dce5${_scopeId}>L-ToDo</span></h1>`);
          } else {
            return [
              createVNode("h1", null, [
                createVNode("span", null, "L-ToDo")
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="create" data-v-f912dce5><img${ssrRenderAttr("src", _imports_1)} data-v-f912dce5></div></div><ul class="listHeader" data-v-f912dce5><li class="${ssrRenderClass(unref(n) === 0 ? "star" : " ")}" data-v-f912dce5>\u661F\u6807</li><li class="${ssrRenderClass(unref(n) === 1 ? "urgent" : " ")}" data-v-f912dce5>\u7D27\u6025</li><li class="${ssrRenderClass(unref(n) === 2 ? "active" : " ")}" data-v-f912dce5>\u5168\u90E8</li><li class="${ssrRenderClass(unref(n) === 3 ? "active" : " ")}" data-v-f912dce5>\u672A\u5B8C\u6210</li><li class="${ssrRenderClass(unref(n) === 4 ? "active" : " ")}" data-v-f912dce5>\u5DF2\u5B8C\u6210</li></ul><div class="btnBox" data-v-f912dce5>`);
      if (unref(n) === 4) {
        _push(ssrRenderComponent(_component_van_button, {
          plain: "",
          hairline: "",
          type: "danger",
          disabled: unref(isEmpty),
          block: "",
          onClick: delDone
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`\u6E05\u7A7A\u6240\u6709\u5DF2\u5B8C\u6210\u7684\u4E8B `);
            } else {
              return [
                createTextVNode("\u6E05\u7A7A\u6240\u6709\u5DF2\u5B8C\u6210\u7684\u4E8B ")
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (unref(isEmpty) && unref(n) !== 3) {
        _push(`<div class="imgBox" data-v-f912dce5><img${ssrRenderAttr("src", _imports_2)} alt="" data-v-f912dce5><span data-v-f912dce5>\u6682\u65E0\u4E8B\u4EF6</span></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(isEmpty) && unref(n) === 3) {
        _push(`<div class="imgBox" data-v-f912dce5><img${ssrRenderAttr("src", _imports_3)} alt="" data-v-f912dce5><span data-v-f912dce5>\u4F60\u5DF2\u7ECF\u5B8C\u6210\u4E86\u6240\u6709\u7684\u4E8B</span></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div${ssrRenderAttrs({ name: "list" })}>`);
      ssrRenderList(unref(list2), (item, index2) => {
        _push(`<ul class="listInfo" data-v-f912dce5><li data-v-f912dce5><div class="doState" data-v-f912dce5><img${ssrRenderAttr("src", _imports_4)} style="${ssrRenderStyle(item.done === 0 ? null : { display: "none" })}" data-v-f912dce5><img${ssrRenderAttr("src", _imports_5)} style="${ssrRenderStyle(item.done === 1 ? null : { display: "none" })}" data-v-f912dce5></div><div class="infoDetails" data-v-f912dce5><p data-v-f912dce5>${ssrInterpolate(item.title)}</p><p data-v-f912dce5><span class="${ssrRenderClass(item.starState === 1 ? "star_1" : "")}" data-v-f912dce5>\u661F\u6807</span><span class="${ssrRenderClass(item.urgentState === 1 ? "urgent_1  " : "")}" data-v-f912dce5>\u7D27\u6025</span></p><p data-v-f912dce5>${ssrInterpolate(item.content)}</p><p data-v-f912dce5><span style="${ssrRenderStyle({ "margin-right": "5px" })}" data-v-f912dce5>${ssrInterpolate(item.time)}</span><span class="day_0" style="${ssrRenderStyle(newDate(item.time) < 0 ? null : { display: "none" })}" data-v-f912dce5>${ssrInterpolate(Math.abs(newDate(item.time)))}\u5929\u524D</span><span class="day_1" style="${ssrRenderStyle(newDate(item.time) === 0 ? null : { display: "none" })}" data-v-f912dce5>\u4ECA\u5929</span><span class="day_2" style="${ssrRenderStyle(newDate(item.time) === 1 ? null : { display: "none" })}" data-v-f912dce5>\u660E\u5929</span><span class="day_3" style="${ssrRenderStyle(newDate(item.time) === 2 ? null : { display: "none" })}" data-v-f912dce5>\u540E\u5929</span></p></div></li></ul>`);
      });
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/list.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const list = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-f912dce5"]]);

export { list as default };
//# sourceMappingURL=list-55e936b0.mjs.map
