"use client";
"use strict";
exports.__esModule = true;
exports.RecentItem = exports.featuredProducts = void 0;
var react_1 = require("react");
var ProductCard_1 = require("./ProductCard");
var airpods_png_1 = require("../../public/images/topDeals/airpods.png");
var boat_png_1 = require("../../public/images/topDeals/boat.png");
var headphone_png_1 = require("../../public/images/topDeals/headphone.png");
var phone_png_1 = require("../../public/images/topDeals/phone.png");
exports.featuredProducts = [
    {
        imageSrc: boat_png_1["default"],
        name: "Boats Airpods",
        price: "From Rs 899",
        altText: "Boats Airpods"
    },
    {
        imageSrc: phone_png_1["default"],
        name: "Apple Mobiles",
        price: "From Rs 90,000",
        altText: "Apple Mobiles"
    },
    {
        imageSrc: airpods_png_1["default"],
        name: "Apple Airpods",
        price: "From Rs 10,000",
        altText: "Apple Airpods"
    },
    {
        imageSrc: headphone_png_1["default"],
        name: "Headset",
        price: "From Rs 5000",
        altText: "Headset"
    },
    {
        imageSrc: airpods_png_1["default"],
        name: "Apple Airpods",
        price: "From Rs 10,000",
        altText: "Apple Airpods"
    },
    {
        imageSrc: headphone_png_1["default"],
        name: "Headset",
        price: "From Rs 5000",
        altText: "Headset"
    },
];
exports.RecentItem = function () {
    return (react_1["default"].createElement("div", { className: " max-w-[90%] mx-auto py-8" },
        react_1["default"].createElement("div", { className: "flex-1" },
            react_1["default"].createElement("h2", { className: "text-3xl font-bold   font-sans pb-2" }, "Recently Viewed Items"),
            react_1["default"].createElement("div", { className: "relative" },
                react_1["default"].createElement("div", { className: "flex overflow-x-auto scrollbar-hide " }, exports.featuredProducts.map(function (product, index) { return (react_1["default"].createElement("div", { key: index, className: "max-w-[50%] min-w-[16%]" },
                    react_1["default"].createElement(ProductCard_1["default"], { imageSrc: product.imageSrc, name: product.name, price: product.price, altText: product.altText }))); })),
                react_1["default"].createElement("button", { className: "absolute right-0 top-1/2 transform -translate-y-1/2 bg-white text-black rounded-full p-2 shadow-md", onClick: function () {
                        var container = document.querySelector(".overflow-x-auto");
                        container.scrollBy({ left: 400, behavior: "smooth" });
                    } }, ">")))));
};
exports["default"] = exports.RecentItem;
