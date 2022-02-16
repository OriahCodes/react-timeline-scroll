"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MARK_TYPES = void 0;
exports["default"] = TimelineComponent;

var _react = _interopRequireWildcard(require("react"));

var _StyleModule = _interopRequireDefault(require("./Style.module.css"));

var _Timeline = _interopRequireDefault(require("../Timeline/Timeline"));

var _dataFunctions = require("./scripts/dataFunctions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var MARK_TYPES = {
  BULLET: 'bullet',
  TEXT: 'text'
};
exports.MARK_TYPES = MARK_TYPES;

function TimelineComponent(_ref) {
  var _ref$className = _ref.className,
      className = _ref$className === void 0 ? '' : _ref$className,
      children = _ref.children;
  var contentRef = (0, _react.useRef)(null);
  var wrapperRef = (0, _react.useRef)(null);

  var _useState = (0, _react.useState)(null),
      _useState2 = _slicedToArray(_useState, 2),
      timelineData = _useState2[0],
      setTimelineData = _useState2[1];

  var _useState3 = (0, _react.useState)(0),
      _useState4 = _slicedToArray(_useState3, 2),
      scrollTop = _useState4[0],
      setScrollTop = _useState4[1];

  (0, _react.useEffect)(function () {
    if (!(contentRef !== null && contentRef !== void 0 && contentRef.current)) return;
    var data = (0, _dataFunctions.buildData)(contentRef.current, wrapperRef.current.clientHeight);
    setTimelineData(data);
  }, [contentRef]);

  var onClick = function onClick(perc) {
    var updatedScroll = perc * (contentRef.current.clientHeight - wrapperRef.current.clientHeight);
    wrapperRef.current.scrollTop = updatedScroll;
  };

  var onWheel = function onWheel(deltaPerc) {
    var scrollDelta = deltaPerc * wrapperRef.current.clientHeight;
    wrapperRef.current.scrollTop = wrapperRef.current.scrollTop + scrollDelta;
  };

  var onScroll = function onScroll(event) {
    var timelineScroll = (wrapperRef.current.clientHeight - 2) * (event.target.scrollTop / (event.target.scrollHeight - event.target.clientHeight));
    setScrollTop(timelineScroll);
  };

  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement("div", {
    className: _StyleModule["default"].timelineWrapper,
    id: "timeline-scroll-component",
    ref: wrapperRef,
    onScroll: onScroll
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: className,
    ref: contentRef
  }, children)), timelineData && /*#__PURE__*/_react["default"].createElement(_Timeline["default"], {
    onClick: onClick,
    onWheel: onWheel,
    currentYPos: scrollTop,
    data: timelineData
  }));
}