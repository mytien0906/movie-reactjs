"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (val, props) {
  var _transform, _overlay;

  var zIndex = props.zIndex,
      left = props.left,
      right = props.right,
      height = props.height,
      handleWidth = props.handleWidth,
      overlayColor = props.overlayColor,
      fadeOut = props.fadeOut,
      offset = props.offset;


  var clientWidth = 1000;
  var width = props.width;

  if (typeof document !== "undefined") {
    clientWidth = document.body.clientWidth;
    if (/\D/.test(width)) width = document.body.clientWidth * (width.match(/\d*/) / 100);
  }

  var opacity = (val - offset) / width;

  if (right) val = width - val;else val = val - width;

  var drawer = {
    display: "block",
    width: width,
    height: height,
    overflow: "auto"
  };

  var transform = (_transform = {
    boxSizing: "content-box",
    pointer: "cursor",
    position: "fixed",
    display: "block",
    zIndex: zIndex,
    width: width
  }, _defineProperty(_transform, right ? "paddingLeft" : "paddingRight", handleWidth), _defineProperty(_transform, "maxWidth", width), _defineProperty(_transform, "height", height), _defineProperty(_transform, "top", 0), _defineProperty(_transform, right ? "right" : "left", 0), _defineProperty(_transform, "margin", 0), _defineProperty(_transform, "transform", "translate3d(" + val + "px, 0, 0)"), _defineProperty(_transform, "WebkitTransform", "translate3d(" + val + "px, 0, 0)"), _defineProperty(_transform, "opacity", fadeOut ? opacity : 1), _transform);

  var overlayTransform = right ? -width : width;
  var overlay = (_overlay = {
    zIndex: -2,
    pointer: "cursor",
    position: "fixed",
    width: clientWidth,
    height: "100%",
    background: overlayColor,
    opacity: opacity,
    top: 0
  }, _defineProperty(_overlay, right ? "right" : "left", 0), _defineProperty(_overlay, "margin", 0), _defineProperty(_overlay, "transform", "translate3d(" + overlayTransform + "px, 0, 0)"), _defineProperty(_overlay, "WebkitTransform", "translate3d(" + overlayTransform + "px, 0, 0)"), _overlay);

  return { drawer: drawer, transform: transform, overlay: overlay };
};

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }