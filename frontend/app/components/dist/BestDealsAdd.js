"use strict";
exports.__esModule = true;
exports.BestDealsAdd = void 0;
var men_sport_png_1 = require("../../public/images/DealsAdd/men_sport.png");
var men_png_1 = require("../../public/images/DealsAdd/men.png");
var women_png_1 = require("../../public/images/DealsAdd/women.png");
var women_shoes_png_1 = require("../../public/images/DealsAdd/women_shoes.png");
var image_1 = require("next/image");
exports.BestDealsAdd = function () {
    return (React.createElement("div", { className: "md:px-4 bg-white hover:bg-slate-100 shadow-md rounded-lg md:max-w-xl mx-auto" },
        React.createElement("p", { className: "lg:text-xl md:text-xs font-bold p-4 " }, "Up to 40% off | Men's and Women's Footwear"),
        React.createElement("div", { className: "grid grid-cols-2 md:gap-4 gap-2 " },
            React.createElement("div", { className: "flex flex-col items-center" },
                React.createElement(image_1["default"], { src: men_png_1["default"], alt: "Men's shoes", className: "w-[90%] md:w-full h-32 object-cover rounded-md" }),
                React.createElement("p", { className: "font-medium" }, "Men's shoes")),
            React.createElement("div", { className: "flex flex-col items-center" },
                React.createElement(image_1["default"], { src: women_shoes_png_1["default"], alt: "Women's shoes", className: "w-[90%] md:w-full h-32 object-cover rounded-md" }),
                React.createElement("p", { className: "font-medium" }, "Women's shoes")),
            React.createElement("div", { className: "flex flex-col items-center" },
                React.createElement(image_1["default"], { src: men_sport_png_1["default"], alt: "Men's Casual", className: "w-[90%] md:w-full h-32 object-cover rounded-md" }),
                React.createElement("p", { className: "font-medium" }, "Men's Casual")),
            React.createElement("div", { className: "flex flex-col items-center" },
                React.createElement(image_1["default"], { src: women_png_1["default"], alt: "Women's Footwear", className: "w-[90%] md:w-full h-32 object-cover rounded-md" }),
                React.createElement("p", { className: "font-medium" }, "Women's Footwear")))));
};
