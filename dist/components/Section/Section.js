"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Section;

var _react = _interopRequireWildcard(require("react"));

var _StyleModule = _interopRequireDefault(require("./Style.module.css"));

var _BulletMark = _interopRequireDefault(require("../BulletMark/BulletMark"));

var _TextMark = _interopRequireDefault(require("../TextMark/TextMark"));

var _TimelineComponent = require("../TimelineComponent/TimelineComponent");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function Section(_ref) {
  var top = _ref.top,
      height = _ref.height,
      _ref$label = _ref.label,
      label = _ref$label === void 0 ? '' : _ref$label,
      _ref$text = _ref.text,
      text = _ref$text === void 0 ? '' : _ref$text,
      type = _ref.type,
      _ref$isHover = _ref.isHover,
      isHover = _ref$isHover === void 0 ? false : _ref$isHover,
      _ref$onHover = _ref.onHover,
      onHover = _ref$onHover === void 0 ? function () {} : _ref$onHover;
  var sectionRef = (0, _react.useRef)(null);

  var onMouseMove = function onMouseMove(event) {
    var pos = getLabelPos(event, sectionRef.current, top, height);
    if (pos) onHover(label, pos);
  };

  (0, _react.useEffect)(function () {
    document.addEventListener('mousemove', onMouseMove);
    return function () {
      document.removeEventListener('mousemove', onMouseMove);
    };
  }, []);
  (0, _react.useEffect)(function () {
    if (isHover) onHover(label, isHover);
  }, [isHover]);
  return /*#__PURE__*/_react.default.createElement("div", {
    className: _StyleModule.default.sectionWrapper,
    ref: sectionRef
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: _StyleModule.default.section,
    style: {
      top: top,
      height: height
    }
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: _StyleModule.default.mark
  }, type === _TimelineComponent.MARK_TYPES.TEXT ? /*#__PURE__*/_react.default.createElement(_TextMark.default, {
    text: text
  }) : type === _TimelineComponent.MARK_TYPES.BULLET ? /*#__PURE__*/_react.default.createElement(_BulletMark.default, null) : null)));
}

function getLabelPos(event, sectionRef, sectionMargin, sectionHeight) {
  var _sectionRef$getBoundi = sectionRef.getBoundingClientRect(),
      left = _sectionRef$getBoundi.left,
      top = _sectionRef$getBoundi.top,
      right = _sectionRef$getBoundi.right;

  var parentMargin = sectionRef.parentElement.getBoundingClientRect().top;

  if (event.clientX >= left && event.clientX <= right && event.clientY >= top + sectionMargin && event.clientY <= top + sectionMargin + sectionHeight) {
    return event.clientY - parentMargin;
  }

  return null;
}