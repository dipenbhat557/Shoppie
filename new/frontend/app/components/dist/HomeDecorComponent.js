"use strict";
exports.__esModule = true;
exports.HomeDecorComponent = void 0;
var image_1 = require("next/image");
var react_1 = require("react");
exports.HomeDecorComponent = function (_a) {
    var offerImage = _a.offerImage, companyName = _a.companyName, offer = _a.offer;
    return (react_1["default"].createElement("div", { className: "  hover:bg-slate-100  rounded-xl     overflow-hidden " },
        react_1["default"].createElement("div", { className: "flex justify-center" },
            react_1["default"].createElement(image_1["default"], { src: offerImage, alt: "Ad", className: "w-full  object-cover" })),
        react_1["default"].createElement("div", { className: "p-4 text-center" },
            react_1["default"].createElement("p", { className: "text-gray-700 text-sm" }, companyName),
            react_1["default"].createElement("p", { className: "text-xl font-bold text-black pt-2" }, offer))));
};
