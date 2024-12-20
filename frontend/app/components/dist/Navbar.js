"use strict";
exports.__esModule = true;
var MobileNavbar_1 = require("./MobileNavbar");
var DesktopNavBar_1 = require("./DesktopNavBar");
var Navbar = function () {
    return (React.createElement(React.Fragment, null,
        React.createElement(MobileNavbar_1.MobileNavbar, null),
        React.createElement(DesktopNavBar_1.DesktopNavBar, null)));
};
exports["default"] = Navbar;
