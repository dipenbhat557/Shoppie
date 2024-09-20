"use strict";
exports.__esModule = true;
exports.MobileNavbar = void 0;
var image_1 = require("next/image");
var gi_1 = require("react-icons/gi");
var hi_1 = require("react-icons/hi");
var SearchBar_1 = require("./SearchBar");
var shop_nav_svg_1 = require("../../public/svg/shop_nav.svg");
exports.MobileNavbar = function () {
    return (React.createElement("div", { className: "text-black w-full flex flex-col  justify-between sm:hidden px-4 py-2 gap-3" },
        React.createElement("div", { className: "flex  justify-between w-full" },
            React.createElement("div", null,
                React.createElement(image_1["default"], { src: shop_nav_svg_1["default"], width: 120, height: 120, alt: "Nav Logo" })),
            React.createElement("div", { className: "flex " },
                React.createElement(hi_1.HiOutlineShoppingCart, { size: 22 }),
                React.createElement(gi_1.GiHamburgerMenu, { size: 22 }))),
        React.createElement("div", { className: "w-full" },
            React.createElement(SearchBar_1.SearchBar, null))));
};
