"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = Timeline;

var _react = _interopRequireWildcard(require("react"));

var _StyleModule = _interopRequireDefault(require("./Style.module.css"));

var _Section = _interopRequireDefault(require("../Section/Section"));

var _lodash = _interopRequireDefault(require("lodash"));

var _FloatingLabel = _interopRequireDefault(require("../FloatingLabel/FloatingLabel"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function debounce() {
  var timeout;
  return function (callback, wait) {
    clearTimeout(timeout);
    timeout = setTimeout(function () {
      callback();
    }, wait);
  };
}

function Timeline(_ref) {
  var _timelineRef$current3;

  var data = _ref.data,
      _ref$blockMouseEvents = _ref.blockMouseEvents,
      blockMouseEvents = _ref$blockMouseEvents === void 0 ? false : _ref$blockMouseEvents,
      _ref$currentYPos = _ref.currentYPos,
      currentYPos = _ref$currentYPos === void 0 ? 0 : _ref$currentYPos,
      _ref$onClick = _ref.onClick,
      onClick = _ref$onClick === void 0 ? function () {} : _ref$onClick,
      _ref$onWheel = _ref.onWheel,
      onWheel = _ref$onWheel === void 0 ? function () {} : _ref$onWheel;

  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      showTimeline = _useState2[0],
      setShowTimeline = _useState2[1];

  var _useState3 = (0, _react.useState)(false),
      _useState4 = _slicedToArray(_useState3, 2),
      isTimelineHover = _useState4[0],
      setTimelineHover = _useState4[1];

  var isMouseDown = (0, _react.useRef)(null);
  var timelineRef = (0, _react.useRef)(null);
  var floatingLabelRef = (0, _react.useRef)(null);
  var activeDebouncer = (0, _react.useRef)(null);
  var timer = (0, _react.useRef)(null);

  var onSectionHover = function onSectionHover(label, yPos) {
    var _timelineRef$current;

    if (blockMouseEvents) return;
    var floatingLabel = floatingLabelRef.current.firstElementChild;
    var position = Math.max(0, yPos - 16);
    position = Math.min(position, timelineRef.current.offsetHeight - 16);
    floatingLabel.style.top = "".concat(position * 100 / (timelineRef === null || timelineRef === void 0 ? void 0 : (_timelineRef$current = timelineRef.current) === null || _timelineRef$current === void 0 ? void 0 : _timelineRef$current.offsetHeight) || 0, "%");
    floatingLabel.innerHTML = label;
    floatingLabel.padding = '2px'; //TODO
  };

  var handleClick = function handleClick(event) {
    if (blockMouseEvents) return;
    var posPerc = getClickPosPercent(event, timelineRef.current);
    if (!_lodash["default"].isNil(posPerc)) onClick(posPerc);
  };

  var handleWheel = function handleWheel(event) {
    if (blockMouseEvents) return;
    var deltaPerc = getWheelDeltaPercent(event, timelineRef.current);
    if (!_lodash["default"].isNil(deltaPerc)) onWheel(deltaPerc);
  };

  var handleMouseDown = function handleMouseDown(flag, event) {
    if (blockMouseEvents) return;
    var isInElem = isInsideElement(event, timelineRef.current);

    if (!flag && !isInElem) {
      activeDebouncer.current(function () {
        setShowTimeline(false);
      }, 1500);
    }

    if (flag && isInElem) setShowTimeline(true);
    if (flag && isInElem || !flag) isMouseDown.current = flag;
  };

  var handleMouseMove = function handleMouseMove(event) {
    if (blockMouseEvents) return;
    var isInside = isInsideElement(event, timelineRef.current);
    setTimelineHover(isInside);

    if (isMouseDown.current || isInside) {
      activeDebouncer.current(function () {
        setShowTimeline(true);
      }, 0);
    } else {
      activeDebouncer.current(function () {
        setShowTimeline(false);
      }, 1500);
    }

    if (isMouseDown.current) handleDrag(event);
  };

  var handleDrag = function handleDrag(event) {
    if (blockMouseEvents) return; // setYPosDrag((event.clientY - timelineRef.current.getBoundingClientRect().top) / timelineRef.current.offsetHeight)

    var deltaPerc = getDraglDeltaPercent(event, timelineRef.current);
    if (!_lodash["default"].isNil(deltaPerc)) onClick(deltaPerc);
  };

  (0, _react.useEffect)(function () {
    document.addEventListener('click', handleClick);
    document.addEventListener('wheel', handleWheel);
    document.addEventListener('mousedown', function (event) {
      return handleMouseDown(true, event);
    });
    document.addEventListener('mouseup', function (event) {
      return handleMouseDown(false, event);
    });
    document.addEventListener('mousemove', handleMouseMove);
    activeDebouncer.current = debounce();
    return function () {
      document.removeEventListener('click', handleClick);
      document.removeEventListener('wheel', handleWheel);
      document.removeEventListener('mousedown', function (event) {
        return handleMouseDown(true, event);
      });
      document.removeEventListener('mouseup', function (event) {
        return handleMouseDown(false, event);
      });
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  (0, _react.useEffect)(function () {
    //
    if (!currentYPos) return;
    setShowTimeline(true);
    activeDebouncer.current(function () {
      setShowTimeline(false);
    }, 1500);
  }, [currentYPos]);
  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement("div", {
    className: "".concat(_StyleModule["default"].timeline, " ").concat(showTimeline ? _StyleModule["default"].visible : ''),
    ref: timelineRef,
    id: "timeline-scroll-strip"
  }, data.map(function (item, i) {
    var _timelineRef$current2;

    var label = item.label,
        top = item.top,
        height = item.height,
        text = item.text,
        type = item.type;
    var timelineHeight = timelineRef === null || timelineRef === void 0 ? void 0 : (_timelineRef$current2 = timelineRef.current) === null || _timelineRef$current2 === void 0 ? void 0 : _timelineRef$current2.offsetHeight;
    var hideMark;
    if (height * timelineHeight < 15) hideMark = true;
    var currYposPerc = currentYPos / timelineHeight || 0;
    return /*#__PURE__*/_react["default"].createElement(_Section["default"], {
      hideMark: hideMark,
      key: i,
      onHover: onSectionHover,
      topPercent: top,
      heightPercent: height,
      text: text,
      type: type,
      currentYPos: !isTimelineHover && currYposPerc >= top && currYposPerc <= top + height ? currYposPerc * timelineHeight : null,
      label: label
    });
  }), /*#__PURE__*/_react["default"].createElement("div", {
    className: _StyleModule["default"].currentPos,
    style: {
      top: "".concat(currentYPos * 100 / (timelineRef === null || timelineRef === void 0 ? void 0 : (_timelineRef$current3 = timelineRef.current) === null || _timelineRef$current3 === void 0 ? void 0 : _timelineRef$current3.offsetHeight) || 0, "%")
    }
  })), /*#__PURE__*/_react["default"].createElement("div", {
    ref: floatingLabelRef,
    className: "".concat(_StyleModule["default"].floatingLabel, " ").concat(showTimeline ? _StyleModule["default"].visible : '')
  }, /*#__PURE__*/_react["default"].createElement(_FloatingLabel["default"], null)));
}

function getClickPosPercent(event, timelineRef) {
  var _timelineRef$getBound = timelineRef.getBoundingClientRect(),
      left = _timelineRef$getBound.left,
      top = _timelineRef$getBound.top,
      right = _timelineRef$getBound.right,
      height = _timelineRef$getBound.height;

  var margin = timelineRef.getBoundingClientRect().top;

  if (event.clientX >= left && event.clientX <= right && event.clientY >= top && event.clientY <= top + height) {
    return (event.clientY - margin) / height;
  }

  return null;
}

function getWheelDeltaPercent(event, timelineRef) {
  if (isInsideElement(event, timelineRef)) {
    return event.deltaY / timelineRef.getBoundingClientRect().height;
  }

  return null;
}

function getDraglDeltaPercent(event, timelineRef) {
  var _timelineRef$getBound2 = timelineRef.getBoundingClientRect(),
      left = _timelineRef$getBound2.left,
      top = _timelineRef$getBound2.top,
      right = _timelineRef$getBound2.right,
      height = _timelineRef$getBound2.height;

  return (event.clientY - top) / height;
}

function isInsideElement(event, timelineRef) {
  if (!timelineRef) return false;

  var _timelineRef$getBound3 = timelineRef.getBoundingClientRect(),
      left = _timelineRef$getBound3.left,
      top = _timelineRef$getBound3.top,
      right = _timelineRef$getBound3.right,
      height = _timelineRef$getBound3.height;

  if (event.clientX >= left && event.clientX <= right && event.clientY >= top && event.clientY <= top + height) {
    return true;
  }

  return false;
}