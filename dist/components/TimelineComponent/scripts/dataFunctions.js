"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildData = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _TimelineComponent = require("../TimelineComponent");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var buildData = function buildData(contentRef, wrapperHeight) {
  var scrollHeight = contentRef.offsetHeight;
  var allMarkedNodes = contentRef.querySelectorAll("div[data-name='timeline-scroll-component']");

  var dataList = _lodash["default"].reduce(allMarkedNodes, function (acc, node) {
    var offsetTop = node.offsetTop;
    var offsetHeight = node.offsetHeight;
    acc.push(_objectSpread(_objectSpread({}, node.dataset), {}, {
      offsetTop: offsetTop,
      offsetHeight: offsetHeight
    }));
    return acc;
  }, []);

  var textSectionHeight = 0;
  var bulletSectionHeight = 0;
  dataList = _lodash["default"].map(dataList, function (data) {
    var parentSectionPercent = undefined;
    var offsetTop = data.offsetTop,
        offsetHeight = data.offsetHeight;
    var top = offsetTop / scrollHeight;
    var height = offsetHeight / scrollHeight;

    if (data.type) {
      if (data.type === _TimelineComponent.MARK_TYPES.BULLET) {
        parentSectionPercent = height + bulletSectionHeight;
        textSectionHeight += height;
      }

      if (data.type === _TimelineComponent.MARK_TYPES.TEXT) {
        parentSectionPercent = height + textSectionHeight;
        textSectionHeight = 0;
      }

      bulletSectionHeight = 0;
    } else {
      textSectionHeight += height;
      bulletSectionHeight += height;
    }

    return _objectSpread(_objectSpread({}, data), {}, {
      top: top,
      height: height,
      parentSectionPercent: parentSectionPercent
    });
  });
  return dataList;
};

exports.buildData = buildData;