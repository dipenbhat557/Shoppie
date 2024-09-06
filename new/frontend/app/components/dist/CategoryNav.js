"use strict";
exports.__esModule = true;
exports.CategoryNav = void 0;
var image_1 = require("next/image");
var phone_png_1 = require("../../public/images/catagoryNav/phone.png");
var fashion_png_1 = require("../../public/images/catagoryNav/fashion.png");
var home_png_1 = require("../../public/images/catagoryNav/home.png");
var electonics_png_1 = require("../../public/images/catagoryNav/electonics.png");
var styles_1 = require("../utils/styles");
var categories = [
    {
        name: "Fashion",
        icon: React.createElement(image_1["default"], { src: fashion_png_1["default"], alt: "Fashion", className: "h-16 w-16" })
    },
    {
        name: "Electronics",
        icon: React.createElement(image_1["default"], { src: electonics_png_1["default"], alt: "Electronics", className: "h-16 w-16" })
    },
    {
        name: "Mobiles",
        icon: React.createElement(image_1["default"], { src: phone_png_1["default"], alt: "Mobiles", className: "h-16 w-16" })
    },
    {
        name: "Grocery",
        icon: React.createElement(image_1["default"], { src: phone_png_1["default"], alt: "Grocery", className: "h-16 w-16" })
    },
    {
        name: "Furniture",
        icon: React.createElement(image_1["default"], { src: home_png_1["default"], alt: "Furniture", className: "h-16 w-16" })
    },
    {
        name: "Appliances",
        icon: React.createElement(image_1["default"], { src: electonics_png_1["default"], alt: "Appliances", className: "h-16 w-16" })
    },
    {
        name: "Mobiles",
        icon: React.createElement(image_1["default"], { src: phone_png_1["default"], alt: "Mobiles", className: "h-16 w-16" })
    },
    {
        name: "Appliances",
        icon: React.createElement(image_1["default"], { src: electonics_png_1["default"], alt: "Appliances", className: "h-16 w-16" })
    },
];
exports.CategoryNav = function () {
    return (React.createElement("div", { className: "bg-white  rounded-xl border border-slate-100 shadow-lg  w-[90%] " + styles_1.styles.maxScreenWidth + " " + styles_1.styles.screenMarginAuto + " " + styles_1.styles.paddingY + " " },
        React.createElement("div", { className: "grid grid-cols-8 gap-0" }, categories.map(function (category, index) { return (React.createElement("div", { key: index, className: "flex flex-col items-center" },
            React.createElement("div", { className: " lg:w-16 lg:h-16 md:w-14 md:h-14 sm:h-12 sm:w-12" }, category.icon),
            React.createElement("span", { className: "text-center lg:text-xl md:text-sm sm:text-xs sm:p-4 font-medium text-gray-700" }, category.name))); }))));
};
