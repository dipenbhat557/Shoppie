"use strict";
exports.__esModule = true;
exports.BuyAgainCard = void 0;
var image_1 = require("next/image");
var fa_1 = require("react-icons/fa");
var styles_1 = require("../utils/styles");
exports.BuyAgainCard = function (_a) {
    var name = _a.name, imageSrc = _a.imageSrc, price = _a.price, discount = _a.discount, altText = _a.altText, rating = _a.rating;
    return (React.createElement("div", { className: "flex flex-col items-center" },
        React.createElement("div", { className: "rounded-lg shadow-md " + styles_1.styles.productCardColor + " w-full aspect-square relative" },
            React.createElement(image_1["default"], { src: imageSrc, alt: altText, layout: "fill", objectFit: "cover", className: "rounded-lg" })),
        React.createElement("div", { className: "flex flex-col justify-between gap-1 py-1 sm:py-2 items-center w-full" },
            React.createElement("p", { className: "text-xs sm:text-sm md:text-base font-semibold text-center line-clamp-1" }, name),
            React.createElement("div", { className: "w-full flex pb-1 sm:pb-2 justify-center gap-1" },
                React.createElement("div", { className: "flex gap-0.5 sm:gap-1" }, Array.from({ length: 5 }, function (_, i) { return (React.createElement(fa_1.FaStar, { className: (i < rating ? "text-[#FFC633]" : "text-slate-200") + " w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4", key: i })); })),
                React.createElement("div", { className: "text-[8px] sm:text-xs md:text-sm" },
                    rating,
                    "/5")),
            React.createElement("div", { className: "relative w-full px-1 sm:px-2" },
                React.createElement("div", { className: "flex gap-1 sm:gap-2 font-semibold justify-center" },
                    React.createElement("p", { className: "line-through text-slate-400 text-[8px] sm:text-xs md:text-sm" },
                        "Rs. ",
                        price),
                    React.createElement("p", { className: "text-[10px] sm:text-sm md:text-base" },
                        "Rs. ",
                        price - discount)),
                React.createElement("div", { className: "text-[6px] sm:text-[8px] md:text-xs absolute -top-3 sm:-top-4 right-1 sm:right-2 py-0.5 px-1 sm:py-1 sm:px-2 bg-red-300 bg-opacity-35 border rounded-lg text-red-500" },
                    "-Rs ",
                    discount)),
            React.createElement("div", { className: "flex items-center justify-center w-full mt-1 sm:mt-2" },
                React.createElement("button", { className: styles_1.styles.buyNowButtonColor + " " + styles_1.styles.buyNowButtonHoverColor + " font-medium w-full text-[8px] sm:text-xs md:text-sm py-1 px-2 sm:py-1.5 sm:px-3" }, "Buy now")))));
};
