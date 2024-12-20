"use strict";
exports.__esModule = true;
exports.DressStyle = void 0;
var react_1 = require("react");
var image_1 = require("next/image");
var f1_png_1 = require("../../public/images/fashion/f1.png");
var f2_png_1 = require("../../public/images/fashion/f2.png");
var f3_png_1 = require("../../public/images/fashion/f3.png");
var f4_png_1 = require("../../public/images/fashion/f4.png");
var DressStyleItem = function (_a) {
    var imageUrl = _a.imageUrl, style = _a.style, index = _a.index;
    return (react_1["default"].createElement("div", { className: "relative      rounded-lg overflow-hidden " + (index == 0 || index == 3 ? "w-[34%]" : "w-[64%]") + " " },
        react_1["default"].createElement(image_1["default"], { src: imageUrl, alt: style, className: "w-full    h-24  md:h-32 object-cover" }),
        react_1["default"].createElement("div", { className: "absolute  left-6 top-6   bg-opacity-50flex items-center justify-center" },
            react_1["default"].createElement("h3", { className: "text-black text-lg font-bold" }, style))));
};
exports.DressStyle = function () {
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
    return (react_1["default"].createElement("div", { className: "container pb-8 w-full bg-[rgb(240,238,237)] border rounded-2xl " },
        react_1["default"].createElement("h2", { className: "text-3xl font-extrabold font-serif md:text-4xl  pl-4 text-center py-10 " }, "BROWSE BY DRESS STYLE"),
        react_1["default"].createElement("div", { className: "flex  flex-wrap  gap-2" }, dressStyles.map(function (dressStyle, index) { return (react_1["default"].createElement(DressStyleItem, { key: dressStyle.style, imageUrl: dressStyle.imageUrl, style: dressStyle.style, index: index })); }))));
};
exports["default"] = exports.DressStyle;
