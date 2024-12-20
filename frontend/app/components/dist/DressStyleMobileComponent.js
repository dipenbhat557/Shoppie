"use client";
"use strict";
exports.__esModule = true;
exports.DressStyleMobileComponent = void 0;
var image_1 = require("next/image");
var f1_png_1 = require("../../public/images/fashion/f1.png");
var f2_png_1 = require("../../public/images/fashion/f2.png");
var f3_png_1 = require("../../public/images/fashion/f3.png");
var f4_png_1 = require("../../public/images/fashion/f4.png");
exports.DressStyleMobileComponent = function () {
    var dressStyles = [
        {
            style: "Casual",
            imageUrl: f1_png_1["default"]
        },
        {
            style: "Formal",
            imageUrl: f2_png_1["default"]
        },
        {
            style: "Party",
            imageUrl: f4_png_1["default"]
        },
        {
            style: "Gym",
            imageUrl: f3_png_1["default"]
        },
    ];
    return (React.createElement("div", { className: "container sm:hidden  pb-2 max-w-screen-sm w-screen bg-[rgb(240,238,237)] border rounded-2xl " },
        React.createElement("h2", { className: "text-2xl  font-bold font-serif   text-center py-4 " }, "BROWSE BY DRESS STYLE"),
        React.createElement("div", { className: "flex   flex-wrap w-full  gap-2" }, dressStyles.map(function (dressStyle, index) { return (React.createElement(DressStyleItem, { key: dressStyle.style, imageUrl: dressStyle.imageUrl, style: dressStyle.style, index: index })); }))));
};
var DressStyleItem = function (_a) {
    var imageUrl = _a.imageUrl, style = _a.style, index = _a.index;
    return (React.createElement("div", { className: "relative  rounded-md overflow-hidden  " + (index == 0 || index == 3 ? "w-[34%]" : "w-[63%]") + " " },
        React.createElement(image_1["default"], { src: imageUrl, alt: style, className: " w-full    h-28   object-cover" }),
        React.createElement("div", { className: "absolute  left-2 top-2   bg-opacity-50 flex items-center justify-center" },
            React.createElement("h3", { className: "text-black text-xl font-bold" }, style))));
};
