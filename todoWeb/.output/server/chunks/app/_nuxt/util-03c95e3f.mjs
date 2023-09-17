import { b as buildAssetsURL } from '../../handlers/renderer.mjs';
import { defineComponent, ref, computed, createVNode, watch, mergeProps, onUnmounted, nextTick } from 'vue';
import { c as createNamespace, e as extend, f as makeRequiredProp, t as truthProp, w as withInstall, s as stdin_default$8, g as makeNumericProp, a as makeArrayProp, m as makeStringProp, i as useChildren, j as useCustomFieldValue, u as unknownProp, n as numericProp, k as addUnit, I as Icon, l as useParent, p as pick, o as onMountedOrActivated, q as makeNumberProp, L as Loading, r as isDef, v as isDate, x as getScrollTop, y as useToggle, z as windowWidth, A as windowHeight, C as useRect, D as setScrollTop } from './index-fbf4af6f.mjs';
import { u as useExpose } from './index-f2c1900a.mjs';
import { P as Popup, o as onPopupReopen } from './index-cb3b05b3.mjs';

const [name$6, bem$3] = createNamespace("checkbox-group");
const checkboxGroupProps = {
  max: numericProp,
  shape: makeStringProp("round"),
  disabled: Boolean,
  iconSize: numericProp,
  direction: String,
  modelValue: makeArrayProp(),
  checkedColor: String
};
const CHECKBOX_GROUP_KEY = Symbol(name$6);
var stdin_default$7 = /* @__PURE__ */ defineComponent({
  name: name$6,
  props: checkboxGroupProps,
  emits: ["change", "update:modelValue"],
  setup(props, {
    emit,
    slots
  }) {
    const {
      children,
      linkChildren
    } = useChildren(CHECKBOX_GROUP_KEY);
    const updateValue = (value) => emit("update:modelValue", value);
    const toggleAll = (options = {}) => {
      if (typeof options === "boolean") {
        options = {
          checked: options
        };
      }
      const {
        checked,
        skipDisabled
      } = options;
      const checkedChildren = children.filter((item) => {
        if (!item.props.bindGroup) {
          return false;
        }
        if (item.props.disabled && skipDisabled) {
          return item.checked.value;
        }
        return checked != null ? checked : !item.checked.value;
      });
      const names = checkedChildren.map((item) => item.name);
      updateValue(names);
    };
    watch(() => props.modelValue, (value) => emit("change", value));
    useExpose({
      toggleAll
    });
    useCustomFieldValue(() => props.modelValue);
    linkChildren({
      props,
      updateValue
    });
    return () => {
      var _a;
      return createVNode("div", {
        "class": bem$3([props.direction])
      }, [(_a = slots.default) == null ? void 0 : _a.call(slots)]);
    };
  }
});
const checkerProps = {
  name: unknownProp,
  disabled: Boolean,
  iconSize: numericProp,
  modelValue: unknownProp,
  checkedColor: String,
  labelPosition: String,
  labelDisabled: Boolean
};
var stdin_default$6 = /* @__PURE__ */ defineComponent({
  props: extend({}, checkerProps, {
    bem: makeRequiredProp(Function),
    role: String,
    shape: String,
    parent: Object,
    checked: Boolean,
    bindGroup: truthProp,
    indeterminate: {
      type: Boolean,
      default: null
    }
  }),
  emits: ["click", "toggle"],
  setup(props, {
    emit,
    slots
  }) {
    const iconRef = ref();
    const getParentProp = (name2) => {
      if (props.parent && props.bindGroup) {
        return props.parent.props[name2];
      }
    };
    const disabled = computed(() => {
      if (props.parent && props.bindGroup) {
        const disabled2 = getParentProp("disabled") || props.disabled;
        if (props.role === "checkbox") {
          const checkedCount = getParentProp("modelValue").length;
          const max = getParentProp("max");
          const overlimit = max && checkedCount >= +max;
          return disabled2 || overlimit && !props.checked;
        }
        return disabled2;
      }
      return props.disabled;
    });
    const direction = computed(() => getParentProp("direction"));
    const iconStyle = computed(() => {
      const checkedColor = props.checkedColor || getParentProp("checkedColor");
      if (checkedColor && props.checked && !disabled.value) {
        return {
          borderColor: checkedColor,
          backgroundColor: checkedColor
        };
      }
    });
    const shape = computed(() => {
      return props.shape || getParentProp("shape") || "round";
    });
    const onClick = (event) => {
      const {
        target
      } = event;
      const icon = iconRef.value;
      const iconClicked = icon === target || (icon == null ? void 0 : icon.contains(target));
      if (!disabled.value && (iconClicked || !props.labelDisabled)) {
        emit("toggle");
      }
      emit("click", event);
    };
    const renderIcon = () => {
      var _a, _b;
      const {
        bem: bem2,
        checked,
        indeterminate
      } = props;
      const iconSize = props.iconSize || getParentProp("iconSize");
      return createVNode("div", {
        "ref": iconRef,
        "class": bem2("icon", [shape.value, {
          disabled: disabled.value,
          checked,
          indeterminate
        }]),
        "style": shape.value !== "dot" ? {
          fontSize: addUnit(iconSize)
        } : {
          width: addUnit(iconSize),
          height: addUnit(iconSize),
          borderColor: (_a = iconStyle.value) == null ? void 0 : _a.borderColor
        }
      }, [slots.icon ? slots.icon({
        checked,
        disabled: disabled.value
      }) : shape.value !== "dot" ? createVNode(Icon, {
        "name": indeterminate ? "minus" : "success",
        "style": iconStyle.value
      }, null) : createVNode("div", {
        "class": bem2("icon--dot__icon"),
        "style": {
          backgroundColor: (_b = iconStyle.value) == null ? void 0 : _b.backgroundColor
        }
      }, null)]);
    };
    const renderLabel = () => {
      if (slots.default) {
        return createVNode("span", {
          "class": props.bem("label", [props.labelPosition, {
            disabled: disabled.value
          }])
        }, [slots.default()]);
      }
    };
    return () => {
      const nodes = props.labelPosition === "left" ? [renderLabel(), renderIcon()] : [renderIcon(), renderLabel()];
      return createVNode("div", {
        "role": props.role,
        "class": props.bem([{
          disabled: disabled.value,
          "label-disabled": props.labelDisabled
        }, direction.value]),
        "tabindex": disabled.value ? void 0 : 0,
        "aria-checked": props.checked,
        "onClick": onClick
      }, [nodes]);
    };
  }
});
const [name$5, bem$2] = createNamespace("checkbox");
const checkboxProps = extend({}, checkerProps, {
  shape: String,
  bindGroup: truthProp,
  indeterminate: {
    type: Boolean,
    default: null
  }
});
var stdin_default$5 = /* @__PURE__ */ defineComponent({
  name: name$5,
  props: checkboxProps,
  emits: ["change", "update:modelValue"],
  setup(props, {
    emit,
    slots
  }) {
    const {
      parent
    } = useParent(CHECKBOX_GROUP_KEY);
    const setParentValue = (checked2) => {
      const {
        name: name2
      } = props;
      const {
        max,
        modelValue
      } = parent.props;
      const value = modelValue.slice();
      if (checked2) {
        const overlimit = max && value.length >= +max;
        if (!overlimit && !value.includes(name2)) {
          value.push(name2);
          if (props.bindGroup) {
            parent.updateValue(value);
          }
        }
      } else {
        const index2 = value.indexOf(name2);
        if (index2 !== -1) {
          value.splice(index2, 1);
          if (props.bindGroup) {
            parent.updateValue(value);
          }
        }
      }
    };
    const checked = computed(() => {
      if (parent && props.bindGroup) {
        return parent.props.modelValue.indexOf(props.name) !== -1;
      }
      return !!props.modelValue;
    });
    const toggle = (newValue = !checked.value) => {
      if (parent && props.bindGroup) {
        setParentValue(newValue);
      } else {
        emit("update:modelValue", newValue);
      }
      if (props.indeterminate !== null)
        emit("change", newValue);
    };
    watch(() => props.modelValue, (value) => {
      if (props.indeterminate === null)
        emit("change", value);
    });
    useExpose({
      toggle,
      props,
      checked
    });
    useCustomFieldValue(() => props.modelValue);
    return () => createVNode(stdin_default$6, mergeProps({
      "bem": bem$2,
      "role": "checkbox",
      "parent": parent,
      "checked": checked.value,
      "onToggle": toggle
    }, props), pick(slots, ["default", "icon"]));
  }
});
const [name$4, bem$1, t] = createNamespace("calendar");
const formatMonthTitle = (date) => t("monthTitle", date.getFullYear(), date.getMonth() + 1);
function compareMonth(date1, date2) {
  const year1 = date1.getFullYear();
  const year2 = date2.getFullYear();
  if (year1 === year2) {
    const month1 = date1.getMonth();
    const month2 = date2.getMonth();
    return month1 === month2 ? 0 : month1 > month2 ? 1 : -1;
  }
  return year1 > year2 ? 1 : -1;
}
function compareDay(day1, day2) {
  const compareMonthResult = compareMonth(day1, day2);
  if (compareMonthResult === 0) {
    const date1 = day1.getDate();
    const date2 = day2.getDate();
    return date1 === date2 ? 0 : date1 > date2 ? 1 : -1;
  }
  return compareMonthResult;
}
const cloneDate = (date) => new Date(date);
const cloneDates = (dates) => Array.isArray(dates) ? dates.map(cloneDate) : cloneDate(dates);
function getDayByOffset(date, offset) {
  const cloned = cloneDate(date);
  cloned.setDate(cloned.getDate() + offset);
  return cloned;
}
const getPrevDay = (date) => getDayByOffset(date, -1);
const getNextDay = (date) => getDayByOffset(date, 1);
const getToday = () => {
  const today = /* @__PURE__ */ new Date();
  today.setHours(0, 0, 0, 0);
  return today;
};
function calcDateNum(date) {
  const day1 = date[0].getTime();
  const day2 = date[1].getTime();
  return (day2 - day1) / (1e3 * 60 * 60 * 24) + 1;
}
function useRefs() {
  const refs = ref([]);
  const cache = [];
  const setRefs = (index2) => {
    if (!cache[index2]) {
      cache[index2] = (el) => {
        refs.value[index2] = el;
      };
    }
    return cache[index2];
  };
  return [refs, setRefs];
}
const Button = withInstall(stdin_default$8);
let lockCount = 0;
function lockClick(lock) {
  if (lock) {
    if (!lockCount) {
      document.body.classList.add("van-toast--unclickable");
    }
    lockCount++;
  } else if (lockCount) {
    lockCount--;
    if (!lockCount) {
      document.body.classList.remove("van-toast--unclickable");
    }
  }
}
const [name$3, bem] = createNamespace("toast");
const popupInheritProps = ["show", "overlay", "teleport", "transition", "overlayClass", "overlayStyle", "closeOnClickOverlay"];
const toastProps = {
  icon: String,
  show: Boolean,
  type: makeStringProp("text"),
  overlay: Boolean,
  message: numericProp,
  iconSize: numericProp,
  duration: makeNumberProp(2e3),
  position: makeStringProp("middle"),
  teleport: [String, Object],
  wordBreak: String,
  className: unknownProp,
  iconPrefix: String,
  transition: makeStringProp("van-fade"),
  loadingType: String,
  forbidClick: Boolean,
  overlayClass: unknownProp,
  overlayStyle: Object,
  closeOnClick: Boolean,
  closeOnClickOverlay: Boolean
};
var stdin_default$4 = /* @__PURE__ */ defineComponent({
  name: name$3,
  props: toastProps,
  emits: ["update:show"],
  setup(props, {
    emit,
    slots
  }) {
    let timer;
    let clickable = false;
    const toggleClickable = () => {
      const newValue = props.show && props.forbidClick;
      if (clickable !== newValue) {
        clickable = newValue;
        lockClick(clickable);
      }
    };
    const updateShow = (show) => emit("update:show", show);
    const onClick = () => {
      if (props.closeOnClick) {
        updateShow(false);
      }
    };
    const clearTimer = () => clearTimeout(timer);
    const renderIcon = () => {
      const {
        icon,
        type,
        iconSize,
        iconPrefix,
        loadingType
      } = props;
      const hasIcon = icon || type === "success" || type === "fail";
      if (hasIcon) {
        return createVNode(Icon, {
          "name": icon || type,
          "size": iconSize,
          "class": bem("icon"),
          "classPrefix": iconPrefix
        }, null);
      }
      if (type === "loading") {
        return createVNode(Loading, {
          "class": bem("loading"),
          "size": iconSize,
          "type": loadingType
        }, null);
      }
    };
    const renderMessage = () => {
      const {
        type,
        message
      } = props;
      if (slots.message) {
        return createVNode("div", {
          "class": bem("text")
        }, [slots.message()]);
      }
      if (isDef(message) && message !== "") {
        return type === "html" ? createVNode("div", {
          "key": 0,
          "class": bem("text"),
          "innerHTML": String(message)
        }, null) : createVNode("div", {
          "class": bem("text")
        }, [message]);
      }
    };
    watch(() => [props.show, props.forbidClick], toggleClickable);
    watch(() => [props.show, props.type, props.message, props.duration], () => {
      clearTimer();
      if (props.show && props.duration > 0) {
        timer = setTimeout(() => {
          updateShow(false);
        }, props.duration);
      }
    });
    onUnmounted(toggleClickable);
    return () => createVNode(Popup, mergeProps({
      "class": [bem([props.position, props.wordBreak === "normal" ? "break-normal" : props.wordBreak, {
        [props.type]: !props.icon
      }]), props.className],
      "lockScroll": false,
      "onClick": onClick,
      "onClosed": clearTimer,
      "onUpdate:show": updateShow
    }, pick(props, popupInheritProps)), {
      default: () => [renderIcon(), renderMessage()]
    });
  }
});
const defaultOptions = {
  icon: "",
  type: "text",
  message: "",
  className: "",
  overlay: false,
  onClose: void 0,
  onOpened: void 0,
  duration: 2e3,
  teleport: "body",
  iconSize: void 0,
  iconPrefix: void 0,
  position: "middle",
  transition: "van-fade",
  forbidClick: false,
  loadingType: void 0,
  overlayClass: "",
  overlayStyle: void 0,
  closeOnClick: false,
  closeOnClickOverlay: false
};
extend({}, defaultOptions);
function showToast(options = {}) {
  {
    return {};
  }
}
withInstall(stdin_default$4);
createNamespace("picker-toolbar");
const pickerToolbarProps = {
  title: String,
  cancelButtonText: String,
  confirmButtonText: String
};
const pickerSharedProps = extend({
  loading: Boolean,
  readonly: Boolean,
  allowHtml: Boolean,
  optionHeight: makeNumericProp(44),
  showToolbar: truthProp,
  swipeDuration: makeNumericProp(1e3),
  visibleOptionNum: makeNumericProp(6)
}, pickerToolbarProps);
extend({}, pickerSharedProps, {
  columns: makeArrayProp(),
  modelValue: makeArrayProp(),
  toolbarPosition: makeStringProp("top"),
  columnsFieldNames: Object
});
extend({}, pickerSharedProps, {
  modelValue: makeArrayProp(),
  filter: Function,
  formatter: {
    type: Function,
    default: (type, option) => option
  }
});
const getMonthEndDay = (year, month) => 32 - new Date(year, month - 1, 32).getDate();
const useHeight = (element, withSafeArea) => {
  const height = ref();
  const setHeight = () => {
    height.value = useRect(element).height;
  };
  onPopupReopen(() => nextTick(setHeight));
  watch([windowWidth, windowHeight], setHeight);
  return height;
};
const [name$2] = createNamespace("calendar-day");
var stdin_default$3 = /* @__PURE__ */ defineComponent({
  name: name$2,
  props: {
    item: makeRequiredProp(Object),
    color: String,
    index: Number,
    offset: makeNumberProp(0),
    rowHeight: String
  },
  emits: ["click"],
  setup(props, {
    emit,
    slots
  }) {
    const style = computed(() => {
      var _a;
      const {
        item,
        index: index2,
        color,
        offset,
        rowHeight
      } = props;
      const style2 = {
        height: rowHeight
      };
      if (item.type === "placeholder") {
        style2.width = "100%";
        return style2;
      }
      if (index2 === 0) {
        style2.marginLeft = `${100 * offset / 7}%`;
      }
      if (color) {
        switch (item.type) {
          case "end":
          case "start":
          case "start-end":
          case "multiple-middle":
          case "multiple-selected":
            style2.background = color;
            break;
          case "middle":
            style2.color = color;
            break;
        }
      }
      if (offset + (((_a = item.date) == null ? void 0 : _a.getDate()) || 1) > 28) {
        style2.marginBottom = 0;
      }
      return style2;
    });
    const onClick = () => {
      if (props.item.type !== "disabled") {
        emit("click", props.item);
      }
    };
    const renderTopInfo = () => {
      const {
        topInfo
      } = props.item;
      if (topInfo || slots["top-info"]) {
        return createVNode("div", {
          "class": bem$1("top-info")
        }, [slots["top-info"] ? slots["top-info"](props.item) : topInfo]);
      }
    };
    const renderBottomInfo = () => {
      const {
        bottomInfo
      } = props.item;
      if (bottomInfo || slots["bottom-info"]) {
        return createVNode("div", {
          "class": bem$1("bottom-info")
        }, [slots["bottom-info"] ? slots["bottom-info"](props.item) : bottomInfo]);
      }
    };
    const renderContent = () => {
      const {
        item,
        color,
        rowHeight
      } = props;
      const {
        type,
        text
      } = item;
      const Nodes = [renderTopInfo(), text, renderBottomInfo()];
      if (type === "selected") {
        return createVNode("div", {
          "class": bem$1("selected-day"),
          "style": {
            width: rowHeight,
            height: rowHeight,
            background: color
          }
        }, [Nodes]);
      }
      return Nodes;
    };
    return () => {
      const {
        type,
        className
      } = props.item;
      if (type === "placeholder") {
        return createVNode("div", {
          "class": bem$1("day"),
          "style": style.value
        }, null);
      }
      return createVNode("div", {
        "role": "gridcell",
        "style": style.value,
        "class": [bem$1("day", type), className],
        "tabindex": type === "disabled" ? void 0 : -1,
        "onClick": onClick
      }, [renderContent()]);
    };
  }
});
const [name$1] = createNamespace("calendar-month");
const calendarMonthProps = {
  date: makeRequiredProp(Date),
  type: String,
  color: String,
  minDate: makeRequiredProp(Date),
  maxDate: makeRequiredProp(Date),
  showMark: Boolean,
  rowHeight: numericProp,
  formatter: Function,
  lazyRender: Boolean,
  currentDate: [Date, Array],
  allowSameDay: Boolean,
  showSubtitle: Boolean,
  showMonthTitle: Boolean,
  firstDayOfWeek: Number
};
var stdin_default$2 = /* @__PURE__ */ defineComponent({
  name: name$1,
  props: calendarMonthProps,
  emits: ["click"],
  setup(props, {
    emit,
    slots
  }) {
    const [visible, setVisible] = useToggle();
    const daysRef = ref();
    const monthRef = ref();
    const height = useHeight(monthRef);
    const title = computed(() => formatMonthTitle(props.date));
    const rowHeight = computed(() => addUnit(props.rowHeight));
    const offset = computed(() => {
      const realDay = props.date.getDay();
      if (props.firstDayOfWeek) {
        return (realDay + 7 - props.firstDayOfWeek) % 7;
      }
      return realDay;
    });
    const totalDay = computed(() => getMonthEndDay(props.date.getFullYear(), props.date.getMonth() + 1));
    const shouldRender = computed(() => visible.value || !props.lazyRender);
    const getTitle = () => title.value;
    const getMultipleDayType = (day) => {
      const isSelected = (date) => props.currentDate.some((item) => compareDay(item, date) === 0);
      if (isSelected(day)) {
        const prevDay = getPrevDay(day);
        const nextDay = getNextDay(day);
        const prevSelected = isSelected(prevDay);
        const nextSelected = isSelected(nextDay);
        if (prevSelected && nextSelected) {
          return "multiple-middle";
        }
        if (prevSelected) {
          return "end";
        }
        if (nextSelected) {
          return "start";
        }
        return "multiple-selected";
      }
      return "";
    };
    const getRangeDayType = (day) => {
      const [startDay, endDay] = props.currentDate;
      if (!startDay) {
        return "";
      }
      const compareToStart = compareDay(day, startDay);
      if (!endDay) {
        return compareToStart === 0 ? "start" : "";
      }
      const compareToEnd = compareDay(day, endDay);
      if (props.allowSameDay && compareToStart === 0 && compareToEnd === 0) {
        return "start-end";
      }
      if (compareToStart === 0) {
        return "start";
      }
      if (compareToEnd === 0) {
        return "end";
      }
      if (compareToStart > 0 && compareToEnd < 0) {
        return "middle";
      }
      return "";
    };
    const getDayType = (day) => {
      const {
        type,
        minDate,
        maxDate,
        currentDate
      } = props;
      if (compareDay(day, minDate) < 0 || compareDay(day, maxDate) > 0) {
        return "disabled";
      }
      if (currentDate === null) {
        return "";
      }
      if (Array.isArray(currentDate)) {
        if (type === "multiple") {
          return getMultipleDayType(day);
        }
        if (type === "range") {
          return getRangeDayType(day);
        }
      } else if (type === "single") {
        return compareDay(day, currentDate) === 0 ? "selected" : "";
      }
      return "";
    };
    const getBottomInfo = (dayType) => {
      if (props.type === "range") {
        if (dayType === "start" || dayType === "end") {
          return t(dayType);
        }
        if (dayType === "start-end") {
          return `${t("start")}/${t("end")}`;
        }
      }
    };
    const renderTitle = () => {
      if (props.showMonthTitle) {
        return createVNode("div", {
          "class": bem$1("month-title")
        }, [slots["month-title"] ? slots["month-title"]({
          date: props.date,
          text: title.value
        }) : title.value]);
      }
    };
    const renderMark = () => {
      if (props.showMark && shouldRender.value) {
        return createVNode("div", {
          "class": bem$1("month-mark")
        }, [props.date.getMonth() + 1]);
      }
    };
    const placeholders = computed(() => {
      const count = Math.ceil((totalDay.value + offset.value) / 7);
      return Array(count).fill({
        type: "placeholder"
      });
    });
    const days = computed(() => {
      const days2 = [];
      const year = props.date.getFullYear();
      const month = props.date.getMonth();
      for (let day = 1; day <= totalDay.value; day++) {
        const date = new Date(year, month, day);
        const type = getDayType(date);
        let config = {
          date,
          type,
          text: day,
          bottomInfo: getBottomInfo(type)
        };
        if (props.formatter) {
          config = props.formatter(config);
        }
        days2.push(config);
      }
      return days2;
    });
    const disabledDays = computed(() => days.value.filter((day) => day.type === "disabled"));
    const scrollToDate = (body, targetDate) => {
      if (daysRef.value) {
        const daysRect = useRect(daysRef.value);
        const totalRows = placeholders.value.length;
        const currentRow = Math.ceil((targetDate.getDate() + offset.value) / 7);
        const rowOffset = (currentRow - 1) * daysRect.height / totalRows;
        setScrollTop(body, daysRect.top + rowOffset + body.scrollTop - useRect(body).top);
      }
    };
    const renderDay = (item, index2) => createVNode(stdin_default$3, {
      "item": item,
      "index": index2,
      "color": props.color,
      "offset": offset.value,
      "rowHeight": rowHeight.value,
      "onClick": (item2) => emit("click", item2)
    }, pick(slots, ["top-info", "bottom-info"]));
    const renderDays = () => createVNode("div", {
      "ref": daysRef,
      "role": "grid",
      "class": bem$1("days")
    }, [renderMark(), (shouldRender.value ? days : placeholders).value.map(renderDay)]);
    useExpose({
      getTitle,
      getHeight: () => height.value,
      setVisible,
      scrollToDate,
      disabledDays
    });
    return () => createVNode("div", {
      "class": bem$1("month"),
      "ref": monthRef
    }, [renderTitle(), renderDays()]);
  }
});
const [name] = createNamespace("calendar-header");
var stdin_default$1 = /* @__PURE__ */ defineComponent({
  name,
  props: {
    date: Date,
    title: String,
    subtitle: String,
    showTitle: Boolean,
    showSubtitle: Boolean,
    firstDayOfWeek: Number
  },
  emits: ["clickSubtitle"],
  setup(props, {
    slots,
    emit
  }) {
    const renderTitle = () => {
      if (props.showTitle) {
        const text = props.title || t("title");
        const title = slots.title ? slots.title() : text;
        return createVNode("div", {
          "class": bem$1("header-title")
        }, [title]);
      }
    };
    const onClickSubtitle = (event) => emit("clickSubtitle", event);
    const renderSubtitle = () => {
      if (props.showSubtitle) {
        const title = slots.subtitle ? slots.subtitle({
          date: props.date,
          text: props.subtitle
        }) : props.subtitle;
        return createVNode("div", {
          "class": bem$1("header-subtitle"),
          "onClick": onClickSubtitle
        }, [title]);
      }
    };
    const renderWeekDays = () => {
      const {
        firstDayOfWeek
      } = props;
      const weekdays = t("weekdays");
      const renderWeekDays2 = [...weekdays.slice(firstDayOfWeek, 7), ...weekdays.slice(0, firstDayOfWeek)];
      return createVNode("div", {
        "class": bem$1("weekdays")
      }, [renderWeekDays2.map((text) => createVNode("span", {
        "class": bem$1("weekday")
      }, [text]))]);
    };
    return () => createVNode("div", {
      "class": bem$1("header")
    }, [renderTitle(), renderSubtitle(), renderWeekDays()]);
  }
});
const calendarProps = {
  show: Boolean,
  type: makeStringProp("single"),
  title: String,
  color: String,
  round: truthProp,
  readonly: Boolean,
  poppable: truthProp,
  maxRange: makeNumericProp(null),
  position: makeStringProp("bottom"),
  teleport: [String, Object],
  showMark: truthProp,
  showTitle: truthProp,
  formatter: Function,
  rowHeight: numericProp,
  confirmText: String,
  rangePrompt: String,
  lazyRender: truthProp,
  showConfirm: truthProp,
  defaultDate: [Date, Array],
  allowSameDay: Boolean,
  showSubtitle: truthProp,
  closeOnPopstate: truthProp,
  showRangePrompt: truthProp,
  confirmDisabledText: String,
  closeOnClickOverlay: truthProp,
  safeAreaInsetTop: Boolean,
  safeAreaInsetBottom: truthProp,
  minDate: {
    type: Date,
    validator: isDate,
    default: getToday
  },
  maxDate: {
    type: Date,
    validator: isDate,
    default: () => {
      const now = getToday();
      return new Date(now.getFullYear(), now.getMonth() + 6, now.getDate());
    }
  },
  firstDayOfWeek: {
    type: numericProp,
    default: 0,
    validator: (val) => val >= 0 && val <= 6
  }
};
var stdin_default = /* @__PURE__ */ defineComponent({
  name: name$4,
  props: calendarProps,
  emits: ["select", "confirm", "unselect", "monthShow", "overRange", "update:show", "clickSubtitle"],
  setup(props, {
    emit,
    slots
  }) {
    const limitDateRange = (date, minDate = props.minDate, maxDate = props.maxDate) => {
      if (compareDay(date, minDate) === -1) {
        return minDate;
      }
      if (compareDay(date, maxDate) === 1) {
        return maxDate;
      }
      return date;
    };
    const getInitialDate = (defaultDate = props.defaultDate) => {
      const {
        type,
        minDate,
        maxDate,
        allowSameDay
      } = props;
      if (defaultDate === null) {
        return defaultDate;
      }
      const now = getToday();
      if (type === "range") {
        if (!Array.isArray(defaultDate)) {
          defaultDate = [];
        }
        const start = limitDateRange(defaultDate[0] || now, minDate, allowSameDay ? maxDate : getPrevDay(maxDate));
        const end = limitDateRange(defaultDate[1] || now, allowSameDay ? minDate : getNextDay(minDate));
        return [start, end];
      }
      if (type === "multiple") {
        if (Array.isArray(defaultDate)) {
          return defaultDate.map((date) => limitDateRange(date));
        }
        return [limitDateRange(now)];
      }
      if (!defaultDate || Array.isArray(defaultDate)) {
        defaultDate = now;
      }
      return limitDateRange(defaultDate);
    };
    let bodyHeight;
    const bodyRef = ref();
    const subtitle = ref({
      text: "",
      date: void 0
    });
    const currentDate = ref(getInitialDate());
    const [monthRefs, setMonthRefs] = useRefs();
    const dayOffset = computed(() => props.firstDayOfWeek ? +props.firstDayOfWeek % 7 : 0);
    const months = computed(() => {
      const months2 = [];
      const cursor = new Date(props.minDate);
      cursor.setDate(1);
      do {
        months2.push(new Date(cursor));
        cursor.setMonth(cursor.getMonth() + 1);
      } while (compareMonth(cursor, props.maxDate) !== 1);
      return months2;
    });
    const buttonDisabled = computed(() => {
      if (currentDate.value) {
        if (props.type === "range") {
          return !currentDate.value[0] || !currentDate.value[1];
        }
        if (props.type === "multiple") {
          return !currentDate.value.length;
        }
      }
      return !currentDate.value;
    });
    const getSelectedDate = () => currentDate.value;
    const onScroll = () => {
      const top = getScrollTop(bodyRef.value);
      const bottom = top + bodyHeight;
      const heights = months.value.map((item, index2) => monthRefs.value[index2].getHeight());
      const heightSum = heights.reduce((a, b) => a + b, 0);
      if (bottom > heightSum && top > 0) {
        return;
      }
      let height = 0;
      let currentMonth;
      const visibleRange = [-1, -1];
      for (let i = 0; i < months.value.length; i++) {
        const month = monthRefs.value[i];
        const visible = height <= bottom && height + heights[i] >= top;
        if (visible) {
          visibleRange[1] = i;
          if (!currentMonth) {
            currentMonth = month;
            visibleRange[0] = i;
          }
          if (!monthRefs.value[i].showed) {
            monthRefs.value[i].showed = true;
            emit("monthShow", {
              date: month.date,
              title: month.getTitle()
            });
          }
        }
        height += heights[i];
      }
      months.value.forEach((month, index2) => {
        const visible = index2 >= visibleRange[0] - 1 && index2 <= visibleRange[1] + 1;
        monthRefs.value[index2].setVisible(visible);
      });
      if (currentMonth) {
        subtitle.value = {
          text: currentMonth.getTitle(),
          date: currentMonth.date
        };
      }
    };
    const scrollToDate = (targetDate) => {
    };
    const scrollToCurrentDate = () => {
      if (props.poppable && !props.show) {
        return;
      }
      if (currentDate.value) {
        const targetDate = props.type === "single" ? currentDate.value : currentDate.value[0];
        if (isDate(targetDate))
          ;
      }
    };
    const init = () => {
      if (props.poppable && !props.show) {
        return;
      }
      scrollToCurrentDate();
    };
    const reset = (date = getInitialDate()) => {
      currentDate.value = date;
      scrollToCurrentDate();
    };
    const checkRange = (date) => {
      const {
        maxRange,
        rangePrompt,
        showRangePrompt
      } = props;
      if (maxRange && calcDateNum(date) > +maxRange) {
        if (showRangePrompt) {
          showToast(rangePrompt || t("rangePrompt", maxRange));
        }
        emit("overRange");
        return false;
      }
      return true;
    };
    const onConfirm = () => {
      var _a;
      return emit("confirm", (_a = currentDate.value) != null ? _a : cloneDates(currentDate.value));
    };
    const select = (date, complete) => {
      const setCurrentDate = (date2) => {
        currentDate.value = date2;
        emit("select", cloneDates(date2));
      };
      if (complete && props.type === "range") {
        const valid = checkRange(date);
        if (!valid) {
          setCurrentDate([date[0], getDayByOffset(date[0], +props.maxRange - 1)]);
          return;
        }
      }
      setCurrentDate(date);
      if (complete && !props.showConfirm) {
        onConfirm();
      }
    };
    const getDisabledDate = (disabledDays2, startDay, date) => {
      var _a;
      return (_a = disabledDays2.find((day) => compareDay(startDay, day.date) === -1 && compareDay(day.date, date) === -1)) == null ? void 0 : _a.date;
    };
    const disabledDays = computed(() => monthRefs.value.reduce((arr, ref2) => {
      var _a, _b;
      arr.push(...(_b = (_a = ref2.disabledDays) == null ? void 0 : _a.value) != null ? _b : []);
      return arr;
    }, []));
    const onClickDay = (item) => {
      if (props.readonly || !item.date) {
        return;
      }
      const {
        date
      } = item;
      const {
        type
      } = props;
      if (type === "range") {
        if (!currentDate.value) {
          select([date]);
          return;
        }
        const [startDay, endDay] = currentDate.value;
        if (startDay && !endDay) {
          const compareToStart = compareDay(date, startDay);
          if (compareToStart === 1) {
            const disabledDay = getDisabledDate(disabledDays.value, startDay, date);
            if (disabledDay) {
              const endDay2 = getPrevDay(disabledDay);
              if (compareDay(startDay, endDay2) === -1) {
                select([startDay, endDay2]);
              } else {
                select([date]);
              }
            } else {
              select([startDay, date], true);
            }
          } else if (compareToStart === -1) {
            select([date]);
          } else if (props.allowSameDay) {
            select([date, date], true);
          }
        } else {
          select([date]);
        }
      } else if (type === "multiple") {
        if (!currentDate.value) {
          select([date]);
          return;
        }
        const dates = currentDate.value;
        const selectedIndex = dates.findIndex((dateItem) => compareDay(dateItem, date) === 0);
        if (selectedIndex !== -1) {
          const [unselectedDate] = dates.splice(selectedIndex, 1);
          emit("unselect", cloneDate(unselectedDate));
        } else if (props.maxRange && dates.length >= +props.maxRange) {
          showToast(props.rangePrompt || t("rangePrompt", props.maxRange));
        } else {
          select([...dates, date]);
        }
      } else {
        select(date, true);
      }
    };
    const updateShow = (value) => emit("update:show", value);
    const renderMonth = (date, index2) => {
      const showMonthTitle = index2 !== 0 || !props.showSubtitle;
      return createVNode(stdin_default$2, mergeProps({
        "ref": setMonthRefs(index2),
        "date": date,
        "currentDate": currentDate.value,
        "showMonthTitle": showMonthTitle,
        "firstDayOfWeek": dayOffset.value
      }, pick(props, ["type", "color", "minDate", "maxDate", "showMark", "formatter", "rowHeight", "lazyRender", "showSubtitle", "allowSameDay"]), {
        "onClick": onClickDay
      }), pick(slots, ["top-info", "bottom-info", "month-title"]));
    };
    const renderFooterButton = () => {
      if (slots.footer) {
        return slots.footer();
      }
      if (props.showConfirm) {
        const slot = slots["confirm-text"];
        const disabled = buttonDisabled.value;
        const text = disabled ? props.confirmDisabledText : props.confirmText;
        return createVNode(Button, {
          "round": true,
          "block": true,
          "type": "primary",
          "color": props.color,
          "class": bem$1("confirm"),
          "disabled": disabled,
          "nativeType": "button",
          "onClick": onConfirm
        }, {
          default: () => [slot ? slot({
            disabled
          }) : text || t("confirm")]
        });
      }
    };
    const renderFooter = () => createVNode("div", {
      "class": [bem$1("footer"), {
        "van-safe-area-bottom": props.safeAreaInsetBottom
      }]
    }, [renderFooterButton()]);
    const renderCalendar = () => createVNode("div", {
      "class": bem$1()
    }, [createVNode(stdin_default$1, {
      "date": subtitle.value.date,
      "title": props.title,
      "subtitle": subtitle.value.text,
      "showTitle": props.showTitle,
      "showSubtitle": props.showSubtitle,
      "firstDayOfWeek": dayOffset.value,
      "onClickSubtitle": (event) => emit("clickSubtitle", event)
    }, pick(slots, ["title", "subtitle"])), createVNode("div", {
      "ref": bodyRef,
      "class": bem$1("body"),
      "onScroll": onScroll
    }, [months.value.map(renderMonth)]), renderFooter()]);
    watch(() => props.show, init);
    watch(() => [props.type, props.minDate, props.maxDate], () => reset(getInitialDate(currentDate.value)));
    watch(() => props.defaultDate, (value = null) => {
      currentDate.value = value;
      scrollToCurrentDate();
    });
    useExpose({
      reset,
      scrollToDate,
      getSelectedDate
    });
    onMountedOrActivated();
    return () => {
      if (props.poppable) {
        return createVNode(Popup, {
          "show": props.show,
          "class": bem$1("popup"),
          "round": props.round,
          "position": props.position,
          "closeable": props.showTitle || props.showSubtitle,
          "teleport": props.teleport,
          "closeOnPopstate": props.closeOnPopstate,
          "safeAreaInsetTop": props.safeAreaInsetTop,
          "closeOnClickOverlay": props.closeOnClickOverlay,
          "onUpdate:show": updateShow
        }, {
          default: renderCalendar
        });
      }
      return renderCalendar();
    };
  }
});
const _imports_0 = "" + buildAssetsURL("createBg.98081dd4.png");
const timeConversion = function(e) {
  const date = new Date(e);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const monthStr = month < 10 ? `0${month}` : month;
  const day = date.getDate();
  const dayStr = day < 10 ? `0${day}` : day;
  return `${year}-${monthStr}-${dayStr}`;
};

export { _imports_0 as _, stdin_default$5 as a, stdin_default as b, stdin_default$7 as s, timeConversion as t };
//# sourceMappingURL=util-03c95e3f.mjs.map
