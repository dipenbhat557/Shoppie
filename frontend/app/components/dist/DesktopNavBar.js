"use strict";
exports.__esModule = true;
exports.DesktopNavBar = void 0;
var image_1 = require("next/image");
var SearchBar_1 = require("./SearchBar");
var shop_nav_svg_1 = require("../../public/svg/shop_nav.svg");
var fa_1 = require("react-icons/fa");
var hi_1 = require("react-icons/hi");
var styles_1 = require("../utils/styles");
var md_1 = require("react-icons/md");
exports.DesktopNavBar = function () {
    return (React.createElement("div", { className: "text-black w-full " + styles_1.styles.screenMarginAuto + " " + styles_1.styles.paddingX + " hidden sm:flex flex-col md:flex-row justify-between" },
        React.createElement("div", { className: "flex justify-between w-full md:w-1/2 items-center" },
            React.createElement("div", { className: "p-3" },
                React.createElement(image_1["default"], { src: shop_nav_svg_1["default"], width: 180, height: 150, alt: "Nav Logo" })),
            React.createElement("div", { className: "flex-1 px-3" },
                React.createElement(SearchBar_1.SearchBar, null))),
        React.createElement("div", { className: "flex justify-evenly w-full md:w-1/2 lg:w-1/4 mt-4 md:mt-0 pr-2" },
            React.createElement("div", { className: "flex items-center gap-2 border border-black rounded-md px-4 py-2" },
                React.createElement(fa_1.FaChevronDown, { size: 22 }),
                React.createElement("span", null, "Clearance")),
            React.createElement("div", { className: "flex items-center gap-2 border border-black rounded-md px-4 py-2" },
                React.createElement(hi_1.HiOutlineShoppingCart, { size: 22 }),
                React.createElement("span", null, "Basket")),
            React.createElement("div", { className: "flex items-center gap-2 border border-black rounded-md px-4 py-2" },
                React.createElement(md_1.MdOutlineAccountCircle, { size: 22 }),
                React.createElement("span", null, "Account")))));
};
