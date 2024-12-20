"use strict";
exports.__esModule = true;
exports.BestDealsProductCard = void 0;
var image_1 = require("next/image");
exports.BestDealsProductCard = function (_a) {
    var imageSrc = _a.imageSrc, name = _a.name, price = _a.price, altText = _a.altText;
    return (React.createElement("div", { className: "flex w-full flex-col items-center p-0  md:p-1 lg:p-2" },
        React.createElement(image_1["default"], { src: imageSrc, alt: altText, className: "object-contain md:h-64   md:w-64  pb-0  md:pb-1 lg:pb-2" }),
        React.createElement("h3", { className: " text-sm md:text-xl font-semibold text-gray-700" }, name),
        React.createElement("p", { className: "text-xs md:text-xl font-bold text-black" }, price)));
};
