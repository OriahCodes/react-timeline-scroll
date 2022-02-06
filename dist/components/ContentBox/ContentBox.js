"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ContentBox;

var _react = _interopRequireDefault(require("react"));

var _StyleModule = _interopRequireDefault(require("./Style.module.css"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ContentBox(_ref) {
  var _ref$className = _ref.className,
      className = _ref$className === void 0 ? '' : _ref$className,
      _ref$label = _ref.label,
      label = _ref$label === void 0 ? '' : _ref$label,
      _ref$mark = _ref.mark,
      mark = _ref$mark === void 0 ? undefined : _ref$mark,
      type = _ref.type,
      children = _ref.children;
  return /*#__PURE__*/_react.default.createElement("div", {
    className: className,
    "data-label": label,
    name: "timeline-scroll",
    "data-type": type,
    "data-text": mark
  }, children);
}