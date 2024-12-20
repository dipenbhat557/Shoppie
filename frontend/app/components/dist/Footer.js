"use strict";
exports.__esModule = true;
exports.Footer = void 0;
var react_1 = require("react");
var DesktopFooter_1 = require("./DesktopFooter");
var MobileFooter_1 = require("./MobileFooter");
exports.Footer = function () {
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement(MobileFooter_1.MobileFooter, null),
        react_1["default"].createElement(DesktopFooter_1.DesktopFooter, null)));
};
