"use strict";
exports.__esModule = true;
exports.HomeDecorMobileComponent = void 0;
var hom1_png_1 = require("../../public/images/hom1.png");
var hom2_png_1 = require("../../public/images/hom2.png");
var HomeDecorComponent_1 = require("./HomeDecorComponent");
exports.HomeDecorMobileComponent = function () {
    return (React.createElement("div", { className: " max-w-sm w-full sm:hidden   mx-auto" },
        React.createElement("h1", { className: "pt-2 text-2xl w-full  font-bold" }, "Home & Decor"),
        React.createElement("div", { className: " flex w-full gap-1 pt-2" },
            React.createElement(HomeDecorComponent_1.HomeDecorComponent, { offer: "1 For 1 Free", offerImage: hom1_png_1["default"], companyName: "XXX" }),
            React.createElement(HomeDecorComponent_1.HomeDecorComponent, { offer: "50 % OFF ", offerImage: hom2_png_1["default"], companyName: "Vixen" }),
            React.createElement(HomeDecorComponent_1.HomeDecorComponent, { offer: "1 For 1 Free", offerImage: hom1_png_1["default"], companyName: "XXX" }))));
};
