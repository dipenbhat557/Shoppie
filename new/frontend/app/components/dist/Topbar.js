"use strict";
exports.__esModule = true;
exports.Topbar = void 0;
var styles_1 = require("../utils/styles");
exports.Topbar = function () {
    return (React.createElement("div", { className: "bg-black text-white w-full p-3  " },
        React.createElement("div", { className: "flex " + styles_1.styles.maxScreenWidth + "  " + styles_1.styles.screenMarginAuto + "  justify-between" },
            React.createElement("div", { className: "pl-2" }, "Delivery All over Nepal"),
            React.createElement("div", { className: "flex justify-evenly sm:w-1/2 md:w-3/5 lg:w-2/5" },
                React.createElement("p", null, "Signin"),
                React.createElement("p", null, "Register"),
                React.createElement("p", null, "Contact Us"),
                React.createElement("p", null, "Become a Seller")))));
};
