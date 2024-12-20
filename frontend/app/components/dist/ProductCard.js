"use strict";
exports.__esModule = true;
var image_1 = require("next/image");
var react_1 = require("react");
var ProductCard = function (_a) {
    var imageSrc = _a.imageSrc, altText = _a.altText;
    return (react_1["default"].createElement("div", { className: "flex flex-col items-center text-center py-2" },
        react_1["default"].createElement("div", { className: "rounded-lg shadow-md bg-[#F0EEED] hover:bg-opacity-70 w-full h-full" },
            react_1["default"].createElement(image_1["default"], { src: imageSrc, alt: altText, className: "rounded-lg object-cover w-full h-full", width: 200, height: 200, layout: "responsive" }))));
};
exports["default"] = ProductCard;
