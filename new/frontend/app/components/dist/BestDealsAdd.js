"use strict";
exports.__esModule = true;
exports.BestDealsAdd = void 0;
var men_sport_png_1 = require("../../public/images/DealsAdd/men_sport.png");
var men_png_1 = require("../../public/images/DealsAdd/men.png");
var women_png_1 = require("../../public/images/DealsAdd/women.png");
var women_shoes_png_1 = require("../../public/images/DealsAdd/women_shoes.png");
var image_1 = require("next/image");
exports.BestDealsAdd = function () {
    return (React.createElement("div", { className: "px-4 bg-white hover:bg-slate-100 shadow-md rounded-lg max-w-xl mx-auto" },
        React.createElement("p", { className: "lg:text-xl md:text-xs font-bold p-4 " }, "Up to 40% off | Men's and Women's Footwear"),
        React.createElement("div", { className: "grid grid-cols-2 gap-4 " },
            React.createElement("div", { className: "flex flex-col items-center" },
                React.createElement(image_1["default"], { src: men_png_1["default"], alt: "Men's shoes", className: "w-full h-32 object-cover rounded-md" }),
                React.createElement("p", { className: "mt-2 font-medium" }, "Men's shoes")),
            React.createElement("div", { className: "flex flex-col items-center" },
                React.createElement(image_1["default"], { src: women_shoes_png_1["default"], alt: "Women's shoes", className: "w-full h-32 object-cover rounded-md" }),
                React.createElement("p", { className: "mt-2 font-medium" }, "Women's shoes")),
            React.createElement("div", { className: "flex flex-col items-center" },
                React.createElement(image_1["default"], { src: men_sport_png_1["default"], alt: "Men's Casual", className: "w-full h-32 object-cover rounded-md" }),
                React.createElement("p", { className: "mt-2 font-medium" }, "Men's Casual")),
            React.createElement("div", { className: "flex flex-col items-center" },
                React.createElement(image_1["default"], { src: women_png_1["default"], alt: "Women's Footwear", className: "w-full h-32 object-cover rounded-md" }),
                React.createElement("p", { className: "mt-2 font-medium" }, "Women's Footwear")))));
};
