"use strict";
exports.__esModule = true;
exports.HomeDecor = void 0;
var HomeDecorComponent_1 = require("./HomeDecorComponent");
var hom1_png_1 = require("../../public/images/hom1.png");
var hom2_png_1 = require("../../public/images/hom2.png");
var DressStyle_1 = require("./DressStyle");
exports.HomeDecor = function () {
    return (React.createElement("div", { className: "w-full" },
        React.createElement("div", { className: "hidden md:block w-full" },
            React.createElement("div", { className: "w-[90%] mx-auto py-4" },
                React.createElement("h1", { className: "pt-2 text-3xl font-bold" }, "Home & Decor"),
                React.createElement("div", { className: "flex" },
                    React.createElement("div", { className: "flex w-[60%] gap-2 pt-8" },
                        React.createElement(HomeDecorComponent_1.HomeDecorComponent, { offer: "1 For 1 Free", offerImage: hom1_png_1["default"], companyName: "XXX" }),
                        React.createElement(HomeDecorComponent_1.HomeDecorComponent, { offer: "50 % OFF ", offerImage: hom2_png_1["default"], companyName: "Vixen" }),
                        React.createElement(HomeDecorComponent_1.HomeDecorComponent, { offer: "1 For 1 Free", offerImage: hom1_png_1["default"], companyName: "XXX" })),
                    React.createElement("div", { className: "w-[40%] px-5 pb-4" },
                        React.createElement(DressStyle_1["default"], null)))))));
};
