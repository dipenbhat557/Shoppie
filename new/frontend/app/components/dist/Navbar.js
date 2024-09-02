"use strict";
exports.__esModule = true;
var image_1 = require("next/image");
var shop_nav_svg_1 = require("../../public/svg/shop_nav.svg");
var fa_1 = require("react-icons/fa");
var SearchBar_1 = require("./SearchBar");
var md_1 = require("react-icons/md");
var hi_1 = require("react-icons/hi");
var styles_1 = require("../utils/styles");
var Navbar = function () {
    return (React.createElement("div", { className: " text-black  w-full " + styles_1.styles.screenMarginAuto + " " + styles_1.styles.paddingX + "  flex flex-col md:flex-row  justify-between " },
        React.createElement("div", { className: "flex justify-between sm:w-full md:w-1/2" },
            React.createElement("div", { className: "p-3" },
                React.createElement(image_1["default"], { src: shop_nav_svg_1["default"], width: 180, height: 150, alt: "Nav Logo" })),
            React.createElement(SearchBar_1.SearchBar, null)),
        React.createElement("div", { className: "flex justify-evenly sm:w-full md:w-1/2 lg:w-1/4  pr-2  " },
            React.createElement("div", { className: "flex items-center  gap-2 border  border-black rounded-md px-4 py-2" },
                React.createElement(fa_1.FaChevronDown, { size: 22 }),
                React.createElement("span", null, "Clearance")),
            React.createElement("div", { className: "flex items-center border   gap-2 border-black rounded-md px-4 py-2" },
                React.createElement(hi_1.HiOutlineShoppingCart, { size: 22 }),
                React.createElement("span", null, "Basket")),
            React.createElement("div", { className: "flex items-center border   gap-2 border-black rounded-md px-4 py-2" },
                React.createElement(md_1.MdOutlineAccountCircle, { size: 22 }),
                React.createElement("span", null, "Account")))));
};
exports["default"] = Navbar;
