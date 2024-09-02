"use strict";
exports.__esModule = true;
exports.AdBanner1 = void 0;
var image_1 = require("next/image");
var c1_png_1 = require("../../public/images/crousel/c1.png");
exports.AdBanner1 = function () {
    return (React.createElement("div", { className: "flex justify-center items-center p-10" },
        React.createElement("div", { className: "w-[50%]" },
            React.createElement(image_1["default"], { src: c1_png_1["default"], alt: "banner1" }))));
};
