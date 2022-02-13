"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = FloatingLabel;

var _react = _interopRequireDefault(require("react"));

var _StyleModule = _interopRequireDefault(require("./Style.module.css"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function FloatingLabel(_ref) {
  var _ref$className = _ref.className,
      className = _ref$className === void 0 ? '' : _ref$className,
      _ref$label = _ref.label,
      label = _ref$label === void 0 ? undefined : _ref$label,
      _ref$yPos = _ref.yPos,
      yPos = _ref$yPos === void 0 ? 0 : _ref$yPos;
  return /*#__PURE__*/_react.default.createElement("div", {
    id: "floating-label",
    className: "".concat(className, " ").concat(_StyleModule.default.label),
    style: {
      top: yPos
    }
  }, label);
}