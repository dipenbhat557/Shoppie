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
    return (React.createElement("div", { className: "bg-white   w-screen md:w-full lg:rounded-xl border border-slate-100 shadow-lg lg:w-[90%] lg:" + styles_1.styles.maxScreenWidth + " " + styles_1.styles.screenMarginAuto + " " + styles_1.styles.paddingY },
        React.createElement("div", { className: "flex overflow-x-auto sm:overflow-x-scroll scrollbar-hide" },
            React.createElement("div", { className: "flex   justify-evenly  sm:w-[100%] gap-4" }, categories.map(function (category, index) { return (React.createElement("div", { key: index, className: "flex flex-col gap-2 items-center sm:inline-block" },
                React.createElement("div", { className: "lg:w-16 lg:h-16 md:w-12 md:h-12 sm:h-8 sm:w-8 p-2" }, category.icon),
                React.createElement("span", { className: "text-center lg:text-xl md:text-sm text-xs sm:p-2 font-medium text-gray-700" }, category.name))); })))));
};
